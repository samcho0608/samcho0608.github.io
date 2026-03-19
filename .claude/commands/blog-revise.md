---
description: Revise an existing blog draft without losing the writer's voice
argument-hint: [revision goal]
---

Revise the current draft for this repository.

First:
1. Detect the language.
2. Detect whether the piece is technical, reflective, personal, cultural, or mixed.
3. Diagnose the main weakness: flow, clarity, tone, specificity, structure, or ending.

Then apply:
- `/CLAUDE.md`
- `/.claude/style/blog-core.md`
- `/.claude/style/english-blog-style.md` for English drafts
- `/.claude/style/korean-blog-style.md` for Korean drafts
- `/content/ko/CLAUDE.md` when revising a file under `content/ko/`

Revision priorities:
- preserve the original opinion
- preserve the writer’s personality
- remove generic phrasing
- reduce over-explanation
- improve paragraph flow
- improve transitions
- replace vague lines with concrete ones where possible
- keep the writing human
- do not flatten the piece into bland “good writing”

Output:
1. a short diagnosis
2. the revised version
3. optional notes only if they materially help

Before returning, silently check:
- Does it still sound like the same person?
- Is it sharper without becoming sterile?
- Does it read more naturally now?
