import { DrizzlePostRepository } from "./drizzle-post-repository";
import { JsonPostRepository } from "./json-post-repository";
import { PostRepository } from "./post-repository";

export const postRepository: PostRepository = new DrizzlePostRepository