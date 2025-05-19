import { PostModel } from "@/models/post/post-model";

export type PublicPostModel = Omit<PostModel, 'updatedAt'>  // Omit retira chaves de um tipo

// Partial faz todas as chaves serem opcionais
export function makePartialPublicPost(post?: Partial<PostModel>): PublicPostModel {
    return {
        id: post?.id || '',
        content: post?.content || '',
        author: post?.author || '',
        slug: post?.slug || '',
        coverImageUrl: post?.coverImageUrl || '', 
        createdAt: post?.createdAt || '',
        excerpt: post?.excerpt || '',
        published: post?.published || false,
        title: post?.title || ''
    }
}

export function makePublicPost(post: PostModel): PublicPostModel {
    return makePartialPublicPost(post)
}
