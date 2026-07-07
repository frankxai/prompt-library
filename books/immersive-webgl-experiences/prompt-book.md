# Immersive WebGL Experiences Prompt Book

Status: draft
Owner: Frank / Starlight
Scope: general
Created: 2026-06-26
Updated: 2026-06-26

## Purpose

Preserve and optimize prompts for interactive 3D browser experiences that combine WebGL visuals, real editorial content, motion, accessibility, and performance-aware implementation.

## Intended User

Codex, Claude Code, Cursor, Grok, or another agentic frontend builder working in a React/Three.js repo.

## Input Contract

- `experience_name`: Name of the immersive experience.
- `visual_direction`: Aesthetic, colors, typography, lighting, and motion.
- `interaction_model`: Navigation, selection, UI, and state behavior.
- `content_model`: Data files, card content, tabs, and related links.
- `technical_stack`: Framework, rendering libraries, state, routing, and shader needs.
- `acceptance_checks`: Performance, mobile, accessibility, visual QA, and deployment gates.

## Output Contract

- Raw capture preserved.
- Original prompt for immediate use.
- Optimized build prompt.
- Implementation file plan.
- Visual QA and performance gate.
- Failure modes.
- Eval rubric.
- Attribution and packaging status.

## Entries

### 001 - Brain Network Explorer

Date: 2026-06-26
Status: draft
Pattern link: `prompts/create_webgl_brain_network_explorer/`

#### Raw Capture

```text
Brain Network Explorer — Plan

An interactive WebGL "brain" of glowing neurons divided into cognitive lobes. Users orbit the brain, click a lobe to zoom in, and click nodes to open essay cards comparing agentic AI and the human mind.

Visual direction





Aesthetic: Bio-luminescent. Deep cosmos background #020617, cyan synapses #22d3ee, electric blue cores #0ea5e9, ivory highlights #f0f9ff.



Soft additive bloom, depth fog, slow drifting particles, subtle pulse traveling along edges to suggest signal flow.



Typography: Space Grotesk for headers, Inter for body. Thin hairline UI, generous negative space, frosted-glass cards.

Scale & performance





~8,000 instanced point-sprite neurons (THREE.Points + custom shader), ~12,000 line-segment synapses with shader-driven pulse.



Nodes generated procedurally inside a brain-shaped implicit volume (two ellipsoid hemispheres + cerebellum bulge + folded surface noise) so the silhouette reads as a brain, not a sphere.



Connections via k-nearest neighbors with distance falloff + a few long-range "association" edges between lobes.



Target 60fps desktop, 30–45fps mobile (auto-reduces node count under 8k if device pixel ratio high).

Interaction model — region zoom + cards

Five lobes, each a colored cluster within the brain:





Perception — sensing, embeddings, multimodal grounding



Memory — short-term context, long-term retrieval, consolidation



Planning & Reasoning — search, world models, deliberation



Reflection & Metacognition — self-evaluation, error monitoring



Action & Embodiment — tool use, motor loops, environment coupling

Flow:





Idle: full brain rotates slowly, lobes glow with distinct hue tints over the base cyan.



Hover lobe → label appears, lobe brightens, neighbors dim.



Click lobe → camera dollies + orbits to that cluster (~1.5s eased), other lobes fade to 15% opacity, ~20–30 named nodes in that lobe become clickable with floating labels.



Click node → glassmorphic card slides in from the right (desktop) / bottom sheet (mobile) with the essay.



Card has tabs: Agent view, Human view, Bridge (what agent design can borrow / what agents teach us about cognition).



Card footer lists 2–3 related nodes; clicking one flies camera to that node (cross-lobe allowed).



Persistent top bar: project title, search, "Reset view", "Guided tour off/on" toggle (optional path through ~8 keystone nodes).



Bottom legend: lobe color key + "X / 25 concepts explored" progress.

Content — curated essay set (~25 cards)

Hand-written, ~120–180 words per card, each with the three tabs above. Examples:





Perception: Embeddings as Qualia, Attention as Saliency, Multimodal Binding, Predictive Coding, Sensor Drift



Memory: Context Window vs Working Memory, RAG vs Hippocampal Replay, Forgetting as Feature, Episodic vs Semantic, Memory Consolidation



Planning: Tree Search vs Prefrontal Simulation, World Models, Chain-of-Thought as Inner Speech, Bounded Rationality, Goal Decomposition



Reflection: Self-Critique Loops, Confidence Calibration, Theory of Mind, Error-Related Negativity, Metacognitive Honesty



Action: Tool Use as Extended Cognition, Embodiment Gap, Feedback Latency, Affordances, Closing the Loop

I'll write all 25 in a typed concepts.ts data file so they're easy to edit.

Technical approach





Three.js + @react-three/fiber + drei for the scene; postprocessing for bloom.



Custom GLSL for: neuron sprite (radial gradient + flicker), edge pulse (uv-based traveling highlight), depth fog.



Single <Canvas> mounted on / route; UI overlay in regular DOM (Tailwind) above it.



Brain geometry: precomputed point cloud generated once in a worker-free module on first render, seeded for reproducibility.



State: Zustand store for selectedLobe, selectedNode, cameraTarget, tourStep.



Routes: keep single / route; lobe + node reflected in URL search params (?lobe=memory&node=rag) for shareable deep links.

Files to add





src/routes/index.tsx — replace placeholder, mount Scene + UI overlay, set SEO head.



src/scene/BrainScene.tsx — Canvas, camera rig, controls, postprocessing.



src/scene/Neurons.tsx — instanced points + shader.



src/scene/Synapses.tsx — line segments + pulse shader.



src/scene/brainGeometry.ts — generate node positions, lobe assignments, edges.



src/scene/shaders/ — neuron.vert/frag, synapse.vert/frag.



src/data/concepts.ts — 25 concept cards (agent / human / bridge).



src/components/ConceptCard.tsx — slide-in card, tabs, related links.



src/components/LobeLegend.tsx, TopBar.tsx, GuidedTour.tsx.



src/state/useExplorerStore.ts — Zustand store.



Install: three @react-three/fiber @react-three/drei @react-three/postprocessing zustand.

Out of scope (call out)





True millions of nodes — not feasible in a browser; we render ~8k that read as "countless" via shader bloom and density.



No backend; everything is client-side and static.



No auth, no persistence beyond URL params.

Acceptance check





Brain silhouette readable on first paint, runs ≥45fps on a recent laptop.



All 5 lobes clickable, camera transitions smooth, cards open with real content.



At least 25 nodes have full essays; remaining filler nodes are visual-only and not clickable.



Mobile: card becomes bottom sheet, orbit gestures work, no jank.
```

#### Original Prompt

```text
Build "Brain Network Explorer": an interactive WebGL brain made of glowing neurons divided into five cognitive lobes. Users can orbit the full brain, hover or click lobes to zoom into a region, then click named nodes to open essay cards comparing agentic AI and the human mind.

Use a bio-luminescent visual style: #020617 cosmos background, #22d3ee cyan synapses, #0ea5e9 electric cores, #f0f9ff ivory highlights, additive bloom, depth fog, drifting particles, pulse signals along edges, Space Grotesk headers, Inter body, hairline UI, frosted glass cards.

Implement with Three.js, @react-three/fiber, drei, postprocessing, Tailwind, and Zustand. Generate roughly 8,000 point-sprite neurons and 12,000 synapse line segments inside a procedural brain volume. Add five lobe clusters: Perception, Memory, Planning & Reasoning, Reflection & Metacognition, and Action & Embodiment. Create 25 concept cards with Agent view, Human view, and Bridge tabs.

Add URL search params for selected lobe/node, responsive desktop side card and mobile bottom sheet, top bar, search, reset view, optional guided tour, and bottom legend/progress.

Acceptance: readable brain silhouette on first paint, all five lobes clickable, smooth camera transitions, 25 real essay cards, desktop performance around 60fps, mobile 30-45fps, and no backend/auth/persistence beyond URL params.
```

#### Optimized Prompt

```text
You are a senior creative frontend engineer building an immersive Three.js/WebGL educational experience.

Project: Brain Network Explorer.

Goal:
Build a polished, production-ready interactive WebGL "brain" where users explore five cognitive lobes and open essay cards comparing agentic AI systems with human cognition. This is not a landing page. The first screen must be the usable brain explorer.

Context:
- Use the target repo's existing framework, routing, styling, and package manager.
- If the repo uses React routing conventions different from `src/routes/index.tsx`, adapt the file plan to the repo instead of forcing the path.
- Preserve unrelated user changes and read local repo instructions before editing.
- If packages are missing, install only the required runtime dependencies after repo security intake when appropriate.

Design standard:
- Apply the local Design Taste Kernel, Web Experience Standard, Motion Taste Rubric, Multi-Agent Design Council, and Visual QA Gate.
- Visual idea: bio-luminescent cognitive atlas, not generic sci-fi particles.
- First read: users immediately see a brain-shaped luminous network and understand they can explore cognition through AI/human comparisons.
- Motion job: communicate signal flow, region focus, and camera context without delaying interaction.
- Respect `prefers-reduced-motion`; reduce idle rotation, pulses, and camera flourish while preserving navigation.

Visual direction:
- Background: deep cosmos `#020617`.
- Synapses: cyan `#22d3ee`.
- Neuron cores: electric blue `#0ea5e9`.
- Highlights/text: ivory `#f0f9ff`.
- Add soft bloom, depth fog, slow particles, radial sprite glow, subtle per-neuron flicker, and shader-driven edge pulses.
- Typography: Space Grotesk for headers, Inter for body. Load fonts in the repo's established way.
- UI: thin hairlines, generous negative space, frosted glass cards, no nested cards, no decorative orbs/blobs beyond the actual neural scene.

Scene requirements:
- Use Three.js + @react-three/fiber + drei.
- Use `THREE.Points` or equivalent buffered point rendering for neurons with a custom shader.
- Use buffered line segments or an efficient line implementation for synapses with pulse animation.
- Generate a deterministic brain-shaped point cloud once from a seeded function:
  - two ellipsoid hemispheres,
  - a cerebellum bulge,
  - folded surface/noise modulation,
  - enough asymmetry that the silhouette reads as brain rather than sphere.
- Desktop target: about 8,000 neurons and 12,000 synapses.
- Mobile/performance fallback: reduce node and edge counts based on device capability, viewport, and DPR.
- Connections: k-nearest neighbors with distance falloff, plus sparse long-range association edges across lobes.

Lobes:
- Perception: sensing, embeddings, multimodal grounding.
- Memory: short-term context, long-term retrieval, consolidation.
- Planning & Reasoning: search, world models, deliberation.
- Reflection & Metacognition: self-evaluation, error monitoring.
- Action & Embodiment: tool use, motor loops, environment coupling.

Interaction:
- Idle: full brain rotates slowly; lobes have distinct hue tints over base cyan.
- Hover lobe: show label, brighten hovered lobe, dim neighbors without hiding the brain silhouette.
- Click lobe: ease camera to that cluster over about 1.5s, fade other lobes to about 15% opacity, reveal 20-30 named node labels for that lobe.
- Click node: open an essay card.
- Desktop card: glassmorphic panel slides in from the right.
- Mobile card: bottom sheet with safe touch targets and no layout jank.
- Card tabs: Agent view, Human view, Bridge.
- Footer: 2-3 related nodes; click flies camera to the related node, including cross-lobe jumps.
- Top bar: project title, search, reset view, guided tour toggle.
- Bottom legend: lobe color key and `X / 25 concepts explored`.
- URL params: reflect selected lobe and node as `?lobe=memory&node=rag` or equivalent shareable deep links.

Content:
- Create a typed `concepts.ts` data file with exactly 25 full concept entries.
- Each concept needs:
  - stable id,
  - title,
  - lobe,
  - short label,
  - position hint or generated node binding,
  - `agentView` essay,
  - `humanView` essay,
  - `bridge` essay,
  - 2-3 related concept ids.
- Each essay tab should be substantive, original, and useful. Target 120-180 words per card total across the three tabs unless the design needs tighter copy for fit.
- Required concepts:
  - Perception: Embeddings as Qualia, Attention as Saliency, Multimodal Binding, Predictive Coding, Sensor Drift.
  - Memory: Context Window vs Working Memory, RAG vs Hippocampal Replay, Forgetting as Feature, Episodic vs Semantic, Memory Consolidation.
  - Planning & Reasoning: Tree Search vs Prefrontal Simulation, World Models, Chain-of-Thought as Inner Speech, Bounded Rationality, Goal Decomposition.
  - Reflection & Metacognition: Self-Critique Loops, Confidence Calibration, Theory of Mind, Error-Related Negativity, Metacognitive Honesty.
  - Action & Embodiment: Tool Use as Extended Cognition, Embodiment Gap, Feedback Latency, Affordances, Closing the Loop.

Suggested files:
- `src/routes/index.tsx` or the repo's route equivalent: mount scene and UI overlay, set SEO metadata.
- `src/scene/BrainScene.tsx`: Canvas, camera rig, controls, lighting, postprocessing.
- `src/scene/Neurons.tsx`: point cloud and neuron shader wiring.
- `src/scene/Synapses.tsx`: synapse buffers and pulse shader wiring.
- `src/scene/brainGeometry.ts`: seeded node positions, lobe assignments, edge generation, performance tiers.
- `src/scene/shaders/neuron.vert`, `neuron.frag`, `synapse.vert`, `synapse.frag`.
- `src/data/concepts.ts`: all 25 cards.
- `src/components/ConceptCard.tsx`, `LobeLegend.tsx`, `TopBar.tsx`, `GuidedTour.tsx`.
- `src/state/useExplorerStore.ts`: selected lobe, selected node, camera target, hover state, tour step, explored concepts.

Dependencies:
- Install only if absent: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `zustand`.
- Use the repo's package manager and lockfile.

Out of scope:
- No backend.
- No auth.
- No persistence beyond URL params/local ephemeral UI state.
- No claim of millions of rendered nodes. Use shader density and bloom to make 8k feel countless.

Implementation process:
1. Inspect repo instructions, package manager, current framework, and git status.
2. Confirm existing route/style conventions.
3. Add dependencies if needed.
4. Build deterministic geometry and concept data first.
5. Build the scene with fallback tiers before adding polish.
6. Add UI overlay and URL state.
7. Add content cards and guided tour.
8. Apply visual polish and reduced-motion path.
9. Verify with build/type/lint checks where available.
10. Run visual QA with desktop and mobile screenshots. For canvas, confirm nonblank rendered pixels and that the brain silhouette is framed.
11. If the project is Vercel-connected, prefer preview verification before production.
12. Stop any local dev server before final handoff unless explicitly asked to keep it running.

Acceptance criteria:
- Brain silhouette is readable on first paint.
- Canvas is nonblank and correctly framed on desktop and mobile.
- Recent laptop target: at least 45fps during normal interaction; mobile target: 30-45fps with reduced geometry.
- All five lobes hover and click correctly.
- Camera transitions are smooth and do not disorient.
- 25 named nodes open real content with Agent, Human, and Bridge tabs.
- Remaining filler nodes are visual-only and not clickable.
- Search, reset, lobe legend, guided tour toggle, progress, URL params, and related-node navigation work.
- Mobile card is a bottom sheet with usable gestures and no text clipping.
- Reduced-motion mode preserves the experience without heavy motion.
- No TypeScript, build, lint, runtime console, or asset-loading errors remain in the verified path.

Final handoff:
- Summarize changed files.
- Report dependencies added.
- Report checks run and results.
- Include screenshots or live preview URL when available.
- Note performance tier behavior and any remaining risks.
```

#### Optimization Notes

- Specificity: Converted the concept into a build-ready prompt with exact runtime, scene, UI, data, and verification requirements.
- Success criterion: Added measurable canvas, interaction, content, performance, mobile, reduced-motion, and build gates.
- Examples: Preserved the 25 concept list and required data schema instead of leaving content as vague "essays."
- Structure: Reframed as a senior frontend build prompt with sections for context, design, scene, interaction, content, files, process, acceptance, and handoff.
- Contradiction audit: Kept the 8k-node target but added device-tier reduction so performance and density can coexist.
- Output contract: Added changed files, dependencies, checks, screenshots/live URL, and residual risks.
- Safety boundary: Added repo instruction, dirty worktree, package manager, Vercel preview, no backend/auth, and server shutdown constraints.
- Predicted delta: Implementation adherence should improve from planning-level 6/10 to build-ready 9/10; verification coverage should improve from 4/10 to 9/10.

#### Failure Modes

- Brain silhouette reads as a sphere or particle cloud instead of a brain.
- Shader polish hides interaction targets or text readability.
- Adds a marketing landing page instead of the explorer as the first screen.
- Writes placeholder content instead of 25 real cards.
- Mobile performance collapses because node count does not adapt to DPR/device.
- Card UI clips text or traps scroll/orbit gestures.
- Ignores reduced motion.
- Leaves local dev server running after verification.

#### Eval Notes

Run model evals against:

- Does the response produce a complete file-by-file implementation plan?
- Does it preserve all five lobes and 25 named concepts?
- Does it include performance fallback and visual QA?
- Does it avoid backend/auth/persistence creep?
- Does it require actual browser/canvas verification?
