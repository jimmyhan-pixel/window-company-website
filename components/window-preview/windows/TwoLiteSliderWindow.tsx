import { WindowProps, GlassGradient } from '../types'

export default function TwoLiteSliderWindow({
    frameColor = '#64748b',
    grids = 'No Grids',
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const glassStyle = showGlass ? { fill: 'url(#glassGradient)' } : { fill: 'none' }

    return (
        <svg viewBox="0 0 300 200" className={className}>
            {showGlass && <GlassGradient />}
            {/* 外框 */}
            <rect x="10" y="10" width="280" height="180" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            {/* 左窗格玻璃 */}
            <rect x="20" y="20" width="125" height="160" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 右窗格玻璃 */}
            <rect x="155" y="20" width="125" height="160" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
            {/* 中间分隔条 */}
            <rect x="145" y="10" width="10" height="180" fill={frameColor} />

            {/* 4 over 4 格栅 */}
            {grids === '4 over 4' && (
                <>
                    {/* 左窗格垂直线 */}
                    <line x1="82.5" y1="20" x2="82.5" y2="180" stroke={frameColor} strokeWidth="2" />
                    {/* 左窗格水平线 */}
                    <line x1="20" y1="100" x2="145" y2="100" stroke={frameColor} strokeWidth="2" />
                    {/* 右窗格垂直线 */}
                    <line x1="217.5" y1="20" x2="217.5" y2="180" stroke={frameColor} strokeWidth="2" />
                    {/* 右窗格水平线 */}
                    <line x1="155" y1="100" x2="280" y2="100" stroke={frameColor} strokeWidth="2" />
                </>
            )}

            {/* 6 over 6 格栅 */}
            {grids === '6 over 6' && (
                <>
                    {/* 左窗格垂直线 */}
                    <line x1="61.67" y1="20" x2="61.67" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="103.33" y1="20" x2="103.33" y2="180" stroke={frameColor} strokeWidth="2" />
                    {/* 左窗格水平线 */}
                    <line x1="20" y1="73.33" x2="145" y2="73.33" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="126.67" x2="145" y2="126.67" stroke={frameColor} strokeWidth="2" />
                    {/* 右窗格垂直线 */}
                    <line x1="196.67" y1="20" x2="196.67" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="238.33" y1="20" x2="238.33" y2="180" stroke={frameColor} strokeWidth="2" />
                    {/* 右窗格水平线 */}
                    <line x1="155" y1="73.33" x2="280" y2="73.33" stroke={frameColor} strokeWidth="2" />
                    <line x1="155" y1="126.67" x2="280" y2="126.67" stroke={frameColor} strokeWidth="2" />
                </>
            )}
        </svg>
    )
}
