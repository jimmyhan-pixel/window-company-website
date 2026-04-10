import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getSession } from '@/lib/session'
import { buildQuotationDetail, type QuoteRow } from '@/lib/dashboard-quotations'

function isMissingProjectAddressColumn(error: unknown) {
    const message = typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message?: unknown }).message || '')
        : ''

    return message.includes('project_address')
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession()
        if (!session.isLoggedIn) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { id } = await params

        const fetchSingleQuote = async (includeProjectAddress: boolean) => supabaseAdmin
            .from('quotes')
            .select(includeProjectAddress
                ? 'id, quote_number, created_at, material, aluminum_category, window_type, grids, color, width, height, quantity, customer_email, customer_phone, customer_name, project_address'
                : 'id, quote_number, created_at, material, aluminum_category, window_type, grids, color, width, height, quantity, customer_email, customer_phone, customer_name')
            .eq('id', id)
            .single()

        let { data, error } = await fetchSingleQuote(true)

        if (error && isMissingProjectAddressColumn(error)) {
            const fallbackSingleQuote = await fetchSingleQuote(false)
            data = fallbackSingleQuote.data
            error = fallbackSingleQuote.error
        }

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: 'Failed to fetch quote details' },
                { status: 500 }
            )
        }

        if (!data) {
            return NextResponse.json(
                { error: 'Quote not found' },
                { status: 404 }
            )
        }

        const quote = data as unknown as QuoteRow
        let quoteRows: QuoteRow[] = [quote]

        if (quote.quote_number) {
            const fetchGroupedRows = async (includeProjectAddress: boolean) => supabaseAdmin
                .from('quotes')
                .select(includeProjectAddress
                    ? 'id, quote_number, created_at, material, aluminum_category, window_type, grids, color, width, height, quantity, customer_email, customer_phone, customer_name, project_address'
                    : 'id, quote_number, created_at, material, aluminum_category, window_type, grids, color, width, height, quantity, customer_email, customer_phone, customer_name')
                .eq('quote_number', quote.quote_number)
                .order('created_at', { ascending: true })

            let { data: groupedRows, error: groupedRowsError } = await fetchGroupedRows(true)

            if (groupedRowsError && isMissingProjectAddressColumn(groupedRowsError)) {
                const fallbackGroupedRows = await fetchGroupedRows(false)
                groupedRows = fallbackGroupedRows.data
                groupedRowsError = fallbackGroupedRows.error
            }

            if (groupedRowsError) {
                console.error('Database error:', groupedRowsError)
                return NextResponse.json(
                    { error: 'Failed to fetch quote details' },
                    { status: 500 }
                )
            }

            quoteRows = (groupedRows || []) as unknown as QuoteRow[]
        }

        return NextResponse.json({ quotation: buildQuotationDetail(quoteRows) })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

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
        const updates: Record<string, string | number> = {}
        if (status) updates.status = status
        if (notes !== undefined) updates.notes = notes
        if (quote_amount !== undefined) updates.quote_amount = quote_amount

        // Update quote
        const { data, error } = await supabaseAdmin
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
