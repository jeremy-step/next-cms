import { fetchPages } from "@lib/data/ControlPanel/pages";
import PageListing from "@ui/control-panel/components/app/pages/PageListing";

import ContentPanel from "@ui/control-panel/components/ContentPanel";
import Heading1 from "@ui/control-panel/components/Heading1";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pages",
};

export default async function Page({
  searchParams: searchParamsPromise,
}: {
  searchParams?: Promise<{
    "order-by"?: string;
    dir?: string;
    page?: string;
  }>;
}) {
  const searchParams = await searchParamsPromise;
  const pages = await fetchPages(searchParams?.["order-by"], searchParams?.dir);

  return (
    <div className="grid h-full">
      <ContentPanel>
        <Heading1>Pages</Heading1>

        <PageListing pages={pages} />
      </ContentPanel>
    </div>
  );
}
