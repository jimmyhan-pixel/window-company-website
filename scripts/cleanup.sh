#!/bin/bash

# ============================================
# 项目清理脚本
# 执行前请确保已备份重要文件
# ============================================

echo "🧹 开始清理项目..."

# ============================================
# Step 1: 删除不需要的 API 文件
# ============================================
echo ""
echo "📁 Step 1: 删除不需要的 API 文件..."

if [ -f "app/api/dashboard/quotes/[id]/route.ts" ]; then
    rm "app/api/dashboard/quotes/[id]/route.ts"
    echo "  ✅ 删除: app/api/dashboard/quotes/[id]/route.ts"
else
    echo "  ⚠️  文件不存在: app/api/dashboard/quotes/[id]/route.ts"
fi

# 删除空目录
if [ -d "app/api/dashboard/quotes/[id]" ]; then
    rmdir "app/api/dashboard/quotes/[id]" 2>/dev/null && echo "  ✅ 删除空目录: app/api/dashboard/quotes/[id]"
fi

# ============================================
# Step 2: 创建归档目录
# ============================================
echo ""
echo "📁 Step 2: 创建归档目录..."

if [ ! -d "docs/archive" ]; then
    mkdir -p "docs/archive"
    echo "  ✅ 创建: docs/archive/"
else
    echo "  ℹ️  目录已存在: docs/archive/"
fi

# ============================================
# Step 3: 移动过时文档到归档
# ============================================
echo ""
echo "📁 Step 3: 移动过时文档到归档..."

# 要归档的文档列表
docs_to_archive=(
    "DASHBOARD_DESIGN.md"
    "DASHBOARD_MVP_PLAN.md"
    "PHASE2_QUICKSTART.md"
    "PHASE3_COMPLETE.md"
    "SUPABASE_AUTH_SETUP.md"
    "DATABASE_UPDATE.md"
    "FIX_QUOTE_SAVE.md"
    "LOGIN_FIX.md"
    "QUOTE_SUBMIT_FIX.md"
)

for doc in "${docs_to_archive[@]}"; do
    if [ -f "docs/$doc" ]; then
        mv "docs/$doc" "docs/archive/"
        echo "  ✅ 归档: $doc"
    else
        echo "  ⚠️  文件不存在: $doc"
    fi
done

# ============================================
# Step 4: 删除不用的组件（可选）
# ============================================
echo ""
echo "📁 Step 4: 删除不用的组件（可选）..."

if [ -f "components/dashboard/StatusBadge.tsx" ]; then
    # 注释掉这行，如果确定要删除，取消注释
    # rm "components/dashboard/StatusBadge.tsx"
    echo "  ⚠️  保留: StatusBadge.tsx（如需删除，请取消注释脚本中的删除命令）"
else
    echo "  ℹ️  文件不存在: StatusBadge.tsx"
fi

# ============================================
# Step 5: 删除临时文件
# ============================================
echo ""
echo "📁 Step 5: 删除临时文件..."

if [ -f "cookies.txt" ]; then
    rm "cookies.txt"
    echo "  ✅ 删除: cookies.txt"
fi

# ============================================
# 完成
# ============================================
echo ""
echo "✅ 清理完成！"
echo ""
echo "📊 清理总结:"
echo "  - 删除了不需要的 API 文件"
echo "  - 归档了 9 个过时文档到 docs/archive/"
echo "  - 删除了临时文件"
echo ""
echo "📝 下一步:"
echo "  1. 检查 docs/archive/ 确认归档的文件"
echo "  2. 如需删除 StatusBadge.tsx，编辑此脚本取消注释"
echo "  3. 运行 'npm run dev' 测试项目"
echo ""
