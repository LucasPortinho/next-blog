import { AdminPostForm } from "@/components/Admin/AdminPostForm/index"
import { InputCheckbox } from "@/components/InputCheckbox/index"
import { Metadata } from "next"

export const dynamic = 'force-dynamic' // Como usarei cookies, headers e coisas do tipo, é melhor deixar dinamico

export const metadata: Metadata = {
    title: 'Criar post'
}

export default async function AdminPostNewPage() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-extrabold">Criar novo post</h1>
            <AdminPostForm mode='create' />
        </div>
    )
}