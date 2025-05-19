'use client'

import { loginAction } from "@/actions/login/login-action"
import { Button } from "@/components/Button/index"
import { InputText } from "@/components/InputText/index"
import { clsx } from "clsx"
import { LogInIcon } from "lucide-react"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export function LoginForm() {
    const divClasses = clsx(
        'flex items-center justify-center text-center',
        'max-w-sm mt-16 mb-32 mx-auto'
    )
    const initialState = {
        username: '',
        error: ''
    }
    const [state, action, isPending] = useActionState(loginAction, initialState)
    
    useEffect(() => {
        if (state.error) {
            toast.dismiss()
            toast.error(state.error)
        }
    }, [state])

    return (
        <div className={divClasses}>
            <form action={action} className="flex-1 flex flex-col gap-6">
                <InputText
                type='text'
                name="username"
                labelText="Usuário"
                placeholder="Digite o nome de usuário"
                disabled={isPending}
                defaultValue={state.username}
                />

                <InputText
                type='password'
                name="password"
                labelText="Senha"
                placeholder="Digite sua senha"
                disabled={isPending}
                />

                <Button disabled={isPending} className="mt-1" type="submit">
                    <LogInIcon />
                    Entrar
                </Button>

            </form>
        </div>
    )
}
