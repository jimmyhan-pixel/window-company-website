export default function Grid2Picture({ frameColor }: { frameColor: string }) {
    return (
        <svg viewBox="0 0 280 200" className="w-full h-full absolute inset-0 pointer-events-none">
            <line x1="100" y1="20" x2="100" y2="180" stroke={frameColor} strokeWidth="2" />
            <line x1="180" y1="20" x2="180" y2="180" stroke={frameColor} strokeWidth="2" />
        </svg>
    )
}
