import { WindowProps, GlassGradient } from '../types'

export default function BayWindow({
    frameColor = '#64748b',
    grids = 'No Grids',
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    return (
        <svg viewBox="0 0 320 200" className={className}>
            {showGlass && <GlassGradient />}
            {/* 左侧斜窗格 */}
            <polygon points="30,180 50,20 100,20 100,180" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            {/* 中间正窗格 */}
            <rect x="100" y="20" width="120" height="160" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            {/* 右侧斜窗格 */}
            <polygon points="220,180 220,20 270,20 290,180" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            {/* 底部 */}
            <line x1="30" y1="180" x2="290" y2="180" stroke={frameColor} strokeWidth="6" />

            {/* 4 over 4 格栅 */}
            {grids === '4 over 4' && (
                <>
                    {/* 左窗格 */}
                    <line x1="65" y1="20" x2="65" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="30" y1="100" x2="100" y2="100" stroke={frameColor} strokeWidth="2" />
                    {/* 中窗格 */}
                    <line x1="160" y1="20" x2="160" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="100" y1="100" x2="220" y2="100" stroke={frameColor} strokeWidth="2" />
                    {/* 右窗格 */}
                    <line x1="255" y1="20" x2="255" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="220" y1="100" x2="290" y2="100" stroke={frameColor} strokeWidth="2" />
                </>
            )}

            {/* 6 over 6 格栅 */}
            {grids === '6 over 6' && (
                <>
                    {/* 左窗格 */}
                    <line x1="53" y1="20" x2="53" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="77" y1="20" x2="77" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="30" y1="73.33" x2="100" y2="73.33" stroke={frameColor} strokeWidth="2" />
                    <line x1="30" y1="126.67" x2="100" y2="126.67" stroke={frameColor} strokeWidth="2" />
                    {/* 中窗格 */}
                    <line x1="140" y1="20" x2="140" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="180" y1="20" x2="180" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="100" y1="73.33" x2="220" y2="73.33" stroke={frameColor} strokeWidth="2" />
                    <line x1="100" y1="126.67" x2="220" y2="126.67" stroke={frameColor} strokeWidth="2" />
                    {/* 右窗格 */}
                    <line x1="243" y1="20" x2="243" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="267" y1="20" x2="267" y2="180" stroke={frameColor} strokeWidth="2" />
                    <line x1="220" y1="73.33" x2="290" y2="73.33" stroke={frameColor} strokeWidth="2" />
                    <line x1="220" y1="126.67" x2="290" y2="126.67" stroke={frameColor} strokeWidth="2" />
                </>
            )}
        </svg>
    )
}
