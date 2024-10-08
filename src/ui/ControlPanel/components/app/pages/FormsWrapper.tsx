"use client";

import { Page } from "@lib/actions/ControlPanel/definitions";
import { RouteMeta } from "@lib/utils/router";
import ContentPanel from "@ui/control-panel/components/ContentPanel";
import Heading1 from "@ui/control-panel/components/Heading1";
import MetaDataForm from "@ui/control-panel/components/app/pages/MetaDataForm";
import PageForm from "@ui/control-panel/components/app/pages/PageForm";
import { useState } from "react";

interface FormProps extends React.HtmlHTMLAttributes<HTMLFormElement> {
  data?: Page;
  mode?: "create" | "edit";
  currentRoute: RouteMeta;
}

export default function FormsWrapper({
  currentRoute,
  data = {
    id: null,
    title: "",
    content: null,
    published: false,
    metadata: null,
  },
  mode = "create",
}: FormProps) {
  const [pageMetaData, setPageMetaData] = useState("");

  return (
    <div className="grid gap-2 grid-cols-[1fr_auto] h-full">
      <ContentPanel>
        <Heading1>{currentRoute.title}</Heading1>

        <PageForm setPageMetaData={setPageMetaData} data={data} mode={mode} />
      </ContentPanel>

      <ContentPanel className="w-96">
        <Heading1 As="h2">Metadata</Heading1>

        <MetaDataForm
          pageMetaData={pageMetaData}
          data={data.metadata}
          mode={mode}
        />
      </ContentPanel>
    </div>
  );
}
