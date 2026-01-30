import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
    isLoggedIn: boolean
    username?: string
}

const sessionOptions = {
    password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long_for_security',
    cookieName: 'dashboard_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 30, // 30 minutes
    },
}

export async function getSession() {
    const cookieStore = await cookies()
    return getIronSession<SessionData>(cookieStore, sessionOptions)
}
