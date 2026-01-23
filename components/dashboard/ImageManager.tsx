'use client'

import { useState, useEffect } from 'react'
import { getAllProducts } from '@/config/products'

export default function ImageManager() {
    const products = getAllProducts()
    const [uploading, setUploading] = useState<string | null>(null)
    const [imageUrls, setImageUrls] = useState<Record<string, string>>({})

    // Get Supabase public URL for an image
    const getImageUrl = (productId: string) => {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        return `${supabaseUrl}/storage/v1/object/public/product-images/${productId}.jpg`
    }

    // Load image URLs on mount
    useEffect(() => {
        const urls: Record<string, string> = {}

        // Home products
        products.home.forEach(p => {
            urls[p.id] = getImageUrl(p.id)
        })

        // Vinyl products
        products.vinyl.forEach(p => {
            urls[p.id] = getImageUrl(p.id)
        })

        // Aluminum products
        products.aluminum.forEach(p => {
            urls[p.id] = getImageUrl(p.id)
        })

        // Commercial products
        products.commercial.forEach(p => {
            urls[p.id] = getImageUrl(p.id)
        })

        setImageUrls(urls)
    }, [])

    const handleImageUpload = async (productId: string, file: File) => {
        setUploading(productId)

        try {
            // Create form data
            const formData = new FormData()
            formData.append('file', file)
            formData.append('productId', productId)

            // Upload to server
            const response = await fetch('/api/upload/image', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed')
            }

            alert(`图片上传成功！\n文件: ${file.name}\nURL: ${data.url}`)

            // Refresh the page to show new image
            window.location.reload()
        } catch (error) {
            console.error('Upload error:', error)
            alert(`上传失败: ${error instanceof Error ? error.message : '未知错误'}`)
        } finally {
            setUploading(null)
        }
    }

    const handleFileChange = (productId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // 验证文件类型
            if (!file.type.startsWith('image/')) {
                alert('请选择图片文件')
                return
            }

            // 验证文件大小（最大 5MB）
            if (file.size > 5 * 1024 * 1024) {
                alert('图片大小不能超过 5MB')
                return
            }

            handleImageUpload(productId, file)
        }
    }

    return (
        <div className="space-y-8">
            {/* 首页产品图片 */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">首页产品图片</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.home.map((product) => (
                        <div key={product.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-[#738751] transition-colors">
                            <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{product.nameZh}</p>

                            {/* 图片预览 */}
                            <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                                <img
                                    src={imageUrls[product.id]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to placeholder if image doesn't exist
                                        e.currentTarget.style.display = 'none'
                                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                                    }}
                                />
                                <div className="hidden text-center">
                                    <span className="text-6xl mb-2 block">🪟</span>
                                    <p className="text-sm text-gray-500">未上传</p>
                                </div>
                            </div>

                            {/* 上传按钮 */}
                            <label className="block">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(product.id, e)}
                                    disabled={uploading === product.id}
                                    className="hidden"
                                />
                                <div className={`w-full py-3 text-center rounded-lg font-medium transition-colors cursor-pointer ${uploading === product.id
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-[#738751] text-white hover:bg-[#5f6f42]'
                                    }`}>
                                    {uploading === product.id ? '上传中...' : '上传图片'}
                                </div>
                            </label>

                            <p className="text-xs text-gray-500 mt-2 text-center">
                                推荐: 800×600px, JPG/PNG, 最大 5MB
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vinyl Windows 子页面 */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Vinyl Windows 子页面</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.vinyl.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#738751] transition-colors">
                            <h4 className="font-medium text-gray-900 mb-1 text-sm">{product.name}</h4>
                            <p className="text-xs text-gray-600 mb-3">{product.nameZh}</p>

                            <div className="bg-gray-100 rounded h-32 mb-3 flex items-center justify-center border border-dashed border-gray-300 overflow-hidden">
                                <img
                                    src={imageUrls[product.id]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none'
                                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                                    }}
                                />
                                <div className="hidden text-center">
                                    <span className="text-3xl">🪟</span>
                                </div>
                            </div>

                            <label className="block">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(product.id, e)}
                                    disabled={uploading === product.id}
                                    className="hidden"
                                />
                                <div className={`w-full py-2 text-center rounded text-sm font-medium transition-colors cursor-pointer ${uploading === product.id
                                    ? 'bg-gray-300 text-gray-500'
                                    : 'bg-[#738751] text-white hover:bg-[#5f6f42]'
                                    }`}>
                                    {uploading === product.id ? '上传中...' : '上传'}
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Aluminum Windows 子页面 */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Aluminum Windows 子页面</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.aluminum.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#738751] transition-colors">
                            <h4 className="font-medium text-gray-900 mb-1 text-sm">{product.name}</h4>
                            <p className="text-xs text-gray-600 mb-3">{product.nameZh}</p>

                            <div className="bg-gray-100 rounded h-32 mb-3 flex items-center justify-center border border-dashed border-gray-300">
                                <span className="text-3xl">🏢</span>
                            </div>

                            <label className="block">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(product.id, e)}
                                    disabled={uploading === product.id}
                                    className="hidden"
                                />
                                <div className={`w-full py-2 text-center rounded text-sm font-medium transition-colors cursor-pointer ${uploading === product.id
                                    ? 'bg-gray-300 text-gray-500'
                                    : 'bg-[#738751] text-white hover:bg-[#5f6f42]'
                                    }`}>
                                    {uploading === product.id ? '上传中...' : '上传'}
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Commercial Windows 子页面 */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Commercial Windows 子页面</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.commercial.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#738751] transition-colors">
                            <h4 className="font-medium text-gray-900 mb-1 text-sm">{product.name}</h4>
                            <p className="text-xs text-gray-600 mb-3">{product.nameZh}</p>

                            <div className="bg-gray-100 rounded h-32 mb-3 flex items-center justify-center border border-dashed border-gray-300">
                                <span className="text-3xl">🏢</span>
                            </div>

                            <label className="block">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(product.id, e)}
                                    disabled={uploading === product.id}
                                    className="hidden"
                                />
                                <div className={`w-full py-2 text-center rounded text-sm font-medium transition-colors cursor-pointer ${uploading === product.id
                                    ? 'bg-gray-300 text-gray-500'
                                    : 'bg-[#738751] text-white hover:bg-[#5f6f42]'
                                    }`}>
                                    {uploading === product.id ? '上传中...' : '上传'}
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* 提示信息 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                    <span className="text-xl mr-2">ℹ️</span>
                    <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">图片管理说明</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>如果在代码中添加新产品，这里会自动显示对应的上传框</li>
                            <li>推荐图片尺寸: 800×600px，格式: JPG/PNG，大小: 最大 5MB</li>
                            <li>上传后图片会立即在网站上更新</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
