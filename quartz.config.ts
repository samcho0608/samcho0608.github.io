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
    pageTitle: "My Digital Garden",          // CHANGE THIS
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
    ],

    defaultDateType: "created",  // "created" | "modified" | "published"

    // ── Theme ───────────────────────────────────────────────
    theme: {
      fontOrigin: "googleFonts",  // "googleFonts" | "local"
      cdnCaching: true,

      typography: {
        header: "Schibsted Grotesk",   // Headings font
        body: "Source Sans Pro",        // Body text font
        code: "IBM Plex Mono",          // Code blocks font
      },

      colors: {
        lightMode: {
          light: "#faf8f8",           // Page background
          lightgray: "#e5e5e5",       // Borders
          gray: "#b8b8b8",            // Metadata text
          darkgray: "#4e4e4e",        // Body text
          dark: "#2b2b2b",            // Headings
          secondary: "#284b63",       // Links & accents
          tertiary: "#84a59d",        // Hover states
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
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
