import { WindowProps, GlassGradient, renderRectGridLines } from '../types'

export default function DoubleHungWindow({
    frameColor = '#64748b',
    grids = [],
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const glassStyle = showGlass ? { fill: 'url(#glassGradient)' } : { fill: 'none' }
    const [topGrid, bottomGrid] = grids

    return (
        <svg viewBox="0 0 200 300" className={className} preserveAspectRatio="none">
            {showGlass && <GlassGradient />}
            {/* 外框 */}
            <rect x="10" y="10" width="180" height="280" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            {/* 上窗格玻璃 */}
            <rect x="20" y="20" width="160" height="125" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 下窗格玻璃 */}
            <rect x="20" y="155" width="160" height="125" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 中间分隔条 */}
            <rect x="10" y="145" width="180" height="10" fill={frameColor} />
            {renderRectGridLines({ x: 20, y: 20, width: 160, height: 125 }, topGrid, frameColor, 'double-hung-top')}
            {renderRectGridLines({ x: 20, y: 155, width: 160, height: 125 }, bottomGrid, frameColor, 'double-hung-bottom')}
        </svg>
    )
}
