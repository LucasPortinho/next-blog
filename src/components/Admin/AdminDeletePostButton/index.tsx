'use client'

import deletePostAction from "@/actions/post/delete-post-action";
import { Dialog } from "@/components/Dialog/index";
import { Trash2Icon } from "lucide-react";
import { useTransition, useState } from 'react'
import { toast } from "react-toastify";

// Não vazar o post pro client!!
type DeletePostButtonProps = {
    id: string,
    title: string,
}

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
    // useTransition -> Meio que uma ação pra controlar o loading de algo async
    const [isPending, startTransition] = useTransition()
    const [showDialog, setShowDialog] = useState(false)
    
    function handleClick() {
        setShowDialog(true)
    }

    function handleConfirm() {
        startTransition(async() => {
            const result = await deletePostAction(id)
            setShowDialog(false)
            
            if (result.error) {
                toast.error(`Erro: ${result.error}`)
                return
            }

            toast.success('Post apagado com sucesso')
        })
    }
    
    return (
        <>
        <button 
        className="text-red-500 cursor-pointer transition hover:scale-110 hover:text-red-700 disabled:text-slate-300 disabled:cursor-not-allowed"
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        onClick={handleClick}
        disabled={isPending}> 
            <Trash2Icon /> 
        </button>
        <Dialog 
        isVisible={showDialog} 
        title='Apagar post?' 
        content={`Tem certeza que deseja apagar o post: ${title}`} 
        onCancel={() => setShowDialog(false)}
        onConfirm={handleConfirm}
        disabled={isPending}
        />
        </>
    )
}