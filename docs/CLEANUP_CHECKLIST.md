# 🧹 项目清理清单

## 📋 待清理项目

### ❌ 需要删除的文件

#### **1. API 路由**
- [ ] `app/api/dashboard/quotes/[id]/route.ts`
  - **原因**: Dashboard 已简化为只读，不需要更新功能
  - **影响**: 无，这个 API 未被使用

#### **2. 临时文件**
- [ ] `cookies.txt`
  - **原因**: 测试时创建的临时文件
  - **影响**: 无

---

### 📦 需要归档的文档

移动到 `docs/archive/`:

- [ ] `docs/DASHBOARD_DESIGN.md`
- [ ] `docs/DASHBOARD_MVP_PLAN.md`
- [ ] `docs/PHASE2_QUICKSTART.md`
- [ ] `docs/PHASE3_COMPLETE.md`
- [ ] `docs/SUPABASE_AUTH_SETUP.md`
- [ ] `docs/DATABASE_UPDATE.md`
- [ ] `docs/FIX_QUOTE_SAVE.md`
- [ ] `docs/LOGIN_FIX.md`
- [ ] `docs/QUOTE_SUBMIT_FIX.md`

**原因**: 这些是开发过程中的临时文档，已被新文档替代

---

### ⚠️ 可选删除

#### **组件**
- [ ] `components/dashboard/StatusBadge.tsx`
  - **原因**: Dashboard 不再使用 status 功能
  - **建议**: 如果将来可能恢复 status 功能，可以保留

---

## 🚀 执行清理

### **方法 1: 自动清理（推荐）**

```bash
# 给脚本执行权限
chmod +x scripts/cleanup.sh

# 运行清理脚本
./scripts/cleanup.sh
```

### **方法 2: 手动清理**

```bash
# 删除 API 文件
rm app/api/dashboard/quotes/[id]/route.ts
rmdir app/api/dashboard/quotes/[id]

# 创建归档目录
mkdir -p docs/archive

# 移动文档
mv docs/DASHBOARD_DESIGN.md docs/archive/
mv docs/DASHBOARD_MVP_PLAN.md docs/archive/
mv docs/PHASE2_QUICKSTART.md docs/archive/
mv docs/PHASE3_COMPLETE.md docs/archive/
mv docs/SUPABASE_AUTH_SETUP.md docs/archive/
mv docs/DATABASE_UPDATE.md docs/archive/
mv docs/FIX_QUOTE_SAVE.md docs/archive/
mv docs/LOGIN_FIX.md docs/archive/
mv docs/QUOTE_SUBMIT_FIX.md docs/archive/

# 删除临时文件
rm cookies.txt

# 可选：删除 StatusBadge
# rm components/dashboard/StatusBadge.tsx
```

---

## ✅ 清理后验证

### **1. 检查项目结构**
```bash
# 查看 docs 目录
ls docs/

# 应该看到:
# - COMPLETE_DATABASE_SETUP.sql
# - DASHBOARD_SIMPLIFIED_COMPLETE.md
# - IMAGE_MANAGER_UPDATED.md
# - PHASE2_CHECKLIST.md
# - PROJECT_ANALYSIS.md
# - RECREATE_DATABASE_GUIDE.md
# - SUPABASE_SETUP.md
# - archive/
```

### **2. 测试功能**
```bash
# 启动开发服务器
npm run dev

# 测试以下功能:
# ✅ 提交询价
# ✅ 登录 Dashboard
# ✅ 查看询价列表
# ✅ 查看统计数据
# ✅ 图片管理界面
```

### **3. 检查控制台**
- ❌ 不应该有错误
- ❌ 不应该有 404 请求

---

## 📊 清理前后对比

### **清理前**
```
docs/
├── 14 个文档（包含过时文档）
├── 混乱，难以找到当前文档

app/api/dashboard/quotes/
├── route.ts (使用中)
└── [id]/route.ts (未使用)
```

### **清理后**
```
docs/
├── 7 个当前文档
├── archive/ (9 个过时文档)
└── 清晰，易于维护

app/api/dashboard/quotes/
└── route.ts (使用中)
```

---

## 🎯 清理的好处

1. **更清晰的项目结构**
   - 只保留必要文件
   - 文档易于查找

2. **减少混淆**
   - 没有过时信息
   - 没有未使用的代码

3. **更易维护**
   - 代码库更小
   - 更容易理解

4. **更快的开发**
   - 不会被旧代码干扰
   - 文档准确可靠

---

## ⏰ 建议清理时机

**现在清理**，如果：
- ✅ 所有功能已测试通过
- ✅ 确定不需要旧的 status 功能
- ✅ 数据库已正确设置

**稍后清理**，如果：
- ⚠️ 还在测试功能
- ⚠️ 可能需要参考旧文档
- ⚠️ 不确定是否需要某些文件

---

## 📝 清理后的项目状态

### **核心文件**
```
✅ config/products.ts              - 产品配置
✅ app/dashboard/                  - Dashboard 页面
✅ components/dashboard/           - Dashboard 组件
✅ app/api/                        - API 路由（7个）
✅ docs/                           - 当前文档（7个）
✅ docs/archive/                   - 归档文档（9个）
```

### **文档结构**
```
docs/
├── COMPLETE_DATABASE_SETUP.sql       - 数据库 SQL
├── DASHBOARD_SIMPLIFIED_COMPLETE.md  - Dashboard 文档
├── IMAGE_MANAGER_UPDATED.md          - 图片管理说明
├── PHASE2_CHECKLIST.md               - Phase 2 清单
├── PROJECT_ANALYSIS.md               - 项目分析
├── RECREATE_DATABASE_GUIDE.md        - 数据库指南
├── SUPABASE_SETUP.md                 - Supabase 设置
└── archive/                          - 归档文档
    ├── DASHBOARD_DESIGN.md
    ├── DASHBOARD_MVP_PLAN.md
    ├── ... (7 个其他文档)
```

---

**准备好清理时，运行 `./scripts/cleanup.sh` 即可！** 🚀
