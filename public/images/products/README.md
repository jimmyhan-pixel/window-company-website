# 🖼️ 产品图片完整替换指南

## 📁 文件夹结构

```
public/images/products/
├── vinyl-windows.jpg              # 主页 - 胶窗卡片
├── aluminum-windows.jpg           # 主页 - 铝窗卡片
├── commercial-windows.jpg         # 主页 - 商业窗卡片
├── vinyl/                         # Vinyl子页面产品图片
│   ├── double-hung.jpg
│   ├── two-lites-slider.jpg
│   ├── three-lites-slider.jpg
│   ├── picture-window.jpg
│   ├── casement.jpg
│   ├── hopper.jpg
│   ├── awning.jpg
│   ├── bow-window.jpg
│   └── bay-window.jpg
├── aluminum/                      # Aluminum子页面产品图片
│   ├── double-hung.jpg
│   ├── two-lites-slider.jpg
│   ├── three-lites-slider.jpg
│   └── picture-window.jpg
└── commercial/                    # Commercial子页面产品图片
    ├── casement.jpg
    ├── hopper.jpg
    └── awning.jpg
```

## 📊 图片清单（共19张）

### 主页产品卡片（3张）
1. `vinyl-windows.jpg` - 胶窗主图
2. `aluminum-windows.jpg` - 铝窗主图
3. `commercial-windows.jpg` - 商业窗主图

### Vinyl Windows 子页面（9张）
4. `vinyl/double-hung.jpg` - 双悬窗
5. `vinyl/two-lites-slider.jpg` - 双扇推拉窗
6. `vinyl/three-lites-slider.jpg` - 三扇推拉窗
7. `vinyl/picture-window.jpg` - 固定窗
8. `vinyl/casement.jpg` - 平开窗
9. `vinyl/hopper.jpg` - 上悬窗
10. `vinyl/awning.jpg` - 下悬窗
11. `vinyl/bow-window.jpg` - 弧形窗
12. `vinyl/bay-window.jpg` - 凸窗

### Aluminum Windows 子页面（4张）
13. `aluminum/double-hung.jpg` - 双悬窗
14. `aluminum/two-lites-slider.jpg` - 双扇推拉窗
15. `aluminum/three-lites-slider.jpg` - 三扇推拉窗
16. `aluminum/picture-window.jpg` - 固定窗

### Commercial Windows 子页面（3张）
17. `commercial/casement.jpg` - 商业平开窗
18. `commercial/hopper.jpg` - 商业上悬窗
19. `commercial/awning.jpg` - 商业下悬窗

## 📐 图片要求

### 尺寸规格
- **推荐尺寸**: 800x600 像素
- **宽高比**: 4:3
- **最小尺寸**: 600x450 像素
- **最大尺寸**: 1200x900 像素

### 文件规格
- **格式**: JPG 或 PNG
- **文件大小**: 每张 < 500KB（推荐 200-300KB）
- **质量**: 高清，主体清晰

### 拍摄建议
- 📸 正面拍摄，避免过度倾斜
- 💡 光线充足，避免阴影
- 🎯 产品居中，背景简洁
- ✨ 展示产品特点和细节

## 🔧 如何替换图片

### 方法1：准备好所有图片后一次性替换

1. **准备图片**
   - 按照上述清单准备19张图片
   - 按照文件名重命名

2. **放入对应文件夹**
   ```bash
   # 主页图片
   public/images/products/vinyl-windows.jpg
   public/images/products/aluminum-windows.jpg
   public/images/products/commercial-windows.jpg
   
   # Vinyl子页面
   public/images/products/vinyl/double-hung.jpg
   public/images/products/vinyl/two-lites-slider.jpg
   ... (其他7张)
   
   # Aluminum子页面
   public/images/products/aluminum/double-hung.jpg
   ... (其他3张)
   
   # Commercial子页面
   public/images/products/commercial/casement.jpg
   ... (其他2张)
   ```

3. **修改代码**
   - 我会提供代码修改脚本
   - 或者手动修改各个页面的图片路径

### 方法2：逐步替换

可以先替换主页的3张，然后逐个子页面替换。

## ⚠️ 当前状态

- ✅ 文件夹结构已创建
- ⚠️ 当前使用 Unsplash 占位图片
- 📝 代码中已添加注释标记需要替换的位置

## 📞 需要帮助？

如果你准备好了图片，告诉我，我可以：
1. 帮你修改代码以使用本地图片
2. 提供批量重命名脚本
3. 创建图片优化脚本

---

**下一步**: 准备好图片后，告诉我，我会帮你修改所有页面的代码！
