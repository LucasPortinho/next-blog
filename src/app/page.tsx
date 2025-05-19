import { PostFeatured } from "@/components/PostFeatured/index";
import { PostsList } from "@/components/PostsList/index";
import { SpinLoader } from "@/components/SpinLoader/index";
import { Suspense } from 'react'

/* 
Roteamento estático do next:

app/page.tsx -> / -> root
app/about/page.tsx -> /about

Componentes de servidor constumam ser async
*/

export const dynamic = 'force-static'

export default async function HomePage() {

    return (
      <>
          {/*Basicamente, o suspense coloca um elemento enquanto outro async não carrega*/}
          <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
            <PostFeatured />
            <PostsList />
          </Suspense>
      </>
    )
}