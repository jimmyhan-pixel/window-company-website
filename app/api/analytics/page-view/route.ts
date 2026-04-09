import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: Request) {
    try {
        const { page_path = '/' } = await request.json()
        const userAgent = request.headers.get('user-agent')
        const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null

        // 记录访问
        const { error } = await supabaseAdmin
            .from('page_views')
            .insert([
                {
                    page_path,
                    viewed_at: new Date().toISOString(),
                    user_agent: userAgent,
                    ip_address: ipAddress,
                }
            ])

        if (error) {
            console.error('Failed to record page view:', error)
            // 不返回错误，避免影响用户体验
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Page view API error:', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
