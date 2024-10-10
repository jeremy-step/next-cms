import { fetchPages } from "@lib/data/ControlPanel/pages";
import { getLink } from "@lib/utils/router";
import Link from "next/link";

export default async function NotFound() {
  const pages = await fetchPages();

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
    </div>
  );
}
