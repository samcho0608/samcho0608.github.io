import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const slug = fileData.slug!
  const isKoPage = slug.startsWith("ko/") || slug === "ko"
  const isEnPage = slug.startsWith("en/") || slug === "en"
  // KO pages link to /ko/ home; EN pages link to /en/ home; root page links to /
  const baseDir = isKoPage ? "/ko/" : isEnPage ? "/en/" : "/"
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
