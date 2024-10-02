import { getConfig } from "@lib/utils/config";
import { getLink, getPermalink } from "@lib/utils/router";
import "@ui/control-panel/assets/globals.css";

import type { Metadata } from "next";

const defaultTitle = getConfig<string>("controlPanel.title") ?? "";

export const metadata: Metadata = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
    absolute: defaultTitle,
  },
  description: "Sistema de gestión de contenido",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <aside>
        {getLink("front.page", { permalink: "test", foo: "bar" })} |{" "}
        {getPermalink("new/perma/link", { foo2: "bar2" })}
      </aside>

      <header>{getLink("cp.pages")}</header>

      <main>{children}</main>

      <footer></footer>
    </div>
  );
}
