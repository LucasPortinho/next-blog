import { findAllPublicPostsCached } from "@/lib/post/queries/public";
import ErrorMessage from "../ErrorMessage/index";
import { PostCoverImage } from "../PostCoverImage/index";
import { PostSummary } from "../PostSummary/index";

export async function PostsList() {
    const posts = await findAllPublicPostsCached()

    if (posts.length <= 1) return null;
    
    return (
        <div className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(1).map(post => {
                return (
                <div className='flex flex-col gap-4 group' key={post.id}>
                    <PostCoverImage 
                    linkProps={{
                        href: `/post/${post.slug}`
                    }}
                    imageProps={{
                        src: post.coverImageUrl,
                        width: 1200,
                        height: 720,
                        alt: post.title,
                    }}
                    />

                    <PostSummary 
                    createdAt={post.createdAt} 
                    postExcerpt={post.excerpt} 
                    postHeading='h2' 
                    postLink={`/post/${post.slug}`} 
                    postTitle={post.title}
                    />
                </div>
                )
            })}
        </div>
    )
}