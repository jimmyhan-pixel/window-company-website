import { WindowProps, GlassGradient, renderRectGridLines } from '../types'

export default function TwoLiteSliderWindow({
    frameColor = '#64748b',
    grids = [],
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const glassStyle = showGlass ? { fill: 'url(#glassGradient)' } : { fill: 'none' }
    const [leftGrid, rightGrid] = grids

    return (
        <svg viewBox="0 0 300 200" className={className} preserveAspectRatio="none">
            {showGlass && <GlassGradient />}
            {/* 外框 */}
            <rect x="10" y="10" width="280" height="180" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            {/* 左窗格玻璃 */}
            <rect x="20" y="20" width="125" height="160" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 右窗格玻璃 */}
            <rect x="155" y="20" width="125" height="160" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 中间分隔条 */}
            <rect x="145" y="10" width="10" height="180" fill={frameColor} />
            {renderRectGridLines({ x: 20, y: 20, width: 125, height: 160 }, leftGrid, frameColor, 'two-lite-left')}
            {renderRectGridLines({ x: 155, y: 20, width: 125, height: 160 }, rightGrid, frameColor, 'two-lite-right')}
        </svg>
    )
}
