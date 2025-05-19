import { postRepository } from '@/repositories/post/index'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { cache } from 'react'

// Caso essa função seja chamada 2x, 3x, 4x, ... ela será chamada apenas uma por causa do cache.
// E com isso, os valores serão re-utilizados.
export const findAllPublicPostsCached = cache(
    unstable_cache(
        async () => {
            return await postRepository.findAllPublic()
        }, 
        ['posts'], 
        {
            tags: ['posts'],
        }
    ), 
)

export const findPublicPostBySlugCached = cache((slug: string) => {
        return unstable_cache(
            async(slug: string) => {
                const post = await postRepository.findBySlugPublic(slug).catch(() => undefined)
                if (!post) notFound();
                
                return post
            },
            ['posts'],
            {
                tags: [`post-${slug}`],
            },
        )(slug)
    }
)

