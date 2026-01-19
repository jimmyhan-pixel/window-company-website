'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WINDOW_FRAME_MAP, GRID_OVERLAY_MAP } from '@/components/window-preview'

type MaterialType = 'vinyl' | 'aluminum' | null
type AluminumCategory = 'residential' | 'commercial' | null

interface FormData {
    material: MaterialType
    aluminumCategory: AluminumCategory
    windowType: string
    grids: string
    color: string
    glassType: string
    glassThickness: string
    width: string
    height: string
    quantity: string
    email: string
    phone: string
}

// Window Preview Component
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

    if (!windowType) {
        return (
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center h-72 border border-slate-200">
                <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                    </svg>
                </div>
                <p className="text-slate-500 font-medium">Select a window type</p>
                <p className="text-slate-400 text-sm mt-1">Preview will appear here</p>
            </div>
        )
    }

    // Get window frame component
    const WindowFrameComponent = WINDOW_FRAME_MAP[windowType]

    // Get grid overlay component if applicable
    const gridMap = GRID_OVERLAY_MAP[windowType]
    const GridOverlayComponent = gridMap?.[grids] || null

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 text-sm mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Window Preview
            </h3>
            <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-4">
                <div className="w-full max-w-[200px] relative">
                    {WindowFrameComponent && <WindowFrameComponent frameColor={frameColor} />}
                    {GridOverlayComponent && <GridOverlayComponent frameColor={frameColor} />}
                </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <p className="text-slate-500">Type</p>
                    <p className="font-medium text-slate-700 truncate">{windowType}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <p className="text-slate-500">Grids</p>
                    <p className="font-medium text-slate-700">{grids || '-'}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 text-center">
                    <p className="text-slate-500">Color</p>
                    <p className="font-medium text-slate-700">{color || '-'}</p>
                </div>
            </div>
        </div>
    )
}

// Selection Summary Component
function SelectionSummary({ formData, step }: { formData: FormData; step: number }) {
    if (step === 1) return null

    const items = [
        { label: 'Material', value: formData.material, show: !!formData.material },
        { label: 'Category', value: formData.aluminumCategory, show: !!formData.aluminumCategory },
        { label: 'Window Type', value: formData.windowType, show: !!formData.windowType },
        { label: 'Grids', value: formData.grids, show: !!formData.grids },
        { label: 'Color', value: formData.color, show: !!formData.color },
        { label: 'Glass Type', value: formData.glassType, show: !!formData.glassType },
        { label: 'Glass Thickness', value: formData.glassThickness, show: !!formData.glassThickness },
        { label: 'Size', value: formData.width && formData.height ? `${formData.width}" x ${formData.height}"` : '', show: !!(formData.width && formData.height) },
        { label: 'Quantity', value: formData.quantity, show: parseInt(formData.quantity) > 0 },
    ]

    return (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
            <h3 className="font-semibold text-slate-800 text-sm mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Your Selection
            </h3>
            <div className="space-y-2">
                {items.filter(item => item.show).map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-emerald-100 last:border-0">
                        <span className="text-slate-500 text-sm">{item.label}</span>
                        <span className="font-medium text-slate-700 text-sm capitalize">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Window Type Icon
function WindowTypeIcon({ type }: { type: string }) {
    const iconClass = "w-8 h-8 text-slate-400 group-hover:text-emerald-600 transition-colors"

    const icons: Record<string, React.ReactElement> = {
        'Double Hung': (
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="2" width="16" height="20" rx="1" />
                <line x1="4" y1="12" x2="20" y2="12" />
            </svg>
        ),
        'Two Lites Slider': (
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="1" />
                <line x1="12" y1="4" x2="12" y2="20" />
            </svg>
        ),
        'Three Lites Slider': (
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="1" />
                <line x1="8" y1="4" x2="8" y2="20" />
                <line x1="16" y1="4" x2="16" y2="20" />
            </svg>
        ),
        'Picture Window': (
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="16" rx="1" />
            </svg>
        ),
        'Casement': (
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="2" width="16" height="20" rx="1" />
                <circle cx="6" cy="12" r="1" fill="currentColor" />
            </svg>
        ),
        'Hopper': (
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="16" rx="1" />
                <path d="M12 14l-3 4h6l-3-4z" fill="currentColor" />
            </svg>
        ),
        'Awning': (
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="16" rx="1" />
                <path d="M12 10l-3-4h6l-3 4z" fill="currentColor" />
            </svg>
        ),
        'Bow Window': (
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 18V6c0-1 1-2 3-2h12c2 0 3 1 3 2v12" />
                <path d="M3 18h18" strokeWidth="2" />
            </svg>
        ),
        'Bay Window': (
            <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 18l2-14h4v14M14 4h4l2 14M8 4h8v14H8z" />
                <line x1="4" y1="18" x2="20" y2="18" strokeWidth="2" />
            </svg>
        ),
    }

    return icons[type] || (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="4" width="16" height="16" rx="1" />
        </svg>
    )
}

export default function QuotationPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<FormData>({
        material: null,
        aluminumCategory: null,
        windowType: '',
        grids: '',
        color: '',
        glassType: '',
        glassThickness: '',
        width: '',
        height: '',
        quantity: '1',
        email: '',
        phone: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const vinylWindowTypes = ['Double Hung', 'Two Lites Slider', 'Three Lites Slider', 'Picture Window', 'Casement', 'Hopper', 'Awning', 'Bow Window', 'Bay Window']
    const aluminumResidentialTypes = ['Double Hung', 'Two Lites Slider', 'Three Lites Slider', 'Picture Window']
    const aluminumCommercialTypes = ['Casement', 'Hopper', 'Awning']
    const aluminumColors = ['White', 'Bronze', 'Black']

    const totalSteps = formData.material === 'vinyl' ? 6 : 7

    const shouldShowGrids = () => {
        return ['Double Hung', 'Two Lites Slider', 'Picture Window'].includes(formData.windowType)
    }

    const getGridsOptions = () => {
        if (formData.windowType === 'Picture Window') return ['No Grids', '2', '4']
        if (['Double Hung', 'Two Lites Slider'].includes(formData.windowType)) {
            return ['No Grids', '4 over 4', '6 over 6']
        }
        return ['No Grids']
    }

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
        setStep(3) // Go to Design Options (merged grids+color)
    }

    const handleDesignOptionsSubmit = () => {
        // Validate that required fields are filled
        if (formData.material === 'aluminum' && !formData.color) return
        if (shouldShowGrids() && !formData.grids) return
        setStep(4) // Go to Glass Options
    }

    const handleGlassOptionsSubmit = () => {
        if (!formData.glassType || !formData.glassThickness) return
        setStep(formData.material === 'vinyl' ? 5 : 5) // Go to Dimensions
    }

    const handleSizeSubmit = () => {
        if (formData.width && formData.height) setStep(formData.material === 'vinyl' ? 6 : 6)
    }

    const handleQuantitySubmit = () => {
        if (formData.quantity && parseInt(formData.quantity) > 0) setStep(formData.material === 'vinyl' ? 7 : 7)
    }

    const handleSubmit = async () => {
        if (!formData.email || !formData.phone) return
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
            setStep(formData.material === 'vinyl' ? 8 : 8)
        }, 1500)
    }

    const resetForm = () => {
        setFormData({ material: null, aluminumCategory: null, windowType: '', grids: '', color: '', glassType: '', glassThickness: '', width: '', height: '', quantity: '1', email: '', phone: '' })
        setStep(1)
    }

    const isComplete = (formData.material === 'vinyl' && step === 8) || (formData.material === 'aluminum' && step === 9)

    // Back button component
    const BackButton = ({ onClick }: { onClick: () => void }) => (
        <button onClick={onClick} className="mt-4 w-full inline-flex items-center justify-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors py-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
        </button>
    )

    // Primary button component
    const PrimaryButton = ({ onClick, disabled, loading, children }: { onClick: () => void; disabled?: boolean; loading?: boolean; children: React.ReactNode }) => (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
        >
            {loading ? (
                <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                </>
            ) : children}
        </button>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">Window Quote</h1>
                            <p className="text-sm text-slate-500">Get your custom window estimate</p>
                        </div>
                        {!isComplete && (
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-slate-700">Step {step} of {totalSteps}</p>
                                    <p className="text-xs text-emerald-600 font-medium">{Math.round((step / totalSteps) * 100)}% Complete</p>
                                </div>
                                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${(step / totalSteps) * 100}%` }} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-3">

                        {/* Step 1: Material */}
                        {step === 1 && (
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                                <div className="mb-8">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mb-4">Step 1</span>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Choose Window Material</h2>
                                    <p className="text-slate-500">Select the type of window material you prefer</p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { id: 'vinyl', name: 'Vinyl Windows', desc: 'Energy efficient & low maintenance', tags: ['Affordable', 'Durable'], color: 'blue' },
                                        { id: 'aluminum', name: 'Aluminum Windows', desc: 'Modern design & durability', tags: ['Premium', 'Sleek'], color: 'slate' }
                                    ].map((mat) => (
                                        <button key={mat.id} onClick={() => handleMaterialSelect(mat.id as MaterialType)} className="group relative p-6 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300 text-left">
                                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            </div>
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mat.color === 'blue' ? 'from-blue-100 to-blue-50' : 'from-slate-200 to-slate-100'} flex items-center justify-center mb-4`}>
                                                <svg className={`w-7 h-7 ${mat.color === 'blue' ? 'text-blue-600' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">{mat.name}</h3>
                                            <p className="text-sm text-slate-500">{mat.desc}</p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {mat.tags.map((tag) => <span key={tag} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">{tag}</span>)}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2 (Aluminum): Category */}
                        {step === 2 && formData.material === 'aluminum' && (
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                                <div className="mb-8">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mb-4">Step 2</span>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Choose Window Category</h2>
                                    <p className="text-slate-500">Select residential or commercial windows</p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { id: 'residential', name: 'Residential', desc: 'For homes & apartments', icon: 'home', color: 'amber' },
                                        { id: 'commercial', name: 'Commercial', desc: 'For offices & businesses', icon: 'building', color: 'indigo' }
                                    ].map((cat) => (
                                        <button key={cat.id} onClick={() => handleAluminumCategory(cat.id as AluminumCategory)} className="group p-6 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl hover:border-emerald-400 hover:shadow-lg transition-all duration-300 text-left">
                                            <div className={`w-12 h-12 rounded-xl ${cat.color === 'amber' ? 'bg-amber-100' : 'bg-indigo-100'} flex items-center justify-center mb-4`}>
                                                <svg className={`w-6 h-6 ${cat.color === 'amber' ? 'text-amber-600' : 'text-indigo-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {cat.icon === 'home' ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800 mb-1">{cat.name}</h3>
                                            <p className="text-sm text-slate-500">{cat.desc}</p>
                                        </button>
                                    ))}
                                </div>
                                <BackButton onClick={() => setStep(1)} />
                            </div>
                        )}

                        {/* Window Type Selection */}
                        {((step === 2 && formData.material === 'vinyl') || (step === 3 && formData.material === 'aluminum')) && (
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                                <div className="mb-8">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mb-4">Step {formData.material === 'vinyl' ? 2 : 3}</span>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Choose Window Style</h2>
                                    <p className="text-slate-500">Select the window type that fits your needs</p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {(formData.material === 'vinyl' ? vinylWindowTypes : formData.aluminumCategory === 'residential' ? aluminumResidentialTypes : aluminumCommercialTypes).map((type) => (
                                        <button key={type} onClick={() => handleWindowType(type)} className="group p-4 bg-slate-50 border-2 border-transparent rounded-xl hover:bg-white hover:border-emerald-400 hover:shadow-md transition-all duration-200 text-left">
                                            <WindowTypeIcon type={type} />
                                            <p className="mt-2 text-sm font-medium text-slate-700 group-hover:text-emerald-700">{type}</p>
                                        </button>
                                    ))}
                                </div>
                                <BackButton onClick={() => setStep(formData.material === 'vinyl' ? 1 : 2)} />
                            </div>
                        )}


                        {/* Design Options (Merged Grids + Color) */}
                        {step === 3 && (
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                                <div className="mb-8">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mb-4">Step 3</span>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Design Options</h2>
                                    <p className="text-slate-500">Customize your window design</p>
                                </div>

                                {/* Grid Options - Conditional */}
                                {shouldShowGrids() && (
                                    <div className="mb-8">
                                        <h3 className="font-semibold text-slate-700 mb-4">Grid Pattern</h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            {getGridsOptions().map((grid) => (
                                                <button
                                                    key={grid}
                                                    onClick={() => setFormData({ ...formData, grids: grid })}
                                                    className={`group p-5 bg-slate-50 border-2 rounded-xl hover:bg-white hover:border-emerald-400 hover:shadow-md transition-all duration-200 text-center ${formData.grids === grid ? 'border-emerald-400 bg-white' : 'border-transparent'}`}
                                                >
                                                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-emerald-300">
                                                        <svg className="w-6 h-6 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                            <rect x="4" y="4" width="16" height="16" rx="1" />
                                                            {grid !== 'No Grids' && <line x1="12" y1="4" x2="12" y2="20" />}
                                                            {(grid === '4' || grid === '4 over 4' || grid === '6 over 6') && <line x1="4" y1="12" x2="20" y2="12" />}
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">{grid}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Color Options */}
                                <div>
                                    <h3 className="font-semibold text-slate-700 mb-4">Window Color</h3>
                                    {formData.material === 'vinyl' ? (
                                        <div className="p-6 bg-gradient-to-br from-slate-50 to-white border-2 border-emerald-200 rounded-2xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-200 shadow-inner"></div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-lg text-slate-800">White</p>
                                                    <p className="text-sm text-slate-500">Standard color for vinyl windows</p>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-4">
                                            {aluminumColors.map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => setFormData({ ...formData, color })}
                                                    className={`group p-5 bg-slate-50 border-2 rounded-xl hover:bg-white hover:border-emerald-400 hover:shadow-md transition-all duration-200 text-center ${formData.color === color ? 'border-emerald-400 bg-white' : 'border-transparent'}`}
                                                >
                                                    <div className={`w-14 h-14 rounded-full mx-auto mb-3 shadow-md ${color === 'White' ? 'bg-white border-4 border-slate-200' : color === 'Bronze' ? 'bg-amber-800' : 'bg-slate-900'}`}></div>
                                                    <p className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">{color}</p>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <PrimaryButton
                                        onClick={handleDesignOptionsSubmit}
                                        disabled={
                                            (formData.material === 'aluminum' && !formData.color) ||
                                            (shouldShowGrids() && !formData.grids)
                                        }
                                    >
                                        Continue
                                    </PrimaryButton>
                                </div>
                                <BackButton onClick={() => setStep(formData.material === 'vinyl' ? 2 : 3)} />
                            </div>
                        )}

                        {/* Glass Options (New Step) */}
                        {step === 4 && (
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                                <div className="mb-8">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mb-4">Step 4</span>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Glass Options</h2>
                                    <p className="text-slate-500">Select your glass specifications</p>
                                </div>

                                {/* Glass Type */}
                                <div className="mb-8">
                                    <h3 className="font-semibold text-slate-700 mb-4">Glass Type *</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['Clear Glass', 'Low-E Glass', 'Tempered Glass'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setFormData({ ...formData, glassType: type })}
                                                className={`group p-5 bg-slate-50 border-2 rounded-xl hover:bg-white hover:border-emerald-400 hover:shadow-md transition-all duration-200 text-center ${formData.glassType === type ? 'border-emerald-400 bg-white' : 'border-transparent'}`}
                                            >
                                                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-emerald-300">
                                                    <svg className="w-6 h-6 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <rect x="6" y="4" width="12" height="16" rx="1" />
                                                        {type === 'Low-E Glass' && <path d="M9 8h6M9 12h6M9 16h6" strokeWidth="1" />}
                                                        {type === 'Tempered Glass' && <circle cx="12" cy="12" r="3" strokeWidth="1" />}
                                                    </svg>
                                                </div>
                                                <p className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">{type}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Glass Thickness */}
                                <div>
                                    <h3 className="font-semibold text-slate-700 mb-4">Glass Thickness *</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Standard', '1/8 inch'].map((thickness) => (
                                            <button
                                                key={thickness}
                                                onClick={() => setFormData({ ...formData, glassThickness: thickness })}
                                                className={`group p-5 bg-slate-50 border-2 rounded-xl hover:bg-white hover:border-emerald-400 hover:shadow-md transition-all duration-200 text-center ${formData.glassThickness === thickness ? 'border-emerald-400 bg-white' : 'border-transparent'}`}
                                            >
                                                <p className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">{thickness}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <PrimaryButton
                                        onClick={handleGlassOptionsSubmit}
                                        disabled={!formData.glassType || !formData.glassThickness}
                                    >
                                        Continue
                                    </PrimaryButton>
                                </div>
                                <BackButton onClick={() => setStep(3)} />
                            </div>
                        )}


                        {/* Dimensions */}
                        {step === 5 && (
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                                <div className="mb-8">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mb-4">Step 5</span>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Window Dimensions</h2>
                                    <p className="text-slate-500">Enter the width and height in inches</p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Width (inches)</label>
                                        <input type="number" min="1" value={formData.width} onChange={(e) => setFormData({ ...formData, width: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:bg-white focus:outline-none transition-all text-lg" placeholder="36" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Height (inches)</label>
                                        <input type="number" min="1" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:bg-white focus:outline-none transition-all text-lg" placeholder="48" />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <PrimaryButton onClick={handleSizeSubmit} disabled={!formData.width || !formData.height}>Continue</PrimaryButton>
                                </div>
                                <BackButton onClick={() => setStep(4)} />
                            </div>
                        )}

                        {/* Quantity */}
                        {step === 6 && (
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                                <div className="mb-8">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mb-4">Step 6</span>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">How Many Windows?</h2>
                                    <p className="text-slate-500">Enter the quantity you need</p>
                                </div>
                                <div className="flex items-center justify-center gap-4">
                                    <button onClick={() => setFormData({ ...formData, quantity: Math.max(1, parseInt(formData.quantity) - 1).toString() })} className="w-14 h-14 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-600 transition-colors">-</button>
                                    <input type="number" min="1" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} className="w-24 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:bg-white focus:outline-none transition-all text-2xl font-bold text-center" />
                                    <button onClick={() => setFormData({ ...formData, quantity: (parseInt(formData.quantity) + 1).toString() })} className="w-14 h-14 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-600 transition-colors">+</button>
                                </div>
                                <div className="mt-6">
                                    <PrimaryButton onClick={handleQuantitySubmit} disabled={!formData.quantity || parseInt(formData.quantity) < 1}>Continue</PrimaryButton>
                                </div>
                                <BackButton onClick={() => setStep(5)} />
                            </div>
                        )}

                        {/* Contact */}
                        {step === 7 && (
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                                <div className="mb-8">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mb-4">Final Step</span>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Contact Information</h2>
                                    <p className="text-slate-500">We will send your quote to this email</p>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:bg-white focus:outline-none transition-all" placeholder="your@email.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:bg-white focus:outline-none transition-all" placeholder="(123) 456-7890" />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <PrimaryButton onClick={handleSubmit} disabled={!formData.email || !formData.phone} loading={isSubmitting}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Submit Quote Request
                                    </PrimaryButton>
                                </div>
                                <BackButton onClick={() => setStep(6)} />
                            </div>
                        )}

                        {/* Success */}
                        {step === 8 && (
                            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Quote Request Submitted!</h2>
                                <p className="text-slate-500 mb-8">Thank you! We will send a detailed quote to <span className="font-medium text-emerald-600">{formData.email}</span> within 24 hours.</p>
                                <div className="space-y-3">
                                    <button onClick={resetForm} className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg transition-all duration-300">Request Another Quote</button>
                                    <button onClick={() => router.push('/')} className="w-full py-4 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all duration-300">Back to Home</button>
                                </div>
                            </div>
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
            </div>
        </div>
    )
}
