'use server'

import { deleteLoginSession } from "@/lib/login/manage-login"
import { asyncDelay } from "@/utils/async-delay"
import { redirect } from "next/navigation"

export async function logoutAction() {
    await asyncDelay(3000)
    await deleteLoginSession()
    redirect('/')
}
