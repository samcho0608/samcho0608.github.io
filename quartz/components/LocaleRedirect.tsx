import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const LocaleRedirect: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.slug !== "index") return null
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          var lang = (navigator.language || navigator.userLanguage || "");
          if (lang.startsWith("ko")) {
            window.location.replace("/ko/");
          } else {
            window.location.replace("/en/");
          }
        `,
      }}
    />
  )
}

export default (() => LocaleRedirect) satisfies QuartzComponentConstructor
