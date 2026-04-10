'use client'

import { useState } from 'react'

interface ManagedProductImageProps {
    productId: string
    fallbackSrc?: string
    alt: string
    className?: string
}

const KNOWN_EXTENSIONS = ['', '.jpg', '.jpeg', '.png', '.webp', '.gif']

export default function ManagedProductImage({
    productId,
    fallbackSrc,
    alt,
    className,
}: ManagedProductImageProps) {
    const [candidateIndex, setCandidateIndex] = useState(0)
    const [useFallback, setUseFallback] = useState(false)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const candidates = !supabaseUrl
        ? fallbackSrc ? [fallbackSrc] : []
        : KNOWN_EXTENSIONS.map(
            (extension) => `${supabaseUrl}/storage/v1/object/public/product-images/${productId}${extension}`
        )

    const src = useFallback ? fallbackSrc : candidates[candidateIndex] ?? fallbackSrc

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => {
                if (!useFallback && candidateIndex < candidates.length - 1) {
                    setCandidateIndex((currentIndex) => currentIndex + 1)
                    return
                }

                if (!useFallback && fallbackSrc) {
                    setUseFallback(true)
                }
            }}
        />
    )
}
