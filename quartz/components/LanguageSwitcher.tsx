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
  const isKoPage = currentLang === "ko"

  // URL structure:
  //   EN: en/index, en/tech/router-vpn-01, ...
  //   KO: ko/index, ko/tech/router-vpn-01, ...
  // Counterpart: swap "en/" ↔ "ko/" prefix
  const counterpartSlug: FullSlug = isKoPage
    ? (`en/${slug.startsWith("ko/") ? slug.slice(3) : slug}` as FullSlug)
    : (`ko/${slug.startsWith("en/") ? slug.slice(3) : slug}` as FullSlug)

  const counterLang = isKoPage ? "en" : "ko"
  const counterFile = allFiles.find(
    (f) => f.slug === counterpartSlug && (f.frontmatter?.lang as string) === counterLang,
  )

  if (!counterFile) return null

  const currentMeta = LANG_META[currentLang] ?? { flag: "", label: currentLang }
  const counterMeta = LANG_META[counterLang] ?? { flag: "", label: counterLang }

  return (
    <div class={classNames(displayClass, "language-switcher")}>
      <span class="lang-current">
        {currentMeta.flag} {currentMeta.label}
      </span>
      <span class="lang-divider">·</span>
      <a
        href={resolveRelative(fileData.slug!, counterpartSlug)}
        class="lang-link"
        aria-label={`Read in ${counterMeta.label}`}
      >
        {counterMeta.flag} {counterMeta.label}
      </a>
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
