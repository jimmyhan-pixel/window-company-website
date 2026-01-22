# City Windows - 门窗公司网站

一个现代化的门窗公司网站,提供产品展示、在线报价和客户联系功能。

## 项目简介

这是一个基于 Next.js 14+ 构建的门窗公司展示和报价网站,采用 App Router 架构,提供流畅的用户体验和强大的功能。

## 主要功能

### 🏠 首页 (`/`)
- 现代化的响应式设计
- 产品特色展示
- 公司介绍和服务亮点
- 快速导航到报价和产品页面

### 🪟 产品展示 (`/products`)
- 多种门窗类型展示
- 详细的产品规格说明
- 产品图片和特性介绍

### 💰 在线报价系统 (`/quotation`)
- **交互式窗户预览**:实时可视化窗户配置
- **多种窗户类型**:支持9种窗户类型
  - Picture Window (固定窗)
  - Casement Window (平开窗)
  - Awning Window (上悬窗)
  - Hopper Window (下悬窗)
  - Double Hung Window (双悬窗)
  - Two-Lite Slider (双扇推拉窗)
  - Three-Lite Slider (三扇推拉窗)
  - Bay Window (凸窗)
  - Bow Window (弓形窗)
- **材料选择**:Vinyl(乙烯基)和 Aluminum(铝合金)
- **网格样式**:5种网格样式可选
- **颜色定制**:实时颜色预览
- **尺寸配置**:自定义宽度和高度
- **数量选择**:批量报价支持
- **邮件通知**:自动发送报价请求到公司邮箱

### 📧 联系我们 (`/contact`)
- 客户咨询表单
- 公司联系信息

### 📊 管理后台 (`/dashboard`)
- 报价管理(开发中)
- 客户信息管理(开发中)

## 技术栈

### 前端框架
- **Next.js 16.1.3** - React 框架,App Router
- **React 19.2.3** - UI 库
- **TypeScript** - 类型安全

### UI 组件
- **Tailwind CSS 4** - 样式框架
- **Radix UI** - 无障碍组件库
  - @radix-ui/react-label
  - @radix-ui/react-progress
  - @radix-ui/react-slot
- **Lucide React** - 图标库
- **shadcn/ui** - UI 组件系统

### 后端服务
- **Resend** - 邮件发送服务
- **Next.js API Routes** - 后端 API

### 开发工具
- **ESLint** - 代码检查
- **PostCSS** - CSS 处理
- **Babel React Compiler** - React 编译优化

## 项目结构

```
window-company-website/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 首页
│   ├── layout.tsx                # 全局布局
│   ├── globals.css               # 全局样式
│   ├── api/                      # API 路由
│   │   └── quote/
│   │       └── submit/route.ts   # 报价提交 API
│   ├── products/                 # 产品页面
│   ├── quotation/                # 报价页面
│   │   ├── page.tsx              # 报价主页面
│   │   └── SHADCN-SETUP-GUIDE.md # Shadcn 配置指南
│   ├── contact/                  # 联系页面
│   ├── dashboard/                # 管理后台
│   └── login/                    # 登录页面
├── components/                   # React 组件
│   ├── ui/                       # UI 基础组件
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   └── ...
│   └── window-preview/           # 窗户预览组件
│       ├── index.ts              # 导出文件
│       ├── types.tsx             # 类型定义
│       ├── windows/              # 窗户类型组件
│       │   ├── PictureWindow.tsx
│       │   ├── CasementWindow.tsx
│       │   ├── AwningWindow.tsx
│       │   ├── HopperWindow.tsx
│       │   ├── DoubleHungWindow.tsx
│       │   ├── TwoLiteSliderWindow.tsx
│       │   ├── ThreeLiteSliderWindow.tsx
│       │   ├── BayWindow.tsx
│       │   └── BowWindow.tsx
│       └── grids/                # 网格样式组件
│           ├── NoGrid.tsx
│           ├── ColonialGrid.tsx
│           ├── PrairieGrid.tsx
│           ├── DiamondGrid.tsx
│           └── CustomGrid.tsx
├── lib/                          # 工具函数
│   └── utils.ts
├── public/                       # 静态资源
└── .env.local                    # 环境变量

```

## 开始使用

### 环境要求
- Node.js 18+
- npm / yarn / pnpm / bun

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建 `.env.local` 文件:

```env
# Resend API Key (用于发送邮件)
RESEND_API_KEY=your_resend_api_key

# 公司邮箱 (接收报价请求)
COMPANY_EMAIL=your@company.com
```

### 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
npm start
```

## 核心功能说明

### 窗户预览系统

窗户预览系统是本项目的核心功能,采用 SVG 技术实现:

- **模块化设计**:每种窗户类型都是独立的 React 组件
- **实时渲染**:根据用户选择动态渲染窗户外观
- **颜色系统**:支持多种预设颜色和自定义颜色
- **网格叠加**:可选的装饰性网格图案
- **响应式**:自适应不同屏幕尺寸

### 报价流程

1. 用户选择窗户材料(Vinyl/Aluminum)
2. 选择窗户类型(9种可选)
3. 选择网格样式(可选)
4. 选择颜色
5. 输入尺寸和数量
6. 填写联系信息
7. 提交报价请求
8. 系统自动发送邮件到公司邮箱和客户邮箱

## 开发指南

### 添加新的窗户类型

1. 在 `components/window-preview/windows/` 创建新组件
2. 在 `components/window-preview/index.ts` 中导出
3. 在 `app/quotation/page.tsx` 中添加到窗户类型选项

### 添加新的网格样式

1. 在 `components/window-preview/grids/` 创建新组件
2. 在 `components/window-preview/index.ts` 中导出
3. 在报价页面添加到网格选项

## 部署

### Vercel (推荐)

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 自动部署

### 其他平台

参考 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying)

## 待开发功能

- [ ] 管理后台完整功能
- [ ] 用户认证系统
- [ ] 报价历史记录
- [ ] 在线支付集成
- [ ] 多语言支持
- [ ] 产品图片上传
- [ ] 客户评价系统

## 许可证

Private - 仅供内部使用

---

Built with ❤️ using Next.js and React
