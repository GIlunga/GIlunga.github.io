import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

const recentNotes = [
  Component.RecentNotes({
    title: "Recent Paper Notes",
    limit: 3,
    filter: (f) =>
      f.slug!.startsWith("Papers/") && f.slug! !== "Papers/index" && !f.frontmatter?.noindex,
    linkToMore: "Papers/" as SimpleSlug,
  }),
  // Component.RecentNotes({
  //   title: "Recent Blog",
  //   limit: 3,
  //   filter: (f) =>
  //     f.slug!.startsWith("Blog/") && f.slug! !== "Blog/index" && !f.frontmatter?.noindex,
  //   linkToMore: "Blog/" as SimpleSlug,
  // }),
  // Component.RecentNotes({
  //   title: "Recent Concepts",
  //   limit: 3,
  //   filter: (f) =>
  //     f.slug!.startsWith("Concepts/") && f.slug! !== "Concepts/index" && !f.frontmatter?.noindex,
  //   linkToMore: "Concepts/" as SimpleSlug,
  // }),
]

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.DesktopOnly(Component.Explorer()),
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
    Component.Search(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}

// components for the homepage (index page)
const homePageLeft = [
  Component.PageTitle(),
  Component.MobileOnly(Component.Spacer()),
  Component.Search(),
  ...recentNotes.map((c) => Component.DesktopOnly(c)),
]

export const homePageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: homePageLeft,
  right: [
    // Add recent notes for mobile view at the bottom, before the graph
    ...recentNotes.map((c) => Component.MobileOnly(c)),
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}
