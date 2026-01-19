import DoubleHungWindow from './windows/DoubleHungWindow'
import TwoLiteSliderWindow from './windows/TwoLiteSliderWindow'
import ThreeLiteSliderWindow from './windows/ThreeLiteSliderWindow'
import PictureWindow from './windows/PictureWindow'
import CasementWindow from './windows/CasementWindow'
import HopperWindow from './windows/HopperWindow'
import AwningWindow from './windows/AwningWindow'
import BowWindow from './windows/BowWindow'
import BayWindow from './windows/BayWindow'
import Grid4Over4DoubleHung from './grids/Grid4Over4DoubleHung'
import Grid6Over6DoubleHung from './grids/Grid6Over6DoubleHung'
import Grid4Over4TwoLiteSlider from './grids/Grid4Over4TwoLiteSlider'
import Grid2Picture from './grids/Grid2Picture'
import Grid4Picture from './grids/Grid4Picture'

// Window frame component mapping
export const WINDOW_FRAME_MAP: Record<string, React.ComponentType<{ frameColor: string }>> = {
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

// Grid overlay component mapping
export const GRID_OVERLAY_MAP: Record<string, Record<string, React.ComponentType<{ frameColor: string }> | null>> = {
    'Double Hung': {
        'No Grids': null,
        '4 over 4': Grid4Over4DoubleHung,
        '6 over 6': Grid6Over6DoubleHung,
    },
    'Two Lites Slider': {
        'No Grids': null,
        '4 over 4': Grid4Over4TwoLiteSlider,
        '6 over 6': null, // Not implemented in original
    },
    'Picture Window': {
        'No Grids': null,
        '2': Grid2Picture,
        '4': Grid4Picture,
    },
}
