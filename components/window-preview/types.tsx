import type { ReactElement } from 'react'
import type { GridConfig, GridSectionConfig } from '@/lib/grids'
import { resolveGridCounts } from '@/lib/grids'

// 统一的窗户组件接口
export interface WindowProps {
    frameColor?: string
    grids?: GridConfig
    className?: string
    showGlass?: boolean // 是否显示玻璃渐变效果
    casementDesign?: 'single' | 'double'
    casementOpenDirection?: 'left' | 'right'
}

interface Point {
    x: number
    y: number
}

interface RectGridBounds {
    x: number
    y: number
    width: number
    height: number
}

interface QuadGridBounds {
    topLeft: Point
    topRight: Point
    bottomLeft: Point
    bottomRight: Point
}

function interpolate(start: Point, end: Point, t: number) {
    return {
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t,
    }
}

export function renderRectGridLines(
    bounds: RectGridBounds,
    section: GridSectionConfig | undefined,
    stroke: string,
    keyPrefix: string,
    strokeWidth = 2.5
) {
    const { vertical, horizontal } = resolveGridCounts(section)
    const lines: ReactElement[] = []

    for (let index = 1; index <= vertical; index += 1) {
        const x = bounds.x + (bounds.width * index) / (vertical + 1)
        lines.push(
            <line
                key={`${keyPrefix}-v-${index}`}
                x1={x}
                y1={bounds.y}
                x2={x}
                y2={bounds.y + bounds.height}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
        )
    }

    for (let index = 1; index <= horizontal; index += 1) {
        const y = bounds.y + (bounds.height * index) / (horizontal + 1)
        lines.push(
            <line
                key={`${keyPrefix}-h-${index}`}
                x1={bounds.x}
                y1={y}
                x2={bounds.x + bounds.width}
                y2={y}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
        )
    }

    return lines
}

export function renderQuadGridLines(
    bounds: QuadGridBounds,
    section: GridSectionConfig | undefined,
    stroke: string,
    keyPrefix: string,
    strokeWidth = 2.5
) {
    const { vertical, horizontal } = resolveGridCounts(section)
    const lines: ReactElement[] = []

    for (let index = 1; index <= vertical; index += 1) {
        const ratio = index / (vertical + 1)
        const topPoint = interpolate(bounds.topLeft, bounds.topRight, ratio)
        const bottomPoint = interpolate(bounds.bottomLeft, bounds.bottomRight, ratio)

        lines.push(
            <line
                key={`${keyPrefix}-v-${index}`}
                x1={topPoint.x}
                y1={topPoint.y}
                x2={bottomPoint.x}
                y2={bottomPoint.y}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
        )
    }

    for (let index = 1; index <= horizontal; index += 1) {
        const ratio = index / (horizontal + 1)
        const leftPoint = interpolate(bounds.topLeft, bounds.bottomLeft, ratio)
        const rightPoint = interpolate(bounds.topRight, bounds.bottomRight, ratio)

        lines.push(
            <line
                key={`${keyPrefix}-h-${index}`}
                x1={leftPoint.x}
                y1={leftPoint.y}
                x2={rightPoint.x}
                y2={rightPoint.y}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
        )
    }

    return lines
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
