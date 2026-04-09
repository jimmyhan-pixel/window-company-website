# 📦 Phase 4: 图片上传功能设置指南

## 🎯 目标

实现完整的图片上传、预览和管理功能。

---

## 📋 Step 1: 在 Supabase 创建 Storage Bucket

### **1.1 打开 Supabase Dashboard**
1. 访问: https://supabase.com/dashboard
2. 选择你的项目

### **1.2 创建 Storage Bucket**
1. 点击左侧菜单 **Storage**
2. 点击 **New bucket**
3. 填写信息：
   ```
   Name: product-images
   Public bucket: ✅ 勾选（允许公开访问）
   ```
4. 点击 **Create bucket**

### **1.3 设置 Storage 策略**

在 SQL Editor 中执行以下 SQL：

```sql
-- 先清理可能存在的宽松策略
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;

-- 只允许公开读取这个 bucket 里的图片
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );
```

**注意**:
- 我们现在通过服务器端 API + `SUPABASE_SERVICE_ROLE_KEY` 上传和删除图片
- 所以 **不要** 再给 `anon` 或 `authenticated` 开放 `INSERT / UPDATE / DELETE` 策略
- bucket 仍然保持 `Public`，这样产品展示页可以直接读取图片

### **1.4 获取 Service Role Key**

1. 在 Supabase Dashboard，点击 **Settings** → **API**
2. 找到 **Service Role Key**（secret）
3. 复制这个 key

### **1.5 添加到 .env.local**

```bash
# 添加这一行（保持其他配置不变）
SUPABASE_SERVICE_ROLE_KEY=你的_service_role_key
```

---

## ✅ 验证

在 Supabase Dashboard 的 Storage 中，你应该看到：
- ✅ `product-images` bucket 已创建
- ✅ Public bucket 已启用

---

## 🎯 完成后

告诉我你已经完成了 Step 1，我会继续实现上传功能的代码！

---

## 📝 为什么需要 Service Role Key？

因为我们的认证系统是简单的用户名+密码（存在 session 中），不是 Supabase Auth。

**两种方案**：

### **方案 A: 使用 Service Role Key（推荐）**
- 在服务器端 API 中使用
- 绕过 RLS 策略
- 更安全（key 不暴露给客户端）
- 公开网站只能读图片，不能直接写入或删除

### **方案 B: 修改 RLS 策略为公开**
```sql
-- 允许任何人上传（不推荐）
CREATE POLICY "Public upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-images' );
```

**我们使用方案 A**，更安全！

---

**准备好后告诉我，我会继续下一步！** 🚀
