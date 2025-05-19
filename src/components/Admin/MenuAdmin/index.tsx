'use client'

import { logoutAction } from "@/actions/login/logout-action";
import clsx from "clsx";
import { CircleXIcon, FileTextIcon, HourglassIcon, HouseIcon, LogOutIcon, MenuIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useTransition } from 'react'

export function MenuAdmin() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()  // Monitora quando o caminho da página muda -> Útil para layouts
    const [isPending, startTransition] = useTransition();  // Bom para administrar coisas que são assincronas ou precisam de loading

    function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault()

        startTransition(async() => {
            await logoutAction()
        })
    }

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const navClasses = clsx(
        'bg-slate-900 text-slate-100 rounded-lg',
        'flex flex-col mb-8',
        !isOpen && 'overflow-hidden h-10',
        'sm:flex-row sm:flex-wrap sm:overflow-auto sm:h-auto',
    )
    const linkClasses = clsx(
        '[&_svg]:w-[16px] [&_svg]:h-[16px] px-4',
        'flex items-center justify-start gap-2',
        'transition hover:bg-slate-800 rounded-lg',
        'h-10 shrink-0',
        'cursor-pointer'
    )

    const openCloseBtnClasses = clsx(linkClasses, 'text-slate-200 italic', 'sm:hidden')

    return (
        <nav className={navClasses}>
            <button className={openCloseBtnClasses} onClick={() => setIsOpen(previous => !previous)}> 
                {!isOpen ? (
                    <>
                    Menu
                    <MenuIcon />
                    </>
                ): (
                    <>
                    Fechar
                    <CircleXIcon />
                    </>
                )}
            </button>

            <a className={linkClasses} href="/" target='_blank'>
                Home
                <HouseIcon />
            </a>

            <Link className={linkClasses} href='/admin/post'>
                Posts
                <FileTextIcon />
            </Link>

            <Link className={linkClasses} href='/admin/post/new'>
                Criar Post
                <PlusIcon />
            </Link>

            <a href="#" onClick={handleLogout} className={linkClasses}>
                {isPending ? (
                    <>
                    <HourglassIcon />
                    Aguarde...
                    </>
                ): (
                    <>
                    Sair
                    <LogOutIcon />
                    </>
                )}
            </a>
        </nav>
    )
}