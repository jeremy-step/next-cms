"use server";

import { prisma } from "@lib/prisma/prismaClient";
import type { Page } from "./definitions";

export async function fetchPages(): Promise<Page[]> {
  return await prisma.page.findMany({
    include: { metadata: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function fetchPageById(id: string): Promise<null | Page> {
  try {
    return await prisma.page.findFirst({
      where: { id: id },
      include: { metadata: true },
    });
  } catch {
    return null;
  }
}
