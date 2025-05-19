import { LoginForm } from "@/components/Admin/LoginForm/index"
import ErrorMessage from "@/components/ErrorMessage/index"
import { Metadata } from "next"

export const dynamic = 'force-dynamic' // Como usarei cookies, headers e coisas do tipo, é melhor deixar dinamico

export const metadata: Metadata = {
    title: 'Login'
}

export default async function AdminLoginPage() {
    const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN))

    if (!allowLogin) {
        return <ErrorMessage contentTitle="403" content="Libere o sistema de login" pageTitle="Sistema de login"/>
    }
   
    return (
        <LoginForm />
    )
}