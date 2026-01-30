import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getSession } from '@/lib/session'

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

        // Get form data
        const formData = await request.formData()
        const file = formData.get('file') as File
        const productId = formData.get('productId') as string

        if (!file || !productId) {
            return NextResponse.json(
                { error: 'Missing file or productId' },
                { status: 400 }
            )
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'File must be an image' },
                { status: 400 }
            )
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'File size must be less than 5MB' },
                { status: 400 }
            )
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate file path
        const fileExt = file.name.split('.').pop()
        const filePath = `${productId}.${fileExt}`

        // Upload to Supabase Storage
        const { data, error } = await supabaseAdmin.storage
            .from('product-images')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: true // Replace if exists
            })

        if (error) {
            console.error('Upload error:', error)
            return NextResponse.json(
                { error: 'Failed to upload image' },
                { status: 500 }
            )
        }

        // Get public URL
        const { data: { publicUrl } } = supabaseAdmin.storage
            .from('product-images')
            .getPublicUrl(filePath)

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

        const { filePath } = await request.json()

        if (!filePath) {
            return NextResponse.json(
                { error: 'Missing filePath' },
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

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
