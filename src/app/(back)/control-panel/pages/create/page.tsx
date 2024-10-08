import { getRouteMeta } from "@lib/utils/router";
import FormsWrapper from "@ui/control-panel/components/app/pages/FormsWrapper";
import { Metadata } from "next";

const currentRoute = getRouteMeta("cp.pages/create");

export const metadata: Metadata = {
  title: currentRoute.title,
};

export default function Page() {
  return <FormsWrapper currentRoute={currentRoute} />;
}
