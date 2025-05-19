'use client';

import ErrorMessage from "@/components/ErrorMessage/index";
import { useEffect } from "react";

type RootErrorPageProps = {
    error: Error;  // Erro
    reset: () => void;  // Função que executa a ação novamente
}

export default function RootErrorPage({ error }: RootErrorPageProps) {

    // Server components dentro de client components vira client component. 
    // Então, só use client components em client components.

    // A unica exceção é quando server components vem como children.
    return (
        <ErrorMessage 
        pageTitle="Internal Server Error"
        contentTitle="501"
        content="Ocorreu um erro que nossa página não conseguiu se recuperar. Tente novamente mais tarde"
        />
    )
}