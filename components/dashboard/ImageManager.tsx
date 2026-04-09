'use client'

import { useState } from 'react'
import { getAllProducts } from '@/config/products'
import ManagedProductImage from '@/components/products/ManagedProductImage'
import { useLanguage } from '@/components/i18n/LanguageProvider'

export default function ImageManager() {
    const { language } = useLanguage()
    const isZh = language === 'zh'
    const products = getAllProducts()
    const [uploading, setUploading] = useState<string | null>(null)
    const [refreshSeed, setRefreshSeed] = useState(0)

    const t = isZh
        ? {
            home: '首页产品图片',
            vinyl: 'Vinyl Windows 子页面',
            aluminum: 'Aluminum Windows 子页面',
            commercial: 'Commercial Windows 子页面',
            upload: '上传',
            uploadImage: '上传图片',
            uploading: '上传中...',
            recommend: '推荐: 800×600px, JPG/PNG, 最大 5MB',
            success: '图片上传成功！',
            file: '文件',
            failed: '上传失败',
            chooseImage: '请选择图片文件',
            maxSize: '图片大小不能超过 5MB',
            noteTitle: '图片管理说明',
            note1: '如果在代码中添加新产品，这里会自动显示对应的上传框',
            note2: '推荐图片尺寸: 800×600px，格式: JPG/PNG，大小: 最大 5MB',
            note3: '上传后图片会立即在网站上更新',
        }
        : {
            home: 'Homepage Product Images',
            vinyl: 'Vinyl Windows Page',
            aluminum: 'Aluminum Windows Page',
            commercial: 'Commercial Windows Page',
            upload: 'Upload',
            uploadImage: 'Upload Image',
            uploading: 'Uploading...',
            recommend: 'Recommended: 800×600px, JPG/PNG, max 5MB',
            success: 'Image uploaded successfully!',
            file: 'File',
            failed: 'Upload failed',
            chooseImage: 'Please choose an image file',
            maxSize: 'Image size must be under 5MB',
            noteTitle: 'Image Manager Notes',
            note1: 'If you add new products in code, upload slots will appear here automatically',
            note2: 'Recommended size: 800×600px, JPG/PNG, max 5MB',
            note3: 'Uploaded images will update on the website immediately',
        }

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

            alert(`${t.success}\n${t.file}: ${file.name}\nURL: ${data.url}`)
            setRefreshSeed((currentSeed) => currentSeed + 1)
        } catch (error) {
            console.error('Upload error:', error)
            alert(`${t.failed}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setUploading(null)
        }
    }

    const handleFileChange = (productId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // 验证文件类型
            if (!file.type.startsWith('image/')) {
                alert(t.chooseImage)
                return
            }

            // 验证文件大小（最大 5MB）
            if (file.size > 5 * 1024 * 1024) {
                alert(t.maxSize)
                return
            }

            handleImageUpload(productId, file)
        }
    }

    return (
        <div className="space-y-8">
            {/* 首页产品图片 */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t.home}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.home.map((product) => (
                        <div key={product.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-[#738751] transition-colors">
                            <h3 className="font-semibold text-gray-900 mb-2">{isZh ? product.nameZh : product.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{isZh ? product.name : product.nameZh}</p>

                            {/* 图片预览 */}
                            <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                                <ManagedProductImage
                                    key={`${product.id}-${refreshSeed}`}
                                    productId={product.id}
                                    fallbackSrc={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
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
                                    {uploading === product.id ? t.uploading : t.uploadImage}
                                </div>
                            </label>

                            <p className="text-xs text-gray-500 mt-2 text-center">
                                {t.recommend}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vinyl Windows 子页面 */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t.vinyl}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.vinyl.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#738751] transition-colors">
                            <h4 className="font-medium text-gray-900 mb-1 text-sm">{isZh ? product.nameZh : product.name}</h4>
                            <p className="text-xs text-gray-600 mb-3">{isZh ? product.name : product.nameZh}</p>

                            <div className="bg-gray-100 rounded h-32 mb-3 flex items-center justify-center border border-dashed border-gray-300 overflow-hidden">
                                <ManagedProductImage
                                    key={`${product.id}-${refreshSeed}`}
                                    productId={product.id}
                                    fallbackSrc={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
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
                                    {uploading === product.id ? t.uploading : t.upload}
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Aluminum Windows 子页面 */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t.aluminum}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.aluminum.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#738751] transition-colors">
                            <h4 className="font-medium text-gray-900 mb-1 text-sm">{isZh ? product.nameZh : product.name}</h4>
                            <p className="text-xs text-gray-600 mb-3">{isZh ? product.name : product.nameZh}</p>

                            <div className="bg-gray-100 rounded h-32 mb-3 flex items-center justify-center border border-dashed border-gray-300 overflow-hidden">
                                <ManagedProductImage
                                    key={`${product.id}-${refreshSeed}`}
                                    productId={product.id}
                                    fallbackSrc={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
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
                                    {uploading === product.id ? t.uploading : t.upload}
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Commercial Windows 子页面 */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t.commercial}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.commercial.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#738751] transition-colors">
                            <h4 className="font-medium text-gray-900 mb-1 text-sm">{isZh ? product.nameZh : product.name}</h4>
                            <p className="text-xs text-gray-600 mb-3">{isZh ? product.name : product.nameZh}</p>

                            <div className="bg-gray-100 rounded h-32 mb-3 flex items-center justify-center border border-dashed border-gray-300 overflow-hidden">
                                <ManagedProductImage
                                    key={`${product.id}-${refreshSeed}`}
                                    productId={product.id}
                                    fallbackSrc={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
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
                                    {uploading === product.id ? t.uploading : t.upload}
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
                        <p className="font-medium mb-1">{t.noteTitle}</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>{t.note1}</li>
                            <li>{t.note2}</li>
                            <li>{t.note3}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
