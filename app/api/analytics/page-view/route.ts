import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
    try {
        const { page_path = '/' } = await request.json()

        // 记录访问
        const { error } = await supabase
            .from('page_views')
            .insert([
                {
                    page_path,
                    viewed_at: new Date().toISOString()
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
