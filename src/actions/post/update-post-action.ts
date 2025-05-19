'use server'

import { makePartialPublicPost, makePublicPost, PublicPostModel } from "@/dto/post/public-post"
import { verfiyLoginSession } from "@/lib/login/manage-login"
import { PostUpdateSchema } from "@/lib/post/validations"
import { postRepository } from "@/repositories/post/index"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"
import { makeRandomString } from "@/utils/make-random-string"
import { revalidateTag } from "next/cache"

type UpdatePostActionState = {
    formState: PublicPostModel,
    errors: string[],
    success?: string
}

export async function updatePostAction(prevState: UpdatePostActionState, formData: FormData): Promise<UpdatePostActionState> {
    const isAuthenticated = await verfiyLoginSession();

    if (!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ['Dados inválidos']
        }
    }

    const id = formData.get('id')?.toString() || ''

    if (!id || typeof id !== 'string') {
        return {
            formState: prevState.formState,
            errors: ['ID inválido']
        }
    }

    const formDataToObj = Object.fromEntries(formData.entries())  // Para frontend
    const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj)  // Para salvar na db

    if (!isAuthenticated) {
        return {
            formState: makePartialPublicPost(formDataToObj),
            errors: ['Abra outra aba e faça login antes de continuar']
        }
    }

    if (!zodParsedObj.success) {
        const errors = getZodErrorMessages(zodParsedObj.error.format());
        return {
            formState: makePartialPublicPost(formDataToObj),  // Não zerar as infos dos usuários caso dê erro.
            errors
        }
    }

    const validPostData = zodParsedObj.data;
    const newPost = {
        ...validPostData,
    }

    let post;
    try {
        post = await postRepository.update(id, newPost)
    } catch(e: unknown) {
        if (e instanceof Error) {
            return {
                formState: makePartialPublicPost(formDataToObj),
                errors: [e.message]
            }
        }
        return {
            formState: makePartialPublicPost(formDataToObj),
            errors: ['Erro desconhecido']
        }
    }
    
    revalidateTag('posts')
    revalidateTag(`post-${post.slug}`)

    return {
        formState: makePublicPost(post),
        errors: [],
        success: makeRandomString(),
    }
}
