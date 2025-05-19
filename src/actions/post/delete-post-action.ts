'use server'

import { verfiyLoginSession } from "@/lib/login/manage-login"
import { postRepository } from "@/repositories/post/index"
import { revalidateTag } from "next/cache"

export default async function deletePostAction(id: string) {
    const isAuthenticated = await verfiyLoginSession();

    if (!isAuthenticated) {
        return {
            error: 'Faça o login para realizar essa ação.'
        }
    }

    if (!id || typeof id !== 'string') {
        return {
            error: 'Dados inválidos'
        }
    }

    let post;
    try {
        post = await postRepository.delete(id)
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {
                error: e.message
            }
        }

        return {
            error: 'Erro desconhecido'
        }
    }

    revalidateTag('posts')
    revalidateTag(`post-${post.slug}`)

    return {
        error: ''
    }
}