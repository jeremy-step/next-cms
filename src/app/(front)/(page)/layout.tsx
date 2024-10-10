import "@ui/control-panel/assets/globals.css";

import { getConfig } from "@lib/utils/config";
import type { Metadata } from "next";

const defaultTitle = getConfig<string>("front.title") ?? "";

export const metadata: Metadata = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
    absolute: defaultTitle,
  },
  description: "Práctica de Next.js - Universae FCT Olyverse",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
