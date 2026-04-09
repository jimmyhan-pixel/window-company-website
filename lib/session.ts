import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
    isLoggedIn: boolean
    username?: string
}

const sessionPassword = process.env.SESSION_SECRET

if (process.env.NODE_ENV === 'production') {
    if (!sessionPassword) {
        throw new Error('SESSION_SECRET must be configured in production')
    }

    if (sessionPassword.length < 32) {
        throw new Error('SESSION_SECRET must be at least 32 characters long')
    }
}

const sessionOptions = {
    password: sessionPassword || 'development_only_session_secret_at_least_32_chars',
    cookieName: 'dashboard_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax' as const,
        path: '/',
        maxAge: 60 * 30, // 30 minutes
    },
}

export async function getSession() {
    const cookieStore = await cookies()
    return getIronSession<SessionData>(cookieStore, sessionOptions)
}
