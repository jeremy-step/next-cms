import type { Metadata } from "next";
import "@/ui/assets/globals.css";

const defaultTitle = "Control Panel";

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
      <aside></aside>

      <header></header>

      <main>{children}</main>

      <footer></footer>
    </div>
  );
}
