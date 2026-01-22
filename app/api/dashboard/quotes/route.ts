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

        // Get query parameters
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const search = searchParams.get('search')

        // Build query
        let query = supabase
            .from('quotes')
            .select('*')
            .order('created_at', { ascending: false })

        // Apply filters
        if (status && status !== 'all') {
            query = query.eq('status', status)
        }

        if (search) {
            query = query.or(`customer_email.ilike.%${search}%,customer_phone.ilike.%${search}%`)
        }

        const { data, error } = await query

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
