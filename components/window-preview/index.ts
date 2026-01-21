// 统一的窗户组件系统
// 所有窗户组件支持：frameColor, grids, className, showGlass

export { default as DoubleHungWindow } from './windows/DoubleHungWindow'
export { default as TwoLiteSliderWindow } from './windows/TwoLiteSliderWindow'
export { default as ThreeLiteSliderWindow } from './windows/ThreeLiteSliderWindow'
export { default as PictureWindow } from './windows/PictureWindow'
export { default as CasementWindow } from './windows/CasementWindow'
export { default as HopperWindow } from './windows/HopperWindow'
export { default as AwningWindow } from './windows/AwningWindow'
export { default as BowWindow } from './windows/BowWindow'
export { default as BayWindow } from './windows/BayWindow'

export type { WindowProps } from './types'
export { GlassGradient } from './types'

// 窗户组件映射
import DoubleHungWindow from './windows/DoubleHungWindow'
import TwoLiteSliderWindow from './windows/TwoLiteSliderWindow'
import ThreeLiteSliderWindow from './windows/ThreeLiteSliderWindow'
import PictureWindow from './windows/PictureWindow'
import CasementWindow from './windows/CasementWindow'
import HopperWindow from './windows/HopperWindow'
import AwningWindow from './windows/AwningWindow'
import BowWindow from './windows/BowWindow'
import BayWindow from './windows/BayWindow'
import { WindowProps } from './types'

export const WINDOW_COMPONENTS: Record<string, React.ComponentType<WindowProps>> = {
    'Double Hung': DoubleHungWindow,
    'Two Lites Slider': TwoLiteSliderWindow,
    'Three Lites Slider': ThreeLiteSliderWindow,
    'Picture Window': PictureWindow,
    'Casement': CasementWindow,
    'Hopper': HopperWindow,
    'Awning': AwningWindow,
    'Bow Window': BowWindow,
    'Bay Window': BayWindow,
}
