'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    Grid3X3,
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
    grids: string
    color: string
    width: string
    height: string
    quantity: string
    email: string
    phone: string
}

// ============================================
// 窗户预览组件
// ============================================
function WindowPreview({ windowType, grids, color }: { windowType: string; grids: string; color: string }) {
    const getFrameColor = () => {
        switch (color) {
            case 'White': return '#e8e8e8'
            case 'Bronze': return '#5d4037'
            case 'Black': return '#1a1a1a'
            default: return '#4a4a4a'
        }
    }

    const frameColor = getFrameColor()
    const WindowComponent = WINDOW_COMPONENTS[windowType]

    if (!windowType || !WindowComponent) {
        return (
            <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-72 text-muted-foreground">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Square className="w-8 h-8" />
                    </div>
                    <p className="font-medium">Select a window type</p>
                    <p className="text-sm">Preview will appear here</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    Window Preview
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-48 flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg p-4">
                    <div className="w-full max-w-[180px]">
                        <WindowComponent
                            frameColor={frameColor}
                            grids={grids}
                            showGlass={true}
                        />
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-muted rounded-md p-2 text-center">
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium truncate">{windowType}</p>
                    </div>
                    <div className="bg-muted rounded-md p-2 text-center">
                        <p className="text-muted-foreground">Grids</p>
                        <p className="font-medium">{grids || '-'}</p>
                    </div>
                    <div className="bg-muted rounded-md p-2 text-center">
                        <p className="text-muted-foreground">Color</p>
                        <p className="font-medium">{color || '-'}</p>
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
    if (step === 1) return null

    const items = [
        { label: 'Material', value: formData.material },
        { label: 'Category', value: formData.aluminumCategory },
        { label: 'Window Type', value: formData.windowType },
        { label: 'Grids', value: formData.grids },
        { label: 'Color', value: formData.color },
        { label: 'Size', value: formData.width && formData.height ? `${formData.width}" × ${formData.height}"` : '' },
        { label: 'Quantity', value: parseInt(formData.quantity) > 0 ? formData.quantity : '' },
    ].filter(item => item.value)

    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-primary" />
                    Your Selection
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
                <p className="text-sm font-medium group-hover:text-primary transition-colors">{type}</p>
            </CardContent>
        </Card>
    )
}

// ============================================
// 格栅选项组件
// ============================================
function GridOption({ grid, onClick }: { grid: string; onClick: () => void }) {
    const getIcon = () => {
        if (grid === 'No Grids') return <Square className="w-6 h-6" />
        if (grid === '2') return <Grid3X3 className="w-6 h-6" />
        return <LayoutGrid className="w-6 h-6" />
    }

    return (
        <Card
            className="cursor-pointer transition-all hover:border-primary hover:shadow-sm group"
            onClick={onClick}
        >
            <CardContent className="p-5 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                        {getIcon()}
                    </span>
                </div>
                <p className="text-sm font-medium group-hover:text-primary transition-colors">{grid}</p>
            </CardContent>
        </Card>
    )
}

// ============================================
// 颜色选项组件
// ============================================
function ColorOption({ color, onClick }: { color: string; onClick: () => void }) {
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
                <p className="text-sm font-medium group-hover:text-primary transition-colors">{color}</p>
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
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<FormData>({
        material: null,
        aluminumCategory: null,
        windowType: '',
        grids: '',
        color: '',
        width: '',
        height: '',
        quantity: '1',
        email: '',
        phone: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    // 数据配置
    const vinylWindowTypes = ['Double Hung', 'Two Lites Slider', 'Three Lites Slider', 'Picture Window', 'Casement', 'Hopper', 'Awning', 'Bow Window', 'Bay Window']
    const aluminumResidentialTypes = ['Double Hung', 'Two Lites Slider', 'Three Lites Slider', 'Picture Window']
    const aluminumCommercialTypes = ['Casement', 'Hopper', 'Awning']
    const aluminumColors = ['White', 'Bronze', 'Black']

    const totalSteps = formData.material === 'vinyl' ? 7 : 8
    const progressValue = (step / totalSteps) * 100

    const getGridsOptions = () => {
        if (formData.windowType === 'Picture Window') return ['No Grids', '2', '4']
        return ['No Grids', '4 over 4', '6 over 6']
    }

    // 事件处理
    const handleMaterialSelect = (material: MaterialType) => {
        setFormData({ ...formData, material, aluminumCategory: null, windowType: '', grids: '', color: material === 'vinyl' ? 'White' : '' })
        setStep(2)
    }

    const handleAluminumCategory = (category: AluminumCategory) => {
        setFormData({ ...formData, aluminumCategory: category, windowType: '', grids: '' })
        setStep(3)
    }

    const handleWindowType = (type: string) => {
        setFormData({ ...formData, windowType: type, grids: '' })
        setStep(formData.material === 'vinyl' ? 3 : 4)
    }

    const handleGridsSelect = (grids: string) => {
        setFormData({ ...formData, grids })
        setStep(formData.material === 'vinyl' ? 4 : 5)
    }

    const handleColorContinue = () => setStep(5)

    const handleColorSelect = (color: string) => {
        setFormData({ ...formData, color })
        setStep(6)
    }

    const handleSizeSubmit = () => {
        if (formData.width && formData.height) setStep(formData.material === 'vinyl' ? 6 : 7)
    }

    const handleQuantitySubmit = () => {
        if (formData.quantity && parseInt(formData.quantity) > 0) setStep(formData.material === 'vinyl' ? 7 : 8)
    }

    const handleSubmit = async () => {
    if (!formData.email || !formData.phone) return

    setIsSubmitting(true)

    try {
        const response = await fetch('/api/quote/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Failed to submit quote')
        }

        // Success - go to success page
        if (formData.material === 'vinyl') {
            setStep(8)
        } else {
            setStep(9)
        }
    } catch (error) {
        console.error('Submit error:', error)
        alert('Failed to submit quote request. Please try again.')
    } finally {
        setIsSubmitting(false)
    }
}

    const resetForm = () => {
        setFormData({ material: null, aluminumCategory: null, windowType: '', grids: '', color: '', width: '', height: '', quantity: '1', email: '', phone: '' })
        setStep(1)
    }

    const goBack = (targetStep: number) => setStep(targetStep)

    const isComplete = (formData.material === 'vinyl' && step === 8) || (formData.material === 'aluminum' && step === 9)

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold">Window Quote</h1>
                            <p className="text-sm text-muted-foreground">Get your custom window estimate</p>
                        </div>
                        {!isComplete && (
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium">Step {step} of {totalSteps}</p>
                                    <p className="text-xs text-primary font-medium">{Math.round(progressValue)}% Complete</p>
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
                                    <StepHeader stepNumber="Step 1" title="Choose Window Material" description="Select the type of window material you prefer" />
                                </CardHeader>
                                <CardContent className="grid sm:grid-cols-2 gap-4">
                                    <OptionCard
                                        title="Vinyl Windows"
                                        description="Energy efficient & low maintenance"
                                        icon={<Square className="w-6 h-6 text-blue-600" />}
                                        tags={['Affordable', 'Durable']}
                                        onClick={() => handleMaterialSelect('vinyl')}
                                    />
                                    <OptionCard
                                        title="Aluminum Windows"
                                        description="Modern design & durability"
                                        icon={<LayoutGrid className="w-6 h-6 text-slate-600" />}
                                        tags={['Premium', 'Sleek']}
                                        onClick={() => handleMaterialSelect('aluminum')}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Step 2 (Aluminum): Category */}
                        {step === 2 && formData.material === 'aluminum' && (
                            <Card>
                                <CardHeader>
                                    <StepHeader stepNumber="Step 2" title="Choose Window Category" description="Select residential or commercial windows" />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <OptionCard
                                            title="Residential"
                                            description="For homes & apartments"
                                            icon={<Home className="w-6 h-6 text-amber-600" />}
                                            onClick={() => handleAluminumCategory('residential')}
                                        />
                                        <OptionCard
                                            title="Commercial"
                                            description="For offices & businesses"
                                            icon={<Building2 className="w-6 h-6 text-indigo-600" />}
                                            onClick={() => handleAluminumCategory('commercial')}
                                        />
                                    </div>
                                    <Button variant="ghost" className="mt-4" onClick={() => goBack(1)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Window Type Selection */}
                        {((step === 2 && formData.material === 'vinyl') || (step === 3 && formData.material === 'aluminum')) && (
                            <Card>
                                <CardHeader>
                                    <StepHeader
                                        stepNumber={`Step ${formData.material === 'vinyl' ? 2 : 3}`}
                                        title="Choose Window Style"
                                        description="Select the window type that fits your needs"
                                    />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {(formData.material === 'vinyl' ? vinylWindowTypes : formData.aluminumCategory === 'residential' ? aluminumResidentialTypes : aluminumCommercialTypes).map((type) => (
                                            <WindowTypeOption key={type} type={type} onClick={() => handleWindowType(type)} />
                                        ))}
                                    </div>
                                    <Button variant="ghost" className="mt-4" onClick={() => goBack(formData.material === 'vinyl' ? 1 : 2)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Grids Selection */}
                        {((step === 3 && formData.material === 'vinyl') || (step === 4 && formData.material === 'aluminum')) && (
                            <Card>
                                <CardHeader>
                                    <StepHeader
                                        stepNumber={`Step ${formData.material === 'vinyl' ? 3 : 4}`}
                                        title="Choose Grid Pattern"
                                        description="Select window grid pattern (optional)"
                                    />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-4">
                                        {getGridsOptions().map((grid) => (
                                            <GridOption key={grid} grid={grid} onClick={() => handleGridsSelect(grid)} />
                                        ))}
                                    </div>
                                    <Button variant="ghost" className="mt-4" onClick={() => goBack(formData.material === 'vinyl' ? 2 : 3)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Vinyl Color */}
                        {step === 4 && formData.material === 'vinyl' && (
                            <Card>
                                <CardHeader>
                                    <StepHeader stepNumber="Step 4" title="Window Color" description="Vinyl windows are available in white" />
                                </CardHeader>
                                <CardContent>
                                    <Card className="bg-primary/5 border-primary/20">
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-white border-4 border-gray-200 shadow-inner" />
                                            <div className="flex-1">
                                                <p className="font-semibold">White</p>
                                                <p className="text-sm text-muted-foreground">Standard color for vinyl windows</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                <Check className="w-5 h-5 text-primary" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Button className="w-full mt-6" size="lg" onClick={handleColorContinue}>
                                        Continue <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                    <Button variant="ghost" className="w-full mt-2" onClick={() => goBack(3)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Aluminum Color */}
                        {step === 5 && formData.material === 'aluminum' && (
                            <Card>
                                <CardHeader>
                                    <StepHeader stepNumber="Step 5" title="Choose Color" description="Select your preferred window color" />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-4">
                                        {aluminumColors.map((color) => (
                                            <ColorOption key={color} color={color} onClick={() => handleColorSelect(color)} />
                                        ))}
                                    </div>
                                    <Button variant="ghost" className="mt-4" onClick={() => goBack(4)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Dimensions */}
                        {((step === 5 && formData.material === 'vinyl') || (step === 6 && formData.material === 'aluminum')) && (
                            <Card>
                                <CardHeader>
                                    <StepHeader
                                        stepNumber={`Step ${formData.material === 'vinyl' ? 5 : 6}`}
                                        title="Window Dimensions"
                                        description="Enter the width and height in inches"
                                    />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="width">Width (inches)</Label>
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
                                            <Label htmlFor="height">Height (inches)</Label>
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
                                    <Button className="w-full mt-6" size="lg" onClick={handleSizeSubmit} disabled={!formData.width || !formData.height}>
                                        Continue <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                    <Button variant="ghost" className="w-full mt-2" onClick={() => goBack(formData.material === 'vinyl' ? 4 : 5)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Quantity */}
                        {((step === 6 && formData.material === 'vinyl') || (step === 7 && formData.material === 'aluminum')) && (
                            <Card>
                                <CardHeader>
                                    <StepHeader
                                        stepNumber={`Step ${formData.material === 'vinyl' ? 6 : 7}`}
                                        title="How Many Windows?"
                                        description="Enter the quantity you need"
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
                                        Continue <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                    <Button variant="ghost" className="w-full mt-2" onClick={() => goBack(formData.material === 'vinyl' ? 5 : 6)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Contact */}
                        {((step === 7 && formData.material === 'vinyl') || (step === 8 && formData.material === 'aluminum')) && (
                            <Card>
                                <CardHeader>
                                    <StepHeader stepNumber="Final Step" title="Contact Information" description="We will send your quote to this email" />
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number *</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="(123) 456-7890"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        className="w-full mt-6"
                                        size="lg"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || !formData.email || !formData.phone}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Submit Quote Request
                                            </>
                                        )}
                                    </Button>
                                    <Button variant="ghost" className="w-full mt-2" onClick={() => goBack(formData.material === 'vinyl' ? 6 : 7)}>
                                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                    </Button>
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
                                    <CardTitle className="text-2xl mb-2">Quote Request Submitted!</CardTitle>
                                    <CardDescription className="text-base mb-8">
                                        Thank you! We will send a detailed quote to <span className="font-medium text-primary">{formData.email}</span> within 24 hours.
                                    </CardDescription>
                                    <div className="space-y-3">
                                        <Button className="w-full" size="lg" onClick={resetForm}>
                                            <RotateCcw className="w-4 h-4 mr-2" />
                                            Request Another Quote
                                        </Button>
                                        <Button variant="outline" className="w-full" size="lg" onClick={() => router.push('/')}>
                                            <Home className="w-4 h-4 mr-2" />
                                            Back to Home
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="sticky top-24">
                            <WindowPreview windowType={formData.windowType} grids={formData.grids} color={formData.color} />
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
