export default function BayWindow({ frameColor }: { frameColor: string }) {
    return (
        <svg viewBox="0 0 320 200" className="w-full h-full">
            <defs>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e3f2fd" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#bbdefb" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#90caf9" stopOpacity="0.5" />
                </linearGradient>
            </defs>
            <polygon points="30,180 50,20 100,20 100,180" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            <rect x="100" y="20" width="120" height="160" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            <polygon points="220,180 220,20 270,20 290,180" fill="url(#glassGradient)" stroke={frameColor} strokeWidth="4" />
            <line x1="30" y1="180" x2="290" y2="180" stroke={frameColor} strokeWidth="6" />
        </svg>
    )
}
