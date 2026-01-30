import { WindowProps, GlassGradient } from '../types'

export default function BowWindow({
    frameColor = '#64748b',
    grids = 'No Grids',
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    return (
        <svg viewBox="0 0 320 200" className={className}>
            {showGlass && <GlassGradient />}
            {/* 左侧弧形窗格 */}
            <path d="M 20 180 L 20 40 Q 50 20 80 30 L 80 180 Z" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            {/* 中间弧形窗格 */}
            <path d="M 80 180 L 80 30 Q 120 15 160 15 Q 200 15 240 30 L 240 180 Z" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            {/* 右侧弧形窗格 */}
            <path d="M 240 180 L 240 30 Q 270 20 300 40 L 300 180 Z" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            {/* 底部 */}
            <line x1="20" y1="180" x2="300" y2="180" stroke={frameColor} strokeWidth="6" />

            {/* 4 over 4 格栅 */}
            {grids === '4 over 4' && (
                <>
                    {/* 左窗格 */}
                    <line x1="50" y1="40" x2="50" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="110" x2="80" y2="110" stroke={frameColor} strokeWidth="2" />
                    {/* 中窗格 */}
                    <line x1="160" y1="15" x2="160" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="80" y1="105" x2="240" y2="105" stroke={frameColor} strokeWidth="2" />
                    {/* 右窗格 */}
                    <line x1="270" y1="40" x2="270" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="240" y1="110" x2="300" y2="110" stroke={frameColor} strokeWidth="2" />
                </>
            )}

            {/* 6 over 6 格栅 */}
            {grids === '6 over 6' && (
                <>
                    {/* 左窗格 */}
                    <line x1="40" y1="40" x2="40" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="60" y1="40" x2="60" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="85" x2="80" y2="85" stroke={frameColor} strokeWidth="2" />
                    <line x1="20" y1="135" x2="80" y2="135" stroke={frameColor} strokeWidth="2" />
                    {/* 中窗格 */}
                    <line x1="130" y1="20" x2="130" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="190" y1="20" x2="190" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="80" y1="70" x2="240" y2="70" stroke={frameColor} strokeWidth="2" />
                    <line x1="80" y1="140" x2="240" y2="140" stroke={frameColor} strokeWidth="2" />
                    {/* 右窗格 */}
                    <line x1="260" y1="40" x2="260" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="280" y1="40" x2="280" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="240" y1="85" x2="300" y2="85" stroke={frameColor} strokeWidth="2" />
                    <line x1="240" y1="135" x2="300" y2="135" stroke={frameColor} strokeWidth="2" />
                </>
            )}
        </svg>
    )
}
