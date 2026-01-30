# 🔐 Supabase Auth 设置指南

## 目标
为 Dashboard 设置邮件+密码登录功能

---

## 步骤 1: 在 Supabase 启用邮件认证

### 1.1 访问 Authentication 设置

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 点击左侧 **🔐 Authentication**
4. 点击 **Providers**

### 1.2 配置 Email Provider

1. 找到 **Email** provider
2. 确保它是 **Enabled** (启用状态)
3. 配置选项：
   ```
   ✅ Enable Email provider
   ✅ Confirm email (可选 - 如果不需要邮箱验证可以关闭)
   ✅ Secure email change
   ```

4. 点击 **Save**

---

## 步骤 2: 创建管理员账户

### 2.1 在 Supabase 创建用户

1. 在 Supabase Dashboard，进入 **Authentication** → **Users**
2. 点击 **Add user** → **Create new user**
3. 填写信息：
   ```
   Email: your@email.com
   Password: [设置一个强密码]
   ☑️ Auto Confirm User (勾选 - 跳过邮箱验证)
   ```
4. 点击 **Create user**

### 2.2 保存凭证

**重要！** 记录你的登录信息：
```
Dashboard 登录邮箱: ___________________
Dashboard 登录密码: ___________________
```

---

## 步骤 3: 配置 RLS 策略（安全）

### 3.1 更新 quotes 表的 RLS 策略

在 Supabase **SQL Editor** 中执行：

```sql
-- 删除旧的匿名插入策略（如果存在）
DROP POLICY IF EXISTS "Allow anonymous insert" ON quotes;

-- 新策略：允许匿名用户插入（用于网站表单提交）
CREATE POLICY "Allow public insert" ON quotes
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- 策略：只有认证用户可以查看所有记录
DROP POLICY IF EXISTS "Allow authenticated read" ON quotes;
CREATE POLICY "Allow authenticated read" ON quotes
  FOR SELECT 
  TO authenticated
  USING (true);

-- 策略：只有认证用户可以更新记录
DROP POLICY IF EXISTS "Allow authenticated update" ON quotes;
CREATE POLICY "Allow authenticated update" ON quotes
  FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 策略：只有认证用户可以删除记录（可选）
DROP POLICY IF EXISTS "Allow authenticated delete" ON quotes;
CREATE POLICY "Allow authenticated delete" ON quotes
  FOR DELETE 
  TO authenticated
  USING (true);
```

### 3.2 验证策略

在 **Table Editor** 中：
1. 点击 `quotes` 表
2. 点击右上角的 **⚙️** → **View Policies**
3. 确认有以下策略：
   - ✅ Allow public insert
   - ✅ Allow authenticated read
   - ✅ Allow authenticated update
   - ✅ Allow authenticated delete (可选)

---

## 步骤 4: 测试认证

### 4.1 在 Supabase 测试登录

在 Supabase **SQL Editor** 中运行：

```sql
-- 查看所有用户
SELECT id, email, created_at, confirmed_at 
FROM auth.users;
```

应该能看到你刚创建的管理员账户。

---

## 步骤 5: 配置邮件模板（可选）

如果你想自定义登录/重置密码邮件：

1. 进入 **Authentication** → **Email Templates**
2. 可以自定义以下模板：
   - Confirm signup (确认注册)
   - Magic Link (魔法链接登录)
   - Change Email Address (更改邮箱)
   - Reset Password (重置密码)

**暂时可以跳过**，使用默认模板即可。

---

## 步骤 6: 环境变量（已完成）

你的 `.env.local` 已经包含了必要的配置：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://oqpmetmwrrvbrfynevuy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_QEYlBg0YREJuI7ny7KJ4pA_blp1A457
```

**无需修改！** ✅

---

## 🧪 测试清单

完成以下步骤后，Auth 就设置好了：

- [ ] Email provider 已启用
- [ ] 管理员账户已创建（记录了邮箱和密码）
- [ ] RLS 策略已更新
- [ ] 在 SQL Editor 中能看到用户记录

---

## 🎯 下一步

Auth 设置完成后，我会开发：

1. **登录页面** (`/dashboard/login`)
   - 邮箱 + 密码输入框
   - 登录按钮
   - 错误提示

2. **Dashboard 主页** (`/dashboard`)
   - 检查登录状态
   - 未登录 → 重定向到登录页
   - 已登录 → 显示 Dashboard

3. **登出功能**
   - 顶部导航栏的"登出"按钮

---

## ❓ 常见问题

### Q1: 忘记密码怎么办？
**A**: 在 Supabase Dashboard → Authentication → Users，找到用户，点击 **⋮** → **Reset Password**

### Q2: 需要添加更多管理员怎么办？
**A**: 在 Authentication → Users，点击 **Add user**，重复步骤 2.1

### Q3: 可以禁用邮箱验证吗？
**A**: 可以。在 Authentication → Providers → Email，取消勾选 "Confirm email"

---

## ✅ 准备好了吗？

完成上述步骤后，告诉我：
```
✅ Email provider 已启用
✅ 管理员账户已创建
✅ RLS 策略已更新
```

然后我就开始开发 Dashboard！🚀
