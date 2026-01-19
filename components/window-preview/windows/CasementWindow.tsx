export default function CasementWindow({ frameColor }: { frameColor: string }) {
    const glassStyle = { fill: 'url(#glassGradient)' }

    return (
        <svg viewBox="0 0 200 280" className="w-full h-full">
            <defs>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e3f2fd" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#bbdefb" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#90caf9" stopOpacity="0.5" />
                </linearGradient>
            </defs>
            <rect x="10" y="10" width="180" height="260" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            <rect x="20" y="20" width="160" height="240" style={glassStyle} rx="2" />
            <circle cx="25" cy="80" r="5" fill={frameColor} />
            <circle cx="25" cy="140" r="5" fill={frameColor} />
            <circle cx="25" cy="200" r="5" fill={frameColor} />
            <rect x="165" y="130" width="8" height="20" fill={frameColor} rx="2" />
        </svg>
    )
}
