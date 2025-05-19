'use server'

import { makePartialPublicPost, PublicPostModel } from "@/dto/post/public-post"
import { verfiyLoginSession } from "@/lib/login/manage-login"
import { PostCreateSchema } from "@/lib/post/validations"
import { PostModel } from "@/models/post/post-model"
import { postRepository } from "@/repositories/post/index"
import { getZodErrorMessages } from "@/utils/get-zod-error-messages"
import { makeSlugFromText } from "@/utils/make-slug-from-text"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from 'uuid'

type CreatePostActionState = {
    formState: PublicPostModel,
    errors: string[],
    success?: string,
}

export async function createPostAction(prevState: CreatePostActionState, formData: FormData): Promise<CreatePostActionState> {
    const isAuthenticated = await verfiyLoginSession()
    
    if (!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ['Dados inválidos']
        }
    }

    const formDataToObj = Object.fromEntries(formData.entries())  // Para frontend
    const zodParsedObj = PostCreateSchema.safeParse(formDataToObj)  // Para salvar na db

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
    const newPost: PostModel = {
        ...validPostData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: uuidv4(),
        slug: makeSlugFromText(validPostData.title),
    }

    try {
        await postRepository.create(newPost)
    } catch(e: unknown) {
        if (e instanceof Error) {
            return {
                formState: newPost,
                errors: [e.message]
            }
        }
        return {
            formState: newPost,
            errors: ['Erro desconhecido']
        }
    }
    
    revalidateTag('posts')
    // Adicionando o created para poder assistir o sucesso sem useEffect.
    redirect(`/admin/post/${newPost.id}?created=1`)
}
