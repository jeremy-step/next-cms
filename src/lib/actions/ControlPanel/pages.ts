"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@lib/prisma/prismaClient";
import { getLink } from "@lib/utils/router";
import type { PageFormState, PageMetaDataFormState } from "./definitions";
import slugify from "slugify";

// Page

const PageFormSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, "Title can't be empty"),
  content: z.string(),
  createDate: z.string(),
  updateDate: z.string(),
});

const Page = PageFormSchema.omit({
  id: true,
  createDate: true,
  updateDate: true,
});

export const createPage = async (
  prevState: PageFormState,
  formData: FormData
) => {
  //await new Promise((resolve) => setTimeout(resolve, 3000));

  const validatedFields = Page.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to Create Page. Check the fields below for errors.",
    };
  }

  const { title, content } = validatedFields.data;

  const page = await prisma.page.create({
    data: {
      title: title,
      content: content,
      updatedAt: null,
    },
  });

  await prisma.pageMetaData.create({
    data: {
      title: page.title,
      permalink: `/${slugify(page.title, {
        lower: true,
        trim: true,
        remove: /[^\w\s$*_+~.()'"!\-:@]+/g,
      })}`,
      description: "",
      pageId: page.id,
    },
  });

  revalidatePath(getLink("cp.pages/index"));
  redirect(getLink("cp.pages/edit", { pageId: page.id }));
};

export const editPage = async (
  id: string,
  prevState: PageFormState,
  formData: FormData
) => {
  //await new Promise((resolve) => setTimeout(resolve, 3000));

  const validatedFields = Page.safeParse({
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
  redirect(getLink("cp.pages/edit", { pageId: id }));
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

    return _val.replace(/\/$/g, "");
  }, z.string()),
});

const PageMetaData = PageMetaDataFormSchema.omit({
  id: true,
});

export const editPageMetaData = async (
  id: number,
  prevState: PageMetaDataFormState,
  formData: FormData
) => {
  //await new Promise((resolve) => setTimeout(resolve, 3000));

  const validatedFields = PageMetaData.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    permalink: formData.get("permalink"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Failed to Edit Page Metadata. Check the fields below for errors.",
    };
  }

  const { title, description, permalink } = validatedFields.data;

  const { pageId } = await prisma.pageMetaData.update({
    data: {
      title: title,
      description: description,
      permalink: permalink,
    },
    where: {
      id: id,
    },
  });

  revalidatePath(getLink("cp.pages/edit", { pageId: pageId }));

  return {};
};

export const deletePage = async (id: string) => {
  await prisma.page.delete({ where: { id: id } });

  revalidatePath(getLink("cp.pages/index"));
  redirect(getLink("cp.pages/index"));
};
