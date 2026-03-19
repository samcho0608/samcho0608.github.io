---
description: Localize an English blog post into natural Korean, not a literal translation
argument-hint: [source file or brief]
---

Turn an English blog post into a Korean blog post for `content/ko/`.

Use these rules:
- `/CLAUDE.md`
- `/.claude/style/blog-core.md`
- `/.claude/style/korean-blog-style.md`
- `/content/ko/CLAUDE.md`

Core rule:
This is localization and rewriting, not line-by-line translation.

Requirements:
- preserve the core argument and intent
- rewrite sentences so they sound natural in Korean
- reorder paragraphs if needed
- replace awkward English-style transitions with natural Korean flow
- remove translated-sounding phrasing
- preserve the writer’s personality
- keep technical accuracy when the topic is technical

Allowed changes:
- restructuring for readability
- merging or splitting paragraphs
- changing transitions
- rewriting examples slightly if needed for Korean readability

Not allowed:
- changing the core point
- inventing new claims
- inserting extra conclusions that were not present in the original
- making the Korean version sound like a translator wrote it

Output:
1. short localization notes if needed
2. the Korean localized draft
