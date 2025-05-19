'use client'

import { createPostAction } from "@/actions/post/create-post-action";
import { updatePostAction } from "@/actions/post/update-post-action";
import { Button } from "@/components/Button/index";
import { InputCheckbox } from "@/components/InputCheckbox/index";
import { InputText } from "@/components/InputText/index";
import { MarkdownEditor } from "@/components/MarkdownEditor/index";
import { makePartialPublicPost, PublicPostModel } from "@/dto/post/public-post";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { ImageUploader } from "../ImageUploader/index";

type AdminCreatePostFormProps = {
  mode: 'create';
}

type AdminUpdatePostFormProps = {
  mode: 'update';
  publicPost: PublicPostModel;
}

type AdminPostFormProps = AdminCreatePostFormProps | AdminUpdatePostFormProps

export function AdminPostForm(props: AdminPostFormProps) {
    const { mode } = props

    const searchParams = useSearchParams()  // Paramêtros de url
    const created = searchParams.get('created')
    const router = useRouter()
    
    let publicPost;
    if (mode === 'update') {
      publicPost = props.publicPost
    }

    const actionsMap = {
      update: updatePostAction,
      create: createPostAction,
    }

    // Esse será o "tipo" do estado, então o formAction deve receber isso.
    const initialState = {
      formState: makePartialPublicPost(publicPost),  // Caso não seja enviado nada (criação) -> Enviar tudo vazio como prevState
      errors: []
    }

    const [state, formAction, isPending] = useActionState(actionsMap[mode], initialState)
    const [contentValue, setContentValue] = useState(state.formState.content)

    useEffect(() => {
      if (state.errors.length > 0) {
        toast.dismiss()
        state.errors.forEach(error => toast.error(error))
      }
    }, [state.errors])

    useEffect(() => {
      if (!!state.success) {
        toast.dismiss()
        toast.success('Post atualizado com sucesso')
      }
    }, [state.success])

    useEffect(() => {
      if (created === '1') {
        toast.dismiss()
        toast.success('Post criado com sucesso')
        const url = new URL(window.location.href)
        url.searchParams.delete('created')
        router.replace(url.toString())
      }
    }, [created, router])

    return (
      <form action={formAction} className='mb-16'>
        <div className='flex flex-col gap-6'>
          <InputText
          labelText='ID'
          name='id'
          placeholder='ID gerado automaticamente'
          type='text'
          defaultValue={state.formState.id}
          disabled={isPending}
          readOnly
          />

          <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerada automaticamente'
          type='text'
          defaultValue={state.formState.slug}
          disabled={isPending}
          readOnly
          />

          <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor do post'
          type='text'
          defaultValue={state.formState.author}
          disabled={isPending}
          />

          <InputText
          labelText='Título'
          name='title'
          placeholder='Digite o título do post'
          type='text'
          defaultValue={state.formState.title}
          disabled={isPending}
          />

          <InputText
          labelText='Resumo'
          name='excerpt'
          placeholder='Digite o resumo do post'
          type='text'
          defaultValue={state.formState.excerpt}
          disabled={isPending}
          />

          <MarkdownEditor 
          labelText="Conteúdo"
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={isPending}
          />

          <ImageUploader disabled={isPending} />

          <InputText
          labelText='URL da imagem de capa'
          name='coverImageUrl'
          placeholder='Digite a url da imagem de capa do post'
          type='text'
          defaultValue={state.formState.coverImageUrl}
          disabled={isPending}
          />

          <InputCheckbox 
          labelText="Publicar?"
          name="published"
          type="checkbox"
          defaultChecked={state.formState.published}
          disabled={isPending}
          />
  
          <div className='mt-4'>
            <Button type='submit' disabled={isPending}>Enviar</Button>
          </div>
        </div>
      </form>
    );
  }