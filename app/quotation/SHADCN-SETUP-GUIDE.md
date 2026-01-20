# Shadcn/UI 重构版本 - 安装指南

## 📦 需要安装的依赖

### 1. 初始化 Shadcn/UI

```bash
# 在项目根目录运行
npx shadcn@latest init
```

初始化时选择以下配置：
- Style: **Default**
- Base color: **Slate** (或您喜欢的颜色)
- CSS variables: **Yes**

### 2. 安装所需组件

```bash
# 安装本页面使用的所有组件
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add progress
npx shadcn@latest add badge
```

### 3. 安装图标库

```bash
npm install lucide-react
```

---

## 📁 文件结构

安装完成后，您的项目结构应该类似：

```
your-project/
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       └── badge.tsx
├── lib/
│   └── utils.ts
├── app/
│   └── quotation/
│       └── page.tsx  ← 将 page-shadcn.tsx 重命名放这里
└── globals.css
```

---

## 🎨 自定义主题色

如果您想使用原来的绿色主题 (#738751)，可以修改 `globals.css`：

```css
@layer base {
  :root {
    --primary: 142 36% 42%;  /* 对应 #738751 */
    --primary-foreground: 0 0% 100%;
  }
}
```

或者使用 Shadcn 的主题生成器：https://ui.shadcn.com/themes

---

## 🔄 代码对比

### 之前（原生 Tailwind）
```tsx
<button className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 
  text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 
  hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 
  disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed 
  disabled:shadow-none flex items-center justify-center gap-2">
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>
```

### 之后（Shadcn/UI）
```tsx
<Button className="w-full" size="lg" disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      Submitting...
    </>
  ) : (
    <>
      <Send className="w-4 h-4 mr-2" />
      Submit Quote Request
    </>
  )}
</Button>
```

---

## ✅ 重构亮点

| 特性 | 原版 | Shadcn 版 |
|------|------|-----------|
| 代码行数 | ~600行 | ~550行 |
| className 长度 | 超长 | 简洁 |
| 组件复用 | 手动复制 | 语义化组件 |
| 主题切换 | 需重写 | CSS变量 |
| 深色模式 | 不支持 | 内置支持 |
| 可访问性 | 手动处理 | 内置 ARIA |

---

## 🚀 使用方法

1. 按照上面的步骤安装依赖
2. 将 `page-shadcn.tsx` 重命名为 `page.tsx`
3. 放到您的 `app/quotation/` 目录下
4. 运行 `npm run dev` 查看效果

---

## 💡 进阶建议

如果您想进一步优化，可以考虑：

1. **表单验证**: 使用 `react-hook-form` + `zod`
2. **状态管理**: 使用 `zustand` 管理复杂状态
3. **动画效果**: 使用 `framer-motion` 添加页面切换动画
4. **Toast 提示**: 添加 `npx shadcn@latest add toast`

有任何问题请随时问我！
