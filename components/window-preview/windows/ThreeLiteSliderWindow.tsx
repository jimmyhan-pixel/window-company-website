import { WindowProps, GlassGradient, renderRectGridLines } from '../types'

export default function ThreeLiteSliderWindow({
    frameColor = '#64748b',
    grids = [],
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const glassStyle = showGlass ? { fill: 'url(#glassGradient)' } : { fill: 'none' }
    const [leftGrid, centerGrid, rightGrid] = grids

    return (
        <svg viewBox="0 0 340 200" className={className} preserveAspectRatio="none">
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
            {renderRectGridLines({ x: 20, y: 20, width: 90, height: 160 }, leftGrid, frameColor, 'three-lite-left')}
            {renderRectGridLines({ x: 120, y: 20, width: 100, height: 160 }, centerGrid, frameColor, 'three-lite-center')}
            {renderRectGridLines({ x: 230, y: 20, width: 90, height: 160 }, rightGrid, frameColor, 'three-lite-right')}
        </svg>
    )
}
