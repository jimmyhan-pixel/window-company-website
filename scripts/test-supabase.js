/**
 * Supabase 连接测试脚本
 * 运行: node scripts/test-supabase.js
 */

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

// 手动读取 .env.local
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^#=]+)=(.*)$/)
        if (match) {
            const key = match[1].trim()
            const value = match[2].trim()
            process.env[key] = value
        }
    })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection...\n')
console.log('URL:', supabaseUrl ? '✅ Found' : '❌ Missing')
console.log('Key:', supabaseKey ? '✅ Found' : '❌ Missing')
console.log('')

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    try {
        console.log('📊 Fetching quotes from database...\n')

        const { data, error } = await supabase
            .from('quotes')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5)

        if (error) {
            console.error('❌ Database Error:', error.message)
            console.error('\n💡 Possible solutions:')
            console.error('   1. Make sure you created the "quotes" table in Supabase')
            console.error('   2. Check RLS policies are set correctly')
            console.error('   3. Verify your API credentials')
            return
        }

        console.log('✅ Connection successful!')
        console.log(`📝 Found ${data.length} quote(s) in database\n`)

        if (data.length > 0) {
            console.log('Latest quotes:')
            data.forEach((quote, index) => {
                console.log(`\n${index + 1}. Quote #${quote.id.substring(0, 8)}...`)
                console.log(`   Window: ${quote.window_type} (${quote.material})`)
                console.log(`   Size: ${quote.width}" × ${quote.height}"`)
                console.log(`   Quantity: ${quote.quantity}`)
                console.log(`   Customer: ${quote.customer_email}`)
                console.log(`   Status: ${quote.status}`)
                console.log(`   Created: ${new Date(quote.created_at).toLocaleString()}`)
            })
        } else {
            console.log('ℹ️  No quotes yet. Submit a quote through the website to test!')
        }

        console.log('\n✅ Supabase is ready for Phase 2!')

    } catch (err) {
        console.error('❌ Unexpected error:', err.message)
    }
}

testConnection()
