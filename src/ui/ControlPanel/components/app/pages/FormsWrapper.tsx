"use client";

import { Page } from "@lib/data/ControlPanel/definitions";
import { isPermalinkUnique } from "@lib/data/ControlPanel/pages";
import { RouteMeta } from "@lib/utils/router";
import ContentPanel from "@ui/control-panel/components/ContentPanel";
import Heading1 from "@ui/control-panel/components/Heading1";
import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import slugify from "slugify";
import PageForm from "./PageForm";
import MetaDataForm from "./MetaDataForm";

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
  const formatPermalink = useCallback(
    async (permalink: string, allowSlashes: boolean): Promise<string> => {
      permalink = permalink.trim().replace(/\/{2,}/g, "/");

      if (permalink === "" || permalink === "/") {
        permalink = data?.metadata?.permalink ?? "/";

        return permalink;
      }

      permalink = slugify(permalink.replace(/\/$/g, ""), {
        lower: true,
        trim: true,
        remove: allowSlashes ? /[^\w\s\/]+/g : /[^\w\s]+/g,
      });

      if (!permalink.startsWith("/")) {
        permalink = `/${permalink}`;
      }

      const makeUnique = async (permalink: string): Promise<string> => {
        let uniquePermalink = permalink;

        if (await isPermalinkUnique(permalink, data?.id as string)) {
          return uniquePermalink;
        }

        uniquePermalink = `${permalink}-${nanoid(6).toLowerCase()}`;

        return (await isPermalinkUnique(uniquePermalink, data?.id as string))
          ? uniquePermalink
          : await makeUnique(permalink);
      };

      return await makeUnique(permalink);
    },
    [data?.id, data?.metadata?.permalink]
  );

  const [pageTitle, setPageTitle] = useState("");
  const [permalink, setPermalink] = useState("");

  return (
    <div className="grid gap-2 grid-cols-[1fr_auto] h-full">
      <ContentPanel>
        <Heading1>{currentRoute.title}</Heading1>

        <PageForm
          setPageTitle={setPageTitle}
          data={data}
          mode={mode}
          permalink={permalink}
        />
      </ContentPanel>

      <ContentPanel className="w-96">
        <Heading1 As="h2">Metadata</Heading1>

        <MetaDataForm
          pageTitle={pageTitle}
          data={data.metadata}
          mode={mode}
          permalink={permalink}
          setPermalink={setPermalink}
          formatPermalink={formatPermalink}
        />
      </ContentPanel>
    </div>
  );
}
