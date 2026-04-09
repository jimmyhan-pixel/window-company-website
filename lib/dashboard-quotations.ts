import { ensureGridConfig, type GridConfig, type GridPatternId } from '@/lib/grids'

export interface QuoteRow {
    id: string
    quote_number: string | null
    created_at: string
    material: string
    aluminum_category?: string | null
    window_type: string
    grids?: string | null
    color: string
    width: number
    height: number
    quantity: number
    customer_email?: string | null
    customer_phone?: string | null
    customer_name?: string | null
    project_address?: string | null
}

export interface ParsedQuoteItem extends QuoteRow {
    groupName: string
    displayWindowType: string
    previewWindowType: string
    gridWindowType: string
    casementDesign: 'single' | 'double'
    casementOpenDirection: 'left' | 'right'
    parsedGrids: GridConfig
    frameColor: string
}

export interface QuotationGroup {
    name: string
    items: ParsedQuoteItem[]
}

export interface QuotationDetail {
    id: string
    quoteNumber: string
    createdAt: string
    customerName: string
    customerEmail: string
    customerPhone: string
    projectAddress: string
    itemCount: number
    materials: string[]
    groups: QuotationGroup[]
    ungroupedItems: ParsedQuoteItem[]
}

export interface QuotationSummary {
    id: string
    quoteNumber: string
    createdAt: string
    customerName: string
    itemCount: number
    materials: string[]
    groupNames: string[]
    title: string
    description: string
}

function getFrameColor(color: string) {
    if (color === 'White') return '#ffffff'
    if (color === 'Bronze') return '#5d4037'
    if (color === 'Black') return '#1a1a1a'
    return '#4a4a4a'
}

function parseGridPattern(patternLabel: string) {
    const normalized = patternLabel.trim()

    if (normalized === 'None') {
        return { pattern: 'none' as GridPatternId, customVertical: '', customHorizontal: '' }
    }

    if (normalized === '1v1h' || normalized === '1v2h' || normalized === '2v1h' || normalized === '2v2h') {
        return { pattern: normalized, customVertical: '', customHorizontal: '' }
    }

    const customMatch = normalized.match(/^(\d+)v(\d+)h$/i)
    if (customMatch) {
        return {
            pattern: 'custom' as GridPatternId,
            customVertical: customMatch[1],
            customHorizontal: customMatch[2],
        }
    }

    return { pattern: 'none' as GridPatternId, customVertical: '', customHorizontal: '' }
}

export function parseGridConfig(windowType: string, grids?: string | null): GridConfig {
    if (!grids) {
        return ensureGridConfig(windowType, [])
    }

    if (!grids.includes(':')) {
        return ensureGridConfig(windowType, [parseGridPattern(grids)])
    }

    const sections = grids.split(' | ').map((part) => {
        const [, value = 'None'] = part.split(': ')
        return parseGridPattern(value)
    })

    return ensureGridConfig(windowType, sections)
}

export function parseWindowType(windowType: string) {
    const groupMatch = windowType.match(/^\[(.+?)\]\s*(.+)$/)
    const groupName = groupMatch?.[1] || ''
    const rawType = groupMatch?.[2] || windowType

    if (rawType === 'Casement - Double') {
        return {
            groupName,
            displayWindowType: rawType,
            previewWindowType: 'Casement',
            gridWindowType: 'Casement Double',
            casementDesign: 'double' as const,
            casementOpenDirection: 'left' as const,
        }
    }

    if (rawType.startsWith('Casement - Single')) {
        return {
            groupName,
            displayWindowType: rawType,
            previewWindowType: 'Casement',
            gridWindowType: 'Casement',
            casementDesign: 'single' as const,
            casementOpenDirection: rawType.includes('Right') ? 'right' as const : 'left' as const,
        }
    }

    return {
        groupName,
        displayWindowType: rawType,
        previewWindowType: rawType,
        gridWindowType: rawType,
        casementDesign: 'single' as const,
        casementOpenDirection: 'left' as const,
    }
}

export function parseQuoteRow(row: QuoteRow): ParsedQuoteItem {
    const windowTypeInfo = parseWindowType(row.window_type)

    return {
        ...row,
        ...windowTypeInfo,
        parsedGrids: parseGridConfig(windowTypeInfo.gridWindowType, row.grids),
        frameColor: getFrameColor(row.color),
    }
}

export function buildQuotationDetail(rows: QuoteRow[]): QuotationDetail {
    const sortedRows = [...rows].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    const parsedItems = sortedRows.map(parseQuoteRow)
    const firstRow = sortedRows[0]
    const groupsMap = new Map<string, ParsedQuoteItem[]>()
    const ungroupedItems: ParsedQuoteItem[] = []

    parsedItems.forEach((item) => {
        if (item.groupName) {
            groupsMap.set(item.groupName, [...(groupsMap.get(item.groupName) || []), item])
        } else {
            ungroupedItems.push(item)
        }
    })

    return {
        id: firstRow.id,
        quoteNumber: firstRow.quote_number || firstRow.id.slice(0, 8),
        createdAt: firstRow.created_at,
        customerName: firstRow.customer_name || '',
        customerEmail: firstRow.customer_email || '',
        customerPhone: firstRow.customer_phone || '',
        projectAddress: firstRow.project_address || '',
        itemCount: parsedItems.length,
        materials: Array.from(new Set(parsedItems.map((item) => item.material))),
        groups: Array.from(groupsMap.entries()).map(([name, items]) => ({ name, items })),
        ungroupedItems,
    }
}

export function buildQuotationSummaries(rows: QuoteRow[]): QuotationSummary[] {
    const rowsByQuote = new Map<string, QuoteRow[]>()

    rows.forEach((row) => {
        const key = row.quote_number || row.id
        rowsByQuote.set(key, [...(rowsByQuote.get(key) || []), row])
    })

    return Array.from(rowsByQuote.values())
        .map((groupedRows) => {
            const detail = buildQuotationDetail(groupedRows)
            const firstItem = detail.groups[0]?.items[0] || detail.ungroupedItems[0]
            const groupNames = detail.groups.map((group) => group.name)
            const title = detail.itemCount === 1 && firstItem
                ? `${firstItem.displayWindowType} (${firstItem.material})`
                : `${detail.itemCount} window items${groupNames.length ? ` · ${groupNames.join(', ')}` : ''}`
            const description = detail.itemCount === 1 && firstItem
                ? `${firstItem.width}" × ${firstItem.height}" × ${firstItem.quantity} · ${firstItem.color}${firstItem.grids ? ` · ${firstItem.grids}` : ''}`
                : `${detail.materials.join(', ')}${detail.customerName ? ` · ${detail.customerName}` : ''}`

            return {
                id: detail.id,
                quoteNumber: detail.quoteNumber,
                createdAt: detail.createdAt,
                customerName: detail.customerName,
                itemCount: detail.itemCount,
                materials: detail.materials,
                groupNames,
                title,
                description,
            }
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}
