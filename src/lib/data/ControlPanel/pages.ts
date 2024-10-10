"use server";

import { prisma } from "@lib/prisma/prismaClient";
import { Page, PageEnum } from "./definitions";
import { Prisma } from "@lib/prisma/db";

export async function fetchPages(
  orderBy?: string,
  dir?: string
): Promise<Page[]> {
  const _orderBy = [];

  if ((orderBy as string) in PageEnum && (dir === "asc" || dir === "desc")) {
    _orderBy.push(
      orderBy === "updatedAt"
        ? {
            [orderBy as string]: {
              sort: dir === "asc" ? "asc" : "desc",
              nulls: dir === "asc" ? "first" : "last",
            },
          }
        : { [orderBy as string]: dir === "asc" ? "asc" : "desc" }
    );
  }

  if (orderBy !== "createdAt") {
    _orderBy.push({
      createdAt: Prisma.SortOrder.desc,
    });
  }

  try {
    return await prisma.page.findMany({
      include: { metadata: true },
      orderBy: _orderBy,
    });
  } catch (e) {
    console.error(e);

    return await new Promise(() => []);
  }
}

export async function fetchPageById(id: string): Promise<null | Page> {
  try {
    return await prisma.page.findFirst({
      where: { id: id },
      include: { metadata: true },
    });
  } catch (e) {
    console.error(e);
  }

  return null;
}

export async function isPermalinkUnique(
  permalink: string,
  pageId: string | null
): Promise<boolean> {
  try {
    const result = await prisma.pageMetaData.findFirst({
      select: { id: true },
      where: {
        permalink: permalink,
        NOT: { pageId: pageId ?? "00000000-0000-0000-0000-000000000000" },
      },
    });

    return !result;
  } catch (e) {
    console.error(e);
  }

  return true;
}
