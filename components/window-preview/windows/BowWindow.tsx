export default function BowWindow({ frameColor }: { frameColor: string }) {
    return (
        <svg viewBox="0 0 320 200" className="w-full h-full">
            <defs>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e3f2fd" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#bbdefb" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#90caf9" stopOpacity="0.5" />
                </linearGradient>
            </defs>
            <path d="M 20 180 L 20 40 Q 50 20 80 30 L 80 180 Z" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            <path d="M 80 180 L 80 30 Q 120 15 160 15 Q 200 15 240 30 L 240 180 Z" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            <path d="M 240 180 L 240 30 Q 270 20 300 40 L 300 180 Z" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            <line x1="20" y1="180" x2="300" y2="180" stroke={frameColor} strokeWidth="6" />
        </svg>
    )
}
