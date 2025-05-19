import { PostAdminList } from "@/components/Admin/PostAdminList/index"
import { SpinLoader } from "@/components/SpinLoader/index"
import { Suspense } from "react"

export const dynamic = 'force-dynamic' // Como usarei cookies, headers e coisas do tipo, é melhor deixar dinamico

export default async function AdminPostPage() {
    return (
        <Suspense fallback={<SpinLoader className="mb-16" />}>
            <PostAdminList />
        </Suspense>
    )
}