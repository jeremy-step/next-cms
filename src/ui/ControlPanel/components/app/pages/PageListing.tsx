"use client";

import { getLink } from "@lib/utils/router";
import { Page } from "@lib/data/ControlPanel/definitions";
import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ArrowsUpDownIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { deletePage, setPublished } from "@lib/actions/ControlPanel/pages";
import SwitchBox from "../../SwitchBox";
import { getDate, getDateLegible } from "@lib/utils/strings";
import { useSearchParams } from "next/navigation";

interface ListingProps extends React.HtmlHTMLAttributes<HTMLTableElement> {
  pages: Page[];
}

export default function PageListing({ pages, ...rest }: ListingProps) {
  const handleDelete = (id: string) => {
    return deletePage(id, false);
  };

  const handleSetPublished = async (
    e: React.MouseEvent<HTMLInputElement>,
    page: Page
  ) => {
    const input = e.target as HTMLInputElement;

    input.checked = !input.checked;
    input.disabled = true;

    await setPublished(!page.published, page.id as string);

    input.disabled = false;
    input.checked = !input.checked;

    input.focus();
  };

  const searchParams = useSearchParams();
  const orderBy = searchParams.get("order-by");
  const dir = searchParams.get("dir");

  const getDir = (field: string) => {
    if (orderBy === field) {
      return dir === "desc" ? "asc" : undefined;
    }

    return "desc";
  };

  return (
    <table
      className="border-collapse w-full rounded-md overflow-hidden"
      {...rest}
    >
      <thead className="text-left [&>tr>th]:p-3 [&>tr>td]:px-3 [&>tr>td]:py-2 [&>tr>th:first-child]:pl-5 [&>tr>td:first-child]:pl-5 [&>tr>th:last-child]:pr-5 [&>tr>td:last-child]:pr-5">
        <tr className="bg-slate-400 bg-opacity-60 dark:bg-slate-600 dark:bg-opacity-100">
          <th className="w-min">
            <Link
              href={getLink("cp.pages/create")}
              title="Create a new page"
              className="block w-6 p-0.5 bg-green-700 dark:bg-green-300 rounded text-white dark:text-black hover:bg-green-600 dark:hover:bg-green-400 transition-colors"
            >
              <PlusIcon />
            </Link>
          </th>
          <th className="min-w-full">
            <Link
              href={getLink("cp.pages/index", {
                "order-by":
                  dir === "asc"
                    ? orderBy === "title"
                      ? undefined
                      : "title"
                    : "title",
                dir: getDir("title"),
              })}
              title="Order by title"
              className="flex gap-1"
            >
              Title{" "}
              {orderBy === "title" ? (
                <>
                  {dir === "asc" ? (
                    <ArrowLongUpIcon className="w-4" />
                  ) : (
                    <ArrowLongDownIcon className="w-4" />
                  )}
                </>
              ) : (
                <ArrowsUpDownIcon className="w-4" />
              )}
            </Link>
          </th>
          <th className="text-center">
            <Link
              href={getLink("cp.pages/index", {
                "order-by":
                  dir === "asc"
                    ? orderBy === "published"
                      ? undefined
                      : "published"
                    : "published",
                dir: getDir("published"),
              })}
              title="Order by published"
              className="flex gap-1"
            >
              Published{" "}
              {orderBy === "published" ? (
                <>
                  {dir === "asc" ? (
                    <ArrowLongUpIcon className="w-4" />
                  ) : (
                    <ArrowLongDownIcon className="w-4" />
                  )}
                </>
              ) : (
                <ArrowsUpDownIcon className="w-4" />
              )}
            </Link>
          </th>
          <th>
            <Link
              href={getLink("cp.pages/index", {
                "order-by":
                  dir === "asc"
                    ? orderBy === "updatedAt"
                      ? undefined
                      : "updatedAt"
                    : "updatedAt",
                dir: getDir("updatedAt"),
              })}
              title="Order by updated"
              className="flex gap-1"
            >
              Updated{" "}
              {orderBy === "updatedAt" ? (
                <>
                  {dir === "asc" ? (
                    <ArrowLongUpIcon className="w-4" />
                  ) : (
                    <ArrowLongDownIcon className="w-4" />
                  )}
                </>
              ) : (
                <ArrowsUpDownIcon className="w-4" />
              )}
            </Link>
          </th>
          <th>
            <Link
              href={getLink("cp.pages/index", {
                "order-by":
                  dir === "asc"
                    ? orderBy === "createdAt"
                      ? undefined
                      : "createdAt"
                    : "createdAt",
                dir: dir === "asc" ? undefined : "asc",
              })}
              title="Order by created"
              className="flex gap-1"
            >
              Created{" "}
              {dir === "asc" && orderBy === "createdAt" ? (
                <ArrowLongUpIcon className="w-4" />
              ) : (
                <ArrowLongDownIcon className="w-4" />
              )}
            </Link>
          </th>

          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody className="[&>tr>th]:px-3 [&>tr>th]:py-2 [&>tr>td]:px-3 [&>tr>td]:py-2 [&>tr>th:first-child]:pl-5 [&>tr>td:first-child]:pl-5 [&>tr>th:last-child]:pr-5 [&>tr>td:last-child]:pr-5">
        {pages.map((page, index) => (
          <tr
            key={index}
            className="bg-slate-400 even:bg-opacity-60 odd:bg-slate-300 dark:bg-slate-600 dark:odd:bg-slate-700 dark:!bg-opacity-100 hover:!bg-slate-100 dark:hover:!bg-slate-900 dark:hover:!bg-opacity-70 transition-colors"
          >
            <td className="text-center">{index + 1}</td>
            <td className="w-3/4">
              <Link
                href={getLink("cp.pages/edit", {
                  pageId: page.id as string,
                })}
                title=""
              >
                {page.title}
              </Link>
            </td>
            <td>
              <SwitchBox
                label={page.published ? "Unpublish" : "Publish"}
                defaultChecked={page.published}
                className="mx-auto"
                onClick={(e) => handleSetPublished(e, page)}
                key={`order-${orderBy}-${dir}`}
              />
            </td>
            <td className="!pr-9">
              {page.updatedAt ? (
                <time dateTime={getDate(page.updatedAt)} className="w-[8.5rem]">
                  {getDateLegible(page.updatedAt)}
                </time>
              ) : (
                <span>Never</span>
              )}
            </td>
            <td>
              <time
                dateTime={getDate(page.createdAt as Date)}
                className="w-[8.5rem]"
              >
                {getDateLegible(page.createdAt as Date)}
              </time>
            </td>
            <td>
              <Link
                href={getLink("cp.pages/edit", {
                  pageId: page.id as string,
                })}
                title="Edit page"
                aria-label="Edit page"
                className="block w-6 p-1 bg-amber-700 dark:bg-amber-300 rounded text-white dark:text-black hover:bg-amber-600 dark:hover:bg-amber-400 transition-colors"
              >
                <PencilIcon />
              </Link>
            </td>
            <td>
              <button
                title="Delete page"
                aria-label="Delete page"
                className="block w-6 p-1 bg-red-700 dark:bg-red-300 rounded text-white dark:text-black hover:bg-red-600 dark:hover:bg-red-400 transition-colors"
                onClick={() => {
                  if (confirm(`Delete "${page.title}"?`)) {
                    handleDelete(page.id as string);
                  }
                }}
              >
                <TrashIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
