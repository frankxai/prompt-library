# create_micro_summary

Compress input into a one-tweet headline, three bullets, and a single CTA. Paraphrased from Daniel Miessler's Fabric (MIT). Structured-output prompt with brand-voice guards and a fixed section schema. Drop input under the INPUT marker; output follows the declared sections in order, with no preamble or commentary. Pair with the evals skeleton in evals/promptfoo.yaml to wire CI checks.
