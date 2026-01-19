export default function ThreeLiteSliderWindow({ frameColor }: { frameColor: string }) {
    const glassStyle = { fill: 'url(#glassGradient)' }

    return (
        <svg viewBox="0 0 340 200" className="w-full h-full">
            <defs>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e3f2fd" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#bbdefb" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#90caf9" stopOpacity="0.5" />
                </linearGradient>
            </defs>
            <rect x="10" y="10" width="320" height="180" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            <rect x="20" y="20" width="90" height="160" style={glassStyle} rx="2" />
            <rect x="120" y="20" width="100" height="160" style={glassStyle} rx="2" />
            <rect x="230" y="20" width="90" height="160" style={glassStyle} rx="2" />
            <rect x="110" y="10" width="10" height="180" fill={frameColor} />
            <rect x="220" y="10" width="10" height="180" fill={frameColor} />
        </svg>
    )
}
