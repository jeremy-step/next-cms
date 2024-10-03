import "@ui/control-panel/assets/globals.css";

import type { Metadata } from "next";
import { getConfig } from "@lib/utils/config";
import BasePanel from "@ui/control-panel/components/BasePanel";
import BreadCrumbs from "@ui/control-panel/components/BreadCrumbs";
import PrimaryNav from "@ui/control-panel/components/PrimaryNav";
import { getLink, getLinkWithMeta } from "@lib/utils/router";
import Link from "next/link";
import PrimaryNavLink from "@ui/control-panel/components/PrimaryNavLink";
import clsx from "clsx";

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
  const settingsNav = getLinkWithMeta("cp.settings/index");
  const SettingsNavIcon = settingsNav.primaryNavIcon;

  const contentCornersClasses = `
    fixed z-20 w-[calc(100%-22rem)] bg-slate-100 dark:bg-slate-900
    before:pointer-events-none before:absolute before:left-0 before:w-full before:h-4 before:bg-transparent before:shadow-slate-100 dark:before:shadow-slate-900
  `;

  return (
    <>
      {/* START -- Content rounded corners on scroll */}
      <div
        className={clsx(
          "h-[5.75rem] inset-[0_.75rem_auto_21.25rem] before:top-full before:rounded-t-md before:shadow-[0_-.75rem_0_0]",
          contentCornersClasses
        )}
      ></div>

      <div
        className={clsx(
          "h-3 inset-[auto_.75rem_0_21.25rem] before:bottom-full before:rounded-b-md before:shadow-[0_.75rem_0_0]",
          contentCornersClasses
        )}
      ></div>
      {/* END -- Content rounded corners on scroll */}

      <div className="grid gap-2 lg:[grid-template-areas:'aside_header''aside_main''aside_footer'] lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr_auto] w-full min-h-dvh p-3 bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        {/*  */}

        <aside className="[grid-area:aside] relative w-80">
          <BasePanel className="sticky top-3 grid lg:gap-6 lg:grid-rows-[auto_1fr_auto] w-full h-[calc(100dvh-1.5rem)] p-3">
            <Link
              href={getLink("cp.dashboard/index")}
              title="Control Panel"
              className="grid place-items-center h-10 text-4xl leading-none font-bold"
            >
              <span>
                Control<span className="text-red-500">Panel</span>
              </span>
            </Link>
            <PrimaryNav />
            <PrimaryNavLink
              href={settingsNav.link}
              title={settingsNav.title}
              Icon={!!SettingsNavIcon && <SettingsNavIcon />}
            />
          </BasePanel>
        </aside>

        <header className="[grid-area:header] sticky top-3 h-[4.5rem] z-20">
          <BasePanel className="relative w-full h-full flex justify-between items-center py-2">
            <BreadCrumbs />
          </BasePanel>
        </header>

        <main
          className="[grid-area:main] relative z-10 before:sticky before:block before:top-[5.75rem] before:left-0 before:w-full before:h-5 before:bg-slate-200 dark:before:bg-slate-800 before:rounded-t-md
          after:sticky after:block after:bottom-3 after:left-0 after:w-full after:h-5 after:bg-slate-200 dark:after:bg-slate-800 after:rounded-b-md
        "
        >
          <BasePanel className="w-full h-full -my-5">{children}</BasePanel>
        </main>

        <footer className="[grid-area:footer] z-20">
          <BasePanel className="w-full h-full text-xs py-4">Footer</BasePanel>
        </footer>

        {/*  */}
      </div>
    </>
  );
}
