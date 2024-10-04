"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClient } from "@lib/prisma/db";
import { getLink } from "@lib/utils/router";
import { FormState } from "../definitions";

const prisma = new PrismaClient();

const PageFormSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, "Title can't be empty"),
  content: z.string(),
  createDate: z.string(),
  updateDate: z.string(),
});

export interface PageFormState extends FormState {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string | null;
}

const CreatePage = PageFormSchema.omit({
  id: true,
  createDate: true,
  updateDate: true,
});

export const createPage = async (
  prevState: PageFormState,
  formData: FormData
) => {
  const validatedFields = CreatePage.safeParse({
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

  revalidatePath(getLink("cp.pages/index"));
  redirect(getLink("cp.pages/edit", { pageId: page.id }));
};
