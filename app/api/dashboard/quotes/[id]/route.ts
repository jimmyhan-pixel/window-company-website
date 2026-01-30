import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/session'

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check authentication
        const session = await getSession()
        if (!session.isLoggedIn) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { id } = await params
        const body = await request.json()
        const { status, notes, quote_amount } = body

        // Build update object
        const updates: any = {}
        if (status) updates.status = status
        if (notes !== undefined) updates.notes = notes
        if (quote_amount !== undefined) updates.quote_amount = quote_amount

        // Update quote
        const { data, error } = await supabase
            .from('quotes')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: 'Failed to update quote' },
                { status: 500 }
            )
        }

        return NextResponse.json({ quote: data })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
