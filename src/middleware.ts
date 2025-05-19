import { NextRequest, NextResponse } from 'next/server'
import { verifyJwt } from './lib/login/manage-login'

// Lembrando: server-actions -> POST | acessar páginas: POST
export async function middleware(request: NextRequest) {
    const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login')
    const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
    const isGetRequest = request.method === 'GET'

    const shouldBeAuthenticated = !isLoginPage && isAdminPage 
    const shouldRedirect = shouldBeAuthenticated && isGetRequest  // Saber se precisa redirecionar (em POST não)

    if (!shouldRedirect) {
        return NextResponse.next()
    }

    const jwtSession = request.cookies.get(process.env.LOGIN_COOKIE_NAME || 'loginSession')?.value
    const isAuthenticated = await verifyJwt(jwtSession)

    if (!isAuthenticated) {
        const loginUrl = new URL('/admin/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()  // Prosseguir para onde a rota estava indo
}

export const config = {
    matcher: '/admin/:path*'  // Permitir qualquer rota após /admin (se só houvesse :path, sem *, só aceitaria o primeiro nivel)
}
