# analyze_threat_report

Extract actors, TTPs, IOCs, and recommended mitigations from a security threat report. Paraphrased from Daniel Miessler's Fabric (MIT). Structured-output prompt with brand-voice guards and a fixed section schema. Drop input under the INPUT marker; output follows the declared sections in order, with no preamble or commentary. Pair with the evals skeleton in evals/promptfoo.yaml to wire CI checks.
