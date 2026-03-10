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
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

const enExplorer = Component.Explorer({
  filterFn: (node) => node.slugSegment !== "tags" && node.slugSegment !== "ko",
})

const koExplorer = Component.Explorer({
  filterFn: (node) => node.slugSegment !== "tags" && node.slugSegment !== "en",
})

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
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
      condition: (page) => !page.fileData.slug?.startsWith("ko/"),
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
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
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
      ],
    }),
    Component.ConditionalRender({
      component: enExplorer,
      condition: (page) => !page.fileData.slug?.startsWith("ko/"),
    }),
    Component.ConditionalRender({
      component: koExplorer,
      condition: (page) => !!page.fileData.slug?.startsWith("ko/"),
    }),
  ],
  right: [],
}
