import { WindowProps, GlassGradient } from '../types'

export default function DoubleHungWindow({
    frameColor = '#64748b',
    grids = 'No Grids',
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const glassStyle = showGlass ? { fill: 'url(#glassGradient)' } : { fill: 'none' }

    return (
        <svg viewBox="0 0 200 300" className={className}>
            {showGlass && <GlassGradient />}
            {/* 外框 */}
            <rect x="10" y="10" width="180" height="280" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            {/* 上窗格玻璃 */}
            <rect x="20" y="20" width="160" height="125" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 下窗格玻璃 */}
            <rect x="20" y="155" width="160" height="125" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 中间分隔条 */}
            <rect x="10" y="145" width="180" height="10" fill={frameColor} />

            {/* 4 over 4 格栅 */}
            {grids === '4 over 4' && (
                <>
                    {/* 上窗格垂直线 */}
                    <line x1="100" y1="20" x2="100" y2="145" stroke={frameColor} strokeWidth="2" />
                    {/* 上窗格水平线 */}
                    <line x1="20" y1="82.5" x2="180" y2="82.5" stroke={frameColor} strokeWidth="2" />
                    {/* 下窗格垂直线 */}
                    <line x1="100" y1="155" x2="100" y2="280" stroke={frameColor} strokeWidth="2" />
                    {/* 下窗格水平线 */}
                    <line x1="20" y1="217.5" x2="180" y2="217.5" stroke={frameColor} strokeWidth="2" />
                </>
            )}

            {/* 6 over 6 格栅 */}
            {grids === '6 over 6' && (
                <>
                    {/* 上窗格垂直线 */}
                    <line x1="73" y1="20" x2="73" y2="145" stroke={frameColor} strokeWidth="2" />
                    <line x1="127" y1="20" x2="127" y2="145" stroke={frameColor} strokeWidth="2" />
                    {/* 上窗格水平线 */}
                    <line x1="20" y1="82.5" x2="180" y2="82.5" stroke={frameColor} strokeWidth="2" />
                    {/* 下窗格垂直线 */}
                    <line x1="73" y1="155" x2="73" y2="280" stroke={frameColor} strokeWidth="2" />
                    <line x1="127" y1="155" x2="127" y2="280" stroke={frameColor} strokeWidth="2" />
                    {/* 下窗格水平线 */}
                    <line x1="20" y1="217.5" x2="180" y2="217.5" stroke={frameColor} strokeWidth="2" />
                </>
            )}
        </svg>
    )
}
