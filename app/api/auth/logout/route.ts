import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { createAuditLog } from '@/lib/audit-log'
import { getClientIp } from '@/lib/request'

export async function POST(request: Request) {
    try {
        const session = await getSession()
        const username = session.username || null
        const ip = getClientIp(request)

        await createAuditLog({
            action: 'dashboard_logout',
            actor: username,
            actorType: 'admin',
            ipAddress: ip,
        })

        session.destroy()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
