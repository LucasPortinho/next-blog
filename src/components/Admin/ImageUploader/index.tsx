'use client'

import { uploadImageAction } from "@/actions/upload/upload-image-action";
import { Button } from "@/components/Button/index"
import { useRef, useState, useTransition } from "react"
import { toast } from "react-toastify";

type ImageUploaderProps = {
    disabled?: boolean;
}

export function ImageUploader({ disabled=false }: ImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isUploading, startTransition] = useTransition()
    const [imageUrl, setImageUrl] = useState('')

    function handleClick() {
        if (!inputRef.current) return;

        inputRef.current.click()
    }

    function handleChange() {
        toast.dismiss()

        if (!inputRef.current) {
            setImageUrl('')
            return
        }

        const fileInput = inputRef.current;
        const file = fileInput.files?.[0]

        if (!file) {
            setImageUrl('')
            return
        };
        
        const maxKbytes = Number(process.env.NEXT_PUBLIC_MAX_KBYTES) || 0;
        if (file.size > maxKbytes) {
            toast.error(`Imagem muito grande.\n Máximo permitido: ${maxKbytes / 1024}KB.`)
            fileInput.value = ''
            setImageUrl('')
            return
        }

        const formData = new FormData();
        formData.append('file', file);

        startTransition(async() => {
            const result = await uploadImageAction(formData);

            if (result.error) {
                toast.error(result.error);
                fileInput.value = ''
                setImageUrl('')
                return;
            }
            
            setImageUrl(result.url)
            toast.success('Imagem enviada com sucesso!')
        })
    }

    return (
        <div className="flex flex-col gap-2">
            <Button onClick={handleClick} type='button' className="self-start" disabled={isUploading || disabled}>
                Escolher Imagem
            </Button>

            {!!imageUrl && (
                <div>
                    <p>
                        <strong>URL:</strong> {imageUrl}
                    </p>

                    <img src={imageUrl} alt="Imagem enviada pelo usuário" />
                </div>
            )}

            <input onChange={handleChange} ref={inputRef} className='hidden' type="file" name='file' accept="image/*" disabled={isUploading || disabled}/>
        </div>
    )
}
