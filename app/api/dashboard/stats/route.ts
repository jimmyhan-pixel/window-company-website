import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/session'

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

        // 获取总访问量（首页）
        const { count: totalViews } = await supabase
            .from('page_views')
            .select('*', { count: 'exact', head: true })
            .eq('page_path', '/')

        // 获取本月访问量（首页）
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        const { count: monthlyViews } = await supabase
            .from('page_views')
            .select('*', { count: 'exact', head: true })
            .eq('page_path', '/')
            .gte('viewed_at', startOfMonth.toISOString())

        // 获取今日询价数量
        const startOfToday = new Date()
        startOfToday.setHours(0, 0, 0, 0)

        const { count: todayQuotes } = await supabase
            .from('quotes')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', startOfToday.toISOString())

        return NextResponse.json({
            totalViews: totalViews || 0,
            monthlyViews: monthlyViews || 0,
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
