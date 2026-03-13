import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({
      component: Component.SeriesNav(),
      condition: (page) => !!page.fileData.frontmatter?.series,
    }),
    Component.LocaleRedirect(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/samcho0608",
      LinkedIn: "https://www.linkedin.com/in/%EC%84%B1%EB%AF%BC-%EC%A1%B0-17a757250/",
    },
  }),
}

// EN explorer: show only en/ subtree (en/tech/ folder + EN posts)
// Excludes en/index (accessed via PageTitle)
const enExplorer = Component.Explorer({
  filterFn: (node) => {
    const slug = node.slug
    if (slug === "en/index") return false
    return slug === "en" || slug.startsWith("en/")
  },
})

// KO explorer: show only ko/ subtree (ko/tech/ folder + KO posts)
// Excludes ko/index (accessed via PageTitle)
const koExplorer = Component.Explorer({
  filterFn: (node) => {
    const slug = node.slug
    if (slug === "ko/index") return false
    return slug === "ko" || slug.startsWith("ko/")
  },
})

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) =>
        page.fileData.slug !== "index" &&
        page.fileData.slug !== "en/index" &&
        page.fileData.slug !== "ko/index",
    }),
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.LanguageSwitcher(),
      condition: (page) => !!page.fileData.frontmatter?.lang,
    }),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.ConditionalRender({
      component: enExplorer,
      condition: (page) => !!page.fileData.slug?.startsWith("en/"),
    }),
    Component.ConditionalRender({
      component: koExplorer,
      condition: (page) => !!page.fileData.slug?.startsWith("ko/"),
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) =>
        page.fileData.slug !== "index" &&
        page.fileData.slug !== "en/index" &&
        page.fileData.slug !== "ko/index",
    }),
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.LanguageSwitcher(),
      condition: (page) => !!page.fileData.frontmatter?.lang,
    }),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.ConditionalRender({
      component: enExplorer,
      condition: (page) => !!page.fileData.slug?.startsWith("en/"),
    }),
    Component.ConditionalRender({
      component: koExplorer,
      condition: (page) => !!page.fileData.slug?.startsWith("ko/"),
    }),
  ],
  right: [],
}
