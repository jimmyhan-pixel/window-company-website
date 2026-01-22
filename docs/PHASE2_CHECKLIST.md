# ✅ Phase 2 设置清单（用户名+密码版本）

## 🎯 目标
在 Supabase 创建数据库表，配置简单的用户名+密码登录

---

## 📝 操作步骤

### Step 1: 登录 Supabase（1 分钟）

1. 访问: https://supabase.com/dashboard
2. 登录你的账户
3. 选择你的项目（或创建新项目）

---

### Step 2: 创建 quotes 表（3 分钟）

#### 2.1 打开 SQL Editor
- 点击左侧菜单 **🔧 SQL Editor**
- 点击 **+ New query**

#### 2.2 复制并执行 SQL

**复制下面的完整 SQL**（从 `--` 开始到最后）：

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
  material TEXT NOT NULL,
  aluminum_category TEXT,
  window_type TEXT NOT NULL,
  grids TEXT,
  color TEXT NOT NULL,
  width NUMERIC NOT NULL CHECK (width > 0),
  height NUMERIC NOT NULL CHECK (height > 0),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  
  -- 客户联系信息
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  
  -- 状态管理
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'quoted', 'closed')),
  
  -- 可选字段
  quote_amount NUMERIC CHECK (quote_amount >= 0),
  notes TEXT,
  customer_name TEXT
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_customer_email ON quotes(customer_email);

-- 自动更新 updated_at
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

-- 启用 Row Level Security
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- RLS 策略
DROP POLICY IF EXISTS "Allow public insert" ON quotes;
DROP POLICY IF EXISTS "Allow public read" ON quotes;
DROP POLICY IF EXISTS "Allow public update" ON quotes;
DROP POLICY IF EXISTS "Allow public delete" ON quotes;

-- 允许公开插入（网站表单提交）
CREATE POLICY "Allow public insert" ON quotes
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- 允许公开读取（Dashboard 会用 anon key 访问）
CREATE POLICY "Allow public read" ON quotes
  FOR SELECT 
  TO public
  USING (true);

-- 允许公开更新（Dashboard 会用 anon key 访问）
CREATE POLICY "Allow public update" ON quotes
  FOR UPDATE 
  TO public
  USING (true)
  WITH CHECK (true);

-- 允许公开删除（Dashboard 会用 anon key 访问）
CREATE POLICY "Allow public delete" ON quotes
  FOR DELETE 
  TO public
  USING (true);
```

#### 2.3 执行 SQL
- 粘贴到 SQL Editor
- 点击右下角 **Run** ▶️ 按钮
- 等待执行完成（应该显示 "Success"）

---

### Step 3: 验证表创建（1 分钟）

#### 3.1 查看表
- 点击左侧 **🗄️ Table Editor**
- 应该能看到 `quotes` 表

#### 3.2 检查字段
点击 `quotes` 表，确认有以下字段：
- ✅ id
- ✅ created_at
- ✅ updated_at
- ✅ material
- ✅ window_type
- ✅ color
- ✅ width, height, quantity
- ✅ customer_email, customer_phone
- ✅ status
- ✅ notes

---

### Step 4: 配置登录凭证（1 分钟）

#### 4.1 打开 `.env.local` 文件

文件已自动更新，包含：

```bash
# Dashboard 登录凭证（修改为你想要的用户名和密码）
DASHBOARD_USERNAME=admin
DASHBOARD_PASSWORD=your_secure_password_here
```

#### 4.2 修改密码

**重要！** 将 `your_secure_password_here` 改为你的强密码：

```bash
DASHBOARD_USERNAME=admin
DASHBOARD_PASSWORD=MySecurePassword123!
```

**保存文件后，记住你的登录信息：**
```
Dashboard 用户名: admin
Dashboard 密码: [你设置的密码]
```

---

### Step 5: 测试数据库连接（1 分钟）

在终端运行测试脚本：

```bash
node scripts/test-supabase.js
```

**预期结果**：
```
✅ Connection successful!
📝 Found 0 quote(s) in database
ℹ️  No quotes yet. Submit a quote through the website to test!
✅ Supabase is ready for Phase 2!
```

---

### Step 6: 测试表单提交（2 分钟）

#### 6.1 访问网站
- 确保开发服务器在运行: `npm run dev`
- 访问: http://localhost:3000/quotation

#### 6.2 提交测试询价
填写表单并提交，检查：
- ✅ 收到邮件（公司邮箱）
- ✅ 收到邮件（客户确认邮件）

#### 6.3 验证数据保存
- 回到 Supabase **Table Editor**
- 点击 `quotes` 表
- 应该能看到刚提交的记录 ✅

或者运行：
```bash
node scripts/test-supabase.js
```

应该显示：
```
✅ Connection successful!
📝 Found 1 quote(s) in database

Latest quotes:
1. Quote #xxxxxxxx...
   Window: Casement (Vinyl)
   ...
```

---

## ✅ Phase 2 完成检查清单

完成以下所有项目，Phase 2 就完成了：

- [ ] Supabase 项目已创建/选择
- [ ] `quotes` 表已创建（在 Table Editor 中可见）
- [ ] RLS 策略已配置
- [ ] Dashboard 用户名和密码已设置（在 `.env.local`）
- [ ] 测试脚本通过（`node scripts/test-supabase.js`）
- [ ] 表单提交成功（数据库中有记录）

---

## 🎉 完成后

当所有检查项都完成后，告诉我：

```
✅ Phase 2 完成！
- quotes 表已创建
- 登录凭证已设置
- 测试提交成功
```

然后我们立即开始 **Phase 3: Dashboard 开发**！🚀

---

## 🔐 登录方式说明

### 使用用户名+密码登录

Dashboard 登录页面将显示：

```
┌─────────────────────────┐
│   Dashboard Login       │
├─────────────────────────┤
│ 用户名: [admin      ]   │
│ 密码:   [••••••••••]    │
│                         │
│      [登录]             │
└─────────────────────────┘
```

**验证方式**：
- 输入的用户名和密码与 `.env.local` 中的配置对比
- 匹配成功 → 创建 session，进入 Dashboard
- 匹配失败 → 显示错误提示

**安全性**：
- ✅ 密码存储在服务器端（`.env.local`）
- ✅ 使用 session 管理登录状态
- ✅ 30 分钟自动登出
- ⚠️ 适合个人使用，不适合多用户场景

---

## ❓ 遇到问题？

### 问题 1: SQL 执行失败
**解决**：
- 检查是否有语法错误
- 尝试分段执行（先执行 CREATE TABLE，再执行其他部分）

### 问题 2: 测试脚本显示 "Table does not exist"
**解决**：
- 确认在 Table Editor 中能看到 `quotes` 表
- 检查表名是否正确（小写）

### 问题 3: 表单提交后数据库没有记录
**解决**：
- 检查浏览器控制台是否有错误
- 查看 API 路由日志
- 确认 RLS 策略已正确设置（允许 public 访问）

---

## 📝 与原方案的区别

| 项目 | 原方案（邮箱+密码） | 新方案（用户名+密码） |
|------|-------------------|---------------------|
| 认证方式 | Supabase Auth | 环境变量验证 |
| 用户管理 | 可以多用户 | 单一管理员 |
| 设置复杂度 | 需要配置 Auth | 只需设置环境变量 |
| 登录界面 | 邮箱 + 密码 | 用户名 + 密码 |
| 安全性 | 高（Supabase 管理） | 中（适合个人使用） |

---

**准备好了吗？开始设置！** 💪
