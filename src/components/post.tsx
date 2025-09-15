"use server"
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";

export async function Post({ id }:{ id: string }) {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <PostContent id={id}></PostContent>
    </Suspense>
  )
}

async function PostContent({ id }:{ id: string }) {
  // used for testing suspense
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: id
    }
  })

  const author = await prisma.user.findFirstOrThrow({
    where: {
      id: post.author
    }
  })

  return (
    <div className="p-2 border-1 border-gray-800 hover:border-gray-600 rounded-sm transition-colors">
      <div className="flex items-start gap-2">
        <Link href={"/" + id} className="mb-2 font-bold">{post.title}</Link>
        <Link href={"/profile/" + author.id} className="text-blue-600 underline">{author.name}</Link>
      </div>
      <div className="text-gray-400 whitespace-pre-line">{post.content}</div>
    </div>
  )
}