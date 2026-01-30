import { createClient } from '@supabase/supabase-js'

// 服务器端 Supabase 客户端（使用 Service Role Key）
// 用于需要管理员权限的操作，如文件上传
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)
