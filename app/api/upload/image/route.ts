import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getSession } from '@/lib/session'
import { getClientIp } from '@/lib/request'
import { consumeRateLimit } from '@/lib/rate-limit'
import { aluminumProducts, commercialProducts, homeProducts, vinylProducts } from '@/config/products'
import { createAuditLog } from '@/lib/audit-log'

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES: Record<string, string[]> = {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/webp': ['webp'],
    'image/gif': ['gif'],
}
const ALLOWED_PRODUCT_IDS = new Set(
    [...homeProducts, ...vinylProducts, ...aluminumProducts, ...commercialProducts].map((product) => product.id)
)
const ALLOWED_EXTENSIONS = new Set(Object.values(ALLOWED_IMAGE_TYPES).flat())

function getFileExtension(fileName: string) {
    return fileName.includes('.') ? fileName.split('.').pop()?.toLowerCase() ?? '' : ''
}

function hasMatchingMagicBytes(buffer: Buffer, mimeType: string) {
    if (mimeType === 'image/jpeg') {
        return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
    }

    if (mimeType === 'image/png') {
        return buffer.length >= 8
            && buffer[0] === 0x89
            && buffer[1] === 0x50
            && buffer[2] === 0x4e
            && buffer[3] === 0x47
            && buffer[4] === 0x0d
            && buffer[5] === 0x0a
            && buffer[6] === 0x1a
            && buffer[7] === 0x0a
    }

    if (mimeType === 'image/webp') {
        return buffer.length >= 12
            && buffer.subarray(0, 4).toString('ascii') === 'RIFF'
            && buffer.subarray(8, 12).toString('ascii') === 'WEBP'
    }

    if (mimeType === 'image/gif') {
        const header = buffer.subarray(0, 6).toString('ascii')
        return header === 'GIF87a' || header === 'GIF89a'
    }

    return false
}

function isValidStorageFilePath(filePath: string) {
    if (!filePath || filePath.includes('/') || filePath.includes('\\')) {
        return false
    }

    const extension = getFileExtension(filePath)
    if (!ALLOWED_EXTENSIONS.has(extension)) {
        return false
    }

    const productId = filePath.slice(0, -(extension.length + 1))
    return ALLOWED_PRODUCT_IDS.has(productId)
}

export async function POST(request: Request) {
    try {
        // Check authentication
        const session = await getSession()
        if (!session.isLoggedIn) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const clientIp = getClientIp(request)
        const rateLimitIdentifier = session.username ? `${session.username}:${clientIp}` : clientIp
        const rateLimitResult = consumeRateLimit('dashboard-upload', rateLimitIdentifier, {
            windowMs: 10 * 60 * 1000,
            maxRequests: 20,
        })

        if (!rateLimitResult.allowed) {
            return NextResponse.json(
                { error: 'Too many upload attempts. Please try again later.' },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(rateLimitResult.retryAfterSeconds),
                    },
                }
            )
        }

        // Get form data
        const formData = await request.formData()
        const fileEntry = formData.get('file')
        const productIdEntry = formData.get('productId')

        if (!(fileEntry instanceof File) || typeof productIdEntry !== 'string') {
            return NextResponse.json(
                { error: 'Missing file or productId' },
                { status: 400 }
            )
        }

        const file = fileEntry
        const productId = productIdEntry.trim()

        if (!productId || !ALLOWED_PRODUCT_IDS.has(productId)) {
            return NextResponse.json(
                { error: 'Invalid productId' },
                { status: 400 }
            )
        }

        if (!file.size) {
            return NextResponse.json(
                { error: 'File is empty' },
                { status: 400 }
            )
        }

        if (!(file.type in ALLOWED_IMAGE_TYPES)) {
            return NextResponse.json(
                { error: 'Unsupported image type' },
                { status: 400 }
            )
        }

        // Validate file size (max 5MB)
        if (file.size > MAX_FILE_SIZE_BYTES) {
            return NextResponse.json(
                { error: 'File size must be less than 5MB' },
                { status: 400 }
            )
        }

        const fileExt = getFileExtension(file.name)
        if (!fileExt || !ALLOWED_IMAGE_TYPES[file.type].includes(fileExt)) {
            return NextResponse.json(
                { error: 'File extension does not match file type' },
                { status: 400 }
            )
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        if (!hasMatchingMagicBytes(buffer, file.type)) {
            return NextResponse.json(
                { error: 'Uploaded file content does not match the image type' },
                { status: 400 }
            )
        }

        // Generate file path
        const filePath = `${productId}.${fileExt}`

        // Remove older versions so the public site always resolves to the latest upload.
        const { error: removeError } = await supabaseAdmin.storage
            .from('product-images')
            .remove([
                productId,
                `${productId}.jpg`,
                `${productId}.jpeg`,
                `${productId}.png`,
                `${productId}.webp`,
                `${productId}.gif`,
            ])

        if (removeError) {
            console.warn('Pre-upload cleanup warning:', removeError.message)
        }

        // Upload to Supabase Storage
        const { error } = await supabaseAdmin.storage
            .from('product-images')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: true // Replace if exists
            })

        if (error) {
            console.error('Upload error:', error)
            return NextResponse.json(
                { error: `Failed to upload image: ${error.message}` },
                { status: 500 }
            )
        }

        // Get public URL
        const { data: { publicUrl } } = supabaseAdmin.storage
            .from('product-images')
            .getPublicUrl(filePath)

        await createAuditLog({
            action: 'product_image_uploaded',
            actor: session.username || null,
            actorType: 'admin',
            targetType: 'product-image',
            targetId: productId,
            ipAddress: clientIp,
            metadata: {
                filePath,
                mimeType: file.type,
                size: file.size,
            },
        })

        return NextResponse.json({
            success: true,
            url: publicUrl,
            path: filePath
        })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Delete image
export async function DELETE(request: Request) {
    try {
        // Check authentication
        const session = await getSession()
        if (!session.isLoggedIn) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const clientIp = getClientIp(request)
        const rateLimitIdentifier = session.username ? `${session.username}:${clientIp}` : clientIp
        const rateLimitResult = consumeRateLimit('dashboard-upload', rateLimitIdentifier, {
            windowMs: 10 * 60 * 1000,
            maxRequests: 20,
        })

        if (!rateLimitResult.allowed) {
            return NextResponse.json(
                { error: 'Too many upload attempts. Please try again later.' },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(rateLimitResult.retryAfterSeconds),
                    },
                }
            )
        }

        const body = await request.json()
        const filePath = typeof body.filePath === 'string' ? body.filePath.trim() : ''

        if (!isValidStorageFilePath(filePath)) {
            return NextResponse.json(
                { error: 'Invalid filePath' },
                { status: 400 }
            )
        }

        // Delete from Supabase Storage
        const { error } = await supabaseAdmin.storage
            .from('product-images')
            .remove([filePath])

        if (error) {
            console.error('Delete error:', error)
            return NextResponse.json(
                { error: 'Failed to delete image' },
                { status: 500 }
            )
        }

        await createAuditLog({
            action: 'product_image_deleted',
            actor: session.username || null,
            actorType: 'admin',
            targetType: 'product-image',
            targetId: filePath,
            ipAddress: clientIp,
            metadata: {
                filePath,
            },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
