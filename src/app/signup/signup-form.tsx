"use client"

import { signin, signup } from "@/app/actions/auth";
import { useActionState } from "react";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
  return(
    <form action={action} className="flex flex-col bg-gray-900 p-4 border-1 border-gray-800 rounded-sm row-auto">
        <label>User Name:</label>
        <input name="username"></input>
        {state?.errors?.username && <p>{state.errors.username}</p> } 
        <div className="h-4"></div>
        <label>Email:</label>
        <input name="email"></input>
        {state?.errors?.email && <p>{state.errors.email}</p> } 
        <div className="h-4"></div>
        <label>Password:</label>
        <input name="password"></input>
        {state?.errors?.password && <p>{state.errors.password}</p> } 
        <div className="h-4"></div>
        <button className="bg-blue-800">Sign Up</button>
    </form>
  )
}