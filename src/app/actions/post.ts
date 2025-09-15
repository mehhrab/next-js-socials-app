"use server"

import { redirect } from "next/navigation";
import { PostFormState, PostSchema } from "../../lib/definitions";
import { prisma } from "../../lib/prisma";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";

export async function createPost(state: PostFormState, formData: FormData) {
  const validatedFields = PostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  })

  if (validatedFields.success == false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  await prisma.post.create({
    data: {
      author: session?.user.id!,
      title: validatedFields.data.title,
      content: validatedFields.data.content,
    }
  })

  redirect("/")
}