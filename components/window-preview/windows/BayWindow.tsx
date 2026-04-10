import { WindowProps, GlassGradient, renderQuadGridLines, renderRectGridLines } from '../types'

export default function BayWindow({
    frameColor = '#64748b',
    grids = [],
    className = 'w-full h-full',
    showGlass = true
}: WindowProps) {
    const [leftGrid, centerGrid, rightGrid] = grids

    return (
        <svg viewBox="0 0 320 200" className={className} preserveAspectRatio="none">
            {showGlass && <GlassGradient />}
            {/* 左侧斜窗格 */}
            <polygon points="30,180 50,20 100,20 100,180" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            {/* 中间正窗格 */}
            <rect x="100" y="20" width="120" height="160" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            {/* 右侧斜窗格 */}
            <polygon points="220,180 220,20 270,20 290,180" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            {/* 底部 */}
            <line x1="30" y1="180" x2="290" y2="180" stroke={frameColor} strokeWidth="6" />
            {renderQuadGridLines({
                topLeft: { x: 50, y: 20 },
                topRight: { x: 100, y: 20 },
                bottomLeft: { x: 30, y: 180 },
                bottomRight: { x: 100, y: 180 },
            }, leftGrid, frameColor, 'bay-left')}
            {renderRectGridLines({ x: 100, y: 20, width: 120, height: 160 }, centerGrid, frameColor, 'bay-center')}
            {renderQuadGridLines({
                topLeft: { x: 220, y: 20 },
                topRight: { x: 270, y: 20 },
                bottomLeft: { x: 220, y: 180 },
                bottomRight: { x: 290, y: 180 },
            }, rightGrid, frameColor, 'bay-right')}
        </svg>
    )
}
