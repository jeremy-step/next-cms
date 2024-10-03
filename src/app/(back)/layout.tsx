import "@ui/control-panel/assets/globals.css";

import type { Metadata } from "next";
import { getConfig } from "@lib/utils/config";
import { getLink } from "@lib/utils/router";
import BasePanel from "@ui/control-panel/components/BasePanel";
import BreadCrumbs from "@ui/control-panel/components/BreadCrumbs";

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
    <div className="grid gap-3 lg:[grid-template-areas:'aside_header''aside_main''aside_footer'] lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr_auto] w-full h-dvh p-3 bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <aside className="[grid-area:aside] w-80">
        <BasePanel className="w-full h-full">
          <div>Control Panel</div>
        </BasePanel>
      </aside>

      <header className="[grid-area:header] h-20">
        <BasePanel className="w-full h-full flex justify-between items-center">
          <BreadCrumbs />
        </BasePanel>
      </header>

      <main className="[grid-area:main]">
        <BasePanel className="w-full h-full">{children}</BasePanel>
      </main>

      <footer className="[grid-area:footer]">
        <BasePanel className="w-full h-full"></BasePanel>
      </footer>
    </div>
  );
}
