import { WindowProps, GlassGradient } from '../types'

export default function ThreeLiteSliderWindow({
    frameColor = '#64748b',
    grids = 'No Grids',
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const glassStyle = showGlass ? { fill: 'url(#glassGradient)' } : { fill: 'none' }

    return (
        <svg viewBox="0 0 340 200" className={className}>
            {showGlass && <GlassGradient />}
            {/* 外框 */}
            <rect x="10" y="10" width="320" height="180" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            {/* 左窗格玻璃 */}
            <rect x="20" y="20" width="90" height="160" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 中窗格玻璃 */}
            <rect x="120" y="20" width="100" height="160" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 右窗格玻璃 */}
            <rect x="230" y="20" width="90" height="160" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 左分隔条 */}
            <rect x="110" y="10" width="10" height="180" fill={frameColor} />
            {/* 右分隔条 */}
            <rect x="220" y="10" width="10" height="180" fill={frameColor} />

            {/* 4 over 4 格栅 */}
            {grids === '4 over 4' && (
                <>
                    {/* 左窗格 */}
                    <line x1="65" y1="20" x2="65" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="100" x2="110" y2="100" stroke={frameColor} strokeWidth="2" />
                    {/* 中窗格 */}
                    <line x1="170" y1="20" x2="170" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="120" y1="100" x2="220" y2="100" stroke={frameColor} strokeWidth="2" />
                    {/* 右窗格 */}
                    <line x1="275" y1="20" x2="275" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="230" y1="100" x2="320" y2="100" stroke={frameColor} strokeWidth="2" />
                </>
            )}

            {/* 6 over 6 格栅 */}
            {grids === '6 over 6' && (
                <>
                    {/* 左窗格 */}
                    <line x1="50" y1="20" x2="50" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="80" y1="20" x2="80" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="73.33" x2="110" y2="73.33" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="126.67" x2="110" y2="126.67" stroke={frameColor} strokeWidth="2" />
                    {/* 中窗格 */}
                    <line x1="153.33" y1="20" x2="153.33" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="186.67" y1="20" x2="186.67" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="120" y1="73.33" x2="220" y2="73.33" stroke={frameColor} strokeWidth="2" />
                    <line x1="120" y1="126.67" x2="220" y2="126.67" stroke={frameColor} strokeWidth="2" />
                    {/* 右窗格 */}
                    <line x1="260" y1="20" x2="260" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="290" y1="20" x2="290" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="230" y1="73.33" x2="320" y2="73.33" stroke={frameColor} strokeWidth="2" />
                    <line x1="230" y1="126.67" x2="320" y2="126.67" stroke={frameColor} strokeWidth="2" />
                </>
            )}
        </svg>
    )
}
