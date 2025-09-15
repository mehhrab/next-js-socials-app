import { prisma } from "@/lib/prisma"
import { Post } from "@/components/post"

export default async function ProfilePage({ params }:{ params: Promise<{ id: string }>}) {
  const { id } = await params
  const user = await prisma.user.findFirst({
    where: {
      id: id
    }
  })
  const posts = await prisma.post.findMany({
    where: {
      author: user?.id,
    }
  }) 

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-bold text-3xl">{user?.name}</p>
        <p className="text-gray-400">{user?.email}</p>
      </div>
      <hr className="border-gray-600"></hr>
      <div className="flex gap-2">
        <p className="text-gray-400">Posts</p>
        <p className="bg-gray-700 px-2 rounded-sm">{posts.length}</p>
      </div>
      { posts.reverse().map((post) => (
        <Post key={post.id} id={post.id}></Post>
      ))}
    </div>
  )
}