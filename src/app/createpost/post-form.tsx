"use client"

import { useActionState } from "react"
import { createPost } from "../actions/post"

export function PostForm() {
  const [state, action, pending] = useActionState(createPost, undefined)
  
  return (
    <form action={action} className="flex flex-col gap-2 w-1/2">
      <input name="title" placeholder="title..."></input>
      {state?.errors.title && <p>{state.errors.title}</p> }
      <textarea name="content" placeholder="content..." rows={6} className=""></textarea>
      <button className="self-start px-8 basic">Post</button>
    </form>
  )
}