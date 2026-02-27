import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { FullSlug, resolveRelative } from "../util/path"

const LABELS: Record<string, { prev: string; next: string }> = {
  ko: { prev: "← 이전 편", next: "다음 편 →" },
  en: { prev: "← Previous", next: "Next →" },
}

const SeriesNav: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
  const series = fileData.frontmatter?.series as string | undefined
  const seriesOrder = fileData.frontmatter?.series_order as number | undefined
  const lang = (fileData.frontmatter?.lang as string | undefined) ?? "en"

  if (!series || seriesOrder === undefined) return null

  // Find all published posts in the same series and same language.
  // allFiles only contains non-draft files, so draft posts are automatically excluded.
  const seriesPosts = allFiles
    .filter(
      (f) => f.frontmatter?.series === series && f.frontmatter?.lang === lang,
    )
    .sort(
      (a, b) =>
        ((a.frontmatter?.series_order as number) ?? 0) -
        ((b.frontmatter?.series_order as number) ?? 0),
    )

  if (seriesPosts.length <= 1) return null

  const currentIndex = seriesPosts.findIndex((f) => f.slug === fileData.slug)
  if (currentIndex === -1) return null

  const prev = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null
  const next = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null

  if (!prev && !next) return null

  const labels = LABELS[lang] ?? LABELS["en"]

  return (
    <nav class={classNames(displayClass, "series-nav")} aria-label="Series navigation">
      <div class="series-nav-inner">
        <div class={`series-nav-item series-nav-prev${!prev ? " series-nav-empty" : ""}`}>
          {prev && (
            <a
              href={resolveRelative(fileData.slug!, prev.slug! as FullSlug)}
              class="series-nav-link"
            >
              <span class="series-nav-direction">{labels.prev}</span>
              <span class="series-nav-title">{prev.frontmatter?.title as string}</span>
            </a>
          )}
        </div>
        <div class={`series-nav-item series-nav-next${!next ? " series-nav-empty" : ""}`}>
          {next && (
            <a
              href={resolveRelative(fileData.slug!, next.slug! as FullSlug)}
              class="series-nav-link"
            >
              <span class="series-nav-direction">{labels.next}</span>
              <span class="series-nav-title">{next.frontmatter?.title as string}</span>
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}

SeriesNav.css = `
.series-nav {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--lightgray);
}

.series-nav-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.series-nav-item {
  display: flex;
}

.series-nav-prev {
  justify-content: flex-start;
}

.series-nav-next {
  justify-content: flex-end;
  text-align: right;
}

.series-nav-empty {
  visibility: hidden;
}

.series-nav-link {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--lightgray);
  text-decoration: none;
  max-width: 100%;
  transition: background-color 0.15s, border-color 0.15s;
}

.series-nav-link:hover {
  background-color: var(--highlight);
  border-color: var(--gray);
}

.series-nav-direction {
  font-size: 0.8rem;
  color: var(--secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.series-nav-title {
  font-size: 0.9rem;
  color: var(--dark);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 600px) {
  .series-nav-inner {
    grid-template-columns: 1fr;
  }
  .series-nav-next {
    text-align: left;
    justify-content: flex-start;
  }
  .series-nav-empty {
    display: none;
  }
}
`

export default (() => SeriesNav) satisfies QuartzComponentConstructor
