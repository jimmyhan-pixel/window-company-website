import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/session'

export async function GET(request: Request) {
    try {
        // Check authentication
        const session = await getSession()
        if (!session.isLoggedIn) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Build query - exclude customer information for privacy
        const { data, error } = await supabase
            .from('quotes')
            .select('id, quote_number, created_at, material, aluminum_category, window_type, grids, color, width, height, quantity')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: 'Failed to fetch quotes' },
                { status: 500 }
            )
        }

        return NextResponse.json({ quotes: data })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
