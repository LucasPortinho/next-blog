import { SinglePost } from "@/components/SinglePost/index"
import { SpinLoader } from "@/components/SpinLoader/index"
import { findPublicPostBySlugCached } from "@/lib/post/queries/public"
import { Metadata } from "next"
import { Suspense } from 'react'

export const dynamic = 'force-static'

type PostSlugPageProps = {
    params: Promise<{ slug: string }>
}

// Essa função gera metadados para funções assíncronas em rotas dinâmicas
export async function generateMetadata({ params }: PostSlugPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await findPublicPostBySlugCached(slug) // Não preciso me preocupar em chamar funções muitas vezes por causa do cache

    return {
        title: post.title,
        description: post.excerpt,
    }
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
    const { slug } = await params

    return (
        // Trocando o post direto por suspense para ficar mais performático
        <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
            <SinglePost slug={slug} />
        </Suspense>
    )
}