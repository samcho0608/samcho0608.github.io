import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import breadcrumbsStyle from "./styles/breadcrumbs.scss"
import { FullSlug, SimpleSlug, resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"
import { trieFromAllFiles } from "../util/ctx"

type CrumbData = {
  displayName: string
  path: string
}

interface BreadcrumbOptions {
  /**
   * Symbol between crumbs
   */
  spacerSymbol: string
  /**
   * Name of first crumb
   */
  rootName: string
  /**
   * Whether to look up frontmatter title for folders (could cause performance problems with big vaults)
   */
  resolveFrontmatterTitle: boolean
  /**
   * Whether to display the current page in the breadcrumbs.
   */
  showCurrentPage: boolean
}

const defaultOptions: BreadcrumbOptions = {
  spacerSymbol: "❯",
  rootName: "Home",
  resolveFrontmatterTitle: true,
  showCurrentPage: true,
}

function formatCrumb(displayName: string, baseSlug: FullSlug, currentSlug: SimpleSlug): CrumbData {
  return {
    displayName: displayName.replaceAll("-", " "),
    path: resolveRelative(baseSlug, currentSlug),
  }
}

export default ((opts?: Partial<BreadcrumbOptions>) => {
  const options: BreadcrumbOptions = { ...defaultOptions, ...opts }
  const Breadcrumbs: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    ctx,
  }: QuartzComponentProps) => {
    const trie = (ctx.trie ??= trieFromAllFiles(allFiles))
    const slugParts = fileData.slug!.split("/")
    const pathNodes = trie.ancestryChain(slugParts)
    const currentLang = fileData.frontmatter?.lang as string | undefined

    if (!pathNodes) {
      return null
    }

    // For language-specific sections (e.g. ko/*), treat that language home
    // as the breadcrumb root instead of showing it as an intermediate folder node.
    const languageHome = allFiles
      .filter((f) => {
        const lang = f.frontmatter?.lang as string | undefined
        const slug = f.slug
        return lang === currentLang && !!slug && (slug === "index" || slug.endsWith("/index"))
      })
      .sort((a, b) => (a.slug?.split("/").length ?? 0) - (b.slug?.split("/").length ?? 0))[0]

    const languageHomeSlug = languageHome?.slug
      ? simplifySlug(languageHome.slug as FullSlug)
      : ("/" as SimpleSlug)

    const filteredPathNodes =
      languageHomeSlug !== "/"
        ? pathNodes.filter((node, idx) => idx === 0 || simplifySlug(node.slug) !== languageHomeSlug)
        : pathNodes

    const crumbs: CrumbData[] = filteredPathNodes.map((node, idx) => {
      const crumb = formatCrumb(node.displayName, fileData.slug!, simplifySlug(node.slug))
      if (idx === 0) {
        crumb.displayName = options.rootName
        crumb.path = resolveRelative(fileData.slug!, languageHomeSlug)
      }

      // For last node (current page), set empty path
      if (idx === filteredPathNodes.length - 1) {
        crumb.path = ""
      }

      return crumb
    })

    if (!options.showCurrentPage) {
      crumbs.pop()
    }

    return (
      <nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
        {crumbs.map((crumb, index) => (
          <div class="breadcrumb-element">
            <a href={crumb.path}>{crumb.displayName}</a>
            {index !== crumbs.length - 1 && <p>{` ${options.spacerSymbol} `}</p>}
          </div>
        ))}
      </nav>
    )
  }
  Breadcrumbs.css = breadcrumbsStyle

  return Breadcrumbs
}) satisfies QuartzComponentConstructor
