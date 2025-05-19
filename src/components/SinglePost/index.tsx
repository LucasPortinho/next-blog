import { findPublicPostBySlugCached } from "@/lib/post/queries/public";
import Image from 'next/image'
import { PostDate } from "../PostDate/index";
import { PostHeading } from "../PostHeading/index";
import { SafeMarkdown } from "../SafeMarkdown/index";

type SinglePostProps = {
    slug: string
}

export async function SinglePost({ slug }: SinglePostProps) {
    const post = await findPublicPostBySlugCached(slug)

    return (
        <article className="mb-16">

            <header className="group flex flex-col gap-4 mb-4">
                <Image className="rounded-xl" src={post.coverImageUrl} height={1200} width={720} alt={post.title}/>
                <PostHeading href={`/post/${post.slug}`}>{post.title}</PostHeading>

                <p>
                    {post.author} | <PostDate createdAt={post.createdAt} />
                </p>
            </header>

            <p className="text-lg mb-4 text-slate-600">{post.excerpt}</p>

            <SafeMarkdown markdown={post.content} />
        </article>
    )

}