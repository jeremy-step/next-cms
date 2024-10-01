import type { Metadata } from "next";
import "@/ui/assets/globals.css";

const defaultTitle = "Universae FCT NextCMS";

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
