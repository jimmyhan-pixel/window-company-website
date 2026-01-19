export default function Grid4Over4TwoLiteSlider({ frameColor }: { frameColor: string }) {
    return (
        <svg viewBox="0 0 300 200" className="w-full h-full absolute inset-0 pointer-events-none">
            <line x1="82" y1="20" x2="82" y2="180" stroke={frameColor} strokeWidth="2" />
            <line x1="20" y1="100" x2="145" y2="100" stroke={frameColor} strokeWidth="2" />
            <line x1="218" y1="20" x2="218" y2="180" stroke={frameColor} strokeWidth="2" />
            <line x1="155" y1="100" x2="280" y2="100" stroke={frameColor} strokeWidth="2" />
        </svg>
    )
}
