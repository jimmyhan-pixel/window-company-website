// 统一的窗户组件接口
export interface WindowProps {
    frameColor?: string
    grids?: string
    className?: string
    showGlass?: boolean // 是否显示玻璃渐变效果
}

// 玻璃渐变定义组件
export function GlassGradient() {
    return (
        <defs>
            <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e3f2fd" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#bbdefb" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#90caf9" stopOpacity="0.5" />
            </linearGradient>
        </defs>
    )
}
