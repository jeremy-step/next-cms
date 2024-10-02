import { getConfig } from "@lib/utils/config";
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
      <aside></aside>

      <header></header>

      <main>{children}</main>

      <footer></footer>
    </div>
  );
}
