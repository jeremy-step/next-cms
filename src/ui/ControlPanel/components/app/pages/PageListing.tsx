"use client";

import { getLink } from "@lib/utils/router";
import { Page } from "@lib/data/ControlPanel/definitions";
import { PlusIcon } from "@heroicons/react/16/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import Link from "next/link";
import { deletePage } from "@lib/actions/ControlPanel/pages";

interface ListingProps extends React.HtmlHTMLAttributes<HTMLTableElement> {
  pages: Page[];
}

export default function PageListing({ pages, ...rest }: ListingProps) {
  const dateLeadingZero = (value: number) => {
    return ("0" + value).slice(-2);
  };

  const getDateLegible = (_date: Date) => {
    const date = new Date(_date);

    return (
      <div className="flex justify-between gap-2">
        <span>
          {`${dateLeadingZero(date.getHours())}:${dateLeadingZero(
            date.getMinutes()
          )}`}
        </span>
        <span>
          {`${dateLeadingZero(date.getDate())}/${dateLeadingZero(
            date.getMonth() + 1
          )}/${date.getFullYear()}`}
        </span>
      </div>
    );
  };

  const getDate = (_date: Date) => {
    const date = new Date(_date);

    return `${date.getFullYear()}-${dateLeadingZero(
      date.getMonth() + 1
    )}-${dateLeadingZero(date.getDate())}${dateLeadingZero(
      date.getHours()
    )}:${dateLeadingZero(date.getMinutes())}`;
  };

  const handleDelete = (id: string) => {
    return deletePage(id);
  };

  return (
    <table
      className="border-collapse w-full rounded-md overflow-hidden"
      {...rest}
    >
      <thead className="text-left [&>tr>th]:p-3 [&>tr>td]:px-3 [&>tr>td]:py-2 [&>tr>th:first-child]:pl-5 [&>tr>td:first-child]:pl-5 [&>tr>th:last-child]:pr-5 [&>tr>td:last-child]:pr-5">
        <tr className="bg-slate-400 bg-opacity-60 dark:bg-slate-600 dark:bg-opacity-100">
          <th className="w-20 text-center">
            <Link
              href={getLink("cp.pages/create")}
              title="Create a new page"
              className="block w-6 p-0.5 bg-green-700 dark:bg-green-300 rounded text-white dark:text-black hover:bg-green-600 dark:hover:bg-green-400 transition-colors"
            >
              <PlusIcon />
            </Link>
          </th>
          <th className="min-w-full">Title</th>
          <th>Published</th>
          <th>Updated</th>
          <th>Created</th>

          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody className="[&>tr>th]:px-3 [&>tr>th]:py-2 [&>tr>td]:px-3 [&>tr>td]:py-2 [&>tr>th:first-child]:pl-5 [&>tr>td:first-child]:pl-5 [&>tr>th:last-child]:pr-5 [&>tr>td:last-child]:pr-5">
        {pages.map((page, index) => (
          <tr
            key={index}
            className="bg-slate-400 even:bg-opacity-60 odd:bg-slate-300 dark:bg-slate-600 dark:odd:bg-slate-700 dark:!bg-opacity-100 hover:!bg-slate-100 dark:hover:!bg-slate-900 dark:hover:!bg-opacity-70 transition-colors"
          >
            <td className="w-20 text-center">{index + 1}</td>
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
              <div
                className={clsx(
                  "relative w-6 p-0.5 isolate border-2 rounded-full before:absolute before:-z-10 before:-inset-0.5 before:rounded-full mx-auto",
                  {
                    "before:bg-green-700 dark:before:bg-green-300 border-green-700 dark:border-green-300 text-white dark:text-black":
                      page.published,
                    "before:bg-red-700 dark:before:bg-red-300 border-red-700 dark:border-red-300 text-white dark:text-black":
                      !page.published,
                  }
                )}
                title={page.published ? "Published" : "Not Published"}
                aria-label={page.published ? "Published" : "Not Published"}
              >
                {page.published ? <CheckIcon /> : <XMarkIcon />}
              </div>
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
                onClick={() => handleDelete(page.id as string)}
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
