import { PostModel } from "@/models/post/post-model";
import { resolve } from "path";
import { PostRepository } from "./post-repository";
import { readFile } from 'fs/promises'

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(ROOT_DIR, 'src', 'db', 'seed', 'posts.json')

const SIMULATE_LOADING_IN_MS = 0

export class JsonPostRepository implements PostRepository {
    private async readFromDisk(): Promise<PostModel[]> {
        const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8')
        const parsedJson = JSON.parse(jsonContent)
        const { posts } = parsedJson
        return posts
    }

    private async simulateWait() {
        if (SIMULATE_LOADING_IN_MS <= 0) return;

        await new Promise(resolve => setTimeout(resolve, SIMULATE_LOADING_IN_MS))
    }

    async findAllPublic(): Promise<PostModel[]> {
        const posts = await this.readFromDisk()
        return posts.filter(post => post.published)
    }

    async findAll(): Promise<PostModel[]> {
        const posts = await this.readFromDisk()
        return posts
    }

    async findById(id: string): Promise<PostModel> {
        const posts = await this.readFromDisk()
        const post = posts.find((post) => post.id === id)

        if (!post) {
            throw new Error('Post não encontrado')
        }

        return post
    }

    async findBySlugPublic(slug: string): Promise<PostModel> {
        const posts = await this.findAllPublic()
        const post = posts.find(post => post.slug === slug)

        if (!post) {
            throw new Error('Post não encontrado')
        }

        return post
    }
};

