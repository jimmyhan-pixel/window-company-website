import { WindowProps, GlassGradient } from '../types'

export default function CasementWindow({
    frameColor = '#64748b',
    grids = 'No Grids',
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const glassStyle = showGlass ? { fill: 'url(#glassGradient)' } : { fill: 'none' }

    return (
        <svg viewBox="0 0 200 280" className={className}>
            {showGlass && <GlassGradient />}
            {/* 外框 */}
            <rect x="10" y="10" width="180" height="260" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            {/* 玻璃 */}
            <rect x="20" y="20" width="160" height="240" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 铰链点 */}
            <circle cx="25" cy="80" r="5" fill={frameColor} />
            <circle cx="25" cy="140" r="5" fill={frameColor} />
            <circle cx="25" cy="200" r="5" fill={frameColor} />
            {/* 把手 */}
            <rect x="165" y="130" width="8" height="20" fill={frameColor} rx="2" />

            {/* 4 over 4 格栅 */}
            {grids === '4 over 4' && (
                <>
                    <line x1="100" y1="20" x2="100" y2="260" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="140" x2="180" y2="140" stroke={frameColor} strokeWidth="2" />
                </>
            )}

            {/* 6 over 6 格栅 */}
            {grids === '6 over 6' && (
                <>
                    <line x1="73" y1="20" x2="73" y2="260" stroke={frameColor} strokeWidth="2" />
                    <line x1="127" y1="20" x2="127" y2="260" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="180" x2="180" y2="180" stroke={frameColor} strokeWidth="2" />
                </>
            )}
        </svg>
    )
}
