---
description: End-to-end blog post production — fetch topics, draft EN + KO, interactive review, open PR
argument-hint: [issue number | #N | topic brief]
---

Create a complete bilingual blog post (EN + KO) from topic to PR.

Use these rules throughout:
- `/CLAUDE.md`
- `/.claude/style/blog-core.md`
- `/.claude/style/english-blog-style.md`
- `/.claude/style/korean-blog-style.md`
- `/content/ko/CLAUDE.md`

---

## Step 1 — Load the topic

Determine what to write about based on the argument:

**If the argument is a number or starts with `#`** (e.g. `42`, `#42`):
  Run: `gh issue view <N> --json title,body,comments`
  Parse and display all topic ideas found in:
  - The issue body (numbered or bulleted items)
  - User comments (skip bot messages, short replies, acknowledgements)
  Label each with a number for the user to pick from.
  Store the issue number as N for later use.

**If the argument is plain text** (a topic brief):
  Use the text directly as the selected topic. Skip issue fetch. N = none.

**If there is no argument**:
  Run: `gh issue list -l topic-harvest --state open --json number,title`
  Display the list and ask: "Which issue would you like to work from? Or type a topic directly."
  If the user picks an issue number, fetch it as above.
  If the user types a topic, use it directly. N = none.

---

## Step 2 — Confirm post details

Ask the user (in a single prompt, not separate messages):
1. Which topic to write — show the options if multiple were loaded from an issue
2. Category for the post: `tech`, `life`, `music`, or other (user can specify any string)
3. Target publish date (suggest 7 days from today as default)

Derive the slug: lowercase, hyphenated, max 5 words from the topic title.
Example: "Setting up a home VPN with WireGuard" → `home-vpn-wireguard`

Create a working branch:
```
git checkout -b post/<slug>
```

---

## Step 3 — Draft the EN post

Apply all rules from `/CLAUDE.md`, `/.claude/style/blog-core.md`, `/.claude/style/english-blog-style.md`.

Before writing:
- Identify the post type: technical / reflective / personal / mixed
- Choose a structure appropriate to the content — do not force a template
- Do not invent experience, metrics, timelines, or conclusions
- Do not use generic AI prose patterns

Write a complete draft in natural English prose.

Save to `content/<category>/<slug>.md` with this frontmatter:
```yaml
---
title: "Post Title"
date: YYYY-MM-DD
description: "One-sentence summary"
tags:
  - tag1
  - tag2
lang: en
draft: true
---
```

Use today's date for `date`.

---

## Step 4 — EN interactive review

Present the full EN draft to the user.

Silently run these checks before presenting (fix obvious issues inline without mentioning them):
- Does it sound natural in English, not like AI prose?
- Is the structure appropriate and not forced?
- Is the voice direct, grounded, honest?
- Is there a clear point worth reading?
- Are there any invented facts, metrics, or experiences?

Ask: "How does this look? Any changes, or shall I move on to the Korean version?"

Enter a review loop:
- Apply any requested edits precisely — do not rewrite sections that weren't asked about
- Re-present the changed section (or full post if the change was structural)
- Ask again until the user says "done", "good", "looks good", "move on", or similar
- Update `content/<category>/<slug>.md` with all approved changes before proceeding

---

## Step 5 — Draft the KO post

Apply rules from `/.claude/style/korean-blog-style.md` and `/content/ko/CLAUDE.md`.

This is a full localization, not a translation. Rules:
- Rewrite for natural Korean reading flow — reorder paragraphs if it helps
- Do NOT copy English sentence rhythm or structure
- Avoid 번역투 (translation-speak)
- Avoid these phrases: 여정, 인사이트를 제공하다, 매끄럽게, 의미 있었다, 흥미롭게도
- Use natural Korean transitions: 결국 중요한 건..., 처음엔... 실제로는..., 그래서 결론은...
- Korean-specific structural adjustments are expected and encouraged

Save to `content/ko/<category>/<slug>.md` with this frontmatter:
```yaml
---
title: "한국어 제목"
date: YYYY-MM-DD
description: "한 문장 요약"
tags:
  - tag1
  - tag2
lang: ko
draft: true
---
```

Same `date` and `tags` as the EN version. Title and description localized, not translated.

---

## Step 6 — KO interactive review

Present the full KO draft to the user.

Silently run these checks before presenting:
- Does it sound like natural Korean, not a translation?
- Is the sentence rhythm Korean, not English?
- Are there any 번역투 phrases to remove?
- Is the structure appropriate for Korean readers?

Ask: "How does the Korean version look? Any changes, or shall I commit and open the PR?"

Enter a review loop:
- Apply any requested edits
- Re-present the changed section or full draft as needed
- Ask again until the user approves
- Update `content/ko/<category>/<slug>.md` with all approved changes before proceeding

---

## Step 7 — Commit, push, and open PR

Once both drafts are approved, run:

```bash
git add content/<category>/<slug>.md content/ko/<category>/<slug>.md
git commit -m "content: add <slug>"
git push -u origin post/<slug>
```

Then open the PR:

```bash
gh pr create \
  --title "<Post Title>" \
  --base v4 \
  --body "$(cat <<'EOF'
Closes #N

**Topic:** <selected topic>
**Publish date:** <target date>
EOF
)" \
  --label "from-harvest"
```

If there was no linked harvest issue (N = none), omit `Closes #N` from the body and omit `--label "from-harvest"`.

Output the PR URL.

Remind the user:
> When you're ready to schedule this post, add the following line to `PUBLISH_QUEUE.txt`:
> `content/<category>/<slug>.md content/ko/<category>/<slug>.md`
