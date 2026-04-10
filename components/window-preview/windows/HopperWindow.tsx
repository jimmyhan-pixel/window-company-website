import { WindowProps, GlassGradient, renderRectGridLines } from '../types'

export default function HopperWindow({
    frameColor = '#64748b',
    grids = [],
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const glassStyle = showGlass ? { fill: 'url(#glassGradient)' } : { fill: 'none' }
    const [mainGrid] = grids

    return (
        <svg viewBox="0 0 280 180" className={className} preserveAspectRatio="none">
            {showGlass && <GlassGradient />}
            {/* 外框 */}
            <rect x="10" y="10" width="260" height="160" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            {/* 玻璃 */}
            <rect x="20" y="20" width="240" height="140" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 顶部铰链点 */}
            <circle cx="80" cy="18" r="5" fill={frameColor} />
            <circle cx="140" cy="18" r="5" fill={frameColor} />
            <circle cx="200" cy="18" r="5" fill={frameColor} />
            {renderRectGridLines({ x: 20, y: 20, width: 240, height: 140 }, mainGrid, frameColor, 'hopper-main')}
        </svg>
    )
}
