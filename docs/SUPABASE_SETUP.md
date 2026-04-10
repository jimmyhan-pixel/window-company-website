# 🚀 Phase 2: Supabase 数据库集成指南

## 📋 完成状态

### Phase 1 ✅
- ✅ Resend 邮件服务集成
- ✅ API 路由创建成功
- ✅ Quotation 表单连接成功
- ✅ 邮件成功发送（公司邮箱 + 客户确认邮件）

### Phase 2 🚀
- [ ] Supabase 项目设置
- [ ] 创建数据库表结构
- [ ] 配置环境变量
- [ ] 测试数据保存功能
- [ ] 为 Dashboard 准备数据查询

---

## 步骤 1: 创建 Supabase 数据库表

### 1.1 访问 Supabase Dashboard

1. 登录 [https://supabase.com](https://supabase.com)
2. 选择你的项目（或创建新项目）
3. 进入 **SQL Editor** (左侧菜单)

### 1.2 执行以下 SQL 创建表

点击 **New query**，复制粘贴以下 SQL，然后点击 **Run**：

```sql
-- ============================================
-- 创建询价表 (Quotes Table)
-- ============================================
CREATE TABLE IF NOT EXISTS quotes (
  -- 主键和时间戳
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- 窗户配置信息
  material TEXT NOT NULL,                    -- 材料类型 (Vinyl/Aluminum/Wood)
  aluminum_category TEXT,                    -- 铝窗类别 (仅当 material=Aluminum)
  window_type TEXT NOT NULL,                 -- 窗户类型 (Casement/Double Hung/等)
  grids TEXT,                                -- 格栅样式
  color TEXT NOT NULL,                       -- 颜色
  width NUMERIC NOT NULL CHECK (width > 0),  -- 宽度（英寸）
  height NUMERIC NOT NULL CHECK (height > 0),-- 高度（英寸）
  quantity INTEGER NOT NULL CHECK (quantity > 0), -- 数量
  
  -- 客户联系信息
  customer_email TEXT NOT NULL,              -- 客户邮箱
  customer_phone TEXT NOT NULL,              -- 客户电话
  project_address TEXT,                      -- 项目地址（整张 quotation 级别）
  
  -- 状态管理
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',    -- 待处理
    'quoted',     -- 已报价
    'approved',   -- 已批准
    'rejected',   -- 已拒绝
    'completed'   -- 已完成
  )),
  
  -- 可选字段（后续扩展）
  quote_amount NUMERIC CHECK (quote_amount >= 0), -- 报价金额
  notes TEXT,                                     -- 备注
  customer_name TEXT                              -- 客户姓名（可选）
);

-- ============================================
-- 创建索引以提高查询性能
-- ============================================
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_customer_email ON quotes(customer_email);
CREATE INDEX IF NOT EXISTS idx_quotes_window_type ON quotes(window_type);

-- ============================================
-- 创建自动更新 updated_at 的触发器
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
CREATE TRIGGER update_quotes_updated_at 
  BEFORE UPDATE ON quotes
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 配置 Row Level Security (RLS)
-- ============================================
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- 删除现有策略（如果存在）
DROP POLICY IF EXISTS "Allow anonymous insert" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated read" ON quotes;
DROP POLICY IF EXISTS "Allow service role all" ON quotes;

-- 删除旧策略（如果存在）
DROP POLICY IF EXISTS "Allow anonymous insert" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated read" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated update" ON quotes;
DROP POLICY IF EXISTS "Allow service role all" ON quotes;

-- 安全版策略：所有数据库读写都通过服务器端 API + Service Role Key 完成
CREATE POLICY "Allow service role all" ON quotes
  FOR ALL 
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 插入测试数据（可选）
-- ============================================
-- 取消下面的注释来插入测试数据
/*
INSERT INTO quotes (
  material, window_type, color, width, height, quantity,
  customer_email, customer_phone, status
) VALUES 
  ('Vinyl', 'Casement', 'White', 36, 48, 2, 'test@example.com', '555-0001', 'pending'),
  ('Aluminum', 'Sliding', 'Bronze', 60, 36, 1, 'test2@example.com', '555-0002', 'quoted'),
  ('Wood', 'Double Hung', 'Natural', 30, 60, 4, 'test3@example.com', '555-0003', 'completed');
*/
```

### 1.3 验证表创建

执行完成后：
1. 进入 **Table Editor** (左侧菜单)
2. 你应该能看到 `quotes` 表
3. 点击表名查看所有字段

---

## 步骤 2: 验证环境变量

### 2.1 检查 `.env.local` 文件

确保你的 `.env.local` 包含以下配置：

```bash
# Resend API Key
RESEND_API_KEY=your_resend_api_key

# Company email
COMPANY_EMAIL=your@email.com

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2.2 获取 Supabase 凭证

如果还没有配置：
1. 在 Supabase Dashboard，进入 **Settings** → **API**
2. 复制 **Project URL** → 粘贴到 `NEXT_PUBLIC_SUPABASE_URL`
3. 复制 **anon public** key → 粘贴到 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 步骤 3: 测试数据库连接

### 3.1 重启开发服务器

```bash
# 停止当前服务器 (Ctrl+C)
# 重新启动
npm run dev
```

### 3.2 测试表单提交

1. 访问 `http://localhost:3000/quotation`
2. 填写表单并提交
3. 检查：
   - ✅ 是否收到邮件
   - ✅ 在 Supabase Table Editor 中查看 `quotes` 表是否有新记录

### 3.3 查看数据库记录

在 Supabase Dashboard：
1. 进入 **Table Editor**
2. 点击 `quotes` 表
3. 查看新插入的记录

---

## 步骤 4: 数据库字段说明

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| `id` | UUID | 唯一标识符（自动生成） | `123e4567-e89b...` |
| `created_at` | Timestamp | 创建时间（自动） | `2026-01-22 04:00:00` |
| `updated_at` | Timestamp | 更新时间（自动） | `2026-01-22 04:00:00` |
| `material` | Text | 材料类型 | `Vinyl`, `Aluminum`, `Wood` |
| `aluminum_category` | Text | 铝窗类别（可选） | `Thermal Break`, `Non-Thermal` |
| `window_type` | Text | 窗户类型 | `Casement`, `Double Hung` |
| `grids` | Text | 格栅样式（可选） | `Colonial`, `Prairie` |
| `color` | Text | 颜色 | `White`, `Bronze` |
| `width` | Numeric | 宽度（英寸） | `36` |
| `height` | Numeric | 高度（英寸） | `48` |
| `quantity` | Integer | 数量 | `2` |
| `customer_email` | Text | 客户邮箱 | `customer@email.com` |
| `customer_phone` | Text | 客户电话 | `555-1234` |
| `status` | Text | 状态 | `pending`, `quoted`, `approved` |
| `quote_amount` | Numeric | 报价金额（可选） | `1500.00` |
| `notes` | Text | 备注（可选） | `客户要求加急` |

---

## 步骤 5: 常见问题排查

### ❌ 问题 1: "Failed to save to database"

**解决方案：**
1. 检查 `.env.local` 中的 Supabase 凭证是否正确
2. 确保已重启开发服务器
3. 在 Supabase 检查 RLS 策略是否正确设置

### ❌ 问题 2: "Row Level Security" 错误

**解决方案：**
确保执行了 SQL 中的 RLS 策略部分，特别是：
```sql
CREATE POLICY "Allow service role all" ON quotes
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);
```

### ❌ 问题 3: 数据插入成功但看不到记录

**解决方案：**
1. 刷新 Supabase Table Editor 页面
2. 检查 SQL Editor 中运行：
```sql
SELECT * FROM quotes ORDER BY created_at DESC LIMIT 10;
```

---

## 🎯 下一步：Phase 3 - Dashboard 统计

完成 Phase 2 后，我们将创建：
1. **Admin Dashboard** - 查看所有询价记录
2. **统计图表** - 按窗户类型、状态、时间统计
3. **数据导出** - 导出为 CSV/Excel
4. **状态管理** - 更新询价状态

---

## 📊 数据库架构图

```
quotes 表
├── id (UUID, Primary Key)
├── created_at (Timestamp)
├── updated_at (Timestamp)
├── 窗户配置
│   ├── material
│   ├── aluminum_category
│   ├── window_type
│   ├── grids
│   ├── color
│   ├── width
│   ├── height
│   └── quantity
├── 客户信息
│   ├── customer_email
│   └── customer_phone
└── 状态管理
    ├── status
    ├── quote_amount
    └── notes
```

---

## ✅ Phase 2 完成检查清单

- [ ] Supabase 项目已创建
- [ ] `quotes` 表已创建
- [ ] RLS 策略已配置
- [ ] 环境变量已设置
- [ ] 开发服务器已重启
- [ ] 测试提交成功
- [ ] 数据库中可以看到记录
- [ ] 邮件和数据库都正常工作

完成所有检查后，Phase 2 就完成了！🎉
