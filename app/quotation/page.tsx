'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

// Window Preview Component with Layered Approach
function WindowPreview({
    windowType,
    grids,
    color
}: {
    windowType: string
    grids: string
    color: string
}) {
    // Get color filter based on selection
    const getColorFilter = () => {
        switch (color) {
            case 'White':
                return 'brightness(1.2) saturate(0)'
            case 'Bronze':
                return 'sepia(1) saturate(2) hue-rotate(10deg) brightness(0.6)'
            case 'Black':
                return 'brightness(0.3)'
            default:
                return 'none'
        }
    }

    // Layer 1: Window Frame (base structure)
    const WindowFrame = () => {
        const frameColor = "#333"
        const frameWidth = 4

        switch (windowType) {
            case 'Double Hung':
                return (
                    <svg viewBox="0 0 200 300" className="w-full">
                        <rect x="20" y="20" width="160" height="260" fill="none" stroke={frameColor} strokeWidth={frameWidth} />
                        <line x1="20" y1="150" x2="180" y2="150" stroke={frameColor} strokeWidth={frameWidth} />
                    </svg>
                )

            case 'Two Lites Slider':
                return (
                    <svg viewBox="0 0 300 200" className="w-full">
                        <rect x="20" y="20" width="260" height="160" fill="none" stroke={frameColor} strokeWidth={frameWidth} />
                        <line x1="150" y1="20" x2="150" y2="180" stroke={frameColor} strokeWidth={frameWidth} />
                    </svg>
                )

            case 'Three Lites Slider':
                return (
                    <svg viewBox="0 0 300 200" className="w-full">
                        <rect x="20" y="20" width="260" height="160" fill="none" stroke={frameColor} strokeWidth={frameWidth} />
                        <line x1="106" y1="20" x2="106" y2="180" stroke={frameColor} strokeWidth={frameWidth} />
                        <line x1="193" y1="20" x2="193" y2="180" stroke={frameColor} strokeWidth={frameWidth} />
                    </svg>
                )

            case 'Picture Window':
                return (
                    <svg viewBox="0 0 280 200" className="w-full">
                        <rect x="20" y="20" width="240" height="160" fill="none" stroke={frameColor} strokeWidth={frameWidth} />
                    </svg>
                )

            case 'Casement':
                return (
                    <svg viewBox="0 0 200 280" className="w-full">
                        <rect x="20" y="20" width="160" height="240" fill="none" stroke={frameColor} strokeWidth={frameWidth} />
                        <circle cx="25" cy="80" r="4" fill={frameColor} />
                        <circle cx="25" cy="140" r="4" fill={frameColor} />
                        <circle cx="25" cy="200" r="4" fill={frameColor} />
                        <rect x="165" y="130" width="10" height="20" fill={frameColor} rx="2" />
                    </svg>
                )

            case 'Hopper':
                return (
                    <svg viewBox="0 0 280 180" className="w-full">
                        <rect x="20" y="20" width="240" height="140" fill="none" stroke={frameColor} strokeWidth={frameWidth} />
                        <circle cx="80" cy="25" r="4" fill={frameColor} />
                        <circle cx="140" cy="25" r="4" fill={frameColor} />
                        <circle cx="200" cy="25" r="4" fill={frameColor} />
                        <rect x="130" y="155" width="20" height="10" fill={frameColor} rx="2" />
                    </svg>
                )

            case 'Awning':
                return (
                    <svg viewBox="0 0 280 180" className="w-full">
                        <rect x="20" y="20" width="240" height="140" fill="none" stroke={frameColor} strokeWidth={frameWidth} />
                        <circle cx="80" cy="155" r="4" fill={frameColor} />
                        <circle cx="140" cy="155" r="4" fill={frameColor} />
                        <circle cx="200" cy="155" r="4" fill={frameColor} />
                        <rect x="130" y="25" width="20" height="10" fill={frameColor} rx="2" />
                    </svg>
                )

            case 'Bow Window':
                return (
                    <svg viewBox="0 0 300 200" className="w-full">
                        <path d="M 20 180 L 20 30 Q 30 25 40 30 L 40 180" fill="none" stroke={frameColor} strokeWidth="3" />
                        <path d="M 40 30 Q 50 22 75 22 Q 100 22 110 30 L 110 180" fill="none" stroke={frameColor} strokeWidth="3" />
                        <path d="M 110 30 Q 125 20 150 20 Q 175 20 190 30 L 190 180" fill="none" stroke={frameColor} strokeWidth="3" />
                        <path d="M 190 30 Q 200 22 225 22 Q 250 22 260 30 L 260 180" fill="none" stroke={frameColor} strokeWidth="3" />
                        <path d="M 260 30 Q 270 25 280 30 L 280 180" fill="none" stroke={frameColor} strokeWidth="3" />
                        <line x1="20" y1="180" x2="280" y2="180" stroke={frameColor} strokeWidth={frameWidth} />
                    </svg>
                )

            case 'Bay Window':
                return (
                    <svg viewBox="0 0 300 200" className="w-full">
                        <line x1="40" y1="180" x2="60" y2="20" stroke={frameColor} strokeWidth={frameWidth} />
                        <line x1="60" y1="20" x2="100" y2="20" stroke={frameColor} strokeWidth={frameWidth} />
                        <line x1="100" y1="20" x2="100" y2="180" stroke={frameColor} strokeWidth={frameWidth} />
                        <line x1="100" y1="20" x2="200" y2="20" stroke={frameColor} strokeWidth={frameWidth} />
                        <line x1="200" y1="20" x2="200" y2="180" stroke={frameColor} strokeWidth={frameWidth} />
                        <line x1="200" y1="20" x2="240" y2="20" stroke={frameColor} strokeWidth={frameWidth} />
                        <line x1="240" y1="20" x2="260" y2="180" stroke={frameColor} strokeWidth={frameWidth} />
                        <line x1="40" y1="180" x2="260" y2="180" stroke={frameColor} strokeWidth={frameWidth} />
                    </svg>
                )

            default:
                return (
                    <svg viewBox="0 0 200 200" className="w-full">
                        <rect x="20" y="20" width="160" height="160" fill="none" stroke={frameColor} strokeWidth={frameWidth} />
                    </svg>
                )
        }
    }

    // Layer 2: Arrow Indicators (only shown when no grids)
    const ArrowIndicators = () => {
        const arrowColor = "#666"
        const arrowWidth = 2

        switch (windowType) {
            case 'Double Hung':
                return (
                    <svg viewBox="0 0 200 300" className="w-full absolute inset-0">
                        <path d="M 100 60 L 100 120 M 85 105 L 100 120 L 115 105"
                            fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                        <path d="M 100 240 L 100 180 M 85 195 L 100 180 L 115 195"
                            fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                    </svg>
                )

            case 'Two Lites Slider':
                return (
                    <svg viewBox="0 0 300 200" className="w-full absolute inset-0">
                        <path d="M 60 100 L 120 100 M 105 85 L 120 100 L 105 115"
                            fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                        <path d="M 240 100 L 180 100 M 195 85 L 180 100 L 195 115"
                            fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                    </svg>
                )

            case 'Three Lites Slider':
                return (
                    <svg viewBox="0 0 300 200" className="w-full absolute inset-0">
                        {/* Left pane - slides right */}
                        <path d="M 40 100 L 80 100 M 70 90 L 80 100 L 70 110"
                            fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                        {/* Middle pane - FIXED (no arrow) */}
                        {/* Right pane - slides left */}
                        <path d="M 260 100 L 220 100 M 230 90 L 220 100 L 230 110"
                            fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                    </svg>
                )

            case 'Picture Window':
                return (
                    <svg viewBox="0 0 280 200" className="w-full absolute inset-0">
                        <circle cx="140" cy="100" r="20" fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                        <line x1="140" y1="90" x2="140" y2="110" stroke={arrowColor} strokeWidth={arrowWidth} />
                        <line x1="130" y1="100" x2="150" y2="100" stroke={arrowColor} strokeWidth={arrowWidth} />
                    </svg>
                )

            case 'Casement':
                return (
                    <svg viewBox="0 0 200 280" className="w-full absolute inset-0">
                        <path d="M 100 140 L 140 140 M 130 130 L 140 140 L 130 150"
                            fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                    </svg>
                )

            case 'Hopper':
                return (
                    <svg viewBox="0 0 280 180" className="w-full absolute inset-0">
                        <path d="M 140 130 L 140 90 M 130 100 L 140 90 L 150 100"
                            fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                    </svg>
                )

            case 'Awning':
                return (
                    <svg viewBox="0 0 280 180" className="w-full absolute inset-0">
                        <path d="M 140 60 L 140 100 M 130 90 L 140 100 L 150 90"
                            fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                    </svg>
                )

            case 'Bow Window':
                return (
                    <svg viewBox="0 0 300 200" className="w-full absolute inset-0">
                        <circle cx="150" cy="100" r="25" fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                        <path d="M 135 100 L 165 100 M 155 90 L 165 100 L 155 110"
                            fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                    </svg>
                )

            case 'Bay Window':
                return (
                    <svg viewBox="0 0 300 200" className="w-full absolute inset-0">
                        <circle cx="150" cy="100" r="25" fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                        <path d="M 135 100 L 165 100 M 155 90 L 165 100 L 155 110"
                            fill="none" stroke={arrowColor} strokeWidth={arrowWidth} />
                    </svg>
                )

            default:
                return null
        }
    }

    // Layer 3: Grids overlay
    const GridsLayer = () => {
        const gridColor = "#666"
        const gridWidth = 1.5

        if (!grids || grids === 'No Grids') return null

        switch (windowType) {
            case 'Double Hung':
                if (grids === '4 over 4') {
                    return (
                        <svg viewBox="0 0 200 300" className="w-full absolute inset-0">
                            <line x1="100" y1="20" x2="100" y2="150" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="85" x2="180" y2="85" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="100" y1="150" x2="100" y2="280" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="215" x2="180" y2="215" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                } else if (grids === '6 over 6') {
                    return (
                        <svg viewBox="0 0 200 300" className="w-full absolute inset-0">
                            <line x1="73" y1="20" x2="73" y2="150" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="127" y1="20" x2="127" y2="150" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="85" x2="180" y2="85" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="73" y1="150" x2="73" y2="280" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="127" y1="150" x2="127" y2="280" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="215" x2="180" y2="215" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                }
                break

            case 'Two Lites Slider':
                if (grids === '4 over 4') {
                    return (
                        <svg viewBox="0 0 300 200" className="w-full absolute inset-0">
                            <line x1="85" y1="20" x2="85" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="100" x2="150" y2="100" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="215" y1="20" x2="215" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="150" y1="100" x2="280" y2="100" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                } else if (grids === '6 over 6') {
                    return (
                        <svg viewBox="0 0 300 200" className="w-full absolute inset-0">
                            <line x1="63" y1="20" x2="63" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="106" y1="20" x2="106" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="100" x2="150" y2="100" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="193" y1="20" x2="193" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="236" y1="20" x2="236" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="150" y1="100" x2="280" y2="100" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                }
                break

            case 'Three Lites Slider':
                if (grids === '4 over 4') {
                    return (
                        <svg viewBox="0 0 300 200" className="w-full absolute inset-0">
                            <line x1="63" y1="20" x2="63" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="100" x2="106" y2="100" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="150" y1="20" x2="150" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="106" y1="100" x2="193" y2="100" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="236" y1="20" x2="236" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="193" y1="100" x2="280" y2="100" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                } else if (grids === '6 over 6') {
                    return (
                        <svg viewBox="0 0 300 200" className="w-full absolute inset-0">
                            <line x1="47" y1="20" x2="47" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="79" y1="20" x2="79" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="100" x2="106" y2="100" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="128" y1="20" x2="128" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="171" y1="20" x2="171" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="106" y1="100" x2="193" y2="100" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="214" y1="20" x2="214" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="257" y1="20" x2="257" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="193" y1="100" x2="280" y2="100" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                }
                break

            case 'Picture Window':
                if (grids === '2') {
                    return (
                        <svg viewBox="0 0 280 200" className="w-full absolute inset-0">
                            <line x1="106" y1="20" x2="106" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="173" y1="20" x2="173" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                } else if (grids === '4') {
                    return (
                        <svg viewBox="0 0 280 200" className="w-full absolute inset-0">
                            <line x1="140" y1="20" x2="140" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="100" x2="260" y2="100" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                }
                break

            case 'Casement':
                if (grids === '4 over 4') {
                    return (
                        <svg viewBox="0 0 200 280" className="w-full absolute inset-0">
                            <line x1="100" y1="20" x2="100" y2="260" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="140" x2="180" y2="140" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                } else if (grids === '6 over 6') {
                    return (
                        <svg viewBox="0 0 200 280" className="w-full absolute inset-0">
                            <line x1="73" y1="20" x2="73" y2="260" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="127" y1="20" x2="127" y2="260" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="100" x2="180" y2="100" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="180" x2="180" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                }
                break

            case 'Hopper':
                if (grids === '4 over 4') {
                    return (
                        <svg viewBox="0 0 280 180" className="w-full absolute inset-0">
                            <line x1="140" y1="20" x2="140" y2="160" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="90" x2="260" y2="90" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                } else if (grids === '6 over 6') {
                    return (
                        <svg viewBox="0 0 280 180" className="w-full absolute inset-0">
                            <line x1="93" y1="20" x2="93" y2="160" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="187" y1="20" x2="187" y2="160" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="90" x2="260" y2="90" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                }
                break

            case 'Awning':
                if (grids === '4 over 4') {
                    return (
                        <svg viewBox="0 0 280 180" className="w-full absolute inset-0">
                            <line x1="140" y1="20" x2="140" y2="160" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="90" x2="260" y2="90" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                } else if (grids === '6 over 6') {
                    return (
                        <svg viewBox="0 0 280 180" className="w-full absolute inset-0">
                            <line x1="93" y1="20" x2="93" y2="160" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="187" y1="20" x2="187" y2="160" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="20" y1="90" x2="260" y2="90" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                }
                break

            case 'Bow Window':
                if (grids === '4 over 4') {
                    return (
                        <svg viewBox="0 0 300 200" className="w-full absolute inset-0">
                            <line x1="30" y1="105" x2="30" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="75" y1="105" x2="75" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="150" y1="105" x2="150" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="225" y1="105" x2="225" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="270" y1="105" x2="270" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                } else if (grids === '6 over 6') {
                    return (
                        <svg viewBox="0 0 300 200" className="w-full absolute inset-0">
                            <line x1="30" y1="105" x2="30" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="57" y1="105" x2="57" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="93" y1="105" x2="93" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="130" y1="105" x2="130" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="170" y1="105" x2="170" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="207" y1="105" x2="207" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="243" y1="105" x2="243" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="270" y1="105" x2="270" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                }
                break

            case 'Bay Window':
                if (grids === '4 over 4') {
                    return (
                        <svg viewBox="0 0 300 200" className="w-full absolute inset-0">
                            <line x1="70" y1="100" x2="70" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="150" y1="100" x2="150" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="230" y1="100" x2="230" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                } else if (grids === '6 over 6') {
                    return (
                        <svg viewBox="0 0 300 200" className="w-full absolute inset-0">
                            <line x1="60" y1="100" x2="60" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="80" y1="100" x2="80" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="125" y1="100" x2="125" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="175" y1="100" x2="175" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="220" y1="100" x2="220" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                            <line x1="240" y1="100" x2="240" y2="180" stroke={gridColor} strokeWidth={gridWidth} />
                        </svg>
                    )
                }
                break
        }

        return null
    }

    if (!windowType) {
        return (
            <div className="bg-[#f7f8f3] rounded-xl p-8 flex items-center justify-center h-64 border border-gray-200">
                <p className="text-gray-500">Select window type to see preview</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl p-6 border-2 border-[#dce2cd] shadow-sm">
            <h3 className="font-bold text-[#2d2d2d] text-sm mb-4 text-center">Window Preview</h3>
            <div
                className="relative"
                style={{ filter: getColorFilter() }}
            >
                <WindowFrame />
                {!grids || grids === 'No Grids' ? <ArrowIndicators /> : null}
                <GridsLayer />
            </div>
            <div className="mt-4 text-xs text-gray-600 text-center space-y-1">
                <p><span className="font-medium">Type:</span> {windowType}</p>
                {grids && <p><span className="font-medium">Grids:</span> {grids}</p>}
                {color && <p><span className="font-medium">Color:</span> {color}</p>}
            </div>
        </div>
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
        width: '',
        height: '',
        quantity: '1',
        email: '',
        phone: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const vinylWindowTypes = [
        'Double Hung', 'Two Lites Slider', 'Three Lites Slider', 'Picture Window',
        'Casement', 'Hopper', 'Awning', 'Bow Window', 'Bay Window'
    ]

    const aluminumResidentialTypes = ['Double Hung', 'Two Lites Slider', 'Three Lites Slider', 'Picture Window']
    const aluminumCommercialTypes = ['Casement', 'Hopper', 'Awning']
    const aluminumColors = ['White', 'Bronze', 'Black']

    const needsGrids = () => {
        // All window types can have grids
        return formData.windowType !== ''
    }

    const getGridsOptions = () => {
        if (formData.windowType === 'Picture Window') {
            return ['No Grids', '2', '4']
        } else if (['Double Hung', 'Two Lites Slider', 'Three Lites Slider', 'Casement', 'Hopper', 'Awning', 'Bow Window', 'Bay Window'].includes(formData.windowType)) {
            return ['No Grids', '4 over 4', '6 over 6']
        }
        return ['No Grids']
    }

    const handleMaterialSelect = (material: MaterialType) => {
        setFormData({
            ...formData,
            material,
            aluminumCategory: null,
            windowType: '',
            grids: '',
            color: material === 'vinyl' ? 'White' : ''
        })
        setStep(2)
    }

    const handleAluminumCategory = (category: AluminumCategory) => {
        setFormData({ ...formData, aluminumCategory: category, windowType: '', grids: '' })
        setStep(3)
    }

    const handleWindowType = (type: string) => {
        const newFormData = { ...formData, windowType: type, grids: '' }
        setFormData(newFormData)

        // All window types now support grids, so always go to grids step
        if (formData.material === 'vinyl') {
            setStep(3)
        } else if (formData.aluminumCategory === 'residential') {
            setStep(4)
        } else {
            setStep(4)
        }
    }

    const handleGridsSelect = (grids: string) => {
        setFormData({ ...formData, grids })
        if (formData.material === 'vinyl') {
            setStep(4)
        } else {
            setStep(5)
        }
    }

    const handleColorContinue = () => {
        if (formData.material === 'vinyl') {
            setStep(5)
        }
    }

    const handleColorSelect = (color: string) => {
        setFormData({ ...formData, color })
        setStep(6)
    }

    const handleSizeSubmit = () => {
        if (formData.width && formData.height) {
            if (formData.material === 'vinyl') {
                setStep(6)
            } else {
                setStep(7)
            }
        }
    }

    const handleQuantitySubmit = () => {
        if (formData.quantity && parseInt(formData.quantity) > 0) {
            if (formData.material === 'vinyl') {
                setStep(7)
            } else {
                setStep(8)
            }
        }
    }

    const handleSubmit = async () => {
        if (!formData.email || !formData.phone) return

        setIsSubmitting(true)

        setTimeout(() => {
            setIsSubmitting(false)
            if (formData.material === 'vinyl') {
                setStep(8)
            } else {
                setStep(9)
            }
        }, 1500)
    }

    const resetForm = () => {
        setFormData({
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
        setStep(1)
    }

    const SelectionSummary = () => {
        if (step === 1) return null

        return (
            <div className="bg-[#f7f8f3] rounded-lg p-4 border-2 border-[#dce2cd] mb-4">
                <h3 className="font-bold text-gray-900 text-sm mb-3">📋 Your Selection</h3>
                <div className="space-y-2 text-xs">
                    {formData.material && (
                        <div className="flex justify-between py-1 border-b border-[#dce2cd]">
                            <span className="text-gray-600">Material:</span>
                            <span className="font-medium capitalize">{formData.material}</span>
                        </div>
                    )}
                    {formData.aluminumCategory && (
                        <div className="flex justify-between py-1 border-b border-[#dce2cd]">
                            <span className="text-gray-600">Category:</span>
                            <span className="font-medium capitalize">{formData.aluminumCategory}</span>
                        </div>
                    )}
                    {formData.windowType && (
                        <div className="flex justify-between py-1 border-b border-[#dce2cd]">
                            <span className="text-gray-600">Window Type:</span>
                            <span className="font-medium">{formData.windowType}</span>
                        </div>
                    )}
                    {formData.grids && (
                        <div className="flex justify-between py-1 border-b border-[#dce2cd]">
                            <span className="text-gray-600">Grids:</span>
                            <span className="font-medium">{formData.grids}</span>
                        </div>
                    )}
                    {formData.color && (
                        <div className="flex justify-between py-1 border-b border-[#dce2cd]">
                            <span className="text-gray-600">Color:</span>
                            <span className="font-medium">{formData.color}</span>
                        </div>
                    )}
                    {formData.width && formData.height && (
                        <div className="flex justify-between py-1 border-b border-[#dce2cd]">
                            <span className="text-gray-600">Size:</span>
                            <span className="font-medium">{formData.width}" × {formData.height}"</span>
                        </div>
                    )}
                    {formData.quantity && (
                        <div className="flex justify-between py-1">
                            <span className="text-gray-600">Quantity:</span>
                            <span className="font-medium">{formData.quantity}</span>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f7f8f3] via-white to-[#f7f8f3] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 animate-fade-in">
                    <div className="flex justify-between text-sm font-medium text-gray-600 mb-3">
                        <span className="text-[#738751]">Step {step} of 8</span>
                        <span className="bg-gradient-to-r from-[#738751] to-[#5a6a42] bg-clip-text text-transparent font-semibold">{Math.round((step / 8) * 100)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
                        <div className="bg-gradient-to-r from-[#738751] to-[#5a6a42] h-3 rounded-full transition-all duration-500 shadow-lg" style={{ width: `${(step / 8) * 100}%` }}></div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column - Form Content */}
                    <div className="lg:col-span-1">

                        {step === 1 && (
                            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-scale-in">
                                <h2 className="text-3xl font-bold text-[#2d2d2d] mb-2">Choose Window Material</h2>
                                <p className="text-gray-600 mb-8">Select the type of window material you prefer</p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <button onClick={() => handleMaterialSelect('vinyl')} className="p-8 border-2 border-gray-200 rounded-2xl hover:border-[#738751] hover:bg-gradient-to-br hover:from-[#f7f8f3] hover:to-white transition-all duration-300 text-left group hover:shadow-lg hover:-translate-y-1">
                                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🪟</div>
                                        <h3 className="text-xl font-bold text-[#2d2d2d] mb-2 group-hover:text-[#738751] transition-colors">Vinyl Windows</h3>
                                        <p className="text-gray-600 text-sm">Energy efficient, low maintenance</p>
                                    </button>
                                    <button onClick={() => handleMaterialSelect('aluminum')} className="p-8 border-2 border-gray-200 rounded-2xl hover:border-[#738751] hover:bg-gradient-to-br hover:from-[#f7f8f3] hover:to-white transition-all duration-300 text-left group hover:shadow-lg hover:-translate-y-1">
                                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🏢</div>
                                        <h3 className="text-xl font-bold text-[#2d2d2d] mb-2 group-hover:text-[#738751] transition-colors">Aluminum Windows</h3>
                                        <p className="text-gray-600 text-sm">Durable, modern design</p>
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && formData.material === 'aluminum' && (
                            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-scale-in">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Window Category</h2>
                                <p className="text-gray-600 mb-8">Select residential or commercial windows</p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <button onClick={() => handleAluminumCategory('residential')} className="p-8 border-2 border-gray-200 rounded-2xl hover:border-[#738751] hover:bg-gradient-to-br hover:from-[#f7f8f3] hover:to-white transition-all duration-300 text-left hover:shadow-lg hover:-translate-y-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Residential Windows</h3>
                                        <p className="text-gray-600 text-sm">For homes and apartments</p>
                                    </button>
                                    <button onClick={() => handleAluminumCategory('commercial')} className="p-8 border-2 border-gray-200 rounded-2xl hover:border-[#738751] hover:bg-gradient-to-br hover:from-[#f7f8f3] hover:to-white transition-all duration-300 text-left hover:shadow-lg hover:-translate-y-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Commercial Windows</h3>
                                        <p className="text-gray-600 text-sm">For offices and business spaces</p>
                                    </button>
                                </div>
                                <button onClick={() => setStep(1)} className="mt-6 text-[#738751] hover:text-[#5a6a42] font-medium transition-colors hover:underline">← Back</button>
                            </div>
                        )}

                        {((step === 2 && formData.material === 'vinyl') || (step === 3 && formData.material === 'aluminum')) && (
                            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-scale-in">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Window Style</h2>
                                <p className="text-gray-600 mb-8">Select the window type that fits your needs</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {formData.material === 'vinyl' && vinylWindowTypes.map((type) => (
                                        <button key={type} onClick={() => handleWindowType(type)} className="p-5 border-2 border-gray-200 rounded-xl hover:border-[#738751] hover:bg-gradient-to-r hover:from-[#f7f8f3] hover:to-white transition-all duration-300 text-left font-medium hover:shadow-md hover:-translate-y-0.5">
                                            {type}
                                        </button>
                                    ))}
                                    {formData.material === 'aluminum' && formData.aluminumCategory === 'residential' && aluminumResidentialTypes.map((type) => (
                                        <button key={type} onClick={() => handleWindowType(type)} className="p-5 border-2 border-gray-200 rounded-xl hover:border-[#738751] hover:bg-gradient-to-r hover:from-[#f7f8f3] hover:to-white transition-all duration-300 text-left font-medium hover:shadow-md hover:-translate-y-0.5">
                                            {type}
                                        </button>
                                    ))}
                                    {formData.material === 'aluminum' && formData.aluminumCategory === 'commercial' && aluminumCommercialTypes.map((type) => (
                                        <button key={type} onClick={() => handleWindowType(type)} className="p-5 border-2 border-gray-200 rounded-xl hover:border-[#738751] hover:bg-gradient-to-r hover:from-[#f7f8f3] hover:to-white transition-all duration-300 text-left font-medium hover:shadow-md hover:-translate-y-0.5">
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setStep(formData.material === 'vinyl' ? 1 : 2)} className="mt-6 text-[#738751] hover:text-[#5a6a42] font-medium transition-colors hover:underline">← Back</button>
                            </div>
                        )}

                        {((step === 3 && formData.material === 'vinyl' && needsGrids()) || (step === 4 && formData.material === 'aluminum' && needsGrids())) && (
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Grids</h2>
                                <p className="text-gray-600 mb-8">Select window grid pattern (optional)</p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {getGridsOptions().map((grid) => (
                                        <button key={grid} onClick={() => handleGridsSelect(grid)} className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#738751] hover:bg-[#f7f8f3] transition-all text-center font-medium">
                                            <div className="text-2xl mb-2">⊞</div>
                                            {grid}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setStep(formData.material === 'vinyl' ? 2 : 3)} className="mt-6 text-[#738751] hover:text-[#5a6a42] font-medium">← Back</button>
                            </div>
                        )}

                        {step === 4 && formData.material === 'vinyl' && (
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Window Color</h2>
                                <p className="text-gray-600 mb-8">Vinyl windows come in white color</p>
                                <div className="p-6 border-2 border-[#738751] bg-[#f7f8f3] rounded-lg">
                                    <div className="flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 mr-4"></div>
                                        <div>
                                            <p className="font-bold text-lg">White</p>
                                            <p className="text-sm text-gray-600">Standard color for vinyl windows</p>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleColorContinue} className="w-full mt-6 py-3 bg-gradient-to-r from-[#738751] to-[#5a6a42] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">Continue</button>
                                <button onClick={() => setStep(needsGrids() ? 3 : 2)} className="mt-4 text-[#738751] hover:text-[#5a6a42] font-medium">← Back</button>
                            </div>
                        )}

                        {step === 5 && formData.material === 'aluminum' && (
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Color</h2>
                                <p className="text-gray-600 mb-8">Select your preferred window color</p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {aluminumColors.map((color) => (
                                        <button key={color} onClick={() => handleColorSelect(color)} className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#738751] hover:bg-[#f7f8f3] transition-all">
                                            <div className={`w-16 h-16 rounded-full mx-auto mb-3 ${color === 'White' ? 'bg-white border-2 border-gray-300' : color === 'Bronze' ? 'bg-amber-700' : 'bg-black'}`}></div>
                                            <p className="font-medium text-center">{color}</p>
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setStep(needsGrids() ? 4 : 3)} className="mt-6 text-[#738751] hover:text-[#5a6a42] font-medium">← Back</button>
                            </div>
                        )}

                        {((step === 5 && formData.material === 'vinyl') || (step === 6 && formData.material === 'aluminum')) && (
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Enter Window Dimensions</h2>
                                <p className="text-gray-600 mb-8">Provide the width and height in inches</p>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Width (inches)</label>
                                        <input type="number" min="1" value={formData.width} onChange={(e) => setFormData({ ...formData, width: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#738751] focus:outline-none" placeholder="e.g., 36" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Height (inches)</label>
                                        <input type="number" min="1" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#738751] focus:outline-none" placeholder="e.g., 48" />
                                    </div>
                                    <button onClick={handleSizeSubmit} disabled={!formData.width || !formData.height} className="w-full py-3 bg-gradient-to-r from-[#738751] to-[#5a6a42] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0">Continue</button>
                                </div>
                                <button onClick={() => setStep(formData.material === 'vinyl' ? 4 : 5)} className="mt-6 text-[#738751] hover:text-[#5a6a42] font-medium">← Back</button>
                            </div>
                        )}

                        {((step === 6 && formData.material === 'vinyl') || (step === 7 && formData.material === 'aluminum')) && (
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">How Many Windows?</h2>
                                <p className="text-gray-600 mb-8">Enter the quantity you need</p>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                    <input type="number" min="1" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#738751] focus:outline-none text-lg" />
                                    <button onClick={handleQuantitySubmit} disabled={!formData.quantity || parseInt(formData.quantity) < 1} className="w-full mt-6 py-3 bg-gradient-to-r from-[#738751] to-[#5a6a42] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0">Continue</button>
                                </div>
                                <button onClick={() => setStep(formData.material === 'vinyl' ? 5 : 6)} className="mt-6 text-[#738751] hover:text-[#5a6a42] font-medium">← Back</button>
                            </div>
                        )}

                        {((step === 7 && formData.material === 'vinyl') || (step === 8 && formData.material === 'aluminum')) && (
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Contact Information</h2>
                                <p className="text-gray-600 mb-8">We'll send your quote to this email</p>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#738751] focus:outline-none" placeholder="your@email.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#738751] focus:outline-none" placeholder="(123) 456-7890" />
                                    </div>
                                    <button onClick={handleSubmit} disabled={isSubmitting || !formData.email || !formData.phone} className="w-full py-4 bg-gradient-to-r from-[#738751] to-[#5a6a42] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:bg-gray-400 text-lg disabled:hover:shadow-none disabled:hover:translate-y-0">
                                        {isSubmitting ? '⏳ Submitting...' : '✨ Submit Quote Request'}
                                    </button>
                                </div>
                                <button onClick={() => setStep(formData.material === 'vinyl' ? 6 : 7)} className="mt-6 text-[#738751] hover:text-[#5a6a42] font-medium">← Back</button>
                            </div>
                        )}

                        {((step === 8 && formData.material === 'vinyl') || (step === 9 && formData.material === 'aluminum')) && (
                            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                                <div className="text-6xl mb-6">✅</div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h2>
                                <p className="text-gray-600 mb-8">Thank you! We've received your request and will send a detailed quote to <span className="font-medium text-[#738751]">{formData.email}</span> within 24 hours.</p>
                                <div className="space-y-4">
                                    <button onClick={resetForm} className="w-full py-3 bg-gradient-to-r from-[#738751] to-[#5a6a42] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">Submit Another Quote</button>
                                    <button onClick={() => router.push('/')} className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:border-[#738751]">Back to Home</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Middle Column - Window Preview */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <WindowPreview
                                windowType={formData.windowType}
                                grids={formData.grids}
                                color={formData.color}
                            />
                        </div>
                    </div>

                    {/* Right Column - Selection Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <SelectionSummary />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
