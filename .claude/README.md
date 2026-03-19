# Blog Post Machine

A lightweight content pipeline for this blog. The goal is to reduce the time investment per post from hours to ~20 minutes without trading away voice or quality.

## Design contract

- **You provide:** topic + a few bullet points of real context (opinions, experiences, things you actually want to say)
- **Claude produces:** a complete EN draft + KO localization, both reviewed interactively
- **You control:** final approval, publish scheduling (`PUBLISH_QUEUE.txt`), and when the post goes live

Nothing is invented. The bullet points you provide ground every draft in real experience. Claude writes; you edit and approve.

---

## One-time setup

**GitHub secrets** (`Settings → Secrets and variables → Actions`):
```
ANTHROPIC_API_KEY
```

**GitHub labels** (run once):
```bash
gh label create "topic-harvest" --color "0075ca" --description "Weekly topic suggestion issue"
gh label create "from-harvest"  --color "e4e669" --description "PR originated from a topic harvest issue"
```

---

## How it works

### 1. Topic harvest (optional)

Run the workflow manually from the Actions tab whenever you want fresh ideas:

```
Actions → Generate Topic Harvest Issue → Run workflow
```

Claude reads your existing posts and `TOPIC_BACKLOG.md`, then opens a GitHub Issue with 5 topic suggestions that fit your actual writing range — tech, personal, music, homelab, life. The issue stays open for you to add your own topics in comments. Running it again when an issue is already open does nothing (duplicate guard).

### 2. Writing a post (`/blog-create`)

Run in Claude Code:

```
/blog-create #42          # from a harvest issue
/blog-create              # picks from open harvest issues
/blog-create my topic     # inline brief, no issue needed
```

Claude walks through:
1. Topic selection (from issue or inline)
2. Category (`tech`, `life`, `music`, or anything else) + publish date
3. EN draft → interactive review loop (you request changes until it's right)
4. KO localization → interactive review loop
5. Commit + push + PR opened automatically

The PR body includes `Closes #N` and the `from-harvest` label if the post came from a harvest issue. `PUBLISH_QUEUE.txt` is **not touched** — you add the post to the queue manually when you decide to publish.

### 3. Backlog update (automatic)

When a `from-harvest`-labelled PR merges, a workflow runs automatically:
- Reads the linked harvest issue
- Extracts all topics that weren't written
- Appends them to `TOPIC_BACKLOG.md`
- Closes the harvest issue

PRs without the `from-harvest` label are ignored by this workflow.

---

## Files

| File | Purpose |
|---|---|
| `.claude/commands/blog-create.md` | Main command — end-to-end post production |
| `.claude/commands/blog-draft-en.md` | Draft EN only |
| `.claude/commands/blog-draft-ko.md` | Draft KO-original post |
| `.claude/commands/blog-localize-ko.md` | Localize an existing EN post to KO |
| `.claude/commands/blog-review.md` | Review a draft without rewriting |
| `.claude/commands/blog-revise.md` | Revise a draft while preserving voice |
| `.claude/style/blog-core.md` | Voice and style rules (language-neutral) |
| `.claude/style/english-blog-style.md` | EN-specific style rules |
| `.claude/style/korean-blog-style.md` | KO-specific style rules (localization, not translation) |
| `.github/workflows/generate-topic-harvest.yml` | Opens harvest issue on demand |
| `.github/workflows/update-topic-backlog.yml` | Saves unused topics on PR merge |
| `.github/workflows/publish-next.yml` | Pops `PUBLISH_QUEUE.txt` on schedule |
| `TOPIC_BACKLOG.md` | Checklist of queued topic ideas |
| `PUBLISH_QUEUE.txt` | Scheduled post queue (author-controlled) |

---

## Typical session

```
1. Run /blog-create #42 in Claude Code
2. Pick topic, category, publish date
3. Review EN draft — request changes until satisfied
4. Review KO draft — request changes until satisfied
5. PR is opened automatically
6. Review the PR on GitHub, merge when ready
7. When you want it published: add the line to PUBLISH_QUEUE.txt
   → publish-next.yml picks it up on the next scheduled run
```

---

## What is and isn't automated

| | Automated | Manual |
|---|---|---|
| Topic suggestions | ✅ harvest workflow | — |
| EN draft | ✅ /blog-create | — |
| KO localization | ✅ /blog-create | — |
| PR creation | ✅ /blog-create | — |
| Backlog update | ✅ on PR merge | — |
| Content review | — | ✅ you |
| Publish scheduling | — | ✅ PUBLISH_QUEUE.txt |
| Deploy | ✅ publish-next.yml | — |
