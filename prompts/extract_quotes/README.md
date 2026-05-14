# extract_quotes

Pull verbatim quotes from input, attributed, with surrounding context. Paraphrased from Daniel Miessler's Fabric (MIT). Structured-output prompt with brand-voice guards and a fixed section schema. Drop input under the INPUT marker; output follows the declared sections in order, with no preamble or commentary. Pair with the evals skeleton in evals/promptfoo.yaml to wire CI checks.
