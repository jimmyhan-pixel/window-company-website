import { supabaseAdmin } from '@/lib/supabase-admin'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { ensureGridConfig, formatGridConfig } from '@/lib/grids'
import { validateQuoteSubmission, type QuoteItemInput } from '@/lib/quote-validation'
import { createAuditLog } from '@/lib/audit-log'
import { getClientIp } from '@/lib/request'

const resend = new Resend(process.env.RESEND_API_KEY)
const GLASS_UNIT_TOTAL_THICKNESS = '7/8"'

function resolveCustomValue(value: string, otherValue?: string) {
    return typeof otherValue === 'string' && otherValue.trim()
        ? otherValue.trim()
        : value
}

function formatCasementWindowType(
    windowType: string,
    casementDesign?: QuoteItemInput['casementDesign'],
    casementOpenDirection?: QuoteItemInput['casementOpenDirection'],
) {
    if (windowType !== 'Casement') {
        return windowType
    }

    if (casementDesign === 'double') {
        return 'Casement - Double'
    }

    return `Casement - Single (${casementOpenDirection === 'right' ? 'Stand Inside Open From Right' : 'Stand Inside Open From Left'})`
}

function normalizeQuoteItem(item: QuoteItemInput) {
    const windowType = item.windowType || ''
    const casementDesign = item.casementDesign || ''
    const casementOpenDirection = item.casementOpenDirection || ''
    const gridWindowType = windowType === 'Casement' && casementDesign === 'double' ? 'Casement Double' : windowType
    const normalizedGrids = ensureGridConfig(gridWindowType, Array.isArray(item.grids) ? item.grids : [])
    const formattedGrids = formatGridConfig(gridWindowType, normalizedGrids)
    const resolvedGlassType = resolveCustomValue(item.glassType || '', item.glassTypeOther)
    const resolvedGlassThickness = resolveCustomValue(item.glassThickness || '', item.glassThicknessOther)
    const glassUnitThickness = resolvedGlassThickness ? GLASS_UNIT_TOTAL_THICKNESS : ''
    const isCasementValid = windowType !== 'Casement'
        || (
            (casementDesign === 'single' || casementDesign === 'double')
            && (casementDesign === 'double' || casementOpenDirection === 'left' || casementOpenDirection === 'right')
        )

    return {
        material: item.material || '',
        aluminumCategory: item.aluminumCategory || '',
        windowType,
        casementDesign,
        casementOpenDirection,
        formattedWindowType: formatCasementWindowType(windowType, casementDesign, casementOpenDirection),
        grids: formattedGrids,
        color: item.color || '',
        width: item.width || '',
        height: item.height || '',
        glassType: resolvedGlassType,
        glassThickness: resolvedGlassThickness,
        glassUnitThickness,
        quantity: item.quantity || '1',
        isValid: Boolean(windowType && resolvedGlassType && resolvedGlassThickness && isCasementValid),
    }
}

function renderItemTableRows(item: ReturnType<typeof normalizeQuoteItem>) {
    return `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Material:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${item.material}</td>
      </tr>
      ${item.aluminumCategory ? `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Category:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${item.aluminumCategory}</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Window Type:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${item.formattedWindowType}</td>
      </tr>
      ${item.windowType === 'Casement' ? `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Casement Design:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${item.casementDesign === 'double' ? 'Double Casement' : 'Single Casement'}</td>
      </tr>
      ${item.casementDesign === 'single' ? `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Opening Direction:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${item.casementOpenDirection === 'right' ? 'Stand Inside Open From Right' : 'Stand Inside Open From Left'}</td>
      </tr>
      ` : ''}
      ` : ''}
      ${item.grids ? `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Grids:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${item.grids}</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Color:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${item.color}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Size:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${item.width}" × ${item.height}"</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Glass Material:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${item.glassType}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Single Pane Thickness:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${item.glassThickness}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Glass Unit Total Thickness:</strong></td>
        <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${item.glassUnitThickness}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>Quantity:</strong></td>
        <td style="padding: 8px 0;">${item.quantity}</td>
      </tr>
    `
}

function renderItemListRows(item: ReturnType<typeof normalizeQuoteItem>) {
    return `
      <li><strong>Window Type:</strong> ${item.formattedWindowType}</li>
      <li><strong>Size:</strong> ${item.width}" × ${item.height}"</li>
      <li><strong>Color:</strong> ${item.color}</li>
      ${item.grids ? `<li><strong>Grids:</strong> ${item.grids}</li>` : ''}
      <li><strong>Glass Material:</strong> ${item.glassType}</li>
      <li><strong>Single Pane Thickness:</strong> ${item.glassThickness}</li>
      <li><strong>Glass Unit Total Thickness:</strong> ${item.glassUnitThickness}</li>
      <li><strong>Quantity:</strong> ${item.quantity}</li>
    `
}

function isMissingProjectAddressColumn(error: unknown) {
    const message = typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message?: unknown }).message || '')
        : ''

    return message.includes('project_address')
}

export async function POST(request: Request) {
    try {
        const clientIp = getClientIp(request)
        const body = await request.json()
        const validatedSubmission = validateQuoteSubmission(body)

        if (!validatedSubmission) {
            return NextResponse.json(
                { error: 'Invalid quotation payload' },
                { status: 400 }
            )
        }

        const {
            contactName,
            email,
            phone: normalizedPhone,
            projectAddress,
            groups,
            ungroupedItems: validatedUngroupedItems,
        } = validatedSubmission

        const groupedItems = groups.map((group) => ({
            name: group.name,
            items: group.items.map((item) => normalizeQuoteItem(item)),
        }))

        const ungroupedItems = validatedUngroupedItems.map((item) => normalizeQuoteItem(item))

        const allItems = [
            ...groupedItems.flatMap((group) => group.items.map((item) => ({ ...item, groupName: group.name }))),
            ...ungroupedItems.map((item) => ({ ...item, groupName: '' })),
        ]

        if (!email || allItems.length === 0 || allItems.some((item) => !item.isValid)) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        try {
            const buildDbRows = (includeProjectAddress: boolean) => allItems.map((item) => ({
                material: item.material,
                aluminum_category: item.aluminumCategory || null,
                window_type: item.groupName ? `[${item.groupName}] ${item.formattedWindowType}` : item.formattedWindowType,
                grids: item.grids,
                color: item.color,
                width: item.width,
                height: item.height,
                quantity: item.quantity,
                customer_email: email,
                customer_phone: normalizedPhone || '',
                customer_name: contactName || null,
                ...(includeProjectAddress ? { project_address: projectAddress || null } : {}),
            }))

            const insertQuoteRows = async (includeProjectAddress: boolean) => {
                const dbRows = buildDbRows(includeProjectAddress)
                const [firstRow, ...remainingRows] = dbRows

                const { data: insertedFirstRow, error: firstInsertError } = await supabaseAdmin
                    .from('quotes')
                    .insert(firstRow)
                    .select('quote_number')
                    .single()

                if (firstInsertError || !insertedFirstRow?.quote_number) {
                    return {
                        sharedQuoteNumber: null,
                        error: firstInsertError || new Error('Missing quote number'),
                    }
                }

                if (remainingRows.length > 0) {
                    const { error: remainingInsertError } = await supabaseAdmin
                        .from('quotes')
                        .insert(remainingRows.map((row) => ({
                            ...row,
                            quote_number: insertedFirstRow.quote_number,
                        })))

                    if (remainingInsertError) {
                        return {
                            sharedQuoteNumber: null,
                            error: remainingInsertError,
                        }
                    }
                }

                return {
                    sharedQuoteNumber: insertedFirstRow.quote_number,
                    error: null,
                }
            }

            let { sharedQuoteNumber, error: dbInsertError } = await insertQuoteRows(true)

            if (dbInsertError && isMissingProjectAddressColumn(dbInsertError)) {
                const fallbackInsert = await insertQuoteRows(false)
                sharedQuoteNumber = fallbackInsert.sharedQuoteNumber
                dbInsertError = fallbackInsert.error
            }

            if (dbInsertError || !sharedQuoteNumber) {
                console.error('Database error:', dbInsertError)
                return NextResponse.json(
                    { error: 'Failed to save quote' },
                    { status: 500 }
                )
            }

            const companySections = [
                groupedItems.map((group) => `
                  <div style="background: #f7f8f3; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">${group.name}</h3>
                    ${group.items.map((item, index) => `
                      <div style="padding-top: ${index === 0 ? '0' : '20px'}; margin-top: ${index === 0 ? '0' : '20px'}; border-top: ${index === 0 ? 'none' : '1px solid #ddd'};">
                        <h4 style="margin: 0 0 12px 0;">Item ${index + 1}</h4>
                        <table style="width: 100%; border-collapse: collapse;">
                          ${renderItemTableRows(item)}
                        </table>
                      </div>
                    `).join('')}
                  </div>
                `).join(''),
                ungroupedItems.length > 0 ? `
                  <div style="background: #f7f8f3; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Ungrouped Windows</h3>
                    ${ungroupedItems.map((item, index) => `
                      <div style="padding-top: ${index === 0 ? '0' : '20px'}; margin-top: ${index === 0 ? '0' : '20px'}; border-top: ${index === 0 ? 'none' : '1px solid #ddd'};">
                        <h4 style="margin: 0 0 12px 0;">Item ${index + 1}</h4>
                        <table style="width: 100%; border-collapse: collapse;">
                          ${renderItemTableRows(item)}
                        </table>
                      </div>
                    `).join('')}
                  </div>
                ` : '',
            ].join('')

            const customerSections = [
                groupedItems.map((group) => `
                  <div style="margin: 20px 0;">
                    <h3 style="color: #738751; margin-bottom: 10px;">${group.name}</h3>
                    ${group.items.map((item, index) => `
                      <div style="margin-bottom: 16px;">
                        <p><strong>Item ${index + 1}</strong></p>
                        <ul>
                          ${renderItemListRows(item)}
                        </ul>
                      </div>
                    `).join('')}
                  </div>
                `).join(''),
                ungroupedItems.length > 0 ? `
                  <div style="margin: 20px 0;">
                    <h3 style="color: #738751; margin-bottom: 10px;">Ungrouped Windows</h3>
                    ${ungroupedItems.map((item, index) => `
                      <div style="margin-bottom: 16px;">
                        <p><strong>Item ${index + 1}</strong></p>
                        <ul>
                          ${renderItemListRows(item)}
                        </ul>
                      </div>
                    `).join('')}
                  </div>
                ` : '',
            ].join('')

            const { error: companyEmailError } = await resend.emails.send({
                from: 'Quote Request <onboarding@resend.dev>',
                to: process.env.COMPANY_EMAIL || 'your@email.com',
                subject: `New Quote Request #${sharedQuoteNumber}`,
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto;">
                    <h2 style="color: #738751;">New Quote Request</h2>
                    <div style="background: #fff; padding: 20px; border: 2px solid #738751; border-radius: 8px; margin: 20px 0;">
                      <h3 style="margin-top: 0; color: #738751;">Project Contact</h3>
                      <p><strong>Quote Number:</strong> #${sharedQuoteNumber}</p>
                      ${contactName ? `<p><strong>Contact Name:</strong> ${contactName}</p>` : ''}
                      ${projectAddress ? `<p><strong>Project Address:</strong> ${projectAddress}</p>` : ''}
                      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                      ${normalizedPhone ? `<p><strong>Phone:</strong> <a href="tel:${normalizedPhone}">${normalizedPhone}</a></p>` : ''}
                    </div>
                    ${companySections}
                    <p style="color: #666; font-size: 12px; margin-top: 30px;">
                      This quote request was submitted via the website quotation form.
                    </p>
                  </div>
                `
            })

            if (companyEmailError) {
                console.error('Resend company email error:', companyEmailError)
            }

            const { error: customerEmailError } = await resend.emails.send({
                from: 'City Windows <onboarding@resend.dev>',
                to: email,
                subject: `Quote Request Received #${sharedQuoteNumber} - City Windows`,
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto;">
                    <h2 style="color: #738751;">Thank You for Your Quote Request!</h2>
                    <p><strong>Quote Number:</strong> #${sharedQuoteNumber}</p>
                    ${contactName ? `<p><strong>Contact Name:</strong> ${contactName}</p>` : ''}
                    ${projectAddress ? `<p><strong>Project Address:</strong> ${projectAddress}</p>` : ''}
                    ${customerSections}
                    <p>Our team will review your request and send you a detailed quote within 24 hours.</p>
                    <p style="margin-top: 30px;">Best regards,<br><strong>City Windows Team</strong></p>
                  </div>
                `
            })

            if (customerEmailError) {
                console.error('Resend customer email error:', customerEmailError)
            }

            await createAuditLog({
                action: 'quote_submitted',
                actor: email,
                actorType: 'visitor',
                targetType: 'quotation',
                targetId: sharedQuoteNumber,
                ipAddress: clientIp,
                metadata: {
                    itemCount: allItems.length,
                    groupCount: groupedItems.length,
                },
            })

            return NextResponse.json(
                { success: true, message: 'Quote request sent successfully', quoteNumber: sharedQuoteNumber },
                { status: 200 }
            )
        } catch (dbError) {
            console.error('Database error:', dbError)
            return NextResponse.json(
                { error: 'Failed to save quote' },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
