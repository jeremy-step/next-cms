"use server";

import { prisma } from "@lib/prisma/prismaClient";
import type { Page } from "./definitions";

export async function fetchPages(): Promise<Page[]> {
  try {
    return await prisma.page.findMany({
      include: { metadata: true },
      orderBy: { createdAt: "desc" },
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
