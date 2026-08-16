import Color from './color.js';
import A98Rgb from './spaces/a98-rgb.js';
import DisplayP3Linear from './spaces/display-p3-linear.js';
import DisplayP3 from './spaces/display-p3.js';
import Hex from './spaces/hex.js';
import Hsl from './spaces/hsl.js';
import Hwb from './spaces/hwb.js';
import Lab from './spaces/lab.js';
import Lch from './spaces/lch.js';
import OkLab from './spaces/ok-lab.js';
import OkLch from './spaces/ok-lch.js';
import ProPhotoRgb from './spaces/pro-photo-rgb.js';
import Rec2020 from './spaces/rec-2020.js';
import Rgb from './spaces/rgb.js';
import SrgbLinear from './spaces/srgb-linear.js';
import Srgb from './spaces/srgb.js';
import XyzD50 from './spaces/xyz-d50.js';
import XyzD65 from './spaces/xyz-d65.js';

const colorClasses = {
    A98Rgb,
    DisplayP3,
    DisplayP3Linear,
    Hex,
    Hsl,
    Hwb,
    Lab,
    Lch,
    OkLab,
    OkLch,
    ProPhotoRgb,
    Rec2020,
    Rgb,
    Srgb,
    SrgbLinear,
    XyzD50,
    XyzD65,
};

Object.assign(Color, colorClasses);

export default Color;
