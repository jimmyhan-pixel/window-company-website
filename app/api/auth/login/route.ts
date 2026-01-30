import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json()

        // Validate credentials
        const validUsername = process.env.DASHBOARD_USERNAME
        const validPassword = process.env.DASHBOARD_PASSWORD

        if (!validUsername || !validPassword) {
            return NextResponse.json(
                { error: 'Dashboard credentials not configured' },
                { status: 500 }
            )
        }

        if (username === validUsername && password === validPassword) {
            // Create session
            const session = await getSession()
            session.isLoggedIn = true
            session.username = username
            await session.save()

            return NextResponse.json({ success: true })
        } else {
            return NextResponse.json(
                { error: '用户名或密码错误' },
                { status: 401 }
            )
        }
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
