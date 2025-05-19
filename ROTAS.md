```
SSR -> Rodando no lado do servidor (Dados sensíveis, databases, pagamentos, rotas, ...)
CSR -> Rodando no lado do cliente (Visual, mensagens, efeitos de estilo, ...) - Nada que envolva coisas sensíveis

Static / SSG -> Página estática que não atualiza, basicamente um HTML pronto e meio "cru" (Landing pages, termos de uso e serviço, ...)
Dynamic -> Não temos nada pronto. Tudo é montado na hora.

ISR -> SSG + Dynamic -> Gera uma página estática que a cada n segundos atualiza o conteúdo.
ou
ISR -> Depois que um item x é alterado, a página é recarregada. (Ex: excluir ou adicionar um post)

Rotas:
/ (Pública)
/post/[slug] (Pública)

/admin/post (Privado - Dynamic) - Ler e deletar posts
/admin/post/[id] (Privado - Dynamic) - Atualizar um post
/admin/post/new (Privado - Dynamic) - Criar um post

/admin/login (Dynamic e pública) - Login do usuário 
```