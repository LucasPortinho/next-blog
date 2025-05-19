'use server'

import { createLoginSession, verifyPassword } from "@/lib/login/manage-login"
import { asyncDelay } from "@/utils/async-delay"
import { redirect } from "next/navigation"

type LoginActionState = {
    username: string,
    error: string,
}

export async function loginAction(state: LoginActionState, formData: FormData) {
    const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN))

    if (!allowLogin) {
        return {
            username: '',
            error: 'Login not allowed'
        }
    }

    await asyncDelay(3000)  // Será mantido pra evitar bom funcionamento de bots de brute force.

    if (!(formData instanceof FormData)) {
        return {
            username: '',
            error: 'Dados inválidos'
        }
    }

    const username = formData.get('username')?.toString().trim() || ''
    const password = formData.get('password')?.toString().trim() || ''

    if (!username || !password) {
        return {
            username,
            error: 'Digite o usuário e a senha.'
        }
    }

    // Aqui eu checaria se o usuário existe na db e checaria o hash de senha
    const isUsernameValid = username === process.env.LOGIN_USER
    const isPasswordValid = await verifyPassword(password, process.env.LOGIN_PASSWORD || '')

    if (!isUsernameValid || !isPasswordValid) {
        return {
            username,
            error: 'Usuário ou senha inválidos'
        }
    }

    await createLoginSession(username)
    redirect('/admin/post')
}
