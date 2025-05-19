'use server'

import { verfiyLoginSession } from "@/lib/login/manage-login";
import { makeSlugFromText } from "@/utils/make-slug-from-text";
import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

type UploadImageActionResult = {
    url: string;
    error: string;
}

export async function uploadImageAction(formData: FormData): Promise<UploadImageActionResult> {
    const makeResult = ({ url='', error='' }) => ({url, error})

    const isAuthenticated = await verfiyLoginSession();

    if (!isAuthenticated) {
        return makeResult({ error: 'Faça login para realizar essa ação' })
    }

    if (!(formData instanceof FormData)) {
        return makeResult({ error: 'Dados inválidos' })
    }

    const file = formData.get('file')

    if (!(file instanceof File)) {
        return makeResult({ error: 'Arquivo inválido' })
    }

    const maxKbytes = Number(process.env.NEXT_PUBLIC_MAX_KBYTES) || 0;

    if (file.size > maxKbytes) {
        return makeResult({ error: 'Arquivo muito grande' })
    }

    if (!file.type.startsWith('image/')) {
        return makeResult({ error: 'Imagem inválida' })
    }

    const imageExtension = extname(file.name)
    const imageName = file.name.replace(imageExtension, '').replaceAll(' ', '-').toLowerCase()
    const uniqueImageName = makeSlugFromText(`${imageName}-${Date.now()}${imageExtension}`)
    
    const imageDir = process.env.IMAGE_DIR || 'uploads'

    const uploadFullPath = resolve(process.cwd(), 'public', imageDir)
    await mkdir(uploadFullPath, { recursive: true, })

    const fileArrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(fileArrayBuffer)

    const fileFullPath = resolve(uploadFullPath, uniqueImageName)
    
    await writeFile(fileFullPath, buffer)

    const imageServerUrl = process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads'
    const url = `${imageServerUrl}/${uniqueImageName}`

    return makeResult({ url })
}
