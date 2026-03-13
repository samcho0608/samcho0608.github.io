# 한국어 콘텐츠 가이드

이 디렉토리는 samcho0608.github.io의 모든 한국어 블로그 포스트와 페이지를 포함합니다.

## 파일 구조

```
content/ko/
├── index.md          # 한국어 홈페이지
├── career/           # 커리어 섹션
│   ├── index.md      # 커리어 개요
│   └── resume.md     # 이력서 페이지
└── tech/             # 기술 포스트
    └── *.md          # 개별 포스트
```

## 프론트매터 필수 항목

모든 포스트에 반드시 포함해야 합니다:

```yaml
---
title: "포스트 제목"
date: YYYY-MM-DD
description: "SEO 및 미리보기용 한 문장 설명."
tags:
  - tag1
  - tag2
lang: ko
draft: false
---
```

시리즈 포스트에는 다음도 필요합니다:

```yaml
series: "series-slug"
series_order: 1
```

## 위키링크

내부 링크는 content 루트로부터 전체 경로를 사용해야 합니다:

```
[[ko/tech/some-post|표시 텍스트]]
[[ko/career/resume|이력서]]
```

## 영어 대응 포스트

`ko/tech/foo.md`의 각 한국어 포스트는 `en/tech/foo.md`에 영어 대응 포스트가 있습니다.
`lang: ko` 프론트매터 필드가 LanguageSwitcher 컴포넌트를 활성화하여 두 버전 간 링크를 자동으로 연결합니다.

영어 대응 포스트가 아직 없는 경우, switcher를 숨기려면 `lang` 필드를 생략하세요.
