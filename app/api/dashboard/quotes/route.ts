import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getSession } from '@/lib/session'
import { getStartOfTodayIso } from '@/lib/dashboard-time'
import { buildQuotationSummaries, type QuoteRow } from '@/lib/dashboard-quotations'

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

        const { searchParams } = new URL(request.url)
        const scope = searchParams.get('scope')

        // Build query - aggregate rows by quote_number for multi-item quotations
        let query = supabaseAdmin
            .from('quotes')
            .select('id, quote_number, created_at, material, aluminum_category, window_type, grids, color, width, height, quantity, customer_name, customer_email')
            .order('created_at', { ascending: false })

        if (scope === 'today') {
            query = query.gte('created_at', getStartOfTodayIso())
        }

        const { data, error } = await query.limit(50)

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: 'Failed to fetch quotes' },
                { status: 500 }
            )
        }

        const summaries = buildQuotationSummaries((data || []) as QuoteRow[])

        return NextResponse.json({ quotes: summaries })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
