import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const {
      material,
      aluminumCategory,
      windowType,
      grids,
      color,
      width,
      height,
      quantity,
      email,
      phone
    } = body

    // Validate required fields
    if (!email || !phone || !windowType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email to company
    const { data, error } = await resend.emails.send({
      from: 'Quote Request <onboarding@resend.dev>', // Use verified domain later
      to: process.env.COMPANY_EMAIL || 'your@email.com',
      subject: `New Quote Request - ${windowType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #738751;">New Quote Request</h2>
          
          <div style="background: #f7f8f3; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Window Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Material:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${material}</td>
              </tr>
              ${aluminumCategory ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Category:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${aluminumCategory}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Window Type:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${windowType}</td>
              </tr>
              ${grids ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Grids:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${grids}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Color:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${color}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Size:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${width}" × ${height}"</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Quantity:</strong></td>
                <td style="padding: 8px 0;">${quantity}</td>
              </tr>
            </table>
          </div>

          <div style="background: #fff; padding: 20px; border: 2px solid #738751; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #738751;">Customer Contact</h3>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This quote request was submitted via the website quotation form.
          </p>
        </div>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    // Save to database
try {
  const { error: dbError } = await supabase
    .from('quotes')
    .insert([
      {
        material,
        aluminum_category: aluminumCategory,
        window_type: windowType,
        grids,
        color,
        width,
        height,
        quantity,
        customer_email: email,
        customer_phone: phone,
        status: 'pending'
      }
    ])

  if (dbError) {
    console.error('Database error:', dbError)
    // 邮件已发送，数据库保存失败不影响用户体验
  }
} catch (dbError) {
  console.error('Database error:', dbError)
}

    // Optional: Send confirmation email to customer
    await resend.emails.send({
      from: 'City Windows <onboarding@resend.dev>',
      to: email,
      subject: 'Quote Request Received - City Windows',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #738751;">Thank You for Your Quote Request!</h2>
          <p>We've received your request for:</p>
          <ul>
            <li><strong>Window Type:</strong> ${windowType}</li>
            <li><strong>Size:</strong> ${width}" × ${height}"</li>
            <li><strong>Quantity:</strong> ${quantity}</li>
          </ul>
          <p>Our team will review your request and send you a detailed quote within 24 hours.</p>
          <p style="margin-top: 30px;">Best regards,<br><strong>City Windows Team</strong></p>
        </div>
      `
    })

    return NextResponse.json(
      { success: true, message: 'Quote request sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
