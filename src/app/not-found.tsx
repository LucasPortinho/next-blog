import ErrorMessage from "@/components/ErrorMessage/index";

export default function NotFoundPage() {
    return(
        <ErrorMessage
            pageTitle="Página não encontrada | Erro 404"
            content="Erro 404 - A página que você está procurando não existe"
            contentTitle="404"
        />
    )
}