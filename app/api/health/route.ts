import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
    const checks = {
        sessionSecretConfigured: Boolean(process.env.SESSION_SECRET),
        dashboardCredentialsConfigured: Boolean(process.env.DASHBOARD_USERNAME && process.env.DASHBOARD_PASSWORD),
        resendConfigured: Boolean(process.env.RESEND_API_KEY && process.env.COMPANY_EMAIL),
        supabaseConfigured: Boolean(
            process.env.NEXT_PUBLIC_SUPABASE_URL
            && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            && process.env.SUPABASE_SERVICE_ROLE_KEY
        ),
        databaseReachable: false,
    }

    try {
        const { error } = await supabaseAdmin
            .from('quotes')
            .select('id', { head: true, count: 'exact' })
            .limit(1)

        checks.databaseReachable = !error
    } catch {
        checks.databaseReachable = false
    }

    const ok = checks.sessionSecretConfigured
        && checks.dashboardCredentialsConfigured
        && checks.supabaseConfigured
        && checks.databaseReachable

    return NextResponse.json(
        {
            status: ok ? 'ok' : 'degraded',
            timestamp: new Date().toISOString(),
            checks,
        },
        { status: ok ? 200 : 503 }
    )
}
