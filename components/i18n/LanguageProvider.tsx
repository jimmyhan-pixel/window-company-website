'use client'

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react'

export type Language = 'en' | 'zh'

interface LanguageContextValue {
    language: Language
    setLanguage: (language: Language) => void
    toggleLanguage: () => void
}

const STORAGE_KEY = 'site-language'
const LANGUAGE_EVENT = 'site-language-change'

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLanguage(): Language {
    if (typeof window === 'undefined') {
        return 'en'
    }

    const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
    return savedLanguage === 'zh' || savedLanguage === 'en' ? savedLanguage : 'en'
}

function subscribeToLanguage(callback: () => void) {
    if (typeof window === 'undefined') {
        return () => {}
    }

    const handleChange = () => callback()

    window.addEventListener('storage', handleChange)
    window.addEventListener(LANGUAGE_EVENT, handleChange)

    return () => {
        window.removeEventListener('storage', handleChange)
        window.removeEventListener(LANGUAGE_EVENT, handleChange)
    }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const language = useSyncExternalStore<Language>(subscribeToLanguage, readStoredLanguage, () => 'en')

    useEffect(() => {
        document.documentElement.lang = language
    }, [language])

    const value: LanguageContextValue = useMemo(
        () => ({
            language,
            setLanguage: (nextLanguage: Language) => {
                window.localStorage.setItem(STORAGE_KEY, nextLanguage)
                window.dispatchEvent(new Event(LANGUAGE_EVENT))
            },
            toggleLanguage: () => {
                const nextLanguage = language === 'en' ? 'zh' : 'en'
                window.localStorage.setItem(STORAGE_KEY, nextLanguage)
                window.dispatchEvent(new Event(LANGUAGE_EVENT))
            },
        }),
        [language]
    )

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)

    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }

    return context
}
