import { fetchPageById } from "@lib/data/ControlPanel/pages";
import { getRouteMeta } from "@lib/utils/router";
import FormsWrapper from "@ui/control-panel/components/app/pages/FormsWrapper";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const currentRoute = getRouteMeta("cp.pages/edit");

export const metadata: Metadata = {
  title: currentRoute.title,
};

export default async function Page({
  params: paramsPromise,
}: {
  params: Promise<{
    pageId: string;
  }>;
}) {
  const params = await paramsPromise;
  const id = params.pageId;
  const page = await fetchPageById(id);

  if (!page) {
    notFound();
  }

  return <FormsWrapper currentRoute={currentRoute} data={page} mode="edit" />;
}
