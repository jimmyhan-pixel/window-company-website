import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { getClientIp } from '@/lib/request'
import { clearRateLimit, consumeRateLimit } from '@/lib/rate-limit'
import { createAuditLog } from '@/lib/audit-log'

export async function POST(request: Request) {
    try {
        const ip = getClientIp(request)
        const rateLimit = consumeRateLimit('dashboard-login', ip, {
            windowMs: 15 * 60 * 1000,
            maxRequests: 5,
        })

        if (!rateLimit.allowed) {
            await createAuditLog({
                action: 'dashboard_login_rate_limited',
                actorType: 'visitor',
                ipAddress: ip,
                metadata: {
                    retryAfterSeconds: rateLimit.retryAfterSeconds,
                },
            })

            return NextResponse.json(
                { error: 'Too many login attempts. Please try again later.' },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(rateLimit.retryAfterSeconds),
                    },
                }
            )
        }

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
            clearRateLimit('dashboard-login', ip)

             await createAuditLog({
                action: 'dashboard_login_success',
                actor: username,
                actorType: 'admin',
                ipAddress: ip,
            })

            return NextResponse.json({ success: true })
        } else {
            await createAuditLog({
                action: 'dashboard_login_failed',
                actor: typeof username === 'string' ? username.slice(0, 80) : null,
                actorType: 'visitor',
                ipAddress: ip,
            })

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
