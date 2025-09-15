import Link from "next/link"
import { prisma } from "../lib/prisma"
import { auth } from "../lib/auth"
import { headers } from "next/headers"
import { Post } from "@/components/post"

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const posts = await prisma.post.findMany()

  return(
    <div className="flex flex-col justify-center gap-4">      
      { posts.reverse().map((post) => {
        return (
          <Post key={post.id} id={post.id}></Post>
        )
      })}

      <div className="h-fit">
        <Link href={"/createpost"} className="right-8 bottom-8 absolute flex gap-2 bg-gradient-to-l to-cyan-600 py-2 button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Post
        </Link>
      </div>
    </div>
  )
}

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[50px_1fr_40px] max-h-screen overflow-hidden">
//       <div className="content-center grid grid-cols-[auto_1fr_auto] row-start-1 bg-linear-to-r from-cyan-800 to-blue-500 drop-shadow-xl/50 px-8">
//         <h3>This is me💀</h3>
//         <div></div>
//         <button className="bg-blue-800 hover:bg-blue-700 px-4 hover:px-8 rounded-2xl transition-all">Shop</button>
//       </div>
//       <div className="row-start-2 bg-gray-950 overflow-y-scroll">
//         <ul className="gap-4 grid grid-cols-3 grid-flow-row auto-rows-[10rem] p-8">
//           { 
//             [0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0].map(() => (
//               <li className="group relative gap-2 grid grid-rows-[auto_auto_100%] bg-gray-900 hover:bg-gray-800 p-4 border-1 border-gray-800 rounded-2xl overflow-clip transition-colors"> 
//                 <h1 className="font-bold">Article</h1>
//                 <div className="flex gap-2 *:bg-amber-950 *:px-1 *:border-1 *:border-amber-800 *:rounded-sm *:font-stretch-50% *:text-amber-500">
//                   <p>tips</p>
//                   <p>garden</p>
//                   <p>habits</p>
//                 </div>
//                 <p className="opacity-50 mt-4">this is some description blabalbla dodododo whatever and never...</p>
//                 <button className="top-2 right-4 absolute bg-white/5 opacity-0 group-hover:opacity-100 px-2 rounded-sm">...</button>
//               </li>
//             ))
//           }
//         </ul>
//       </div>
//       <div className="row-start-3 bg-blue-600">Contact meee</div>
//     </div>
//   );
// }

// // import Image from "next/image";

// // export default function Home() {
// //   return (
//     //  <div className="justify-items-start gap-16 grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 min-h-screen font-sans">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={180}
// //           height={38}
// //           priority
// //         />
// //         <ol className="font-mono text-sm/6 sm:text-left text-center list-decimal list-inside">
// //           <li className="mb-2 tracking-[-.01em]">
// //             Get started by editing{" "}
// //             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-mono font-semibold">
// //               src/app/page.tsx
// //             </code>
// //             .
// //           </li>
// //           <li className="tracking-[-.01em]">
// //             Save and see your changes instantly.
// //           </li>
// //         </ol>

// //         <div className="flex sm:flex-row flex-col items-center gap-4">
// //           <a
// //             className="flex justify-center items-center gap-2 bg-foreground hover:bg-[#383838] dark:hover:bg-[#ccc] px-4 sm:px-5 border border-transparent border-solid rounded-full sm:w-auto h-10 sm:h-12 font-medium text-background text-sm sm:text-base transition-colors"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={20}
// //               height={20}
// //             />
// //             Deploy now
// //           </a>
// //           <a
// //             className="flex justify-center items-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] px-4 sm:px-5 border dark:border-white/[.145] hover:border-transparent border-black/[.08] border-solid rounded-full w-full sm:w-auto md:w-[158px] h-10 sm:h-12 font-medium text-sm sm:text-base transition-colors"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Read our docs
// //           </a>
// //         </div>
// //       </main>
// //       <footer className="flex flex-wrap justify-center items-center gap-[24px] row-start-3">
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/file.svg"
// //             alt="File icon"
// //             width={16}
// //             height={16}
// //           />
// //           Learn
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/window.svg"
// //             alt="Window icon"
// //             width={16}
// //             height={16}
// //           />
// //           Examples
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/globe.svg"
// //             alt="Globe icon"
// //             width={16}
// //             height={16}
// //           />
// //           Go to nextjs.org →
// //         </a>
// //       </footer>
// //     </div>
// //   );
// // }
