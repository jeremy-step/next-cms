"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@lib/prisma/prismaClient";
import { getLink } from "@lib/utils/router";
import type { PageFormState, PageMetaDataFormState } from "./definitions";
import slugify from "slugify";
import {
  Robots,
  SitemapChangeFreq,
  SitemapInclude,
  SitemapPrio,
} from "@lib/prisma/db";

// Page

const PageFormSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, "Title can't be empty"),
  content: z.string(),
  createDate: z.string(),
  updateDate: z.string(),
  permalink: z.preprocess((val) => {
    if (typeof val !== "string") {
      return val;
    }

    let _val = val.trim().replace(/\/{2,}/g, "/");

    if (!_val.startsWith("/")) {
      _val = `/${_val}`;
    }

    return slugify(_val.replace(/\/$/g, ""), {
      lower: true,
      trim: true,
      remove: /[^\w\s\/]+/g,
    });
  }, z.string()),
});

const PageCreate = PageFormSchema.omit({
  id: true,
  createDate: true,
  updateDate: true,
});

export const createPage = async (
  prevState: PageFormState,
  formData: FormData
) => {
  //await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedFields = PageCreate.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    permalink: formData.get("permalink"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to Create Page. Check the fields below for errors.",
    };
  }

  const { title, content, permalink } = validatedFields.data;

  let page;

  try {
    page = await prisma.$transaction(async (tx) => {
      const page = await tx.page.create({
        data: {
          title: title,
          content: content,
          updatedAt: null,
        },
      });

      await tx.pageMetaData.create({
        data: {
          title: page.title,
          permalink: permalink,
          description: "",
          pageId: page.id,
        },
      });

      return page;
    });

    revalidatePath(getLink("cp.pages/index"));
  } catch (e) {
    console.error(e);

    return {
      errors: {},
      message: "Error while creating Page.",
    };
  }

  redirect(getLink("cp.pages/edit", { pageId: page?.id }));
};

const PageEdit = PageFormSchema.omit({
  id: true,
  permalink: true,
  createDate: true,
  updateDate: true,
});

export const editPage = async (
  id: string,
  prevState: PageFormState,
  formData: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedFields = PageEdit.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to Edit Page. Check the fields below for errors.",
    };
  }

  const { title, content } = validatedFields.data;

  try {
    await prisma.page.update({
      data: {
        title: title,
        content: content,
      },
      where: {
        id: id,
      },
    });

    revalidatePath(getLink("cp.pages/index"));
  } catch (e) {
    console.error(e);

    return {
      errors: {},
      message: "Error while editing Page.",
    };
  }
};

// Page Metadata

const PageMetaDataFormSchema = z.object({
  id: z.string(),
  title: z.string().trim(),
  description: z.string().trim(),
  permalink: z.preprocess((val) => {
    if (typeof val !== "string") {
      return val;
    }

    let _val = val.trim().replace(/\/{2,}/g, "/");

    if (!_val.startsWith("/")) {
      _val = `/${_val}`;
    }

    return slugify(_val.replace(/\/$/g, ""), {
      lower: true,
      trim: true,
      remove: /[^\w\s$*_+~.()'"!\-:@\/]+/g,
    });
  }, z.string()),
  robots: z.nativeEnum(Robots),
  sitemapInclude: z.preprocess((val) => {
    return val === "1" ? SitemapInclude.Yes : SitemapInclude.No;
  }, z.nativeEnum(SitemapInclude)),
  sitemapPrio: z.nativeEnum(SitemapPrio).nullable(),
  sitemapChangeFreq: z.nativeEnum(SitemapChangeFreq).nullable(),
});

const PageMetaData = PageMetaDataFormSchema.omit({
  id: true,
});

export const editPageMetaData = async (
  id: number,
  prevState: PageMetaDataFormState,
  formData: FormData
) => {
  //await new Promise((resolve) => setTimeout(resolve, 1000));

  const validatedFields = PageMetaData.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    permalink: formData.get("permalink"),
    robots: formData.get("robots"),
    sitemapInclude: formData.get("sitemapInclude"),
    sitemapPrio: formData.get("sitemapPrio"),
    sitemapChangeFreq: formData.get("sitemapChangeFreq"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Failed to Edit Page Metadata. Check the fields below for errors.",
    };
  }

  const {
    title,
    description,
    permalink,
    robots,
    sitemapInclude,
    sitemapPrio,
    sitemapChangeFreq,
  } = validatedFields.data;

  try {
    const { pageId } = await prisma.pageMetaData.update({
      data: {
        title: title,
        description: description,
        permalink: permalink,
        robots: robots,
        sitemapInclude: sitemapInclude,
        sitemapPrio: sitemapPrio ?? undefined,
        sitemapChangeFreq: sitemapChangeFreq ?? undefined,
      },
      where: {
        id: id,
      },
    });

    revalidatePath(getLink("cp.pages/edit", { pageId: pageId }));
  } catch (e) {
    console.error(e);

    return {
      errors: {},
      message: "Error while editing Page Metadata.",
    };
  }
};

export const deletePage = async (id: string, _redirect: boolean) => {
  try {
    await prisma.page.delete({ where: { id: id } });

    revalidatePath(getLink("cp.pages/index"));
  } catch (e) {
    console.error(e);

    return {
      errors: {},
      message: "Error while deleting Page.",
    };
  }

  if (_redirect) {
    redirect(getLink("cp.pages/index"));
  }
};

export const setPublished = async (published: boolean, pageId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    await prisma.page.update({
      data: { published: published },
      where: { id: pageId },
    });

    revalidatePath(getLink("cp.pages/index"));
  } catch (e) {
    console.error(e);

    return {
      errors: {},
      message: "Error while setting Page published status.",
    };
  }
};
