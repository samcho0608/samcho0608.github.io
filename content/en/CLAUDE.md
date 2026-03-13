# English Content Guidelines

This directory contains all English blog posts and pages for samcho0608.github.io.

## File structure

```
content/en/
├── index.md          # English homepage
├── career/           # Career section
│   ├── index.md      # Career overview
│   └── resume.md     # Resume page
└── tech/             # Technical posts
    └── *.md          # Individual posts
```

## Frontmatter requirements

Every post must include:

```yaml
---
title: "Post Title"
date: YYYY-MM-DD
description: "One-sentence description for SEO and previews."
tags:
  - tag1
  - tag2
lang: en
draft: false
---
```

Series posts also need:

```yaml
series: "series-slug"
series_order: 1
```

## Wikilinks

Internal links must use the full path from the content root:

```
[[en/tech/some-post|Display text]]
[[en/career/resume|Resume]]
```

## Counterpart Korean posts

Each EN post at `en/tech/foo.md` has a Korean counterpart at `ko/tech/foo.md`.
The `lang: en` frontmatter field enables the LanguageSwitcher component, which
automatically links between the two versions.

If a Korean counterpart does not yet exist, omit the `lang` field to suppress
the switcher.
