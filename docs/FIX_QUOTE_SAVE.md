# 🔧 修复询价保存问题

## 🐛 问题

提交询价后，数据没有保存到数据库。

错误信息：
```
Could not find the 'status' column of 'quotes' in the schema cache
```

## 🎯 原因

Supabase 的 schema 缓存还认为 `quotes` 表中有 `status` 字段，但实际上：
1. 代码已经移除了对 `status` 的引用
2. 但 Supabase 的缓存没有更新

## ✅ 解决方案

### **方案 A: 刷新 Supabase Schema Cache（推荐）**

1. 打开 Supabase Dashboard
2. 进入你的项目
3. 点击左侧 **Settings** → **API**
4. 找到 **Schema Cache** 部分
5. 点击 **Reload schema** 按钮

或者在 SQL Editor 中执行：
```sql
NOTIFY pgrst, 'reload schema';
```

### **方案 B: 添加 status 字段（临时方案）**

如果方案 A 不行，在 SQL Editor 执行：

```sql
-- 添加 status 字段（设置默认值，这样不影响现有代码）
ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
```

这样即使代码不插入 `status`，数据库也会自动设置默认值。

---

## 🧪 测试步骤

### 1. 刷新 Schema Cache 后

访问: http://localhost:3000/quotation

提交一个测试询价，然后检查：

```bash
# 运行测试脚本
node scripts/test-supabase.js
```

应该显示：
```
✅ Connection successful!
📝 Found 1 quote(s) in database
```

### 2. 在 Dashboard 查看

1. 登录: http://localhost:3000/dashboard/login
2. 应该能看到刚提交的询价

---

## 📝 完整的数据库设置（可选）

如果你想要完整的功能（quote_number + page_views），执行以下 SQL：

```sql
-- 1. 添加 quote_number 字段
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS quote_number TEXT;

-- 2. 创建生成函数
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT AS $$
DECLARE
  today_date TEXT;
  daily_count INTEGER;
  new_number TEXT;
BEGIN
  today_date := TO_CHAR(CURRENT_DATE, 'YYYYMMDD');
  
  SELECT COUNT(*) INTO daily_count
  FROM quotes
  WHERE quote_number LIKE today_date || '-%';
  
  new_number := today_date || '-' || LPAD((daily_count + 1)::TEXT, 3, '0');
  
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- 3. 创建触发器
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

-- 4. 创建访问量表
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL DEFAULT '/',
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(viewed_at DESC);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON page_views;
CREATE POLICY "Allow public insert" ON page_views
  FOR INSERT TO public WITH CHECK (true);
```

---

## 🎯 快速修复（立即可用）

**最快的方法**：

1. 打开 Supabase Dashboard
2. SQL Editor
3. 执行：
```sql
-- 添加 status 字段（默认值）
ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- 刷新缓存
NOTIFY pgrst, 'reload schema';
```

4. 提交测试询价
5. 检查数据库

---

**选择一个方案执行，然后测试！** 🚀
