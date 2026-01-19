export default function DoubleHungWindow({ frameColor }: { frameColor: string }) {
    const glassStyle = { fill: 'url(#glassGradient)' }

    return (
        <svg viewBox="0 0 200 300" className="w-full h-full">
            <defs>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e3f2fd" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#bbdefb" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#90caf9" stopOpacity="0.5" />
                </linearGradient>
            </defs>
            <rect x="10" y="10" width="180" height="280" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            <rect x="20" y="20" width="160" height="125" style={glassStyle} rx="2" />
            <rect x="20" y="155" width="160" height="125" style={glassStyle} rx="2" />
            <rect x="10" y="145" width="180" height="10" fill={frameColor} />
        </svg>
    )
}
