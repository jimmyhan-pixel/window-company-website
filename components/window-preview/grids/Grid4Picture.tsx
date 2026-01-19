export default function Grid4Picture({ frameColor }: { frameColor: string }) {
    return (
        <svg viewBox="0 0 280 200" className="w-full h-full absolute inset-0 pointer-events-none">
            <line x1="140" y1="20" x2="140" y2="180" stroke={frameColor} strokeWidth="2" />
            <line x1="20" y1="100" x2="260" y2="100" stroke={frameColor} strokeWidth="2" />
        </svg>
    )
}
