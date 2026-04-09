'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/i18n/LanguageProvider'

export default function LoginPage() {
    const router = useRouter()
    const { language } = useLanguage()
    const isZh = language === 'zh'
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const t = isZh
        ? {
            title: 'Dashboard 登录',
            subtitle: 'City Windows 询价管理系统',
            username: '用户名',
            usernamePlaceholder: '请输入用户名',
            password: '密码',
            passwordPlaceholder: '请输入密码',
            login: '登录 Dashboard',
            loggingIn: '登录中...',
            footer: '请使用管理员账户登录',
            loginFailed: '登录失败',
            networkError: '网络错误，请重试',
        }
        : {
            title: 'Dashboard Login',
            subtitle: 'City Windows quote management',
            username: 'Username',
            usernamePlaceholder: 'Enter your username',
            password: 'Password',
            passwordPlaceholder: 'Enter your password',
            login: 'Login to Dashboard',
            loggingIn: 'Signing in...',
            footer: 'Please sign in with the admin account',
            loginFailed: 'Login failed',
            networkError: 'Network error. Please try again.',
        }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()

            if (response.ok) {
                router.push('/dashboard')
                router.refresh()
            } else {
                setError(data.error || t.loginFailed)
            }
        } catch {
            setError(t.networkError)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F8F3]">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-2">🪟</div>
                        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                        <p className="text-gray-600 mt-2">{t.subtitle}</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                {t.username}
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#738751] focus:border-transparent outline-none transition"
                                placeholder={t.usernamePlaceholder}
                                autoComplete="username"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                {t.password}
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#738751] focus:border-transparent outline-none transition"
                                placeholder={t.passwordPlaceholder}
                                autoComplete="current-password"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#738751] text-white py-3 rounded-lg font-medium hover:bg-[#5f6f42] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? t.loggingIn : t.login}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>{t.footer}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
