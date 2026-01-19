export default function AwningWindow({ frameColor }: { frameColor: string }) {
    const glassStyle = { fill: 'url(#glassGradient)' }

    return (
        <svg viewBox="0 0 280 180" className="w-full h-full">
            <defs>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e3f2fd" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#bbdefb" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#90caf9" stopOpacity="0.5" />
                </linearGradient>
            </defs>
            <rect x="10" y="10" width="260" height="160" fill="none" stroke={frameColor} strokeWidth="10" rx="4" />
            <rect x="20" y="20" width="240" height="140" style={glassStyle} rx="2" />
            <circle cx="80" cy="162" r="5" fill={frameColor} />
            <circle cx="140" cy="162" r="5" fill={frameColor} />
            <circle cx="200" cy="162" r="5" fill={frameColor} />
            <rect x="130" y="22" width="20" height="8" fill={frameColor} rx="2" />
        </svg>
    )
}
