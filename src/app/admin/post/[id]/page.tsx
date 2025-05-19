import { AdminPostForm } from "@/components/Admin/AdminPostForm/index"
import { makePublicPost } from "@/dto/post/public-post"
import { findAdminPostById } from "@/lib/post/queries/admin"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Editar post'
}

type AdminPostIdPageProps = {
    params: Promise<{id: string}>
}

export default async function AdminPostIdPage({ params }: AdminPostIdPageProps) {
    const { id } = await params
    const post = await findAdminPostById(id).catch()

    if (!post) notFound();

    const publicPost = makePublicPost(post)

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-extrabold">Editar post</h1>
            <AdminPostForm mode="update" publicPost={publicPost} />
        </div>
    )
}