-- ============================================
-- 完整的数据库设置 SQL - 最终版本
-- ============================================
-- 功能：
-- 1. quotes 表 - 询价记录（带自动生成的 quote_number）
-- 2. page_views 表 - 访问量统计
-- 3. 自动触发器和函数
-- 4. RLS 安全策略
-- ============================================

-- ============================================
-- 1. 创建 quotes 表
-- ============================================

CREATE TABLE IF NOT EXISTS quotes (
  -- 主键和时间戳
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- 询价编号（自动生成，格式：20260122-001）
  quote_number TEXT,
  
  -- 窗户配置信息
  material TEXT NOT NULL,
  aluminum_category TEXT,
  window_type TEXT NOT NULL,
  grids TEXT,
  color TEXT NOT NULL,
  width NUMERIC NOT NULL CHECK (width > 0),
  height NUMERIC NOT NULL CHECK (height > 0),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  
  -- 客户联系信息（用于邮件，Dashboard 不显示）
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_name TEXT
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_quote_number ON quotes(quote_number);

-- ============================================
-- 2. 创建自动更新 updated_at 的函数和触发器
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
CREATE TRIGGER update_quotes_updated_at 
  BEFORE UPDATE ON quotes
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. 创建自动生成 quote_number 的函数
-- ============================================

CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT AS $$
DECLARE
  today_date TEXT;
  daily_count INTEGER;
  new_number TEXT;
BEGIN
  -- 获取今天的日期（YYYYMMDD 格式）
  today_date := TO_CHAR(CURRENT_DATE, 'YYYYMMDD');
  
  -- 获取今天已有的询价数量
  SELECT COUNT(*) INTO daily_count
  FROM quotes
  WHERE quote_number LIKE today_date || '-%';
  
  -- 生成新的序号（从001开始）
  new_number := today_date || '-' || LPAD((daily_count + 1)::TEXT, 3, '0');
  
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 4. 创建自动设置 quote_number 的触发器
-- ============================================

CREATE OR REPLACE FUNCTION set_quote_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.quote_number IS NULL THEN
    NEW.quote_number := generate_quote_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_quote_number ON quotes;
CREATE TRIGGER trigger_set_quote_number
  BEFORE INSERT ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION set_quote_number();

-- ============================================
-- 5. 配置 quotes 表的 RLS（Row Level Security）
-- ============================================

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- 删除旧策略（如果存在）
DROP POLICY IF EXISTS "Allow public insert" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated read" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated update" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated delete" ON quotes;

-- 策略 1: 允许公开插入（网站表单提交）
CREATE POLICY "Allow public insert" ON quotes
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- 策略 2: 允许公开查看（Dashboard 需要）
CREATE POLICY "Allow public read" ON quotes
  FOR SELECT 
  TO public
  USING (true);

-- ============================================
-- 6. 创建访问量统计表
-- ============================================

CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL DEFAULT '/',
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_agent TEXT,
  ip_address TEXT
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(viewed_at DESC);

-- ============================================
-- 7. 配置 page_views 表的 RLS
-- ============================================

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- 删除旧策略（如果存在）
DROP POLICY IF EXISTS "Allow public insert" ON page_views;
DROP POLICY IF EXISTS "Allow public read" ON page_views;

-- 策略 1: 允许公开插入（记录访问）
CREATE POLICY "Allow public insert" ON page_views
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- 策略 2: 允许公开查看（Dashboard 统计）
CREATE POLICY "Allow public read" ON page_views
  FOR SELECT 
  TO public
  USING (true);

-- ============================================
-- 8. 创建统计视图（方便查询）
-- ============================================

-- 总访问量视图
CREATE OR REPLACE VIEW view_total_page_views AS
SELECT 
  page_path,
  COUNT(*) as total_views
FROM page_views
GROUP BY page_path;

-- 本月访问量视图
CREATE OR REPLACE VIEW view_monthly_page_views AS
SELECT 
  page_path,
  COUNT(*) as monthly_views
FROM page_views
WHERE viewed_at >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY page_path;

-- ============================================
-- 9. 插入测试数据（可选 - 取消注释来使用）
-- ============================================

/*
INSERT INTO quotes (
  material, window_type, color, width, height, quantity,
  customer_email, customer_phone
) VALUES 
  ('Vinyl', 'Casement', 'White', 36, 48, 2, 'test1@example.com', '555-0001'),
  ('Aluminum', 'Sliding', 'Bronze', 60, 36, 1, 'test2@example.com', '555-0002'),
  ('Wood', 'Double Hung', 'Natural', 30, 60, 4, 'test3@example.com', '555-0003');
*/

-- ============================================
-- 10. 验证设置
-- ============================================

-- 查看 quotes 表结构
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'quotes'
ORDER BY ordinal_position;

-- 查看 page_views 表结构
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'page_views'
ORDER BY ordinal_position;

-- 查看触发器
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE event_object_table IN ('quotes', 'page_views');

-- ============================================
-- 完成！
-- ============================================
-- 
-- 执行完成后，你应该有：
-- ✅ quotes 表（带自动 quote_number）
-- ✅ page_views 表（访问量统计）
-- ✅ 自动触发器（quote_number 生成、updated_at 更新）
-- ✅ RLS 安全策略
-- ✅ 统计视图
--
-- 下一步：
-- 1. 测试提交询价：http://localhost:3000/quotation
-- 2. 运行测试脚本：node scripts/test-supabase.js
-- 3. 登录 Dashboard：http://localhost:3000/dashboard/login
-- ============================================
