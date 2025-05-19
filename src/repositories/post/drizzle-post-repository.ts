import { drizzleDb } from "@/db/drizzle/index";
import { postsTable } from "@/db/drizzle/schemas";
import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { eq } from 'drizzle-orm'


export class DrizzlePostRepository implements PostRepository {
    async findAll(): Promise<PostModel[]> {

        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(posts.createdAt)
        })

        return posts
    }

    async findAllPublic(): Promise<PostModel[]> {

        const posts = await drizzleDb.query.posts.findMany({
            where: (posts, { eq }) => eq(posts.published, true),
            orderBy: (posts, { desc }) => desc(posts.createdAt)
        })

        return posts
    }

    async findById(id: string): Promise<PostModel> {

        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id)
        })

        if (!post) {
            throw new Error('Post não encontrado')
        }
        
        return post
    }

    async findBySlugPublic(slug: string): Promise<PostModel> {

        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq, and }) => and(eq(posts.published, true), eq(posts.slug, slug))
        })

        if (!post) {
            throw new Error('Post não encontrado')
        }

        return post
    }

    async create(post: PostModel): Promise<PostModel> {
        const postExists = await drizzleDb.query.posts.findFirst({
            where: (posts, {eq, or}) => or(eq(posts.id, post.id), eq(post.slug, posts.slug)),
            columns: { id: true }
        })

        if (!!postExists) {
            throw new Error('Esse slug ou ID já existe na base de dados.')
        }

        await drizzleDb.insert(postsTable).values(post)
        return post
    }

    async delete(id: string): Promise<PostModel> {
        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id),
        })   

        if (!post) {
            throw new Error('Post não existe')
        }

        await drizzleDb.delete(postsTable).where(eq(postsTable.id, id))
        return post
    }

    async update(id: string, newPostData: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">): Promise<PostModel> {
        const oldPost = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id)
        })

        if (!oldPost) {
            throw new Error('Post não existe')
        }

        const updatedAt = new Date().toISOString();
        const postData = {
            author: newPostData.author,
            title: newPostData.title,
            content: newPostData.content,
            excerpt: newPostData.excerpt,
            coverImageUrl: newPostData.coverImageUrl,
            published: newPostData.published,
            updatedAt,
        }

        await drizzleDb.update(postsTable).set(postData).where(eq(postsTable.id, id));
        return {
            ...oldPost,
            ...postData
        }
    }
}

