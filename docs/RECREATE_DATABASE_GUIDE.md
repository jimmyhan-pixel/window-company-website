# 🗄️ 重新创建数据库 - 操作指南

## 📋 步骤

### Step 1: 删除旧表（在 Supabase）

1. 打开 Supabase Dashboard
2. 进入 **SQL Editor**
3. 执行以下 SQL：

```sql
-- 删除旧表
DROP TABLE IF EXISTS quotes CASCADE;
DROP TABLE IF EXISTS page_views CASCADE;

-- 删除旧函数
DROP FUNCTION IF EXISTS generate_quote_number() CASCADE;
DROP FUNCTION IF EXISTS set_quote_number() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- 删除旧视图
DROP VIEW IF EXISTS view_total_page_views CASCADE;
DROP VIEW IF EXISTS view_monthly_page_views CASCADE;
```

### Step 2: 创建新表

1. 打开文件: `docs/COMPLETE_DATABASE_SETUP.sql`
2. 复制**完整的 SQL 内容**
3. 在 Supabase SQL Editor 中粘贴
4. 点击 **Run** ▶️

### Step 3: 验证

执行完成后，你应该看到：

```
✅ quotes 表已创建
✅ page_views 表已创建
✅ 触发器已创建
✅ RLS 策略已设置
```

在 **Table Editor** 中应该能看到两个表：
- `quotes`
- `page_views`

---

## 🧪 测试

### 1. 测试数据库连接

```bash
node scripts/test-supabase.js
```

应该显示：
```
✅ Connection successful!
📝 Found 0 quote(s) in database
```

### 2. 测试提交询价

1. 访问: http://localhost:3000/quotation
2. 填写表单并提交
3. 应该收到邮件
4. 再次运行测试脚本：

```bash
node scripts/test-supabase.js
```

应该显示：
```
✅ Connection successful!
📝 Found 1 quote(s) in database

Latest quotes:
1. Quote #20260122-001
   Window: Casement (Vinyl)
   Size: 36" × 48"
   Quantity: 2
   ...
```

### 3. 测试 Dashboard

1. 访问: http://localhost:3000/dashboard/login
2. 登录（用户名: admin, 密码: admin）
3. 应该看到：
   - 3 个统计卡片
   - 询价列表（显示刚提交的询价）
   - 图片管理标签

---

## 📊 数据库结构

### quotes 表
```
id                  UUID (主键)
created_at          TIMESTAMP (自动)
updated_at          TIMESTAMP (自动)
quote_number        TEXT (自动生成: #20260122-001)
material            TEXT
aluminum_category   TEXT
window_type         TEXT
grids               TEXT
color               TEXT
width               NUMERIC
height              NUMERIC
quantity            INTEGER
customer_email      TEXT
customer_phone      TEXT
customer_name       TEXT
```

### page_views 表
```
id          UUID (主键)
page_path   TEXT (默认 '/')
viewed_at   TIMESTAMP (自动)
user_agent  TEXT
ip_address  TEXT
```

---

## ✅ 功能清单

- ✅ 自动生成询价编号（格式：#20260122-001）
- ✅ 自动更新时间戳
- ✅ 访问量统计
- ✅ RLS 安全策略
- ✅ 统计视图（方便查询）

---

## 🎯 完成后

一切应该正常工作：
- ✅ 提交询价 → 保存到数据库
- ✅ Dashboard 显示询价列表
- ✅ 询价 ID 格式：#20260122-001
- ✅ 不显示客户信息
- ✅ 访问量统计（需要后续实现前端记录）

---

**现在去 Supabase 执行 SQL！** 🚀
