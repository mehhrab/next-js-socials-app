import { prisma } from "@/lib/prisma"
import { Post } from "@/components/post"

export default async function SearchPage({ searchParams }:{ searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams
  const query = params["q"] 

  const posts = await prisma.post.findMany()
  const filteredPosts = posts.filter((post) => {
    if (post.title.includes(query?.toString()!)) {
      return post
    }
  })

  return (
    <div className="flex flex-col">
      <p className="pb-4 text-2xl">Results for `{query}`</p>
      <div className="flex flex-col gap-4">
        { filteredPosts.length == 0 
          ? <div>no results found.</div> 
          : filteredPosts.map((post) => (
              <Post key={post.id} id={post.id} title={post.title} content={post.content} authorId={post?.author} author={post.author}></Post>
            ))
        }
      </div>
    </div>
  )
}