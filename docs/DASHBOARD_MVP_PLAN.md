# 🚀 Dashboard MVP 开发计划

## 📋 MVP 功能清单

基于你的选择，第一版 Dashboard 包含：

### ✅ 核心功能
1. **邮件+密码登录** (Supabase Auth)
2. **顶部统计卡片** (4 个)
3. **询价列表** (表格视图)
4. **状态筛选** (New / Quoted / Closed)
5. **更新状态** (点击更新)
6. **查看详情** (侧边栏)

### 🔜 后续迭代功能
- 搜索功能（搜索邮箱/电话）
- 添加备注
- 日期范围筛选
- 数据导出（CSV）
- 统计图表

---

## 🏗️ 技术架构

```
/app
├── /dashboard
│   ├── layout.tsx          # Dashboard 布局（检查登录状态）
│   ├── page.tsx            # Dashboard 主页
│   └── /login
│       └── page.tsx        # 登录页面
│
├── /api
│   └── /quotes
│       ├── route.ts        # GET 获取所有询价
│       └── /[id]
│           └── route.ts    # PATCH 更新单条询价
│
└── /components
    └── /dashboard
        ├── StatsCards.tsx      # 统计卡片
        ├── QuoteTable.tsx      # 询价列表表格
        ├── StatusFilter.tsx    # 状态筛选按钮
        ├── QuoteDetails.tsx    # 详情侧边栏
        └── UpdateStatusModal.tsx # 更新状态弹窗
```

---

## 📊 数据流程

### 1. 登录流程
```
用户访问 /dashboard
    ↓
检查登录状态 (useEffect)
    ↓
未登录 → 重定向到 /dashboard/login
    ↓
输入邮箱密码 → Supabase Auth 验证
    ↓
登录成功 → 重定向到 /dashboard
```

### 2. Dashboard 数据加载
```
Dashboard 页面加载
    ↓
调用 Supabase 查询
    ↓
SELECT * FROM quotes ORDER BY created_at DESC
    ↓
计算统计数据（按 status 分组）
    ↓
渲染统计卡片 + 表格
```

### 3. 筛选流程
```
用户点击"新询价"卡片
    ↓
设置筛选状态: filter = 'new'
    ↓
重新查询: WHERE status = 'new'
    ↓
更新表格显示
```

### 4. 更新状态流程
```
用户点击 "⋮" → "更新状态"
    ↓
打开弹窗，选择新状态
    ↓
调用 API: PATCH /api/quotes/[id]
    ↓
Supabase: UPDATE quotes SET status = 'quoted' WHERE id = ...
    ↓
刷新数据，关闭弹窗
```

---

## 🎨 UI 组件设计

### 1. 登录页面 (`/dashboard/login`)

```tsx
<div className="min-h-screen flex items-center justify-center">
  <div className="card w-96">
    <h1>Dashboard Login</h1>
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
    </form>
    {error && <p className="error">{error}</p>}
  </div>
</div>
```

### 2. 统计卡片

```tsx
<div className="grid grid-cols-4 gap-4">
  <StatCard
    icon="📩"
    title="新询价"
    value={12}
    subtitle="+3 今天"
    color="amber"
    onClick={() => setFilter('new')}
  />
  <StatCard
    icon="📧"
    title="已报价"
    value={8}
    subtitle="待跟进"
    color="blue"
    onClick={() => setFilter('quoted')}
  />
  <StatCard
    icon="✅"
    title="已成交"
    value={3}
    subtitle="本月"
    color="green"
    onClick={() => setFilter('closed')}
  />
  <StatCard
    icon="📈"
    title="转化率"
    value="25%"
    subtitle="本月"
    color="purple"
  />
</div>
```

### 3. 状态筛选

```tsx
<div className="flex gap-2">
  <button 
    className={filter === 'all' ? 'active' : ''}
    onClick={() => setFilter('all')}
  >
    全部
  </button>
  <button 
    className={filter === 'new' ? 'active' : ''}
    onClick={() => setFilter('new')}
  >
    🟡 新询价
  </button>
  <button 
    className={filter === 'quoted' ? 'active' : ''}
    onClick={() => setFilter('quoted')}
  >
    🔵 已报价
  </button>
  <button 
    className={filter === 'closed' ? 'active' : ''}
    onClick={() => setFilter('closed')}
  >
    🟢 已关闭
  </button>
</div>
```

### 4. 询价列表表格

```tsx
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>客户信息</th>
      <th>窗户配置</th>
      <th>状态</th>
      <th>时间</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    {quotes.map(quote => (
      <tr key={quote.id} onClick={() => setSelectedQuote(quote)}>
        <td>#{quote.id.slice(0, 8)}</td>
        <td>
          <div>{quote.customer_email}</div>
          <div className="text-sm">{quote.customer_phone}</div>
        </td>
        <td>
          <div>{quote.window_type} ({quote.material})</div>
          <div className="text-sm">
            {quote.width}" × {quote.height}" × {quote.quantity}
          </div>
        </td>
        <td>
          <StatusBadge status={quote.status} />
        </td>
        <td>{formatRelativeTime(quote.created_at)}</td>
        <td>
          <DropdownMenu quote={quote} />
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

### 5. 详情侧边栏

```tsx
<aside className={`sidebar ${selectedQuote ? 'open' : ''}`}>
  <div className="sidebar-header">
    <h2>询价详情 #{selectedQuote?.id.slice(0, 8)}</h2>
    <button onClick={() => setSelectedQuote(null)}>×</button>
  </div>
  
  <div className="sidebar-content">
    <section>
      <h3>📅 提交时间</h3>
      <p>{formatDateTime(selectedQuote?.created_at)}</p>
    </section>
    
    <section>
      <h3>👤 客户信息</h3>
      <p>📧 {selectedQuote?.customer_email}</p>
      <p>📞 {selectedQuote?.customer_phone}</p>
    </section>
    
    <section>
      <h3>🪟 窗户配置</h3>
      <p>类型: {selectedQuote?.window_type}</p>
      <p>材料: {selectedQuote?.material}</p>
      <p>颜色: {selectedQuote?.color}</p>
      <p>尺寸: {selectedQuote?.width}" × {selectedQuote?.height}"</p>
      <p>数量: {selectedQuote?.quantity}</p>
    </section>
    
    <section>
      <h3>💼 业务信息</h3>
      <p>状态: <StatusBadge status={selectedQuote?.status} /></p>
      <button onClick={() => setShowUpdateModal(true)}>
        更新状态
      </button>
    </section>
  </div>
</aside>
```

---

## 🔐 认证逻辑

### Supabase Client 配置

```typescript
// lib/supabase-client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()
```

### 登录页面逻辑

```typescript
const handleLogin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    setError(error.message)
    return
  }
  
  router.push('/dashboard')
}
```

### Dashboard 保护

```typescript
// app/dashboard/layout.tsx
useEffect(() => {
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      router.push('/dashboard/login')
    }
  }
  
  checkAuth()
}, [])
```

---

## 📦 需要安装的依赖

```bash
npm install @supabase/auth-helpers-nextjs
npm install date-fns  # 用于时间格式化
```

---

## 🎯 开发步骤

### Phase 3.1.1 - 认证基础（30 分钟）
- [ ] 创建 Supabase Auth 客户端
- [ ] 创建登录页面
- [ ] 实现登录逻辑
- [ ] 实现 Dashboard 路由保护

### Phase 3.1.2 - 数据获取（30 分钟）
- [ ] 创建 API 路由获取询价列表
- [ ] 实现数据查询和筛选
- [ ] 计算统计数据

### Phase 3.1.3 - UI 组件（1 小时）
- [ ] 创建统计卡片组件
- [ ] 创建状态筛选组件
- [ ] 创建询价列表表格
- [ ] 创建详情侧边栏

### Phase 3.1.4 - 更新功能（30 分钟）
- [ ] 创建更新状态 API
- [ ] 创建更新状态弹窗
- [ ] 实现状态更新逻辑

### Phase 3.1.5 - 样式优化（30 分钟）
- [ ] 应用品牌配色
- [ ] 响应式调整
- [ ] 交互动画

---

## ✅ 完成标准

MVP 完成后，你应该能够：

1. ✅ 使用邮箱+密码登录 Dashboard
2. ✅ 看到 4 个统计卡片（新询价、已报价、已成交、转化率）
3. ✅ 在表格中看到所有询价记录
4. ✅ 点击状态筛选按钮，筛选不同状态的询价
5. ✅ 点击询价记录，在侧边栏查看详情
6. ✅ 更新询价状态（new → quoted → closed）
7. ✅ 点击"登出"按钮退出登录

---

## 🚀 准备开始

在开始开发前，请确认：

### ✅ Supabase 设置完成
- [ ] `quotes` 表已创建
- [ ] RLS 策略已配置
- [ ] 管理员账户已创建
- [ ] Email Auth 已启用

### ✅ 环境变量配置
- [ ] `NEXT_PUBLIC_SUPABASE_URL` 已设置
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 已设置

---

**准备好了吗？告诉我可以开始，我就立即开发 Dashboard！** 🚀
