# 🎯 Phase 2 快速开始指南

## ✅ 你已经完成的工作

1. ✅ 安装了 `@supabase/supabase-js` 依赖
2. ✅ 创建了 `lib/supabase.ts` 客户端
3. ✅ 在 API 路由中添加了数据库保存逻辑
4. ✅ 配置了环境变量

## 🚀 接下来要做的 3 步

### 步骤 1️⃣: 在 Supabase 创建数据库表

1. 打开 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 点击左侧 **SQL Editor**
4. 点击 **New query**
5. 复制粘贴 `docs/SUPABASE_SETUP.md` 中的完整 SQL
6. 点击 **Run** ▶️

**SQL 文件位置**: `/Users/hh/project/window-company-website/docs/SUPABASE_SETUP.md`

### 步骤 2️⃣: 测试数据库连接

在终端运行：

```bash
# 测试 Supabase 连接
node scripts/test-supabase.js
```

**预期结果**:
```
✅ Connection successful!
📝 Found 0 quote(s) in database
ℹ️  No quotes yet. Submit a quote through the website to test!
```

### 步骤 3️⃣: 测试完整流程

```bash
# 启动开发服务器
npm run dev
```

然后：
1. 访问 `http://localhost:3000/quotation`
2. 填写表单并提交
3. 检查：
   - ✅ 收到邮件
   - ✅ Supabase Table Editor 中看到新记录

---

## 📋 检查清单

完成以下所有项目即完成 Phase 2：

- [ ] **Supabase 表已创建** - 在 Supabase Dashboard 的 Table Editor 中能看到 `quotes` 表
- [ ] **测试脚本通过** - `node scripts/test-supabase.js` 显示连接成功
- [ ] **表单提交成功** - 提交后能在数据库中看到记录
- [ ] **邮件正常发送** - 公司和客户都收到邮件
- [ ] **数据完整保存** - 所有字段都正确保存到数据库

---

## 🔍 验证数据库记录

### 方法 1: Supabase Dashboard
1. 进入 **Table Editor**
2. 点击 `quotes` 表
3. 查看所有记录

### 方法 2: SQL 查询
在 SQL Editor 中运行：
```sql
SELECT * FROM quotes ORDER BY created_at DESC LIMIT 10;
```

### 方法 3: 测试脚本
```bash
node scripts/test-supabase.js
```

---

## 🎯 Phase 3 预告：Dashboard 统计

完成 Phase 2 后，我们将创建：

1. **📊 Dashboard 页面** (`/dashboard`)
   - 查看所有询价记录
   - 实时统计数据
   - 状态筛选和搜索

2. **📈 数据可视化**
   - 按窗户类型统计
   - 按时间趋势分析
   - 按状态分布图表

3. **⚙️ 管理功能**
   - 更新询价状态
   - 添加报价金额
   - 导出数据为 CSV

---

## ❓ 遇到问题？

### 问题 1: "Table 'quotes' does not exist"
**解决**: 确保在 Supabase SQL Editor 中执行了完整的建表 SQL

### 问题 2: "Row Level Security" 错误
**解决**: 检查 RLS 策略是否正确设置（见 `docs/SUPABASE_SETUP.md`）

### 问题 3: 环境变量未生效
**解决**: 
1. 确认 `.env.local` 文件存在
2. 重启开发服务器 (`npm run dev`)

---

## 📚 相关文档

- **完整设置指南**: `docs/SUPABASE_SETUP.md`
- **测试脚本**: `scripts/test-supabase.js`
- **API 路由**: `app/api/quote/submit/route.ts`
- **Supabase 客户端**: `lib/supabase.ts`

---

**准备好了吗？开始 Phase 2！** 🚀
