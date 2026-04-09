import { WindowProps, GlassGradient, renderRectGridLines } from '../types'

export default function PictureWindow({
    frameColor = '#64748b',
    grids = [],
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const glassStyle = showGlass ? { fill: 'url(#glassGradient)' } : { fill: 'none' }
    const [mainGrid] = grids

    return (
        <svg viewBox="0 0 280 200" className={className} preserveAspectRatio="none">
            {showGlass && <GlassGradient />}
            {/* 外框 */}
            <rect x="10" y="10" width="260" height="180" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            {/* 玻璃 */}
            <rect x="20" y="20" width="240" height="160" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {renderRectGridLines({ x: 20, y: 20, width: 240, height: 160 }, mainGrid, frameColor, 'picture-main')}
        </svg>
    )
}
