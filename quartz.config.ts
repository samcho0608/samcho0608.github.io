import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz Configuration
 * -----------------------------------------------------------
 * Edit the values below to personalise your blog.
 *
 * REQUIRED changes before first deploy:
 *   1. pageTitle      – your blog's display name
 *   2. baseUrl        – "username.github.io" or "username.github.io/repo-name"
 *
 * Optional changes:
 *   3. ignorePatterns – folders Quartz will NOT publish (add "private", etc.)
 *   4. theme.colors   – light/dark colour palette
 *   5. analytics      – set to null to disable, or use the PostHog/Umami options
 */

const config: QuartzConfig = {
  configuration: {
    // ── Branding ────────────────────────────────────────────
    pageTitle: "Cho Me the Code",            // CHANGE THIS
    pageTitleSuffix: "",                      // Appended to every page <title>

    // ── Deployment ──────────────────────────────────────────
    // Remove the /repo-name suffix if the repo is named "username.github.io"
    baseUrl: "samcho0608.github.io",

    // ── Features ────────────────────────────────────────────
    enableSPA: true,           // Smooth page transitions
    enablePopovers: true,      // Hover-preview for wikilinks

    // ── Analytics ───────────────────────────────────────────
    analytics: null,           // null = disabled
    // analytics: { provider: "posthog", apiKey: "...", host: "https://app.posthog.com" }
    // analytics: { provider: "umami", websiteId: "...", host: "https://analytics.example.com" }

    locale: "en-US",

    // ── Privacy: folders / file patterns to NEVER publish ───
    // Add folder names from your Obsidian vault you want to keep private.
    ignorePatterns: [
      "private",        // Any folder named "private"
      "templates",      // Obsidian templates folder
      ".obsidian",      // Obsidian config folder
      "drafts",         // Drafts you're not ready to publish
      "CLAUDE.md",      // Claude Code instructions — not for publishing
    ],

    defaultDateType: "created",  // "created" | "modified" | "published"

    // ── Theme ───────────────────────────────────────────────
    theme: {
      fontOrigin: "googleFonts",  // "googleFonts" | "local"
      cdnCaching: true,

      typography: {
        header: "Plus Jakarta Sans",    // Headings font
        body: "Plus Jakarta Sans",      // Body text font
        code: "IBM Plex Mono",          // Code blocks font
      },

      colors: {
        lightMode: {
          light: "#f7f9fc",           // Page background
          lightgray: "#e6ebf2",       // Borders
          gray: "#8b95a1",            // Metadata text
          darkgray: "#4e5968",        // Body text
          dark: "#191f28",            // Headings
          secondary: "#3182f6",       // Links & accents
          tertiary: "#1b64da",        // Hover states
          highlight: "rgba(49, 130, 246, 0.12)",
          textHighlight: "#dbeafe",
        },
        darkMode: {
          light: "#111827",
          lightgray: "#2a3442",
          gray: "#94a3b8",
          darkgray: "#d1d9e6",
          dark: "#f8fafc",
          secondary: "#60a5fa",
          tertiary: "#93c5fd",
          highlight: "rgba(96, 165, 250, 0.2)",
          textHighlight: "#1e3a8a99",
        },
      },
    },
  },

  plugins: {
    transformers: [
      Plugin.FrontMatter(),               // Parses YAML frontmatter (title, date, tags…)
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({         // Code block syntax highlighting
        theme: { light: "github-light", dark: "github-dark" },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({   // [[wikilinks]], callouts, embeds, etc.
        enableInHtmlEmbed: false,
      }),
      Plugin.GitHubFlavoredMarkdown(),    // Tables, strikethrough, task lists
      Plugin.TableOfContents(),           // Auto-generates TOC from headings
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest",
      }),
      Plugin.Description(),               // Auto-generates page descriptions
      Plugin.Latex({ renderEngine: "katex" }),  // LaTeX math rendering
    ],

    filters: [
      Plugin.RemoveDrafts(),  // Hides notes with `draft: true` in frontmatter
    ],

    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,   // Generates sitemap.xml for SEO
        enableRSS: true,       // Generates an RSS feed
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
