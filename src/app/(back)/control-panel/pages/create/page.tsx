import { getLinkWithMeta } from "@lib/utils/router";
import ContentPanel from "@ui/control-panel/components/ContentPanel";
import Heading1 from "@ui/control-panel/components/Heading1";
import PageForm from "@ui/control-panel/components/app/pages/PageForm";
import { Metadata } from "next";

const currentRoute = getLinkWithMeta("cp.pages/create");

export const metadata: Metadata = {
  title: currentRoute.title,
};

export default function Page() {
  return (
    <div className="grid gap-2 grid-cols-[1fr_auto] h-full">
      <ContentPanel>
        <Heading1>{currentRoute.title}</Heading1>

        <PageForm />
      </ContentPanel>

      <ContentPanel className="w-72">
        <Heading1 As="h2">Metadata</Heading1>
      </ContentPanel>
    </div>
  );
}
