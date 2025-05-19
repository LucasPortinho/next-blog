import { MenuAdmin } from "@/components/Admin/MenuAdmin/index"
import { requireLoginSessionOrRedirect } from "@/lib/login/manage-login"

type AdminRootLayoutProps = {
    children: React.ReactNode
}

export default async function AdminRootLayout({ children }: Readonly<AdminRootLayoutProps>) {
    await requireLoginSessionOrRedirect(); // Verificando direto no layout para todos os posts

    return (
        <>
        <MenuAdmin />
        {children}
        </>
    )
}