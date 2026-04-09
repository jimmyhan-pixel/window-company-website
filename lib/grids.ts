export type GridPatternId = 'none' | '1v1h' | '1v2h' | '2v1h' | '2v2h' | 'custom'

export interface GridSectionConfig {
    pattern: GridPatternId
    customVertical?: string
    customHorizontal?: string
}

export type GridConfig = GridSectionConfig[]

export interface GridPatternOption {
    id: GridPatternId
    label: string
}

export const GRID_PATTERN_OPTIONS: GridPatternOption[] = [
    { id: 'none', label: 'None' },
    { id: '1v1h', label: '1v1h' },
    { id: '1v2h', label: '1v2h' },
    { id: '2v1h', label: '2v1h' },
    { id: '2v2h', label: '2v2h' },
    { id: 'custom', label: 'Custom' },
]

const GRID_PATTERN_COUNTS: Record<Exclude<GridPatternId, 'custom'>, { vertical: number; horizontal: number }> = {
    none: { vertical: 0, horizontal: 0 },
    '1v1h': { vertical: 1, horizontal: 1 },
    '1v2h': { vertical: 1, horizontal: 2 },
    '2v1h': { vertical: 2, horizontal: 1 },
    '2v2h': { vertical: 2, horizontal: 2 },
}

function sanitizeCount(value: string | undefined) {
    const parsed = Number.parseInt(value || '', 10)
    if (!Number.isFinite(parsed) || parsed < 0) return 0
    return Math.min(parsed, 6)
}

function isGridPatternId(value: unknown): value is GridPatternId {
    return GRID_PATTERN_OPTIONS.some((option) => option.id === value)
}

export function createEmptyGridSection(): GridSectionConfig {
    return {
        pattern: 'none',
        customVertical: '',
        customHorizontal: '',
    }
}

export function getWindowGridSections(windowType: string) {
    switch (windowType) {
        case 'Double Hung':
            return ['Top Sash', 'Bottom Sash']
        case 'Two Lites Slider':
        case 'Casement Double':
            return ['Left Panel', 'Right Panel']
        case 'Three Lites Slider':
        case 'Bow Window':
        case 'Bay Window':
            return ['Left Panel', 'Center Panel', 'Right Panel']
        case 'Picture Window':
        case 'Casement':
        case 'Hopper':
        case 'Awning':
        default:
            return ['Main Panel']
    }
}

export function ensureGridConfig(windowType: string, grids: unknown): GridConfig {
    const rawSections = Array.isArray(grids) ? grids : []

    return getWindowGridSections(windowType).map((_, index) => {
        const rawSection = rawSections[index]

        if (!rawSection || typeof rawSection !== 'object') {
            return createEmptyGridSection()
        }

        const pattern = isGridPatternId((rawSection as { pattern?: unknown }).pattern)
            ? (rawSection as { pattern: GridPatternId }).pattern
            : 'none'

        return {
            pattern,
            customVertical: typeof (rawSection as { customVertical?: unknown }).customVertical === 'string'
                ? (rawSection as { customVertical: string }).customVertical
                : '',
            customHorizontal: typeof (rawSection as { customHorizontal?: unknown }).customHorizontal === 'string'
                ? (rawSection as { customHorizontal: string }).customHorizontal
                : '',
        }
    })
}

export function resolveGridCounts(section: GridSectionConfig | undefined) {
    if (!section) {
        return { vertical: 0, horizontal: 0 }
    }

    if (section.pattern === 'custom') {
        return {
            vertical: sanitizeCount(section.customVertical),
            horizontal: sanitizeCount(section.customHorizontal),
        }
    }

    return GRID_PATTERN_COUNTS[section.pattern]
}

export function isGridSectionValid(section: GridSectionConfig | undefined) {
    if (!section) return false
    if (section.pattern !== 'custom') return true

    const hasVertical = section.customVertical?.trim() !== ''
    const hasHorizontal = section.customHorizontal?.trim() !== ''

    return hasVertical && hasHorizontal
}

export function isGridConfigValid(windowType: string, grids: unknown) {
    return ensureGridConfig(windowType, grids).every((section) => isGridSectionValid(section))
}

export function formatGridPattern(section: GridSectionConfig | undefined) {
    if (!section) return 'None'
    if (section.pattern !== 'custom') {
        return GRID_PATTERN_OPTIONS.find((option) => option.id === section.pattern)?.label || 'None'
    }

    const { vertical, horizontal } = resolveGridCounts(section)
    return `${vertical}v${horizontal}h`
}

export function formatGridConfig(windowType: string, grids: unknown) {
    const sections = ensureGridConfig(windowType, grids)
    const labels = getWindowGridSections(windowType)

    if (sections.length === 1) {
        return formatGridPattern(sections[0])
    }

    return sections
        .map((section, index) => `${labels[index]}: ${formatGridPattern(section)}`)
        .join(' | ')
}
