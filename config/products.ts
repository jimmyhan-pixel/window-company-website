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
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        route: '/products/vinyl'
    },
    {
        id: 'home-aluminum',
        name: 'Aluminum Windows',
        nameZh: '铝合金窗',
        description: 'Residential · Premium Quality',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
        route: '/products/aluminum'
    },
    {
        id: 'home-commercial',
        name: 'Commercial Windows',
        nameZh: '商用窗',
        description: 'Office Buildings · Large Scale',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
    },
    {
        id: 'vinyl-two-lites-slider',
        name: 'Two Lites Slider',
        nameZh: '双扇推拉窗',
        description: 'Horizontal sliding windows',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    },
    {
        id: 'vinyl-three-lites-slider',
        name: 'Three Lites Slider',
        nameZh: '三扇推拉窗',
        description: 'Triple-panel sliding window',
        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'
    },
    {
        id: 'vinyl-picture',
        name: 'Picture Window',
        nameZh: '固定窗',
        description: 'Fixed window for maximum light',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop'
    },
    {
        id: 'vinyl-casement',
        name: 'Casement',
        nameZh: '平开窗',
        description: 'Side-hinged windows',
        image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop'
    },
    {
        id: 'vinyl-hopper',
        name: 'Hopper',
        nameZh: '上悬窗',
        description: 'Top-hinged window',
        image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop'
    },
    {
        id: 'vinyl-awning',
        name: 'Awning',
        nameZh: '下悬窗',
        description: 'Bottom-hinged window',
        image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop'
    },
    {
        id: 'vinyl-bow',
        name: 'Bow Window',
        nameZh: '弓形窗',
        description: 'Curved window configuration',
        image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop'
    },
    {
        id: 'vinyl-bay',
        name: 'Bay Window',
        nameZh: '凸窗',
        description: 'Angular projection window',
        image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
    },
    {
        id: 'aluminum-two-lites-slider',
        name: 'Two Lites Slider',
        nameZh: '双扇推拉窗',
        description: 'Smooth-operating aluminum sliding windows',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    },
    {
        id: 'aluminum-three-lites-slider',
        name: 'Three Lites Slider',
        nameZh: '三扇推拉窗',
        description: 'Triple-panel aluminum slider',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    },
    {
        id: 'aluminum-picture',
        name: 'Picture Window',
        nameZh: '固定窗',
        description: 'Fixed aluminum picture window',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop'
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
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
    },
    {
        id: 'commercial-hopper',
        name: 'Hopper',
        nameZh: '上悬窗',
        description: 'Top-hinged commercial hopper windows',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop'
    },
    {
        id: 'commercial-awning',
        name: 'Awning',
        nameZh: '下悬窗',
        description: 'Commercial awning windows',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop'
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
