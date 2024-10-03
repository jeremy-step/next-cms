"use client";

import { SlashIcon } from "@heroicons/react/24/outline";
import {
  getBreadCrumbs,
  getLink,
  getLinkWithMeta,
  NameParameter,
  ParamsParameter,
  paths,
} from "@lib/utils/router";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function BreadCrumbs({
  className,
  ...rest
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  let breadCrumbs: { title: string; link: string }[] = [];

  Object.entries(paths).some((routerModule) => {
    return Object.entries(routerModule[1]).some((path) => {
      let link = null;

      try {
        link = getLinkWithMeta(
          `${routerModule[0]}.${path[0]}` as NameParameter,
          { ...params } as ParamsParameter
        );
      } catch {}

      if (link?.link === pathname) {
        breadCrumbs = getBreadCrumbs(
          link.name,
          path[1].parent !== undefined
            ? (`${routerModule[0]}.${path[1].parent}` as NameParameter)
            : undefined,
          { ...params } as ParamsParameter
        );

        return true;
      }
    });
  });

  return (
    <ul
      {...rest}
      className={clsx("flex gap-1 text-[.9rem]", className)}
      aria-label="Current Navigation"
    >
      <li className="flex items-center gap-1">
        <Link href={getLink("cp.dashboard/index")} title="Root">
          Root
        </Link>

        <SlashIcon className="mt-[1px] aspect-square w-[1.3em] text-slate-400" />
      </li>
      {breadCrumbs.map((breadCrumb, index) => (
        <li key={index} className="flex items-center gap-1">
          {index !== breadCrumbs.length - 1 && (
            <>
              <Link href={breadCrumb.link} title={breadCrumb.title}>
                {breadCrumb.title}
              </Link>

              <SlashIcon className="mt-[1px] aspect-square w-[1.3em] text-slate-400" />
            </>
          )}

          {index === breadCrumbs.length - 1 && (
            <span
              title={breadCrumb.title}
              className="font-semibold cursor-default"
              aria-current="page"
            >
              {breadCrumb.title}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
