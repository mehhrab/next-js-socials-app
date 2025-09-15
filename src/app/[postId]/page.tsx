import { notFound } from "next/navigation";
import { prisma } from "../../lib/prisma";

export default async function PostPage({ params }:{ params: Promise<{ postId: string }>})
{
  const { postId } = await params

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  })

  if (post == null) {
    notFound()
  }

  return (
    <div>
      <div className="mb-2 font-black">{post.title}</div>
      <div className="text-gray-400 whitespace-pre-line">{post.content}</div>
    </div>
  )
}