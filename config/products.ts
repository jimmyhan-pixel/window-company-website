// 产品配置文件 - 与实际页面完全一致
// 修改这个文件会自动更新 Dashboard 图片管理

export interface Product {
    id: string
    name: string
    nameZh: string
    description: string
    image: string
    route?: string
}

// ============================================
// 首页产品卡片（3个）
// ============================================
export const homeProducts: Product[] = [
    {
        id: 'home-vinyl',
        name: 'Vinyl Windows',
        nameZh: '塑钢窗',
        description: 'Residential · Energy Efficient',
        image: '/images/products/vinyl-windows.jpg',
        route: '/products/vinyl'
    },
    {
        id: 'home-aluminum',
        name: 'Aluminum Windows',
        nameZh: '铝合金窗',
        description: 'Residential · Premium Quality',
        image: '/images/products/aluminum-windows.jpg',
        route: '/products/aluminum'
    },
    {
        id: 'home-commercial',
        name: 'Commercial Windows',
        nameZh: '商用窗',
        description: 'Office Buildings · Large Scale',
        image: '/images/products/commercial-windows.jpg',
        route: '/products/commercial'
    }
]

// ============================================
// Vinyl Windows 子页面产品（9个）
// ============================================
export const vinylProducts: Product[] = [
    {
        id: 'vinyl-double-hung',
        name: 'Double Hung',
        nameZh: '双悬窗',
        description: 'Classic design with two operable sashes',
        image: '/images/products/vinyl/double-hung.jpg'
    },
    {
        id: 'vinyl-two-lites-slider',
        name: 'Two Lites Slider',
        nameZh: '双扇推拉窗',
        description: 'Horizontal sliding windows',
        image: '/images/products/vinyl/two-lites-slider.jpg'
    },
    {
        id: 'vinyl-three-lites-slider',
        name: 'Three Lites Slider',
        nameZh: '三扇推拉窗',
        description: 'Triple-panel sliding window',
        image: '/images/products/vinyl/three-lites-slider.jpg'
    },
    {
        id: 'vinyl-picture',
        name: 'Picture Window',
        nameZh: '固定窗',
        description: 'Fixed window for maximum light',
        image: '/images/products/vinyl/picture.jpg'
    },
    {
        id: 'vinyl-casement',
        name: 'Casement',
        nameZh: '平开窗',
        description: 'Side-hinged windows',
        image: '/images/products/vinyl/casement.jpg'
    },
    {
        id: 'vinyl-hopper',
        name: 'Hopper',
        nameZh: '上悬窗',
        description: 'Top-hinged window',
        image: '/images/products/vinyl/hopper.jpg'
    },
    {
        id: 'vinyl-awning',
        name: 'Awning',
        nameZh: '下悬窗',
        description: 'Bottom-hinged window',
        image: '/images/products/vinyl/awning.jpg'
    },
    {
        id: 'vinyl-bow',
        name: 'Bow Window',
        nameZh: '弓形窗',
        description: 'Curved window configuration',
        image: '/images/products/vinyl/bow.jpg'
    },
    {
        id: 'vinyl-bay',
        name: 'Bay Window',
        nameZh: '凸窗',
        description: 'Angular projection window',
        image: '/images/products/vinyl/bay.jpg'
    }
]

// ============================================
// Aluminum Windows 子页面产品（4个）
// ============================================
export const aluminumProducts: Product[] = [
    {
        id: 'aluminum-double-hung',
        name: 'Double Hung',
        nameZh: '双悬窗',
        description: 'Premium aluminum double hung windows',
        image: '/images/products/aluminum/double-hung.jpg'
    },
    {
        id: 'aluminum-two-lites-slider',
        name: 'Two Lites Slider',
        nameZh: '双扇推拉窗',
        description: 'Smooth-operating aluminum sliding windows',
        image: '/images/products/aluminum/two-lites-slider.jpg'
    },
    {
        id: 'aluminum-three-lites-slider',
        name: 'Three Lites Slider',
        nameZh: '三扇推拉窗',
        description: 'Triple-panel aluminum slider',
        image: '/images/products/aluminum/three-lites-slider.jpg'
    },
    {
        id: 'aluminum-picture',
        name: 'Picture Window',
        nameZh: '固定窗',
        description: 'Fixed aluminum picture window',
        image: '/images/products/aluminum/picture.jpg'
    }
]

// ============================================
// Commercial Windows 子页面产品（3个）
// ============================================
export const commercialProducts: Product[] = [
    {
        id: 'commercial-casement',
        name: 'Casement',
        nameZh: '平开窗',
        description: 'Commercial-grade casement windows',
        image: '/images/products/commercial/casement.jpg'
    },
    {
        id: 'commercial-hopper',
        name: 'Hopper',
        nameZh: '上悬窗',
        description: 'Top-hinged commercial hopper windows',
        image: '/images/products/commercial/hopper.jpg'
    },
    {
        id: 'commercial-awning',
        name: 'Awning',
        nameZh: '下悬窗',
        description: 'Commercial awning windows',
        image: '/images/products/commercial/awning.jpg'
    }
]

// ============================================
// 所有子页面配置
// ============================================
export const subPages = [
    {
        id: 'vinyl',
        name: 'Vinyl Windows',
        nameZh: '塑钢窗',
        products: vinylProducts
    },
    {
        id: 'aluminum',
        name: 'Aluminum Windows',
        nameZh: '铝合金窗',
        products: aluminumProducts
    },
    {
        id: 'commercial',
        name: 'Commercial Windows',
        nameZh: '商用窗',
        products: commercialProducts
    }
]

// ============================================
// 辅助函数
// ============================================

// 获取所有产品
export function getAllProducts() {
    return {
        home: homeProducts,
        vinyl: vinylProducts,
        aluminum: aluminumProducts,
        commercial: commercialProducts
    }
}

// 获取产品总数
export function getProductCounts() {
    return {
        home: homeProducts.length,
        vinyl: vinylProducts.length,
        aluminum: aluminumProducts.length,
        commercial: commercialProducts.length,
        total: homeProducts.length + vinylProducts.length + aluminumProducts.length + commercialProducts.length
    }
}
