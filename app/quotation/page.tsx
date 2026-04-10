'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage, type Language } from '@/components/i18n/LanguageProvider'
import {
    GRID_PATTERN_OPTIONS,
    createEmptyGridSection,
    ensureGridConfig,
    formatGridConfig,
    formatGridPattern,
    getWindowGridSections,
    isGridConfigValid,
    resolveGridCounts,
    type GridConfig,
    type GridPatternId,
} from '@/lib/grids'

// ============================================
// Shadcn/UI 组件导入
// 安装命令：
// npx shadcn@latest add button card input label progress badge
// ============================================
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

// ============================================
// 图标导入 (lucide-react)
// ============================================
import {
    ChevronLeft,
    ChevronRight,
    Check,
    Loader2,
    Eye,
    ClipboardList,
    Home,
    Building2,
    Minus,
    Plus,
    Send,
    RotateCcw,
    Square,
    LayoutGrid
} from 'lucide-react'

// ============================================
// 窗户组件导入
// ============================================
import { WINDOW_COMPONENTS } from '@/components/window-preview'

// ============================================
// 类型定义
// ============================================
type MaterialType = 'vinyl' | 'aluminum' | null
type AluminumCategory = 'residential' | 'commercial' | null

interface FormData {
    material: MaterialType
    aluminumCategory: AluminumCategory
    windowType: string
    casementDesign: ''
        | 'single'
        | 'double'
    casementOpenDirection: ''
        | 'left'
        | 'right'
    grids: GridConfig
    color: string
    width: string
    height: string
    glassType: string
    glassTypeOther: string
    glassThickness: string
    glassThicknessOther: string
    quantity: string
    email: string
    phone: string
}

interface QuoteItem {
    id: string
    material: MaterialType
    aluminumCategory: AluminumCategory
    windowType: string
    casementDesign: FormData['casementDesign']
    casementOpenDirection: FormData['casementOpenDirection']
    grids: GridConfig
    color: string
    width: string
    height: string
    glassType: string
    glassTypeOther: string
    glassThickness: string
    glassThicknessOther: string
    quantity: string
}

interface QuoteGroup {
    id: string
    name: string
    items: QuoteItem[]
}

interface QuoteContactInfo {
    contactName: string
    email: string
    phone: string
    projectAddress: string
}

const WINDOW_TYPE_LABELS: Record<string, { en: string; zh: string }> = {
    'Double Hung': { en: 'Double Hung', zh: '双悬窗' },
    'Two Lites Slider': { en: 'Two Lites Slider', zh: '双扇推拉窗' },
    'Three Lites Slider': { en: 'Three Lites Slider', zh: '三扇推拉窗' },
    'Picture Window': { en: 'Picture Window', zh: '固定窗' },
    Casement: { en: 'Casement', zh: '平开窗' },
    Hopper: { en: 'Hopper', zh: '上悬窗' },
    Awning: { en: 'Awning', zh: '下悬窗' },
    'Bow Window': { en: 'Bow Window', zh: '弓形窗' },
    'Bay Window': { en: 'Bay Window', zh: '凸窗' },
}

const COLOR_LABELS: Record<string, { en: string; zh: string }> = {
    White: { en: 'White', zh: '白色' },
    Bronze: { en: 'Bronze', zh: '古铜色' },
    Black: { en: 'Black', zh: '黑色' },
}

const GLASS_MATERIAL_OPTIONS = ['Clear', 'Frosted', 'Tempered']
const GLASS_THICKNESS_OPTIONS = ['Standard 1/16"', '1/8"', '3/16"']
const GLASS_UNIT_TOTAL_THICKNESS = '7/8"'

function createEmptyFormData(): FormData {
    return {
        material: null,
        aluminumCategory: null,
        windowType: '',
        casementDesign: '',
        casementOpenDirection: '',
        grids: [],
        color: '',
        width: '',
        height: '',
        glassType: '',
        glassTypeOther: '',
        glassThickness: '',
        glassThicknessOther: '',
        quantity: '1',
        email: '',
        phone: '',
    }
}

function createWindowItemId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function createQuoteItem(formData: FormData): QuoteItem {
    return {
        id: createWindowItemId(),
        material: formData.material,
        aluminumCategory: formData.aluminumCategory,
        windowType: formData.windowType,
        casementDesign: formData.casementDesign,
        casementOpenDirection: formData.casementOpenDirection,
        grids: ensureGridConfig(getGridWindowType(formData.windowType, formData.casementDesign), formData.grids),
        color: formData.color,
        width: formData.width,
        height: formData.height,
        glassType: formData.glassType,
        glassTypeOther: formData.glassTypeOther,
        glassThickness: formData.glassThickness,
        glassThicknessOther: formData.glassThicknessOther,
        quantity: formData.quantity,
    }
}

function createEmptyContactInfo(): QuoteContactInfo {
    return {
        contactName: '',
        email: '',
        phone: '',
        projectAddress: '',
    }
}

function localizeWindowType(type: string, language: Language) {
    return WINDOW_TYPE_LABELS[type]?.[language] || type
}

function localizeColor(color: string, language: Language) {
    return COLOR_LABELS[color]?.[language] || color
}

function localizeMaterial(material: string | null, language: Language) {
    if (material === 'vinyl') return language === 'zh' ? '塑钢窗' : 'Vinyl'
    if (material === 'aluminum') return language === 'zh' ? '铝合金窗' : 'Aluminum'
    return ''
}

function localizeCategory(category: string | null, language: Language) {
    if (category === 'residential') return language === 'zh' ? '住宅' : 'Residential'
    if (category === 'commercial') return language === 'zh' ? '商用' : 'Commercial'
    return ''
}

function resolveCustomValue(value: string, otherValue: string) {
    return otherValue.trim() || value
}

function getGridDisplayValue(windowType: string, grids: GridConfig) {
    return windowType ? formatGridConfig(windowType, grids) : ''
}

function getGridWindowType(windowType: string, casementDesign: FormData['casementDesign']) {
    if (windowType === 'Casement' && casementDesign === 'double') {
        return 'Casement Double'
    }

    return windowType
}

function getCasementDesignLabel(casementDesign: FormData['casementDesign']) {
    if (casementDesign === 'double') return 'Double Casement'
    if (casementDesign === 'single') return 'Single Casement'
    return ''
}

function getCasementDirectionLabel(direction: FormData['casementOpenDirection']) {
    if (direction === 'left') return 'Stand Inside Open From Left'
    if (direction === 'right') return 'Stand Inside Open From Right'
    return ''
}

// ============================================
// 窗户预览组件
// ============================================
function WindowPreview({
    windowType,
    casementDesign,
    casementOpenDirection,
    grids,
    color,
    width,
    height,
}: {
    windowType: string
    casementDesign: FormData['casementDesign']
    casementOpenDirection: FormData['casementOpenDirection']
    grids: GridConfig
    color: string
    width: string
    height: string
}) {
    const { language } = useLanguage()
    const getFrameColor = () => {
        if (color === 'White') return '#ffffff'

        switch (color) {
            case 'Bronze': return '#5d4037'
            case 'Black': return '#1a1a1a'
            default: return '#4a4a4a'
        }
    }

    const frameColor = getFrameColor()
    const WindowComponent = WINDOW_COMPONENTS[windowType]
    const gridWindowType = getGridWindowType(windowType, casementDesign)
    const widthValue = Number(width)
    const heightValue = Number(height)
    const hasDimensions = widthValue > 0 && heightValue > 0
    const rawAspectRatio = hasDimensions ? widthValue / heightValue : 1
    const previewAspectRatio = Math.min(Math.max(rawAspectRatio, 0.45), 2.4)
    const maxPreviewWidth = 220
    const maxPreviewHeight = 220
    const previewWidth = previewAspectRatio >= 1
        ? maxPreviewWidth
        : maxPreviewHeight * previewAspectRatio
    const previewHeight = previewAspectRatio >= 1
        ? maxPreviewWidth / previewAspectRatio
        : maxPreviewHeight
    const sizeLabel = hasDimensions ? `${widthValue}" × ${heightValue}"` : '-'
    const gridLabel = getGridDisplayValue(gridWindowType, grids)

    if (!windowType || !WindowComponent) {
        return (
            <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-72 text-muted-foreground">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Square className="w-8 h-8" />
                    </div>
                    <p className="font-medium">{language === 'zh' ? '请选择窗型' : 'Select a window type'}</p>
                    <p className="text-sm">{language === 'zh' ? '预览会显示在这里' : 'Preview will appear here'}</p>
                </CardContent>
            </Card>
        )
    }

    return (
            <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    {language === 'zh' ? '窗户预览' : 'Window Preview'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative h-64 flex items-center justify-center bg-gradient-to-br from-[#f3f6ec] to-[#e4ecd3] rounded-lg p-4">
                    <div
                        className="relative flex items-center justify-center"
                        style={{
                            width: `${previewWidth}px`,
                            height: `${previewHeight}px`,
                        }}
                    >
                        {hasDimensions && (
                            <>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-sm">
                                    {language === 'zh' ? `宽 ${widthValue}"` : `W ${widthValue}"`}
                                </div>
                                <div className="absolute -top-4 left-0 right-0 flex items-center">
                                    <span className="h-2 w-2 rotate-45 border-l border-t border-primary/60 bg-background" />
                                    <span className="h-px flex-1 bg-primary/60" />
                                    <span className="h-2 w-2 rotate-45 border-r border-b border-primary/60 bg-background" />
                                </div>
                                <div className="absolute -right-14 top-1/2 -translate-y-1/2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-sm">
                                    {language === 'zh' ? `高 ${heightValue}"` : `H ${heightValue}"`}
                                </div>
                                <div className="absolute -right-4 top-0 bottom-0 flex flex-col items-center">
                                    <span className="h-2 w-2 rotate-45 border-l border-t border-primary/60 bg-background" />
                                    <span className="w-px flex-1 bg-primary/60" />
                                    <span className="h-2 w-2 rotate-45 border-r border-b border-primary/60 bg-background" />
                                </div>
                            </>
                        )}
                        <WindowComponent
                            frameColor={frameColor}
                            grids={grids}
                            showGlass={true}
                            className="h-full w-full"
                            casementDesign={casementDesign || 'single'}
                            casementOpenDirection={casementOpenDirection || 'left'}
                        />
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
                    <div className="bg-muted rounded-md p-2 text-center">
                        <p className="text-muted-foreground">{language === 'zh' ? '窗型' : 'Type'}</p>
                        <p className="font-medium truncate">{localizeWindowType(windowType, language)}</p>
                    </div>
                    <div className="bg-muted rounded-md p-2 text-center">
                        <p className="text-muted-foreground">{language === 'zh' ? '尺寸' : 'Size'}</p>
                        <p className="font-medium">{sizeLabel}</p>
                    </div>
                    <div className="bg-muted rounded-md p-2 text-center">
                        <p className="text-muted-foreground">{language === 'zh' ? '颜色' : 'Color'}</p>
                        <p className="font-medium">{color ? localizeColor(color, language) : '-'}</p>
                    </div>
                    <div className="bg-muted rounded-md p-2 text-center">
                        <p className="text-muted-foreground">{language === 'zh' ? '格条' : 'Grids'}</p>
                        <p className="font-medium break-words">{gridLabel || '-'}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// ============================================
// 选择摘要组件
// ============================================
function SelectionSummary({ formData, step }: { formData: FormData; step: number }) {
    const { language } = useLanguage()
    if (step === 1) return null

    const resolvedGlassType = resolveCustomValue(formData.glassType, formData.glassTypeOther)
    const resolvedGlassThickness = resolveCustomValue(formData.glassThickness, formData.glassThicknessOther)
    const gridLabel = getGridDisplayValue(getGridWindowType(formData.windowType, formData.casementDesign), formData.grids)

    const items = [
        { label: language === 'zh' ? '材质' : 'Material', value: localizeMaterial(formData.material, language) },
        { label: language === 'zh' ? '分类' : 'Category', value: localizeCategory(formData.aluminumCategory, language) },
        { label: language === 'zh' ? '窗型' : 'Window Type', value: localizeWindowType(formData.windowType, language) },
        { label: 'Casement Design', value: formData.windowType === 'Casement' ? getCasementDesignLabel(formData.casementDesign) : '' },
        { label: 'Opening Direction', value: formData.windowType === 'Casement' && formData.casementDesign === 'single' ? getCasementDirectionLabel(formData.casementOpenDirection) : '' },
        { label: language === 'zh' ? '尺寸' : 'Size', value: formData.width && formData.height ? `${formData.width}" × ${formData.height}"` : '' },
        { label: language === 'zh' ? '颜色' : 'Color', value: formData.color ? localizeColor(formData.color, language) : '' },
        { label: language === 'zh' ? '格条' : 'Grids', value: gridLabel },
        { label: 'Glass Material', value: resolvedGlassType },
        { label: 'Single Pane Thickness', value: resolvedGlassThickness },
        { label: 'Glass Unit Total Thickness', value: resolvedGlassThickness ? GLASS_UNIT_TOTAL_THICKNESS : '' },
        { label: language === 'zh' ? '数量' : 'Quantity', value: parseInt(formData.quantity) > 0 ? formData.quantity : '' },
    ].filter(item => item.value)

    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-primary" />
                    {language === 'zh' ? '当前选择' : 'Your Selection'}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1.5 border-b border-primary/10 last:border-0">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="text-sm font-medium capitalize">{item.value}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

// ============================================
// 选项卡片组件（可复用）
// ============================================
interface OptionCardProps {
    title: string
    description?: string
    icon?: React.ReactNode
    tags?: string[]
    selected?: boolean
    onClick: () => void
}

function OptionCard({ title, description, icon, tags, selected, onClick }: OptionCardProps) {
    return (
        <Card
            className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${selected ? 'border-primary bg-primary/5' : ''}`}
            onClick={onClick}
        >
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    {icon && (
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                            {icon}
                        </div>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-base mb-1">{title}</h3>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
                {tags && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

// ============================================
// 窗型选项组件
// ============================================
function WindowTypeOption({ type, onClick }: { type: string; onClick: () => void }) {
    const { language } = useLanguage()
    const WindowComponent = WINDOW_COMPONENTS[type]

    return (
        <Card
            className="cursor-pointer transition-all hover:border-primary hover:shadow-sm group"
            onClick={onClick}
        >
            <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    {WindowComponent ? (
                        <WindowComponent
                            frameColor="#64748b"
                            showGlass={false}
                            className="w-8 h-8"
                        />
                    ) : (
                        <LayoutGrid className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                </div>
                <p className="text-sm font-medium group-hover:text-primary transition-colors">{localizeWindowType(type, language)}</p>
            </CardContent>
        </Card>
    )
}

function GridPatternPreview({
    pattern,
    customVertical = '',
    customHorizontal = '',
}: {
    pattern: GridPatternId
    customVertical?: string
    customHorizontal?: string
}) {
    const { vertical, horizontal } = resolveGridCounts({
        pattern,
        customVertical,
        customHorizontal,
    })

    return (
        <svg viewBox="0 0 100 100" className="h-12 w-12">
            <rect x="12" y="12" width="76" height="76" rx="8" fill="#ffffff" stroke="#cfd8c3" strokeWidth="4" />
            <rect x="20" y="20" width="60" height="60" rx="4" fill="#d7ebfb" stroke="#ffffff" strokeWidth="2" />
            {Array.from({ length: vertical }).map((_, index) => {
                const x = 20 + (60 * (index + 1)) / (vertical + 1)
                return <line key={`v-${index + 1}`} x1={x} y1="20" x2={x} y2="80" stroke="#ffffff" strokeWidth="2.5" />
            })}
            {Array.from({ length: horizontal }).map((_, index) => {
                const y = 20 + (60 * (index + 1)) / (horizontal + 1)
                return <line key={`h-${index + 1}`} x1="20" y1={y} x2="80" y2={y} stroke="#ffffff" strokeWidth="2.5" />
            })}
        </svg>
    )
}

function GridPatternOption({
    pattern,
    selected,
    onClick,
}: {
    pattern: GridPatternId
    selected: boolean
    onClick: () => void
}) {
    return (
        <Card
            className={`cursor-pointer transition-all hover:border-primary hover:shadow-sm group ${selected ? 'border-primary bg-primary/5 shadow-sm' : ''}`}
            onClick={onClick}
        >
            <CardContent className="p-4 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                    <GridPatternPreview pattern={pattern} />
                </div>
                <p className="text-sm font-medium transition-colors group-hover:text-primary">
                    {GRID_PATTERN_OPTIONS.find((option) => option.id === pattern)?.label || pattern}
                </p>
            </CardContent>
        </Card>
    )
}

function GridCustomOption({
    sectionId,
    section,
    selected,
    onFocus,
    onChange,
}: {
    sectionId: string
    section: GridConfig[number]
    selected: boolean
    onFocus: () => void
    onChange: (field: 'customVertical' | 'customHorizontal', value: string) => void
}) {
    return (
        <Card className={`transition-all ${selected ? 'border-primary bg-primary/5 shadow-sm' : ''}`}>
            <CardContent className="space-y-3 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
                        <GridPatternPreview
                            pattern="custom"
                            customVertical={section.customVertical}
                            customHorizontal={section.customHorizontal}
                        />
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Custom</p>
                        <p className="text-xs text-muted-foreground">
                            {formatGridPattern(section)}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label htmlFor={`custom-v-${sectionId}`} className="text-xs text-muted-foreground">Vertical</Label>
                        <Input
                            id={`custom-v-${sectionId}`}
                            type="number"
                            min="0"
                            max="6"
                            placeholder="0"
                            value={section.customVertical || ''}
                            onFocus={onFocus}
                            onChange={(event) => onChange('customVertical', event.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor={`custom-h-${sectionId}`} className="text-xs text-muted-foreground">Horizontal</Label>
                        <Input
                            id={`custom-h-${sectionId}`}
                            type="number"
                            min="0"
                            max="6"
                            placeholder="0"
                            value={section.customHorizontal || ''}
                            onFocus={onFocus}
                            onChange={(event) => onChange('customHorizontal', event.target.value)}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// ============================================
// 颜色选项组件
// ============================================
function ColorOption({ color, onClick }: { color: string; onClick: () => void }) {
    const { language } = useLanguage()
    const getBgColor = () => {
        switch (color) {
            case 'White': return 'bg-white border-4 border-gray-200'
            case 'Bronze': return 'bg-amber-800'
            case 'Black': return 'bg-gray-900'
            default: return 'bg-gray-400'
        }
    }

    return (
        <Card
            className="cursor-pointer transition-all hover:border-primary hover:shadow-sm group"
            onClick={onClick}
        >
            <CardContent className="p-5 text-center">
                <div className={`w-14 h-14 rounded-full mx-auto mb-3 shadow-md ${getBgColor()}`} />
                <p className="text-sm font-medium group-hover:text-primary transition-colors">{localizeColor(color, language)}</p>
            </CardContent>
        </Card>
    )
}

function ChoiceOption({
    title,
    description,
    selected,
    onClick,
}: {
    title: string
    description?: string
    selected: boolean
    onClick: () => void
}) {
    return (
        <Card
            className={`cursor-pointer transition-all hover:border-primary hover:shadow-sm ${selected ? 'border-primary bg-primary/5 shadow-sm' : ''}`}
            onClick={onClick}
        >
            <CardContent className="flex min-h-20 items-center p-3">
                <p className="text-sm font-semibold">{title}</p>
                {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
            </CardContent>
        </Card>
    )
}

// ============================================
// 步骤头部组件
// ============================================
function StepHeader({ stepNumber, title, description }: { stepNumber: string; title: string; description: string }) {
    return (
        <div className="mb-6">
            <Badge variant="default" className="mb-3">{stepNumber}</Badge>
            <h2 className="text-2xl font-bold mb-1">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}

// ============================================
// 主组件
// ============================================
export default function QuotationPage() {
    const router = useRouter()
    const { language } = useLanguage()
    const isZh = language === 'zh'
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<FormData>(createEmptyFormData())
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [quoteGroups, setQuoteGroups] = useState<QuoteGroup[]>([])
    const [ungroupedItems, setUngroupedItems] = useState<QuoteItem[]>([])
    const [quoteContact, setQuoteContact] = useState<QuoteContactInfo>(createEmptyContactInfo())
    const [showCreateGroupForm, setShowCreateGroupForm] = useState(false)
    const [newGroupName, setNewGroupName] = useState('')
    const [showExistingGroups, setShowExistingGroups] = useState(false)
    const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
    const [isCurrentItemSaved, setIsCurrentItemSaved] = useState(false)
    const [contactPanelMode, setContactPanelMode] = useState<'actions' | 'details'>('actions')

    const t = isZh
        ? {
            headerTitle: '门窗报价',
            headerSubtitle: '获取你的定制门窗估价',
            stepOf: (current: number, total: number) => `第 ${current} 步 / 共 ${total} 步`,
            percent: '已完成',
            back: '返回',
            continue: '继续',
            submit: '提交报价请求',
            submitting: '提交中...',
            successTitle: '报价请求已提交！',
            successDescPrefix: '感谢提交！我们会在 24 小时内把详细报价发送到',
            successDescSuffix: '。',
            anotherQuote: '继续申请报价',
            home: '返回首页',
            missing: '提交失败，请稍后重试。',
            yourSelection: '当前选择',
            previewTitle: '窗户预览',
            step1Title: '选择窗户材质',
            step1Desc: '请选择你偏好的窗户材质',
            step2CategoryTitle: '选择窗户分类',
            step2CategoryDesc: '请选择住宅或商用铝合金窗',
            residential: '住宅',
            commercial: '商用',
            residentialDesc: '适用于住宅与公寓',
            commercialDesc: '适用于办公室与商业空间',
            stepStyleTitle: '选择窗型',
            stepStyleDesc: '请选择适合你需求的窗型',
            stepGridTitle: '选择格条样式',
            stepGridDesc: '请为每个窗扇选择格条样式',
            vinylColorTitle: '窗户颜色',
            vinylColorDesc: '塑钢窗提供标准白色',
            whiteDesc: '塑钢窗标准配色',
            stepColorTitle: '选择颜色',
            stepColorDesc: '请选择你偏好的窗户颜色',
            stepSizeTitle: '窗户尺寸',
            stepSizeDesc: '请输入窗户宽度和高度（英寸）',
            casementDesignTitle: 'Casement Design',
            casementDesignDesc: 'Choose single-opening or double-opening design',
            casementSingle: 'Single Casement',
            casementDouble: 'Double Casement',
            casementDirectionTitle: 'Opening Direction',
            casementDirectionDesc: 'Select how the sash opens when viewed from inside',
            casementOpenLeft: 'Stand Inside Open From Left',
            casementOpenRight: 'Stand Inside Open From Right',
            width: '宽度（英寸）',
            height: '高度（英寸）',
            glassTitle: 'Glass Options',
            glassDesc: 'Choose glass material and single pane thickness',
            glassBathroomNote: 'If this window is for a bathroom, please confirm whether frosted glass is needed.',
            glassMaterialSection: 'Section 1 · Glass Material',
            glassThicknessSection: 'Section 2 · Single Pane Thickness',
            glassMaterialOtherPlaceholder: 'Enter glass material',
            glassThicknessOtherPlaceholder: 'Enter glass thickness',
            glassUnitNote: `Glass Unit Total Thickness: ${GLASS_UNIT_TOTAL_THICKNESS}`,
            quantityTitle: '需要多少扇窗？',
            quantityDesc: '请输入你需要的数量',
            contactTitle: '联系方式',
            contactDesc: '我们会把报价发送到这个邮箱',
            contactActionsTitle: 'Save This Window',
            contactActionsDesc: 'Save this window to a group, start another window, or continue to project details.',
            contactDetailsTitle: 'Project Contact Details',
            contactDetailsDesc: 'Add the global information for this quotation before submitting.',
            email: '邮箱地址 *',
            phone: '电话号码（可选）',
            contactName: 'Contact Name *',
            projectAddress: 'Project Address *',
            quoteSummaryTitle: 'Quotation Summary',
            groupedUnder: 'Grouped Under',
            ungroupedSection: 'Ungrouped Windows',
            createGroup: 'Create a Group',
            createGroupDesc: 'Name a room, floor, or area and save this window into it.',
            createGroupPlaceholder: 'Enter group name',
            saveGroup: 'Save Group',
            saveToExistingGroups: 'Save to Existing Groups',
            saveToExistingGroupsDesc: 'Assign this window to one of the groups you already created.',
            startAnotherWindow: 'Start Another Window',
            startAnotherWindowDesc: 'Save this window and begin configuring another one.',
            proceedToContact: 'Proceed to Contact',
            proceedToContactDesc: 'Move on to the global contact and project information.',
            addItemToGroup: (groupName: string) => `Add Item to ${groupName}`,
            addItemToGroupDesc: (groupName: string) => `Save the current window into ${groupName} and continue building this group.`,
            assignToGroup: 'Assign to Group',
            noGroupsYet: 'No groups created yet.',
            currentWindowSaved: 'Current window saved.',
            currentWindowSavedDesc: (groupName: string) => `This window has been added to ${groupName}.`,
            currentWindowUngrouped: 'Current window saved as ungrouped.',
            currentWindowUngroupedDesc: 'You can continue adding more windows or move on to contact details.',
            existingGroupsTitle: 'Select an Existing Group',
            groupedWindowsCount: (count: number) => `${count} window${count === 1 ? '' : 's'}`,
            readyToSubmit: 'Ready to Submit',
            readyToSubmitDesc: 'Review your grouped windows and complete the global project information.',
            totalWindowItems: (count: number) => `${count} total window item${count === 1 ? '' : 's'}`,
            submitQuote: 'Submit Full Quotation',
            finalStep: '最后一步',
            previewEmptyTitle: '请选择窗型',
            previewEmptyDesc: '预览会显示在这里',
            materialVinylTitle: '塑钢窗',
            materialVinylDesc: '节能耐用，维护简单',
            materialAluminumTitle: '铝合金窗',
            materialAluminumDesc: '现代质感，结构稳固',
            affordable: '高性价比',
            durable: '耐用',
            premium: '高端',
            sleek: '简洁',
            white: '白色',
            quoteError: '提交报价请求失败，请稍后重试。',
        }
        : {
            headerTitle: 'Window Quote',
            headerSubtitle: 'Get your custom window estimate',
            stepOf: (current: number, total: number) => `Step ${current} of ${total}`,
            percent: 'Complete',
            back: 'Back',
            continue: 'Continue',
            submit: 'Submit Quote Request',
            submitting: 'Submitting...',
            successTitle: 'Quote Request Submitted!',
            successDescPrefix: 'Thank you! We will send a detailed quote to',
            successDescSuffix: 'within 24 hours.',
            anotherQuote: 'Request Another Quote',
            home: 'Back to Home',
            missing: 'Failed to submit quote',
            yourSelection: 'Your Selection',
            previewTitle: 'Window Preview',
            step1Title: 'Choose Window Material',
            step1Desc: 'Select the type of window material you prefer',
            step2CategoryTitle: 'Choose Window Category',
            step2CategoryDesc: 'Select residential or commercial windows',
            residential: 'Residential',
            commercial: 'Commercial',
            residentialDesc: 'For homes & apartments',
            commercialDesc: 'For offices & businesses',
            stepStyleTitle: 'Choose Window Style',
            stepStyleDesc: 'Select the window type that fits your needs',
            stepGridTitle: 'Choose Grid Pattern',
            stepGridDesc: 'Choose the grid pattern for each panel or sash',
            vinylColorTitle: 'Window Color',
            vinylColorDesc: 'Vinyl windows are available in white',
            whiteDesc: 'Standard color for vinyl windows',
            stepColorTitle: 'Choose Color',
            stepColorDesc: 'Select your preferred window color',
            stepSizeTitle: 'Window Dimensions',
            stepSizeDesc: 'Enter the width and height in inches',
            casementDesignTitle: 'Casement Design',
            casementDesignDesc: 'Choose single-opening or double-opening design',
            casementSingle: 'Single Casement',
            casementDouble: 'Double Casement',
            casementDirectionTitle: 'Opening Direction',
            casementDirectionDesc: 'Select how the sash opens when viewed from inside',
            casementOpenLeft: 'Stand Inside Open From Left',
            casementOpenRight: 'Stand Inside Open From Right',
            width: 'Width (inches)',
            height: 'Height (inches)',
            glassTitle: 'Glass Options',
            glassDesc: 'Choose glass material and single pane thickness',
            glassBathroomNote: 'If this window is for a bathroom, please confirm whether frosted glass is needed.',
            glassMaterialSection: 'Section 1 · Glass Material',
            glassThicknessSection: 'Section 2 · Single Pane Thickness',
            glassMaterialOtherPlaceholder: 'Enter glass material',
            glassThicknessOtherPlaceholder: 'Enter glass thickness',
            glassUnitNote: `Glass Unit Total Thickness: ${GLASS_UNIT_TOTAL_THICKNESS}`,
            quantityTitle: 'How Many Windows?',
            quantityDesc: 'Enter the quantity you need',
            contactTitle: 'Contact Information',
            contactDesc: 'We will send your quote to this email',
            contactActionsTitle: 'Save This Window',
            contactActionsDesc: 'Save this window to a group, start another window, or continue to project details.',
            contactDetailsTitle: 'Project Contact Details',
            contactDetailsDesc: 'Add the global information for this quotation before submitting.',
            email: 'Email Address *',
            phone: 'Phone Number (Optional)',
            contactName: 'Contact Name *',
            projectAddress: 'Project Address *',
            quoteSummaryTitle: 'Quotation Summary',
            groupedUnder: 'Grouped Under',
            ungroupedSection: 'Ungrouped Windows',
            createGroup: 'Create a Group',
            createGroupDesc: 'Name a room, floor, or area and save this window into it.',
            createGroupPlaceholder: 'Enter group name',
            saveGroup: 'Save Group',
            saveToExistingGroups: 'Save to Existing Groups',
            saveToExistingGroupsDesc: 'Assign this window to one of the groups you already created.',
            startAnotherWindow: 'Start Another Window',
            startAnotherWindowDesc: 'Save this window and begin configuring another one.',
            proceedToContact: 'Proceed to Contact',
            proceedToContactDesc: 'Move on to the global contact and project information.',
            addItemToGroup: (groupName: string) => `Add Item to ${groupName}`,
            addItemToGroupDesc: (groupName: string) => `Save the current window into ${groupName} and continue building this group.`,
            assignToGroup: 'Assign to Group',
            noGroupsYet: 'No groups created yet.',
            currentWindowSaved: 'Current window saved.',
            currentWindowSavedDesc: (groupName: string) => `This window has been added to ${groupName}.`,
            currentWindowUngrouped: 'Current window saved as ungrouped.',
            currentWindowUngroupedDesc: 'You can continue adding more windows or move on to contact details.',
            existingGroupsTitle: 'Select an Existing Group',
            groupedWindowsCount: (count: number) => `${count} window${count === 1 ? '' : 's'}`,
            readyToSubmit: 'Ready to Submit',
            readyToSubmitDesc: 'Review your grouped windows and complete the global project information.',
            totalWindowItems: (count: number) => `${count} total window item${count === 1 ? '' : 's'}`,
            submitQuote: 'Submit Full Quotation',
            finalStep: 'Final Step',
            previewEmptyTitle: 'Select a window type',
            previewEmptyDesc: 'Preview will appear here',
            materialVinylTitle: 'Vinyl Windows',
            materialVinylDesc: 'Energy efficient & low maintenance',
            materialAluminumTitle: 'Aluminum Windows',
            materialAluminumDesc: 'Modern design & durability',
            affordable: 'Affordable',
            durable: 'Durable',
            premium: 'Premium',
            sleek: 'Sleek',
            white: 'White',
            quoteError: 'Failed to submit quote request. Please try again.',
        }

    const stepLabel = (stepNumber: number) => isZh ? `步骤 ${stepNumber}` : `Step ${stepNumber}`

    // 数据配置
    const vinylWindowTypes = ['Double Hung', 'Two Lites Slider', 'Three Lites Slider', 'Picture Window', 'Casement', 'Hopper', 'Awning', 'Bow Window', 'Bay Window']
    const aluminumResidentialTypes = ['Double Hung', 'Two Lites Slider', 'Three Lites Slider', 'Picture Window']
    const aluminumCommercialTypes = ['Casement', 'Hopper', 'Awning']
    const aluminumColors = ['White', 'Bronze', 'Black']
    const isAluminumFlow = formData.material === 'aluminum'
    const totalSteps = isAluminumFlow ? 9 : 8
    const progressValue = (step / totalSteps) * 100
    const typeStep = isAluminumFlow ? 3 : 2
    const sizeStep = isAluminumFlow ? 4 : 3
    const colorStep = isAluminumFlow ? 5 : 4
    const gridsStep = isAluminumFlow ? 6 : 5
    const glassStep = isAluminumFlow ? 7 : 6
    const quantityStep = isAluminumFlow ? 8 : 7
    const contactStep = isAluminumFlow ? 9 : 8
    const successStep = isAluminumFlow ? 10 : 9
    const resolvedGlassType = resolveCustomValue(formData.glassType, formData.glassTypeOther)
    const resolvedGlassThickness = resolveCustomValue(formData.glassThickness, formData.glassThicknessOther)
    const isGlassStepValid = Boolean(resolvedGlassType && resolvedGlassThickness)
    const gridWindowType = getGridWindowType(formData.windowType, formData.casementDesign)
    const gridSections = getWindowGridSections(gridWindowType)
    const normalizedGrids = ensureGridConfig(gridWindowType, formData.grids)
    const isGridStepValid = isGridConfigValid(gridWindowType, formData.grids)
    const isCasement = formData.windowType === 'Casement'
    const isCasementSizeValid = !isCasement
        || (
            !!formData.casementDesign
            && (formData.casementDesign === 'double' || !!formData.casementOpenDirection)
        )
    const totalGroupedItems = quoteGroups.reduce((count, group) => count + group.items.length, 0)
    const totalQuoteItems = totalGroupedItems + ungroupedItems.length + (step === contactStep && !isCurrentItemSaved && formData.windowType ? 1 : 0)
    const activeGroup = quoteGroups.find((group) => group.id === activeGroupId) || null
    const canSubmitGroupedQuote = Boolean(quoteContact.contactName.trim() && quoteContact.email.trim() && quoteContact.projectAddress.trim() && (totalGroupedItems + ungroupedItems.length > 0))

    const resetWindowBuilder = (preferredGroupId?: string | null) => {
        setFormData(createEmptyFormData())
        setActiveGroupId(preferredGroupId ?? null)
        setIsCurrentItemSaved(false)
        setShowCreateGroupForm(false)
        setShowExistingGroups(false)
        setNewGroupName('')
        setContactPanelMode('actions')
        setStep(1)
    }

    const saveCurrentItemToGroup = (groupId: string) => {
        const nextItem = createQuoteItem(formData)

        setQuoteGroups((currentGroups) => currentGroups.map((group) => (
            group.id === groupId
                ? { ...group, items: [...group.items, nextItem] }
                : group
        )))
        setActiveGroupId(groupId)
        setIsCurrentItemSaved(true)
        setShowCreateGroupForm(false)
        setShowExistingGroups(false)
        setNewGroupName('')
    }

    const saveCurrentItemAsUngrouped = () => {
        const nextItem = createQuoteItem(formData)
        setUngroupedItems((currentItems) => [...currentItems, nextItem])
        setActiveGroupId(null)
        setIsCurrentItemSaved(true)
        setShowCreateGroupForm(false)
        setShowExistingGroups(false)
        setNewGroupName('')
    }

    const handleCreateGroup = () => {
        const trimmedName = newGroupName.trim()
        if (!trimmedName) return

        const nextGroupId = createWindowItemId()
        const nextItem = createQuoteItem(formData)

        setQuoteGroups((currentGroups) => [
            ...currentGroups,
            {
                id: nextGroupId,
                name: trimmedName,
                items: [nextItem],
            }
        ])
        setActiveGroupId(nextGroupId)
        setIsCurrentItemSaved(true)
        setShowCreateGroupForm(false)
        setShowExistingGroups(false)
        setNewGroupName('')
    }

    const handleStartAnotherWindow = () => {
        if (!isCurrentItemSaved && formData.windowType) {
            saveCurrentItemAsUngrouped()
        }

        resetWindowBuilder(null)
    }

    const handleAddItemToActiveGroup = () => {
        if (!activeGroupId || !activeGroup) return

        if (!isCurrentItemSaved && formData.windowType) {
            saveCurrentItemToGroup(activeGroupId)
            return
        }

        resetWindowBuilder(activeGroupId)
    }

    const handleProceedToContact = () => {
        if (!isCurrentItemSaved && formData.windowType) {
            if (activeGroupId) {
                saveCurrentItemToGroup(activeGroupId)
            } else {
                saveCurrentItemAsUngrouped()
            }
        }

        setContactPanelMode('details')
        setShowCreateGroupForm(false)
        setShowExistingGroups(false)
    }

    // 事件处理
    const handleMaterialSelect = (material: MaterialType) => {
        setFormData({
            ...formData,
            material,
            aluminumCategory: null,
            windowType: '',
            casementDesign: '',
            casementOpenDirection: '',
            grids: [],
            color: material === 'vinyl' ? 'White' : '',
            width: '',
            height: '',
            glassType: '',
            glassTypeOther: '',
            glassThickness: '',
            glassThicknessOther: '',
        })
        setStep(2)
    }

    const handleAluminumCategory = (category: AluminumCategory) => {
        setFormData({ ...formData, aluminumCategory: category, windowType: '', casementDesign: '', casementOpenDirection: '', grids: [] })
        setStep(3)
    }

    const handleWindowType = (type: string) => {
        const nextCasementDesign: FormData['casementDesign'] = ''
        const nextCasementDirection: FormData['casementOpenDirection'] = ''
        const nextGridWindowType = getGridWindowType(type, nextCasementDesign)

        setFormData({
            ...formData,
            windowType: type,
            casementDesign: nextCasementDesign,
            casementOpenDirection: nextCasementDirection,
            grids: getWindowGridSections(nextGridWindowType).map(() => createEmptyGridSection()),
            width: '',
            height: '',
            glassType: '',
            glassTypeOther: '',
            glassThickness: '',
            glassThicknessOther: '',
        })
        setStep(sizeStep)
    }

    const handleSizeSubmit = () => {
        if (formData.width && formData.height && isCasementSizeValid) setStep(colorStep)
    }

    const handleColorContinue = () => setStep(gridsStep)

    const handleColorSelect = (color: string) => {
        setFormData({ ...formData, color })
        setStep(gridsStep)
    }

    const handleGridPatternSelect = (sectionIndex: number, pattern: GridPatternId) => {
        const nextGrids = ensureGridConfig(gridWindowType, formData.grids)
        nextGrids[sectionIndex] = pattern === 'custom'
            ? { pattern: 'custom', customVertical: nextGrids[sectionIndex]?.customVertical || '', customHorizontal: nextGrids[sectionIndex]?.customHorizontal || '' }
            : { pattern, customVertical: '', customHorizontal: '' }

        setFormData({ ...formData, grids: nextGrids })
    }

    const handleGridCustomChange = (sectionIndex: number, field: 'customVertical' | 'customHorizontal', value: string) => {
        const nextGrids = ensureGridConfig(gridWindowType, formData.grids)
        nextGrids[sectionIndex] = {
            ...nextGrids[sectionIndex],
            pattern: 'custom',
            [field]: value,
        }

        setFormData({ ...formData, grids: nextGrids })
    }

    const handleGridsContinue = () => {
        if (isGridStepValid) setStep(glassStep)
    }

    const handleGlassContinue = () => {
        if (isGlassStepValid) setStep(quantityStep)
    }

    const handleQuantitySubmit = () => {
        if (formData.quantity && parseInt(formData.quantity) > 0) {
            setIsCurrentItemSaved(false)
            setContactPanelMode('actions')
            setShowCreateGroupForm(false)
            setShowExistingGroups(false)
            setNewGroupName('')
            setStep(contactStep)
        }
    }

    const handleSubmit = async () => {
        if (!canSubmitGroupedQuote) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/quote/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contactName: quoteContact.contactName,
                    email: quoteContact.email,
                    phone: quoteContact.phone,
                    projectAddress: quoteContact.projectAddress,
                    groups: quoteGroups.map((group) => ({
                        id: group.id,
                        name: group.name,
                        items: group.items,
                    })),
                    ungroupedItems,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || t.missing)
            }

            setStep(successStep)
        } catch (error) {
            console.error('Submit error:', error)
            alert(t.quoteError)
        } finally {
            setIsSubmitting(false)
        }
    }

    const resetForm = () => {
        setFormData(createEmptyFormData())
        setQuoteGroups([])
        setUngroupedItems([])
        setQuoteContact(createEmptyContactInfo())
        setShowCreateGroupForm(false)
        setShowExistingGroups(false)
        setNewGroupName('')
        setActiveGroupId(null)
        setIsCurrentItemSaved(false)
        setContactPanelMode('actions')
        setStep(1)
    }

    const goBack = (targetStep: number) => setStep(targetStep)

    const isComplete = step === successStep

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold">{t.headerTitle}</h1>
                            <p className="text-sm text-muted-foreground">{t.headerSubtitle}</p>
                        </div>
                        {!isComplete && (
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium">{t.stepOf(step, totalSteps)}</p>
                                    <p className="text-xs text-primary font-medium">{Math.round(progressValue)}% {t.percent}</p>
                                </div>
                                <Progress value={progressValue} className="w-32 h-2" />
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-3">

                        {/* Step 1: Material */}
                        {step === 1 && (
                            <Card>
                                <CardHeader>
                                    <StepHeader stepNumber={stepLabel(1)} title={t.step1Title} description={t.step1Desc} />
                                </CardHeader>
                                <CardContent className="grid sm:grid-cols-2 gap-4">
                                    <OptionCard
                                        title={t.materialVinylTitle}
                                        description={t.materialVinylDesc}
                                        icon={<Square className="w-6 h-6 text-blue-600" />}
                                        tags={[t.affordable, t.durable]}
                                        onClick={() => handleMaterialSelect('vinyl')}
                                    />
                                    <OptionCard
                                        title={t.materialAluminumTitle}
                                        description={t.materialAluminumDesc}
                                        icon={<LayoutGrid className="w-6 h-6 text-slate-600" />}
                                        tags={[t.premium, t.sleek]}
                                        onClick={() => handleMaterialSelect('aluminum')}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Step 2 (Aluminum): Category */}
                        {step === 2 && formData.material === 'aluminum' && (
                            <Card>
                                <CardHeader>
                                    <StepHeader stepNumber={stepLabel(2)} title={t.step2CategoryTitle} description={t.step2CategoryDesc} />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <OptionCard
                                            title={t.residential}
                                            description={t.residentialDesc}
                                            icon={<Home className="w-6 h-6 text-amber-600" />}
                                            onClick={() => handleAluminumCategory('residential')}
                                        />
                                        <OptionCard
                                            title={t.commercial}
                                            description={t.commercialDesc}
                                            icon={<Building2 className="w-6 h-6 text-indigo-600" />}
                                            onClick={() => handleAluminumCategory('commercial')}
                                        />
                                    </div>
                                    <Button variant="ghost" className="mt-4" onClick={() => goBack(1)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> {t.back}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Window Type Selection */}
                        {step === typeStep && formData.material && (
                            <Card>
                                <CardHeader>
                                    <StepHeader
                                        stepNumber={stepLabel(typeStep)}
                                        title={t.stepStyleTitle}
                                        description={t.stepStyleDesc}
                                    />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {(formData.material === 'vinyl' ? vinylWindowTypes : formData.aluminumCategory === 'residential' ? aluminumResidentialTypes : aluminumCommercialTypes).map((type) => (
                                            <WindowTypeOption key={type} type={type} onClick={() => handleWindowType(type)} />
                                        ))}
                                    </div>
                                    <Button variant="ghost" className="mt-4" onClick={() => goBack(formData.material === 'vinyl' ? 1 : 2)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> {t.back}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Dimensions */}
                        {step === sizeStep && formData.material && (
                            <Card>
                                <CardHeader>
                                    <StepHeader
                                        stepNumber={stepLabel(sizeStep)}
                                        title={t.stepSizeTitle}
                                        description={t.stepSizeDesc}
                                    />
                                </CardHeader>
                                <CardContent>
                                    {formData.windowType === 'Casement' && (
                                        <div className="mb-6 space-y-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-sm font-semibold">{t.casementDesignTitle}</p>
                                                    <p className="text-sm text-muted-foreground">{t.casementDesignDesc}</p>
                                                </div>
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    <ChoiceOption
                                                        title={t.casementSingle}
                                                        selected={formData.casementDesign === 'single'}
                                                        onClick={() => setFormData({
                                                            ...formData,
                                                            casementDesign: 'single',
                                                            casementOpenDirection: '',
                                                            grids: getWindowGridSections(getGridWindowType('Casement', 'single')).map(() => createEmptyGridSection()),
                                                        })}
                                                    />
                                                    <ChoiceOption
                                                        title={t.casementDouble}
                                                        selected={formData.casementDesign === 'double'}
                                                        onClick={() => setFormData({
                                                            ...formData,
                                                            casementDesign: 'double',
                                                            casementOpenDirection: '',
                                                            grids: getWindowGridSections(getGridWindowType('Casement', 'double')).map(() => createEmptyGridSection()),
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            {formData.casementDesign === 'single' && (
                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-sm font-semibold">{t.casementDirectionTitle}</p>
                                                        <p className="text-sm text-muted-foreground">{t.casementDirectionDesc}</p>
                                                    </div>
                                                    <div className="grid gap-3 sm:grid-cols-2">
                                                        <ChoiceOption
                                                            title={t.casementOpenLeft}
                                                            selected={formData.casementOpenDirection === 'left'}
                                                            onClick={() => setFormData({ ...formData, casementOpenDirection: 'left' })}
                                                        />
                                                        <ChoiceOption
                                                            title={t.casementOpenRight}
                                                            selected={formData.casementOpenDirection === 'right'}
                                                            onClick={() => setFormData({ ...formData, casementOpenDirection: 'right' })}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="width">{t.width}</Label>
                                            <Input
                                                id="width"
                                                type="number"
                                                min="1"
                                                placeholder="36"
                                                value={formData.width}
                                                onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="height">{t.height}</Label>
                                            <Input
                                                id="height"
                                                type="number"
                                                min="1"
                                                placeholder="48"
                                                value={formData.height}
                                                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <Button className="w-full mt-6" size="lg" onClick={handleSizeSubmit} disabled={!formData.width || !formData.height || !isCasementSizeValid}>
                                        {t.continue} <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                    <Button variant="ghost" className="w-full mt-2" onClick={() => goBack(typeStep)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> {t.back}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Vinyl Color */}
                        {step === colorStep && formData.material === 'vinyl' && (
                            <Card>
                                <CardHeader>
                                    <StepHeader stepNumber={stepLabel(colorStep)} title={t.vinylColorTitle} description={t.vinylColorDesc} />
                                </CardHeader>
                                <CardContent>
                                    <Card className="bg-primary/5 border-primary/20">
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-white border-4 border-gray-200 shadow-inner" />
                                            <div className="flex-1">
                                                <p className="font-semibold">{t.white}</p>
                                                <p className="text-sm text-muted-foreground">{t.whiteDesc}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                <Check className="w-5 h-5 text-primary" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Button className="w-full mt-6" size="lg" onClick={handleColorContinue}>
                                        {t.continue} <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                    <Button variant="ghost" className="w-full mt-2" onClick={() => goBack(sizeStep)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> {t.back}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Aluminum Color */}
                        {step === colorStep && formData.material === 'aluminum' && (
                            <Card>
                                <CardHeader>
                                    <StepHeader stepNumber={stepLabel(colorStep)} title={t.stepColorTitle} description={t.stepColorDesc} />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-4">
                                        {aluminumColors.map((color) => (
                                            <ColorOption key={color} color={color} onClick={() => handleColorSelect(color)} />
                                        ))}
                                    </div>
                                    <Button variant="ghost" className="mt-4" onClick={() => goBack(sizeStep)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> {t.back}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Grids Selection */}
                        {step === gridsStep && formData.material && (
                            <Card>
                                <CardHeader>
                                    <StepHeader
                                        stepNumber={stepLabel(gridsStep)}
                                        title={t.stepGridTitle}
                                        description={t.stepGridDesc}
                                    />
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {gridSections.map((sectionLabel, sectionIndex) => {
                                        const section = normalizedGrids[sectionIndex] || createEmptyGridSection()

                                        return (
                                            <div key={sectionLabel} className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-semibold">{sectionLabel}</h3>
                                                    <span className="text-xs text-muted-foreground">{formatGridPattern(section)}</span>
                                                </div>
                                                <div className="grid gap-3 md:grid-cols-3">
                                                    {GRID_PATTERN_OPTIONS.filter((option) => option.id !== 'custom').map((option) => (
                                                        <GridPatternOption
                                                            key={`${sectionLabel}-${option.id}`}
                                                            pattern={option.id}
                                                            selected={section.pattern === option.id}
                                                            onClick={() => handleGridPatternSelect(sectionIndex, option.id)}
                                                        />
                                                    ))}
                                                    <GridCustomOption
                                                        sectionId={`${sectionIndex}`}
                                                        section={section}
                                                        selected={section.pattern === 'custom'}
                                                        onFocus={() => handleGridPatternSelect(sectionIndex, 'custom')}
                                                        onChange={(field, value) => handleGridCustomChange(sectionIndex, field, value)}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <Button className="w-full" size="lg" onClick={handleGridsContinue} disabled={!isGridStepValid}>
                                        {t.continue} <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                    <Button variant="ghost" className="w-full" onClick={() => goBack(colorStep)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> {t.back}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Glass */}
                        {step === glassStep && formData.material && (
                            <Card>
                                <CardHeader>
                                    <StepHeader
                                        stepNumber={stepLabel(glassStep)}
                                        title={t.glassTitle}
                                        description={t.glassDesc}
                                    />
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <p className="text-sm font-medium text-red-600">{t.glassBathroomNote}</p>

                                    <div className="space-y-3">
                                        <p className="text-sm font-semibold">{t.glassMaterialSection}</p>
                                        <div className="grid gap-3 md:grid-cols-3">
                                            {GLASS_MATERIAL_OPTIONS.map((option) => (
                                                <ChoiceOption
                                                    key={option}
                                                    title={option}
                                                    selected={formData.glassType === option}
                                                    onClick={() => setFormData({
                                                        ...formData,
                                                        glassType: option,
                                                        glassTypeOther: '',
                                                    })}
                                                />
                                            ))}
                                        </div>
                                        <div className="rounded-xl border border-border bg-card p-3">
                                            <Label htmlFor="custom-glass-material" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                Custom
                                            </Label>
                                            <Input
                                                id="custom-glass-material"
                                                placeholder={t.glassMaterialOtherPlaceholder}
                                                value={formData.glassTypeOther}
                                                onFocus={() => {
                                                    if (formData.glassType) {
                                                        setFormData({ ...formData, glassType: '' })
                                                    }
                                                }}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    glassType: '',
                                                    glassTypeOther: e.target.value,
                                                })}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-sm font-semibold">{t.glassThicknessSection}</p>
                                        <div className="grid gap-3 md:grid-cols-3">
                                            {GLASS_THICKNESS_OPTIONS.map((option) => (
                                                <ChoiceOption
                                                    key={option}
                                                    title={option}
                                                    selected={formData.glassThickness === option}
                                                    onClick={() => setFormData({
                                                        ...formData,
                                                        glassThickness: option,
                                                        glassThicknessOther: '',
                                                    })}
                                                />
                                            ))}
                                        </div>
                                        <div className="rounded-xl border border-border bg-card p-3">
                                            <Label htmlFor="custom-glass-thickness" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                Custom
                                            </Label>
                                            <Input
                                                id="custom-glass-thickness"
                                                placeholder={t.glassThicknessOtherPlaceholder}
                                                value={formData.glassThicknessOther}
                                                onFocus={() => {
                                                    if (formData.glassThickness) {
                                                        setFormData({ ...formData, glassThickness: '' })
                                                    }
                                                }}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    glassThickness: '',
                                                    glassThicknessOther: e.target.value,
                                                })}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    {resolvedGlassThickness && (
                                        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
                                            {t.glassUnitNote}
                                        </div>
                                    )}

                                    <Button className="w-full" size="lg" onClick={handleGlassContinue} disabled={!isGlassStepValid}>
                                        {t.continue} <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                    <Button variant="ghost" className="w-full" onClick={() => goBack(gridsStep)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> {t.back}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Quantity */}
                        {step === quantityStep && formData.material && (
                            <Card>
                                <CardHeader>
                                    <StepHeader
                                        stepNumber={stepLabel(quantityStep)}
                                        title={t.quantityTitle}
                                        description={t.quantityDesc}
                                    />
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center gap-4">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-14 w-14 text-xl"
                                            onClick={() => setFormData({ ...formData, quantity: Math.max(1, parseInt(formData.quantity) - 1).toString() })}
                                        >
                                            <Minus className="w-5 h-5" />
                                        </Button>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                            className="w-24 h-14 text-center text-2xl font-bold"
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-14 w-14 text-xl"
                                            onClick={() => setFormData({ ...formData, quantity: (parseInt(formData.quantity) + 1).toString() })}
                                        >
                                            <Plus className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    <Button className="w-full mt-6" size="lg" onClick={handleQuantitySubmit} disabled={!formData.quantity || parseInt(formData.quantity) < 1}>
                                        {t.continue} <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                    <Button variant="ghost" className="w-full mt-2" onClick={() => goBack(glassStep)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> {t.back}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Contact */}
                        {step === contactStep && formData.material && (
                            <Card>
                                <CardHeader>
                                    <StepHeader
                                        stepNumber={t.finalStep}
                                        title={contactPanelMode === 'details' ? t.contactDetailsTitle : t.contactActionsTitle}
                                        description={contactPanelMode === 'details' ? t.contactDetailsDesc : t.contactActionsDesc}
                                    />
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <Card className="border-primary/20 bg-primary/5">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-base">{t.quoteSummaryTitle}</CardTitle>
                                            <CardDescription>{t.totalWindowItems(totalQuoteItems)}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {quoteGroups.map((group) => (
                                                <div key={group.id} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-semibold">{group.name}</p>
                                                        <span className="text-xs text-muted-foreground">{t.groupedWindowsCount(group.items.length)}</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {group.items.map((item) => (
                                                            <div key={item.id} className="rounded-lg border border-primary/10 bg-background px-3 py-2 text-sm">
                                                                <div className="flex items-center justify-between gap-3">
                                                                    <span className="font-medium">{localizeWindowType(item.windowType, language)}</span>
                                                                    <span className="text-muted-foreground">{item.width}&quot; × {item.height}&quot;</span>
                                                                </div>
                                                                <p className="mt-1 text-xs text-muted-foreground">
                                                                    Qty {item.quantity}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}

                                            {ungroupedItems.length > 0 && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-semibold">{t.ungroupedSection}</p>
                                                        <span className="text-xs text-muted-foreground">{t.groupedWindowsCount(ungroupedItems.length)}</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {ungroupedItems.map((item) => (
                                                            <div key={item.id} className="rounded-lg border border-primary/10 bg-background px-3 py-2 text-sm">
                                                                <div className="flex items-center justify-between gap-3">
                                                                    <span className="font-medium">{localizeWindowType(item.windowType, language)}</span>
                                                                    <span className="text-muted-foreground">{item.width}&quot; × {item.height}&quot;</span>
                                                                </div>
                                                                <p className="mt-1 text-xs text-muted-foreground">
                                                                    Qty {item.quantity}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {totalGroupedItems + ungroupedItems.length === 0 && (
                                                <p className="text-sm text-muted-foreground">{t.noGroupsYet}</p>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {contactPanelMode === 'actions' ? (
                                        <div className="space-y-4">
                                            {isCurrentItemSaved && activeGroup && (
                                                <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                                                    <p className="text-sm font-semibold">{t.currentWindowSaved}</p>
                                                    <p className="text-sm text-muted-foreground">{t.currentWindowSavedDesc(activeGroup.name)}</p>
                                                </div>
                                            )}

                                            {isCurrentItemSaved && !activeGroup && (
                                                <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                                                    <p className="text-sm font-semibold">{t.currentWindowUngrouped}</p>
                                                    <p className="text-sm text-muted-foreground">{t.currentWindowUngroupedDesc}</p>
                                                </div>
                                            )}

                                            {!isCurrentItemSaved && showCreateGroupForm && (
                                                <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                                                    <Label htmlFor="group-name">{t.createGroup}</Label>
                                                    <Input
                                                        id="group-name"
                                                        placeholder={t.createGroupPlaceholder}
                                                        value={newGroupName}
                                                        onChange={(event) => setNewGroupName(event.target.value)}
                                                    />
                                                    <div className="flex gap-3">
                                                        <Button onClick={handleCreateGroup} disabled={!newGroupName.trim()}>
                                                            {t.saveGroup}
                                                        </Button>
                                                        <Button variant="ghost" onClick={() => {
                                                            setShowCreateGroupForm(false)
                                                            setNewGroupName('')
                                                        }}>
                                                            {t.back}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                            {!isCurrentItemSaved && showExistingGroups && (
                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-sm font-semibold">{t.existingGroupsTitle}</p>
                                                        <p className="text-sm text-muted-foreground">{t.saveToExistingGroupsDesc}</p>
                                                    </div>
                                                    <div className="grid gap-3 md:grid-cols-2">
                                                        {quoteGroups.map((group) => (
                                                            <OptionCard
                                                                key={group.id}
                                                                title={group.name}
                                                                description={t.groupedWindowsCount(group.items.length)}
                                                                onClick={() => saveCurrentItemToGroup(group.id)}
                                                            />
                                                        ))}
                                                    </div>
                                                    <Button variant="ghost" onClick={() => setShowExistingGroups(false)}>
                                                        <ChevronLeft className="w-4 h-4 mr-1" /> {t.back}
                                                    </Button>
                                                </div>
                                            )}

                                            {!showCreateGroupForm && !showExistingGroups && (
                                                <div className="grid gap-3 md:grid-cols-2">
                                                    {!isCurrentItemSaved && activeGroup && (
                                                        <OptionCard
                                                            title={t.addItemToGroup(activeGroup.name)}
                                                            description={t.addItemToGroupDesc(activeGroup.name)}
                                                            onClick={handleAddItemToActiveGroup}
                                                        />
                                                    )}

                                                    {!isCurrentItemSaved && (
                                                        <OptionCard
                                                            title={t.createGroup}
                                                            description={t.createGroupDesc}
                                                            onClick={() => {
                                                                setShowCreateGroupForm(true)
                                                                setShowExistingGroups(false)
                                                            }}
                                                        />
                                                    )}

                                                    {!isCurrentItemSaved && quoteGroups.length > 0 && (
                                                        <OptionCard
                                                            title={t.saveToExistingGroups}
                                                            description={t.saveToExistingGroupsDesc}
                                                            onClick={() => {
                                                                setShowExistingGroups(true)
                                                                setShowCreateGroupForm(false)
                                                            }}
                                                        />
                                                    )}

                                                    {isCurrentItemSaved && activeGroup && (
                                                        <OptionCard
                                                            title={t.addItemToGroup(activeGroup.name)}
                                                            description={t.addItemToGroupDesc(activeGroup.name)}
                                                            onClick={handleAddItemToActiveGroup}
                                                        />
                                                    )}

                                                    <OptionCard
                                                        title={t.startAnotherWindow}
                                                        description={t.startAnotherWindowDesc}
                                                        onClick={handleStartAnotherWindow}
                                                    />

                                                    <OptionCard
                                                        title={t.proceedToContact}
                                                        description={t.proceedToContactDesc}
                                                        onClick={handleProceedToContact}
                                                    />
                                                </div>
                                            )}

                                            {!isCurrentItemSaved && (
                                                <Button variant="ghost" className="w-full" onClick={() => goBack(quantityStep)}>
                                                    <ChevronLeft className="w-4 h-4 mr-1" /> {t.back}
                                                </Button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                                                <p className="text-sm font-semibold">{t.readyToSubmit}</p>
                                                <p className="text-sm text-muted-foreground">{t.readyToSubmitDesc}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="contact-name">{t.contactName}</Label>
                                                <Input
                                                    id="contact-name"
                                                    placeholder="John Smith"
                                                    value={quoteContact.contactName}
                                                    onChange={(event) => setQuoteContact({ ...quoteContact, contactName: event.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="project-address">{t.projectAddress}</Label>
                                                <Input
                                                    id="project-address"
                                                    placeholder="123 Main St, Staten Island, NY"
                                                    value={quoteContact.projectAddress}
                                                    onChange={(event) => setQuoteContact({ ...quoteContact, projectAddress: event.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">{t.email}</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    value={quoteContact.email}
                                                    onChange={(event) => setQuoteContact({ ...quoteContact, email: event.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">{t.phone}</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder="(123) 456-7890"
                                                    value={quoteContact.phone}
                                                    onChange={(event) => setQuoteContact({ ...quoteContact, phone: event.target.value })}
                                                />
                                            </div>

                                            <Button
                                                className="w-full mt-6"
                                                size="lg"
                                                onClick={handleSubmit}
                                                disabled={isSubmitting || !canSubmitGroupedQuote}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        {t.submitting}
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        {t.submitQuote}
                                                    </>
                                                )}
                                            </Button>
                                            <Button variant="ghost" className="w-full mt-2" onClick={() => setContactPanelMode('actions')}>
                                                <ChevronLeft className="w-4 h-4 mr-1" /> {t.back}
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Success */}
                        {isComplete && (
                            <Card className="text-center">
                                <CardContent className="pt-8 pb-8">
                                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
                                        <Check className="w-10 h-10 text-primary-foreground" />
                                    </div>
                                    <CardTitle className="text-2xl mb-2">{t.successTitle}</CardTitle>
                                    <CardDescription className="text-base mb-8">
                                        {t.successDescPrefix} <span className="font-medium text-primary">{quoteContact.email}</span> {t.successDescSuffix}
                                    </CardDescription>
                                    <div className="space-y-3">
                                        <Button className="w-full" size="lg" onClick={resetForm}>
                                            <RotateCcw className="w-4 h-4 mr-2" />
                                            {t.anotherQuote}
                                        </Button>
                                        <Button variant="outline" className="w-full" size="lg" onClick={() => router.push('/')}>
                                            <Home className="w-4 h-4 mr-2" />
                                            {t.home}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="sticky top-24">
                            <WindowPreview
                                windowType={formData.windowType}
                                casementDesign={formData.casementDesign}
                                casementOpenDirection={formData.casementOpenDirection}
                                grids={formData.grids}
                                color={formData.color}
                                width={formData.width}
                                height={formData.height}
                            />
                            <div className="mt-6">
                                <SelectionSummary formData={formData} step={step} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
