"use server"

import { SigninFormState, SignupFormState as SignupFormState, SignupSchema } from "../../lib/definitions";
import { prisma } from "../../lib/prisma";
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signup(state: SignupFormState, formData: FormData) {
  const validatedFields = SignupSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (validatedFields.success == false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const [ usersWithSameUsername, usersWithSameEmail ] = await Promise.all([
    prisma.user.count({
      where: {
        name: validatedFields.data.username
      }
    }),
    prisma.user.count({
      where: {
        email: validatedFields.data.email
      }
    })
  ])

  if (usersWithSameUsername != 0) {
    const result: SignupFormState = {
      errors: {
        username: [ "User with this username already exists" ]
      }
    }

    return result
  }

  if (usersWithSameEmail != 0) {
    const result: SignupFormState = {
      errors: {
        email: [ "User with this email already exists" ]
      }
    }

    return result
  }

  const response = await auth.api.signUpEmail({
    body: {
      name: validatedFields.data.username,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      rememberMe: true,
    },
  })

  revalidatePath("/")
  redirect("/")
} 

export async function signin(state: SigninFormState, formData: FormData) {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email: formData.get("email")?.toString()!,
        password: formData.get("password")?.toString()!,
        rememberMe: true,
      },
    })    
  } catch (error) {
    console.log(error)
    return {
      errors: {
        password: ["Wrong email or password"]
      }
    }
  }

  revalidatePath("/")
  redirect("/")
} 