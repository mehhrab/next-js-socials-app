"use client"

import { signin, signup } from "@/app/actions/auth";
import { useActionState } from "react";

export function SigninForm() {
  const [state, action, pending] = useActionState(signin, undefined)
  return(
    <form action={action} className="flex flex-col bg-gray-900 p-4 border-1 border-gray-800 rounded-sm row-auto">
      <label>Email:</label>
      <input name="email" autoComplete="true"></input>
      {/* {state?.errors?.email && <p>{state.errors.email}</p> }  */}
      <div className="h-4"></div>
      <label>Password:</label>
      <input name="password" autoComplete="true"></input>
      {state?.errors?.password && <p>{state.errors.password}</p> } 
      <div className="h-4"></div>
      <button className="bg-blue-800">Sign In</button>
    </form>
  )
}