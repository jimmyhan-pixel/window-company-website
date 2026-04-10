import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getSession } from '@/lib/session'
import { getStartOfTodayIso } from '@/lib/dashboard-time'

export async function GET() {
    try {
        // Check authentication
        const session = await getSession()
        if (!session.isLoggedIn) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const startOfToday = getStartOfTodayIso()

        // 获取总访问量
        const { count: totalViews } = await supabaseAdmin
            .from('page_views')
            .select('*', { count: 'exact', head: true })

        // 获取今日访问量
        const { count: todayViews } = await supabaseAdmin
            .from('page_views')
            .select('*', { count: 'exact', head: true })
            .gte('viewed_at', startOfToday)

        // 获取今日询价记录，并按 quote_number 去重统计
        const { data: todayQuoteRows } = await supabaseAdmin
            .from('quotes')
            .select('id, quote_number')
            .gte('created_at', startOfToday)

        const todayQuotes = new Set(
            (todayQuoteRows || []).map((row) => row.quote_number || row.id)
        ).size

        return NextResponse.json({
            totalViews: totalViews || 0,
            todayViews: todayViews || 0,
            todayQuotes: todayQuotes || 0
        })
    } catch (error) {
        console.error('Stats API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
