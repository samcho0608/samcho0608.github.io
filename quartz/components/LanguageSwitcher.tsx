import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { FullSlug, resolveRelative } from "../util/path"

const LANG_META: Record<string, { flag: string; label: string }> = {
  ko: { flag: "🇰🇷", label: "한국어" },
  en: { flag: "🇺🇸", label: "English" },
}

const LanguageSwitcher: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
}: QuartzComponentProps) => {
  const currentLang = fileData.frontmatter?.lang as string | undefined
  if (!currentLang) return null

  const slug = fileData.slug!
  const parts = slug.split("/")
  // Expect slugs like "ko/router-vpn-01" or "en/llm-as-mentor"
  if (parts.length < 2) return null

  const [, ...rest] = parts
  const baseName = rest.join("/")

  // Find counterpart files in other languages
  const counterparts: Array<{ lang: string; slug: FullSlug }> = []

  for (const file of allFiles) {
    const fileLang = file.frontmatter?.lang as string | undefined
    if (!fileLang || fileLang === currentLang) continue

    const fileSlugParts = file.slug?.split("/") ?? []
    if (fileSlugParts.length < 2) continue

    const [fileLangDir, ...fileRest] = fileSlugParts
    const fileBaseName = fileRest.join("/")

    // Match same base filename in a different language folder
    if (fileBaseName === baseName && fileLangDir === fileLang) {
      counterparts.push({ lang: fileLang, slug: file.slug! as FullSlug })
    }
  }

  if (counterparts.length === 0) return null

  const currentMeta = LANG_META[currentLang] ?? { flag: "", label: currentLang }

  return (
    <div class={classNames(displayClass, "language-switcher")}>
      <span class="lang-current">
        {currentMeta.flag} {currentMeta.label}
      </span>
      <span class="lang-divider">·</span>
      {counterparts.map(({ lang, slug: counterSlug }, i) => {
        const meta = LANG_META[lang] ?? { flag: "", label: lang }
        return (
          <>
            <a
              key={lang}
              href={resolveRelative(fileData.slug!, counterSlug)}
              class="lang-link"
              aria-label={`Read in ${meta.label}`}
            >
              {meta.flag} {meta.label}
            </a>
            {i < counterparts.length - 1 && <span class="lang-divider">·</span>}
          </>
        )
      })}
    </div>
  )
}

LanguageSwitcher.css = `
.language-switcher {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0 0.8rem;
  font-size: 0.85rem;
  flex-wrap: wrap;
}

.lang-current {
  font-weight: 600;
  color: var(--dark);
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  background-color: var(--highlight);
  border: 1px solid var(--lightgray);
}

.lang-divider {
  color: var(--gray);
  user-select: none;
}

.lang-link {
  color: var(--secondary);
  text-decoration: none;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--lightgray);
  transition: background-color 0.15s, color 0.15s;
}

.lang-link:hover {
  background-color: var(--highlight);
  color: var(--dark);
}
`

export default (() => LanguageSwitcher) satisfies QuartzComponentConstructor
