// Esse arquivo talvez poderia ser um repository de uma db de usuários
// Em uma db, não precisa converter e desconvertar p base 64 (mais seguro é usar hash mesmo.)
// Cookie: delete -> logout, get -> pegar, set -> configurar (Não devem possuir dados muito sensíveis. Apenas um identificador)
// JWT -> Authentication e Authorization -> Role (admin x user x pay_user) e autenticação (identificação)

import bcrypt from 'bcryptjs'
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type JwtPayload = {
    username: string;
    expiresAt: Date;
}

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey);  // Secret key

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400
const loginExpStr = process.env.LOGIN_EXPIRATION_STRING || '1d'
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession'  // Nome do cookie 'chave do dict'

export async function hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10)
    const base64Hash = Buffer.from(hash).toString('base64')
    return base64Hash
}

export async function verifyPassword(password: string, base64Hash: string) {
    const hash = Buffer.from(base64Hash, 'base64').toString('utf-8'); 
    return bcrypt.compare(password, hash)
}

export async function createLoginSession(username: string) {
    const expiresAt = new Date(Date.now() + loginExpSeconds * 1000)  // Data futura em que irá expirar o cookie (*1000 porque deve ser ms)
    const loginSessionPayload = await signJwt({ username, expiresAt })  // Codificando payload

    const cookieStore = await cookies()  // Deve ser usado em server actions
    cookieStore.set(loginCookieName, loginSessionPayload, {  // Enviando o payload codificado para os cookies
        httpOnly: true,  // Só pode ser lido dentro do servidor (fica mascarado)
        secure: true,
        sameSite: 'strict',  // Impede CORS
        expires: expiresAt,
    })
}

export async function deleteLoginSession() {
    const cookieStore = await cookies();
    cookieStore.set(loginCookieName, '',{
        expires: new Date(0)
    })  // Zerando o cookie por precaução
    cookieStore.delete(loginCookieName)
}

export async function getLoginSession() {
    const cookieStore = await cookies();
    const jwt = cookieStore.get(loginCookieName)?.value  // Pegando o valor do payload codificado
    if (!jwt) return false;
    return verifyJwt(jwt)  // Pegando o valor do payload decodificado
}

// Essa função serve apenas para esse sistema de um usuário
export async function verfiyLoginSession() {
    const jwtPayload = await getLoginSession()
    if (!jwtPayload) return false

    return jwtPayload?.username === process.env.LOGIN_USER
}

export async function requireLoginSessionOrRedirect() {
    const isAuthenticated = await verfiyLoginSession();
    if (!isAuthenticated) {
        redirect('/admin/login')
    }
}


export async function signJwt(jwtPayload: JwtPayload) {
    return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' }).setIssuedAt().setExpirationTime(loginExpStr).sign(jwtEncodedKey);
}

export async function verifyJwt(jwt: string | undefined = '') {
    /*
    Abre o token, verifica se é válido, e pega os dados enviados no payload
    */
    try {
        const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
            algorithms: ['HS256']
        })
        return payload
    } catch {
        console.log('Invalid token')
        return false
    }
}
