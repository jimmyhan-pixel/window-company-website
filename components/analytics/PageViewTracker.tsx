'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const EXCLUDED_PREFIXES = ['/dashboard']

export default function PageViewTracker() {
    const pathname = usePathname()

    useEffect(() => {
        if (!pathname || EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
            return
        }

        void fetch('/api/analytics/page-view', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page_path: pathname }),
            keepalive: true,
        })
    }, [pathname])

    return null
}
