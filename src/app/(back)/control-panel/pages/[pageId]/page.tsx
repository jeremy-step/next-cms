import { getLink } from "@lib/utils/router";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Edit Page",
};

export default function Page() {
  return (
    <div>
      Edit Page <Link href={getLink("cp.pages/create")}>Create Page</Link>
    </div>
  );
}
