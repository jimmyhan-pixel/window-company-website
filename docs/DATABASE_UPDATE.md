# 📊 数据库更新 SQL - 简化版

## 🎯 更新内容

1. 修改 `quotes` 表（添加 quote_number，删除不需要的字段）
2. 创建 `page_views` 表（访问量统计）

---

## 📝 执行步骤

### Step 1: 在 Supabase SQL Editor 执行以下 SQL

```sql
-- ============================================
-- 1. 修改 quotes 表
-- ============================================

-- 添加 quote_number 字段（日期+序号格式）
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS quote_number TEXT;

-- 删除不需要的字段
ALTER TABLE quotes DROP COLUMN IF EXISTS status;
ALTER TABLE quotes DROP COLUMN IF EXISTS notes;
ALTER TABLE quotes DROP COLUMN IF EXISTS quote_amount;

-- 创建 quote_number 索引
CREATE INDEX IF NOT EXISTS idx_quotes_quote_number ON quotes(quote_number);

-- ============================================
-- 2. 创建生成 quote_number 的函数
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
-- 3. 创建自动生成 quote_number 的触发器
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
-- 4. 创建访问量统计表
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

-- 启用 RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- RLS 策略：允许公开插入（记录访问）
DROP POLICY IF EXISTS "Allow public insert" ON page_views;
CREATE POLICY "Allow public insert" ON page_views
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- RLS 策略：允许认证用户查看（Dashboard 统计）
DROP POLICY IF EXISTS "Allow authenticated read" ON page_views;
CREATE POLICY "Allow authenticated read" ON page_views
  FOR SELECT 
  TO authenticated
  USING (true);

-- ============================================
-- 5. 创建统计视图（方便查询）
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
-- 6. 更新现有记录的 quote_number（如果有数据）
-- ============================================

-- 为现有记录生成 quote_number
DO $$
DECLARE
  quote_record RECORD;
  quote_date TEXT;
  daily_sequence INTEGER;
BEGIN
  FOR quote_record IN 
    SELECT id, created_at 
    FROM quotes 
    WHERE quote_number IS NULL 
    ORDER BY created_at
  LOOP
    -- 获取该记录的日期
    quote_date := TO_CHAR(quote_record.created_at, 'YYYYMMDD');
    
    -- 获取该日期的序号
    SELECT COUNT(*) + 1 INTO daily_sequence
    FROM quotes
    WHERE quote_number LIKE quote_date || '-%'
    AND created_at < quote_record.created_at;
    
    -- 更新 quote_number
    UPDATE quotes
    SET quote_number = quote_date || '-' || LPAD(daily_sequence::TEXT, 3, '0')
    WHERE id = quote_record.id;
  END LOOP;
END $$;
```

---

## ✅ 验证

执行完成后，运行以下查询验证：

```sql
-- 查看 quotes 表结构
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'quotes'
ORDER BY ordinal_position;

-- 查看是否有 quote_number
SELECT id, quote_number, created_at 
FROM quotes 
ORDER BY created_at DESC 
LIMIT 5;

-- 查看 page_views 表
SELECT * FROM page_views LIMIT 5;

-- 查看访问量统计
SELECT * FROM view_total_page_views;
SELECT * FROM view_monthly_page_views;
```

---

## 📊 数据库结构

### quotes 表（简化后）
```
id                  UUID (主键)
created_at          TIMESTAMP
updated_at          TIMESTAMP
quote_number        TEXT (新增) - 格式: 20260122-001
material            TEXT
aluminum_category   TEXT
window_type         TEXT
grids               TEXT
color               TEXT
width               NUMERIC
height              NUMERIC
quantity            INTEGER
customer_email      TEXT (保留，用于邮件)
customer_phone      TEXT (保留，用于邮件)
customer_name       TEXT
```

### page_views 表（新建）
```
id          UUID (主键)
page_path   TEXT (页面路径，默认 '/')
viewed_at   TIMESTAMP (访问时间)
user_agent  TEXT (浏览器信息)
ip_address  TEXT (IP地址)
```

---

## 🎯 下一步

执行完 SQL 后，继续修改 Dashboard 代码。
