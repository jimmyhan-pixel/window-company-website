import { WindowProps, GlassGradient, renderRectGridLines } from '../types'

export default function CasementWindow({
    frameColor = '#64748b',
    grids = [],
    className = 'w-full h-full',
    showGlass = true,
    casementDesign = 'single',
    casementOpenDirection = 'left',
}: WindowProps) {
    const glassStyle = showGlass ? { fill: 'url(#glassGradient)' } : { fill: 'none' }
    const [leftGrid, rightGrid] = grids

    return (
        <svg viewBox="0 0 200 280" className={className} preserveAspectRatio="none">
            {showGlass && <GlassGradient />}
            <rect x="10" y="10" width="180" height="260" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />

            {casementDesign === 'double' ? (
                <>
                    <rect x="20" y="20" width="72" height="240" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
                    <rect x="108" y="20" width="72" height="240" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
                    <rect x="92" y="10" width="16" height="260" fill="none" stroke={frameColor} strokeWidth="6" rx="2" />

                    <circle cx="25" cy="80" r="5" fill={frameColor} />
                    <circle cx="25" cy="140" r="5" fill={frameColor} />
                    <circle cx="25" cy="200" r="5" fill={frameColor} />
                    <circle cx="175" cy="80" r="5" fill={frameColor} />
                    <circle cx="175" cy="140" r="5" fill={frameColor} />
                    <circle cx="175" cy="200" r="5" fill={frameColor} />

                    <rect x="88" y="128" width="6" height="24" fill={frameColor} rx="2" />
                    <rect x="106" y="128" width="6" height="24" fill={frameColor} rx="2" />

                    <line x1="32" y1="45" x2="45" y2="58" stroke="#738751" strokeWidth="2" strokeLinecap="round" />
                    <line x1="168" y1="45" x2="155" y2="58" stroke="#738751" strokeWidth="2" strokeLinecap="round" />
                    <line x1="32" y1="235" x2="45" y2="222" stroke="#738751" strokeWidth="2" strokeLinecap="round" />
                    <line x1="168" y1="235" x2="155" y2="222" stroke="#738751" strokeWidth="2" strokeLinecap="round" />

                    {renderRectGridLines({ x: 20, y: 20, width: 72, height: 240 }, leftGrid, frameColor, 'casement-left')}
                    {renderRectGridLines({ x: 108, y: 20, width: 72, height: 240 }, rightGrid, frameColor, 'casement-right')}
                </>
            ) : (
                <>
                    <rect x="20" y="20" width="160" height="240" style={glassStyle} stroke={frameColor} strokeWidth="2" rx="2" />
                    {casementOpenDirection === 'left' ? (
                        <>
                            <circle cx="25" cy="80" r="5" fill={frameColor} />
                            <circle cx="25" cy="140" r="5" fill={frameColor} />
                            <circle cx="25" cy="200" r="5" fill={frameColor} />
                            <rect x="165" y="130" width="8" height="20" fill={frameColor} rx="2" />
                            <line x1="32" y1="45" x2="48" y2="61" stroke="#738751" strokeWidth="2" strokeLinecap="round" />
                            <line x1="32" y1="235" x2="48" y2="219" stroke="#738751" strokeWidth="2" strokeLinecap="round" />
                        </>
                    ) : (
                        <>
                            <circle cx="175" cy="80" r="5" fill={frameColor} />
                            <circle cx="175" cy="140" r="5" fill={frameColor} />
                            <circle cx="175" cy="200" r="5" fill={frameColor} />
                            <rect x="27" y="130" width="8" height="20" fill={frameColor} rx="2" />
                            <line x1="168" y1="45" x2="152" y2="61" stroke="#738751" strokeWidth="2" strokeLinecap="round" />
                            <line x1="168" y1="235" x2="152" y2="219" stroke="#738751" strokeWidth="2" strokeLinecap="round" />
                        </>
                    )}
                    {renderRectGridLines({ x: 20, y: 20, width: 160, height: 240 }, leftGrid, frameColor, 'casement-main')}
                </>
            )}
        </svg>
    )
}
