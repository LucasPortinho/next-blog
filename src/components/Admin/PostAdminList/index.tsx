import deletePostAction from "@/actions/post/delete-post-action"
import { findAllAdminPost } from "@/lib/post/queries/admin"
import clsx from "clsx"
import { Trash2Icon } from "lucide-react"
import Link from "next/link"
import { DeletePostButton } from "../AdminDeletePostButton/index"
import ErrorMessage from "../../ErrorMessage/index"

export async function PostAdminList() {
    const posts = await findAllAdminPost()

    if (posts.length <= 0) return <ErrorMessage pageTitle="Nenhum post" contentTitle="Ops!" content="Ainda não criamos nenhum post!" />

    return (
        <div className="mb-16">
            {posts.map(post => {
                return <div className={clsx(
                    'py-2 px-2',
                    !post.published && 'bg-slate-300',
                    'flex gap-2',
                    'items-center justify-between'
                )} key={post.id}>
                    <Link href={`/admin/post/${post.id}`}>{post.title}</Link>
                    
                    {!post.published && <span className="text-xs text-slate-600 italic">(Não publicado)</span>}

                    <DeletePostButton id={post.id} title={post.title} />
                </div>
            })}

        </div>
    )
}