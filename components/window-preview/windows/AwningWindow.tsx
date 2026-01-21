import { WindowProps, GlassGradient } from '../types'

export default function AwningWindow({
    frameColor = '#64748b',
    grids = 'No Grids',
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const glassStyle = showGlass ? { fill: 'url(#glassGradient)' } : { fill: 'none' }

    return (
        <svg viewBox="0 0 280 180" className={className}>
            {showGlass && <GlassGradient />}
            {/* 外框 */}
            <rect x="10" y="10" width="260" height="160" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            {/* 玻璃 */}
            <rect x="20" y="20" width="240" height="140" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 底部铰链点 */}
            <circle cx="80" cy="162" r="5" fill={frameColor} />
            <circle cx="140" cy="162" r="5" fill={frameColor} />
            <circle cx="200" cy="162" r="5" fill={frameColor} />

            {/* 4 over 4 格栅 */}
            {grids === '4 over 4' && (
                <>
                    <line x1="140" y1="20" x2="140" y2="160" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="90" x2="260" y2="90" stroke={frameColor} strokeWidth="2" />
                </>
            )}

            {/* 6 over 6 格栅 */}
            {grids === '6 over 6' && (
                <>
                    <line x1="100" y1="20" x2="100" y2="160" stroke={frameColor} strokeWidth="2" />
                    <line x1="180" y1="20" x2="180" y2="160" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="73.33" x2="260" y2="73.33" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="126.67" x2="260" y2="126.67" stroke={frameColor} strokeWidth="2" />
                </>
            )}
        </svg>
    )
}
