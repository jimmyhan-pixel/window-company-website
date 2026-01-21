import { WindowProps, GlassGradient } from '../types'

export default function PictureWindow({
    frameColor = '#64748b',
    grids = 'No Grids',
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const glassStyle = showGlass ? { fill: 'url(#glassGradient)' } : { fill: 'none' }

    return (
        <svg viewBox="0 0 280 200" className={className}>
            {showGlass && <GlassGradient />}
            {/* 外框 */}
            <rect x="10" y="10" width="260" height="180" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            {/* 玻璃 */}
            <rect x="20" y="20" width="240" height="160" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />

            {/* 2格栅 (1条垂直线) */}
            {grids === '2' && (
                <line x1="140" y1="20" x2="140" y2="180" stroke={frameColor} strokeWidth="2" />
            )}

            {/* 4格栅 (十字) */}
            {grids === '4' && (
                <>
                    <line x1="140" y1="20" x2="140" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="100" x2="260" y2="100" stroke={frameColor} strokeWidth="2" />
                </>
            )}
        </svg>
    )
}
