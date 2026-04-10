import { ensureGridConfig, isGridConfigValid, type GridConfig } from '@/lib/grids'

export interface QuoteItemInput {
    material: string | null
    aluminumCategory: string | null
    windowType: string
    casementDesign?: 'single' | 'double' | ''
    casementOpenDirection?: 'left' | 'right' | ''
    grids: GridConfig
    color: string
    width: string
    height: string
    glassType: string
    glassTypeOther?: string
    glassThickness: string
    glassThicknessOther?: string
    quantity: string
}

export interface QuoteGroupInput {
    id?: string
    name: string
    items: QuoteItemInput[]
}

export interface ValidatedQuoteSubmission {
    contactName: string
    email: string
    phone: string
    projectAddress: string
    groups: QuoteGroupInput[]
    ungroupedItems: QuoteItemInput[]
    usingGroupedPayload: boolean
}

const VINYL_WINDOW_TYPES = new Set([
    'Double Hung',
    'Two Lites Slider',
    'Three Lites Slider',
    'Picture Window',
    'Casement',
    'Hopper',
    'Awning',
    'Bow Window',
    'Bay Window',
])

const ALUMINUM_RESIDENTIAL_WINDOW_TYPES = new Set([
    'Double Hung',
    'Two Lites Slider',
    'Three Lites Slider',
    'Picture Window',
])

const ALUMINUM_COMMERCIAL_WINDOW_TYPES = new Set([
    'Casement',
    'Hopper',
    'Awning',
])

const ALLOWED_GLASS_MATERIALS = new Set(['Clear', 'Frosted', 'Tempered'])
const ALLOWED_GLASS_THICKNESSES = new Set(['Standard 1/16"', '1/8"', '3/16"'])
const ALLOWED_ALUMINUM_COLORS = new Set(['White', 'Bronze', 'Black'])

function sanitizeText(value: unknown, maxLength: number) {
    return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function sanitizeOptionalText(value: unknown, maxLength: number) {
    const sanitized = sanitizeText(value, maxLength)
    return sanitized || ''
}

function sanitizeEmail(value: unknown) {
    return sanitizeText(value, 254).toLowerCase()
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string) {
    return phone === '' || /^[0-9+().\-\s]{7,25}$/.test(phone)
}

function normalizeDimension(value: unknown) {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return String(value)
    }

    if (typeof value !== 'string') return ''
    return value.trim()
}

function isPositiveDecimalInRange(value: string, min: number, max: number) {
    if (!/^\d+(\.\d{1,2})?$/.test(value)) return false
    const parsed = Number(value)
    return Number.isFinite(parsed) && parsed >= min && parsed <= max
}

function normalizeQuantity(value: unknown) {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return String(Math.trunc(value))
    }

    if (typeof value !== 'string') return ''
    return value.trim()
}

function isPositiveIntegerInRange(value: string, min: number, max: number) {
    if (!/^\d+$/.test(value)) return false
    const parsed = Number.parseInt(value, 10)
    return Number.isInteger(parsed) && parsed >= min && parsed <= max
}

function resolveCustomValue(primaryValue: string, otherValue: string) {
    return otherValue || primaryValue
}

function getGridWindowType(windowType: string, casementDesign: QuoteItemInput['casementDesign']) {
    return windowType === 'Casement' && casementDesign === 'double'
        ? 'Casement Double'
        : windowType
}

function isValidWindowType(material: string, aluminumCategory: string, windowType: string) {
    if (material === 'vinyl') {
        return VINYL_WINDOW_TYPES.has(windowType)
    }

    if (material === 'aluminum' && aluminumCategory === 'residential') {
        return ALUMINUM_RESIDENTIAL_WINDOW_TYPES.has(windowType)
    }

    if (material === 'aluminum' && aluminumCategory === 'commercial') {
        return ALUMINUM_COMMERCIAL_WINDOW_TYPES.has(windowType)
    }

    return false
}

function validateItem(rawItem: unknown): QuoteItemInput | null {
    if (!rawItem || typeof rawItem !== 'object') return null

    const item = rawItem as Partial<QuoteItemInput>
    const material = item.material === 'vinyl' || item.material === 'aluminum' ? item.material : null
    const aluminumCategory = item.aluminumCategory === 'residential' || item.aluminumCategory === 'commercial'
        ? item.aluminumCategory
        : null
    const windowType = sanitizeText(item.windowType, 80)
    const casementDesign = item.casementDesign === 'single' || item.casementDesign === 'double' ? item.casementDesign : ''
    const casementOpenDirection = item.casementOpenDirection === 'left' || item.casementOpenDirection === 'right'
        ? item.casementOpenDirection
        : ''
    const color = sanitizeText(item.color, 40)
    const width = normalizeDimension(item.width)
    const height = normalizeDimension(item.height)
    const quantity = normalizeQuantity(item.quantity)
    const glassType = sanitizeText(item.glassType, 60)
    const glassTypeOther = sanitizeOptionalText(item.glassTypeOther, 80)
    const glassThickness = sanitizeText(item.glassThickness, 40)
    const glassThicknessOther = sanitizeOptionalText(item.glassThicknessOther, 40)
    const gridWindowType = getGridWindowType(windowType, casementDesign)
    const grids = ensureGridConfig(gridWindowType, item.grids)

    if (!material) return null
    if (material === 'vinyl' && aluminumCategory) return null
    if (material === 'aluminum' && !aluminumCategory) return null
    if (!isValidWindowType(material, aluminumCategory || '', windowType)) return null
    if (!isPositiveDecimalInRange(width, 1, 240)) return null
    if (!isPositiveDecimalInRange(height, 1, 240)) return null
    if (!isPositiveIntegerInRange(quantity, 1, 100)) return null

    if (material === 'vinyl' && color !== 'White') return null
    if (material === 'aluminum' && !ALLOWED_ALUMINUM_COLORS.has(color)) return null

    const resolvedGlassType = resolveCustomValue(glassType, glassTypeOther)
    const resolvedGlassThickness = resolveCustomValue(glassThickness, glassThicknessOther)

    if (!resolvedGlassType || (!ALLOWED_GLASS_MATERIALS.has(glassType) && !glassTypeOther)) return null
    if (!resolvedGlassThickness || (!ALLOWED_GLASS_THICKNESSES.has(glassThickness) && !glassThicknessOther)) return null

    if (windowType === 'Casement') {
        if (casementDesign !== 'single' && casementDesign !== 'double') return null
        if (casementDesign === 'single' && casementOpenDirection !== 'left' && casementOpenDirection !== 'right') return null
    }

    if (!isGridConfigValid(gridWindowType, grids)) return null

    return {
        material,
        aluminumCategory,
        windowType,
        casementDesign,
        casementOpenDirection,
        grids,
        color,
        width,
        height,
        glassType,
        glassTypeOther,
        glassThickness,
        glassThicknessOther,
        quantity,
    }
}

function validateGroups(rawGroups: unknown) {
    if (!Array.isArray(rawGroups)) return []

    return rawGroups
        .map((rawGroup): QuoteGroupInput | null => {
            if (!rawGroup || typeof rawGroup !== 'object') return null

            const group = rawGroup as Partial<QuoteGroupInput>
            const name = sanitizeText(group.name, 60)
            const items = Array.isArray(group.items)
                ? group.items.map(validateItem).filter((item): item is QuoteItemInput => item !== null)
                : []

            if (!name || items.length === 0) return null

            const sanitizedId = sanitizeOptionalText(group.id, 80) || undefined

            return {
                ...(sanitizedId ? { id: sanitizedId } : {}),
                name,
                items,
            }
        })
        .filter((group): group is QuoteGroupInput => group !== null)
}

function validateUngroupedItems(rawItems: unknown) {
    if (!Array.isArray(rawItems)) return []

    return rawItems
        .map(validateItem)
        .filter((item): item is QuoteItemInput => item !== null)
}

export function validateQuoteSubmission(body: unknown): ValidatedQuoteSubmission | null {
    if (!body || typeof body !== 'object') return null

    const rawBody = body as Record<string, unknown>
    const email = sanitizeEmail(rawBody.email)
    const phone = sanitizeOptionalText(rawBody.phone, 25)
    const contactName = sanitizeText(rawBody.contactName, 80)
    const projectAddress = sanitizeText(rawBody.projectAddress, 200)
    const groups = validateGroups(rawBody.groups)
    const ungroupedItems = validateUngroupedItems(rawBody.ungroupedItems)
    const usingGroupedPayload = groups.length > 0 || ungroupedItems.length > 0

    if (!isValidEmail(email) || !isValidPhone(phone)) {
        return null
    }

    if (usingGroupedPayload) {
        const totalItems = groups.reduce((count, group) => count + group.items.length, 0) + ungroupedItems.length

        if (!contactName || !projectAddress) return null
        if (groups.length > 10 || totalItems === 0 || totalItems > 50) return null

        return {
            contactName,
            email,
            phone,
            projectAddress,
            groups,
            ungroupedItems,
            usingGroupedPayload,
        }
    }

    const singleItem = validateItem(rawBody)
    if (!singleItem) return null

    return {
        contactName,
        email,
        phone,
        projectAddress,
        groups: [],
        ungroupedItems: [singleItem],
        usingGroupedPayload: false,
    }
}
