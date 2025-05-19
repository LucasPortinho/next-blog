/*
Esse arquivo será chamado em qualquer loading desse caminho.
*/

import { SpinLoader } from "@/components/SpinLoader/index";

export default async function LoadingRoot() {
    return <SpinLoader className="min-h-screen" />
}
