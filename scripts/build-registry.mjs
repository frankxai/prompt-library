import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const promptsDir = path.join(root, 'prompts')
const booksDir = path.join(root, 'books')
const registryDir = path.join(root, 'registry')
const rankingsDir = path.join(root, 'rankings')

function normalizePath(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, '/')
}

function extractFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return {}
  return parseFrontmatter(match[1])
}

function parseFrontmatter(source) {
  const data = {}
  let parentKey = null

  for (const rawLine of source.split(/\r?\n/)) {
    if (!rawLine.trim() || rawLine.trimStart().startsWith('#')) continue

    const isChild = rawLine.startsWith('  ') && parentKey
    const line = rawLine.trim()
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.slice(0, colonIndex).trim()
    const rawValue = line.slice(colonIndex + 1).trim()

    if (isChild) {
      data[parentKey] ??= {}
      data[parentKey][key] = parseScalar(rawValue)
      continue
    }

    if (rawValue === '') {
      data[key] = {}
      parentKey = key
      continue
    }

    data[key] = parseScalar(rawValue)
    parentKey = null
  }

  return data
}

function parseScalar(value) {
  if (value === '') return ''
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 'null') return null
  if (/^-?\d+$/.test(value)) return Number.parseInt(value, 10)
  if (/^-?\d+\.\d+$/.test(value)) return Number.parseFloat(value)

  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim()
    if (!inner) return []
    return inner
      .split(',')
      .map((item) => item.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean)
  }

  return value.replace(/^["']|["']$/g, '')
}

function redTeamScore(status) {
  switch (status) {
    case 'pass':
      return 100
    case 'warn':
      return 60
    case 'pending':
      return 20
    case 'fail':
      return 0
    default:
      return 10
  }
}

function provenanceScore(provenance) {
  if (!provenance || typeof provenance !== 'object') return 0
  let score = 0
  if (provenance.source) score += 35
  if (provenance.attribution) score += 35
  if (provenance.license) score += 20
  if (provenance.source_url) score += 10
  return score
}

function recencyScore(dateValue) {
  if (!dateValue) return 0
  const time = Date.parse(dateValue)
  if (Number.isNaN(time)) return 0
  const days = (Date.now() - time) / 86_400_000
  if (days <= 30) return 100
  if (days <= 180) return 70
  if (days <= 365) return 45
  return 20
}

function computeRank(meta) {
  const evalScore = Math.max(0, Math.min(5, Number(meta.eval?.score ?? 0))) * 20
  const redTeam = redTeamScore(meta.red_team?.status)
  const provenance = provenanceScore(meta.provenance)
  const recency = recencyScore(meta.updated || meta.created)
  const editorPick = Array.isArray(meta.tags) && meta.tags.includes('editor-pick') ? 100 : 0

  const rank =
    0.35 * evalScore +
    0.20 * redTeam +
    0.10 * recency +
    0.05 * provenance +
    0.05 * editorPick

  return Number(rank.toFixed(2))
}

function inferScopeFromText(value) {
  const text = String(value ?? '').toLowerCase()
  if (!text) return null

  if (
    text.includes('arcanea') ||
    text.includes('worldbuilding') ||
    text.includes('lore') ||
    text.includes('canon') ||
    text.includes('apl') ||
    text.includes('studio')
  ) {
    return 'arcanea'
  }

  if (
    text.includes('starlight') ||
    text.includes('swarm') ||
    text.includes('queen') ||
    text.includes('sis') ||
    text.includes('mcp') ||
    text.includes('repo-ops') ||
    text.includes('orchestration')
  ) {
    return 'starlight'
  }

  if (
    text.includes('frankx') ||
    text.includes('business') ||
    text.includes('revenue') ||
    text.includes('creator') ||
    text.includes('content') ||
    text.includes('product')
  ) {
    return 'frankx'
  }

  return null
}

function inferScope(meta, fallbackText) {
  const tags = Array.isArray(meta.tags) ? meta.tags.join(' ') : ''
  return (
    meta.scope ||
    inferScopeFromText(tags) ||
    inferScopeFromText(meta.id) ||
    inferScopeFromText(meta.title) ||
    inferScopeFromText(fallbackText) ||
    'general'
  )
}

async function pathExists(filePath) {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

async function readFirstParagraph(filePath) {
  if (!(await pathExists(filePath))) return ''
  const text = await readFile(filePath, 'utf8')
  return text
    .split(/\r?\n\r?\n/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#')) ?? ''
}

async function loadPrompts() {
  if (!(await pathExists(promptsDir))) return []
  const entries = await readdir(promptsDir, { withFileTypes: true })
  const prompts = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const promptDir = path.join(promptsDir, entry.name)
    const patternPath = path.join(promptDir, 'pattern.md')
    if (!(await pathExists(patternPath))) continue

    const markdown = await readFile(patternPath, 'utf8')
    const meta = extractFrontmatter(markdown)
    const readmePath = path.join(promptDir, 'README.md')

    prompts.push({
      id: meta.id ?? entry.name,
      title: meta.title ?? entry.name,
      description: meta.description ?? '',
      scope: inferScope(meta, entry.name),
      lane: meta.lane ?? 'cross-lab',
      category: meta.category ?? 'create',
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      techniques: Array.isArray(meta.techniques) ? meta.techniques : [],
      provenance: meta.provenance ?? {},
      eval: meta.eval ?? {},
      red_team: meta.red_team ?? {},
      psyche: meta.psyche ?? {},
      version: meta.version ?? '0.0.0',
      created: meta.created ?? null,
      updated: meta.updated ?? null,
      path: normalizePath(patternPath),
      directory: normalizePath(promptDir),
      summary: await readFirstParagraph(readmePath),
      rank_score: computeRank(meta),
    })
  }

  return prompts.sort((a, b) => b.rank_score - a.rank_score || a.id.localeCompare(b.id))
}

function readField(markdown, field) {
  const match = markdown.match(new RegExp(`^${field}:\\s*(.+)$`, 'mi'))
  return match ? match[1].trim() : null
}

async function loadBooks() {
  if (!(await pathExists(booksDir))) return []
  const entries = await readdir(booksDir, { withFileTypes: true })
  const books = []

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('_')) continue
    const bookDir = path.join(booksDir, entry.name)
    const promptBookPath = path.join(bookDir, 'prompt-book.md')
    const readmePath = path.join(bookDir, 'README.md')
    if (!(await pathExists(promptBookPath))) continue

    const markdown = await readFile(promptBookPath, 'utf8')
    const linkedPatterns = [...markdown.matchAll(/Pattern link:\s*`([^`]+)`/g)].map((m) => m[1])

    books.push({
      id: entry.name,
      title: markdown.match(/^#\s+(.+)$/m)?.[1] ?? entry.name,
      scope: readField(markdown, 'Scope') ?? inferScope({}, `${entry.name} ${markdown.slice(0, 500)}`),
      status: readField(markdown, 'Status') ?? 'draft',
      owner: readField(markdown, 'Owner'),
      created: readField(markdown, 'Created'),
      updated: readField(markdown, 'Updated'),
      path: normalizePath(promptBookPath),
      directory: normalizePath(bookDir),
      summary: await readFirstParagraph(readmePath),
      linked_patterns: linkedPatterns,
    })
  }

  return books.sort((a, b) => a.id.localeCompare(b.id))
}

function renderRankings(prompts, generatedAt) {
  const lines = [
    '# Prompt Rankings',
    '',
    `Generated: ${generatedAt}`,
    '',
    'Rank score is a first-pass computed signal from eval score, red-team status, recency, provenance completeness, and editor-pick tag. It is not a substitute for human review.',
    '',
    '| # | Score | Prompt | Scope | Lane | Category | Eval | Red Team | Path |',
    '|---:|---:|---|---|---|---|---:|---|---|',
  ]

  prompts.forEach((prompt, index) => {
    const evalScore = prompt.eval?.score ?? 0
    const redTeam = prompt.red_team?.status ?? 'unknown'
    lines.push(
      `| ${index + 1} | ${prompt.rank_score} | ${prompt.title} | ${prompt.scope} | ${prompt.lane} | ${prompt.category} | ${evalScore} | ${redTeam} | \`${prompt.path}\` |`,
    )
  })

  lines.push('')
  return lines.join('\n')
}

async function main() {
  const generatedAt = new Date().toISOString()
  const prompts = await loadPrompts()
  const books = await loadBooks()

  const registry = {
    schema: 'frankx.promptLibrary.registry.v1',
    generatedAt,
    promptCount: prompts.length,
    bookCount: books.length,
    prompts,
    books,
  }

  await mkdir(registryDir, { recursive: true })
  await mkdir(rankingsDir, { recursive: true })
  await writeFile(path.join(registryDir, 'index.json'), `${JSON.stringify(registry, null, 2)}\n`)
  await writeFile(path.join(rankingsDir, 'by-rank.md'), renderRankings(prompts, generatedAt))

  console.log(`Wrote registry for ${prompts.length} prompts and ${books.length} books.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
