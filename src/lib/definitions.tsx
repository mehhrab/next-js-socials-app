import { z } from "zod"

export const SignupSchema = z.object({
  username: z
    .string()
    .min(2, { error: "Username should be at least 2 characters long." })
    .trim(),
  email: z
    .email()
    .trim(),
  password: z
    .string()
    .min(8, { error: "Password should be at least 8 characters long." }),
})

export type SignupFormState = 
  | {
      errors?: {
        username?: string[],
        email?: string[],
        password?: string[],
      }
      message?: string
    } 
  | undefined

export type SigninFormState = 
  | {
      errors?: {
        email?: string[],
        password?: string[],
      }
      message?: string
    } 
  | undefined

export const PostSchema = z.object({
  title: z
    .string()
    .min(1)
    .trim(),
  content: z
    .string()
})

export type PostFormState = 
  | {
      errors?: {
        title?: string[],
        content?: string[],
      }
      message?: string
    } 
  | undefined