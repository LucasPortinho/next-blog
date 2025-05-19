import { findAllPublicPostsCached } from "@/lib/post/queries/public"
import ErrorMessage from "../ErrorMessage/index"
import { PostCoverImage } from "../PostCoverImage/index"
import { PostSummary } from "../PostSummary/index"

export async function PostFeatured() {
    const posts = await findAllPublicPostsCached()
    
    if (posts.length <= 0) return <ErrorMessage pageTitle="Nenhum post" contentTitle="Ops!" content="Ainda não criamos nenhum post!" />

    const post = posts[0]

    const href = `/post/${post.slug}`

    return (
        <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
            
            <PostCoverImage imageProps={{
            priority: true,
            src: post.coverImageUrl,
            width: 1200,
            height: 720,
            alt: post.title
            }} linkProps={{
            href: href
            }} />

            <PostSummary 
            createdAt={post.createdAt}
            postExcerpt={post.excerpt}
            postHeading='h1' 
            postLink={href}
            postTitle={post.title}
            />

        </section>
    )
}