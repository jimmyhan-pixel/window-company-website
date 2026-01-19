export default function Grid6Over6DoubleHung({ frameColor }: { frameColor: string }) {
    return (
        <svg viewBox="0 0 200 300" className="w-full h-full absolute inset-0 pointer-events-none">
            <line x1="73" y1="20" x2="73" y2="145" stroke={frameColor} strokeWidth="2" />
            <line x1="127" y1="20" x2="127" y2="145" stroke={frameColor} strokeWidth="2" />
            <line x1="20" y1="85" x2="180" y2="85" stroke={frameColor} strokeWidth="2" />
            <line x1="73" y1="155" x2="73" y2="280" stroke={frameColor} strokeWidth="2" />
            <line x1="127" y1="155" x2="127" y2="280" stroke={frameColor} strokeWidth="2" />
            <line x1="20" y1="215" x2="180" y2="215" stroke={frameColor} strokeWidth="2" />
        </svg>
    )
}
