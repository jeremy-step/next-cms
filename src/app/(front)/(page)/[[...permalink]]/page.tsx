import { fetchPageByPermalink, fetchPages } from "@lib/data/ControlPanel/pages";
import { getLink } from "@lib/utils/router";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export default async function Page({
  params: paramsPromise,
}: {
  params: Promise<{
    permalink: string;
  }>;
}) {
  const params = await paramsPromise;
  const pages = await fetchPages();
  const page = await fetchPageByPermalink(`/${params.permalink?.[0] ?? ""}`);

  if (!page) {
    notFound();
  }

  return (
    <div className="p-5">
      Front Page
      <br />
      <Link href={getLink("cp.pages/index")} className="underline">
        Control Panel
      </Link>
      <br />
      <h1 className="font-semibold text-2xl mt-5">Pages</h1>
      <ul className="list-disc list-inside">
        {pages.map((page, index) => (
          <li key={index}>
            <Link
              className="underline"
              href={getLink("front.page/index", {
                permalink: page.metadata?.permalink,
              })}
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
      {page && (
        <div className=" pt-12 prose">
          <h2 className="font-bold text-xl">{page.title}</h2>
          <Markdown>{page.content}</Markdown>
        </div>
      )}
    </div>
  );
}
