import { getLink } from "@lib/utils/router";
import ContentPanel from "@ui/control-panel/components/ContentPanel";
import Heading1 from "@ui/control-panel/components/Heading1";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pages",
};

export default function Page() {
  return (
    <div className="grid h-full">
      <ContentPanel>
        <Heading1>Pages</Heading1>
        <Link href={getLink("cp.pages/create")}>Create Page</Link>
      </ContentPanel>
    </div>
  );
}
