import { postRepository } from '@/repositories/post/index'
import { cache } from 'react'

export const findAdminPostById = cache(
    async(id: string) => {
        return await postRepository.findById(id)
    }
)

export const findAllAdminPost = cache(
    async() => {
        return await postRepository.findAll()
    }
)
