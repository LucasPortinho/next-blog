```
dynamicParams - false => Não aceita nenhum parâmetro além dos que foram pré-renderizados (generateStatic)
dynamicParams - true => Gera os arquivos estáticos sobre demanda (generateStatic + forem enviados)
    - Útil em dbs grandes
    - Padrão: true

export dynamic x export generateStaticParams
não quero padrão x quero padrão

revalidatePath(caminho) => revalidar por demanda
revalidateTag(tag) => revalidar alguma tag específica

'use server' => transforma funções em actions (parecidos com API -> ex: action do form)
Server actions => POST
Algumas actions funcionam iguais a context api (useActionState para receber o estado)

'use cache', cacheTag, cacheLife // unstable_cache => Função de cache de dados e funções

Basicamente:
    - Ler: Repository
    - Criar: Server actions (Substitui api)
```