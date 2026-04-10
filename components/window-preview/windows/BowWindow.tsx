import { WindowProps, GlassGradient, renderQuadGridLines } from '../types'

export default function BowWindow({
    frameColor = '#64748b',
    grids = [],
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const [leftGrid, centerGrid, rightGrid] = grids

    return (
        <svg viewBox="0 0 320 200" className={className} preserveAspectRatio="none">
            {showGlass && <GlassGradient />}
            {/* 左侧弧形窗格 */}
            <path d="M 20 180 L 20 40 Q 50 20 80 30 L 80 180 Z" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            {/* 中间弧形窗格 */}
            <path d="M 80 180 L 80 30 Q 120 15 160 15 Q 200 15 240 30 L 240 180 Z" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            {/* 右侧弧形窗格 */}
            <path d="M 240 180 L 240 30 Q 270 20 300 40 L 300 180 Z" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            {/* 底部 */}
            <line x1="20" y1="180" x2="300" y2="180" stroke={frameColor} strokeWidth="6" />
            {renderQuadGridLines({
                topLeft: { x: 20, y: 40 },
                topRight: { x: 80, y: 30 },
                bottomLeft: { x: 20, y: 180 },
                bottomRight: { x: 80, y: 180 },
            }, leftGrid, frameColor, 'bow-left')}
            {renderQuadGridLines({
                topLeft: { x: 80, y: 30 },
                topRight: { x: 240, y: 30 },
                bottomLeft: { x: 80, y: 180 },
                bottomRight: { x: 240, y: 180 },
            }, centerGrid, frameColor, 'bow-center')}
            {renderQuadGridLines({
                topLeft: { x: 240, y: 30 },
                topRight: { x: 300, y: 40 },
                bottomLeft: { x: 240, y: 180 },
                bottomRight: { x: 300, y: 180 },
            }, rightGrid, frameColor, 'bow-right')}
        </svg>
    )
}
