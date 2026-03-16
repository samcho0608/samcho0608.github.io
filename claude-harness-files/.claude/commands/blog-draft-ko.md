---
description: Draft a Korean blog post or Korean-original post in the repository voice
argument-hint: [topic or brief]
---

Draft a Korean blog post for this repository.

Use these rules:
- `/CLAUDE.md`
- `/content/CLAUDE.md`
- `/.claude/style/blog-core.md`
- `/.claude/style/korean-blog-style.md`
- `/content/ko/CLAUDE.md` when the target file is under `content/ko/`

Task:
1. Identify whether the post is mainly technical, reflective, personal, cultural, or mixed.
2. Choose an appropriate structure instead of forcing a template.
3. Draft the post in natural Korean.
4. Keep the writing readable first and structured second.
5. Do not fabricate experience, metrics, or conclusions.

Default output:
- a markdown draft
- headings only where useful
- 자연스럽게 읽히는 문단 흐름
- 괜히 잘 쓴 척하지 않는 문체

Before returning, silently check:
- 한국어로 자연스러운가
- 번역투가 없는가
- 구조가 너무 앞에 나서지 않는가
- 실제로 남길 가치가 있는 글인가
