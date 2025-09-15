import Link from "next/link";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { Menu } from "./menu";
import { Search } from "./search";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-blue-800 to-blue-500 p-2">
      <Link href="/">Social</Link>
      <div className="grow"></div>
      <div className="w-full sm:w-auto">
        <Search/>
      </div>
      <div className="hidden sm:flex">
        { session 
          ? <Link href={"/profile/" + session.user.id}>Welcome {session.user.name}</Link>
          : <div className="flex items-center">
              <Link href="/signup" className="px-2 underline">Sign up</Link> 
              <Link href="/signin" className="px-2 underline">Sign in</Link> 
            </div>
        }
      </div>
      <Menu/>
    </div>	
  )	
}