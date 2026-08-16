/**
 * Applies a sign-preserving power transform.
 * @param {number} value The value.
 * @param {number} exponent The exponent.
 * @return {number} The transformed value.
 */
const powSigned = (value, exponent) => {
    return value < 0 ?
        -(Math.pow(-value, exponent)) :
        Math.pow(value, exponent);
};

/**
 * Calculates the R, G or B value via hue interpolation.
 * @param {number} p The first value.
 * @param {number} q The second value.
 * @param {number} t The shifted hue value.
 * @return {number} The R, G or B value.
 */
const rgbHue = (p, q, t) => {
    t = (t + 1) % 1;

    if (t < (1 / 6)) {
        return p + ((q - p) * 6 * t);
    }

    if (t < (1 / 2)) {
        return q;
    }

    if (t < (2 / 3)) {
        return p + (((q - p) * ((2 / 3) - t)) * 6);
    }

    return p;
};

/**
 * Converts A98 RGB color values to XYZ D65.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The XYZ D65 values.
 */
export const a98RgbToXyzD65 = (r, g, b) => {
    r = powSigned(r, 2.19921875);
    g = powSigned(g, 2.19921875);
    b = powSigned(b, 2.19921875);

    return [
        (0.576669042903413 * r) + (0.185558237906552 * g) + (0.188228607860995 * b),
        (0.297344975250536 * r) + (0.627363566255474 * g) + (0.075291458837511 * b),
        (0.027031361071147 * r) + (0.070690207263094 * g) + (0.991337536548046 * b),
    ];
};

/**
 * Converts Display P3 Linear color values to Display P3.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The Display P3 values.
 */
export const displayP3LinearToDisplayP3 = (r, g, b) => {
    const gamma = 1 / 2.4;
    const encode = (value) => value <= 0.0031308 ?
        (value * 12.92) :
        ((1.055 * Math.pow(value, gamma)) - 0.055);

    return [encode(r), encode(g), encode(b)];
};

/**
 * Converts Display P3 Linear color values to XYZ D65.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The XYZ D65 values.
 */
export const displayP3LinearToXyzD65 = (r, g, b) => {
    return [
        (0.4865709486482162 * r) + (0.2656676931690931 * g) + (0.1982172852343625 * b),
        (0.2289745640697488 * r) + (0.6917385218365064 * g) + (0.0792869140937450 * b),
        (0.0451133818589026 * g) + (1.043944368900976 * b),
    ];
};

/**
 * Converts Display P3 color values to Display P3 Linear.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The Display P3 Linear values.
 */
export const displayP3ToDisplayP3Linear = (r, g, b) => {
    const decode = (value) => value <= 0.04045 ?
        (value / 12.92) :
        Math.pow((value + 0.055) / 1.055, 2.4);

    return [decode(r), decode(g), decode(b)];
};

/**
 * Converts HSL color values to SRGB.
 * @param {number} h The hue value. (0, 360)
 * @param {number} s The saturation value. (0, 1)
 * @param {number} l The lightness value. (0, 1)
 * @return {[number, number, number]} The SRGB values.
 */
export const hslToSrgb = (h, s, l) => {
    h = (h % 360) / 360;

    let r = l;
    let g = l;
    let b = l;

    if (s !== 0) {
        const q = l < 0.5 ?
            (l * (1 + s)) :
            (l + s - (l * s));
        const p = (2 * l) - q;
        r = rgbHue(p, q, h + (1 / 3));
        g = rgbHue(p, q, h);
        b = rgbHue(p, q, h - (1 / 3));
    }

    return [r, g, b];
};

/**
 * Converts HSV color values to SRGB.
 * @param {number} h The hue value. (0, 360)
 * @param {number} s The saturation value. (0, 1)
 * @param {number} v The brightness value. (0, 1)
 * @return {[number, number, number]} The SRGB values.
 */
export const hsvToSrgb = (h, s, v) => {
    h = (h + 360) % 360;
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    let r1;
    let g1;
    let b1;

    if (h < 60) {
        [r1, g1, b1] = [c, x, 0];
    } else if (h < 120) {
        [r1, g1, b1] = [x, c, 0];
    } else if (h < 180) {
        [r1, g1, b1] = [0, c, x];
    } else if (h < 240) {
        [r1, g1, b1] = [0, x, c];
    } else if (h < 300) {
        [r1, g1, b1] = [x, 0, c];
    } else {
        [r1, g1, b1] = [c, 0, x];
    }

    return [r1 + m, g1 + m, b1 + m];
};

/**
 * Converts HWB color values to SRGB.
 * @param {number} h The hue value. (0, 360)
 * @param {number} w The whiteness value. (0, 1)
 * @param {number} bl The blackness value. (0, 1)
 * @return {[number, number, number]} The SRGB values.
 */
export const hwbToSrgb = (h, w, bl) => {
    const total = w + bl;

    if (total > 1) {
        w /= total;
        bl /= total;
    }

    const [r, g, b] = hsvToSrgb(h, 1, 1);
    const factor = 1 - w - bl;

    return [
        (r * factor) + w,
        (g * factor) + w,
        (b * factor) + w,
    ];
};

/**
 * Converts LAB color values to LCH.
 * @param {number} L The lightness value. (0, 100)
 * @param {number} a The a value. (-128, 127)
 * @param {number} b The b value. (-128, 127)
 * @return {[number, number, number]} The LCH values.
 */
export const labToLch = (L, a, b) => {
    const C = Math.hypot(a, b);
    let H = (Math.atan2(b, a) * 180 / Math.PI) % 360;

    if (H < 0) {
        H += 360;
    }

    return [L, C, H];
};

/**
 * Converts LAB color values to XYZ D50.
 * @param {number} L The lightness value. (0, 100)
 * @param {number} a The a value. (-128, 127)
 * @param {number} b The b value. (-128, 127)
 * @return {[number, number, number]} The XYZ D50 values.
 */
export const labToXyzD50 = (L, a, b) => {
    const fy = (L + 16) / 116;
    const fx = fy + (a / 500);
    const fz = fy - (b / 200);

    const fx3 = fx ** 3;
    const fz3 = fz ** 3;

    const xr = fx3 > 0.008856 ?
        fx3 :
        ((fx - (16 / 116)) / 7.787);
    const yr = L > (903.3 * 0.008856) ?
        (fy ** 3) :
        (L / 903.3);
    const zr = fz3 > 0.008856 ?
        fz3 :
        ((fz - (16 / 116)) / 7.787);

    return [
        xr * 0.96422,
        yr,
        zr * 0.82521,
    ];
};

/**
 * Converts LCH color values to LAB.
 * @param {number} L The lightness value. (0, 100)
 * @param {number} C The chroma value. (0, 230)
 * @param {number} H The hue value. (0, 360)
 * @return {[number, number, number]} The LAB values.
 */
export const lchToLab = (L, C, H) => {
    const radians = H * Math.PI / 180;

    return [
        L,
        C * Math.cos(radians),
        C * Math.sin(radians),
    ];
};

/**
 * Converts OK LAB color values to OK LCH.
 * @param {number} L The lightness value. (0, 1)
 * @param {number} a The a value. (-0.4, 0.4)
 * @param {number} b The b value. (-0.4, 0.4)
 * @return {[number, number, number]} The OK LCH values.
 */
export const okLabToOkLch = (L, a, b) => {
    const C = Math.hypot(a, b);
    let H = (Math.atan2(b, a) * 180 / Math.PI) % 360;

    if (H < 0) {
        H += 360;
    }

    return [L, C, H];
};

/**
 * Converts OK LAB color values to XYZ D65.
 * @param {number} L The lightness value. (0, 1)
 * @param {number} a The a value. (-0.4, 0.4)
 * @param {number} b The b value. (-0.4, 0.4)
 * @return {[number, number, number]} The XYZ D65 values.
 */
export const okLabToXyzD65 = (L, a, b) => {
    const l = Math.pow(L + (0.3963377774 * a) + (0.2158037573 * b), 3);
    const m = Math.pow(L - (0.1055613458 * a) - (0.0638541728 * b), 3);
    const s = Math.pow(L - (0.0894841775 * a) - (1.2914855480 * b), 3);

    return [
        (1.2270138511 * l) - (0.5577999807 * m) + (0.2812561490 * s),
        (-0.0405801784 * l) + (1.1122568696 * m) - (0.0716766787 * s),
        (-0.0763812845 * l) - (0.4214819784 * m) + (1.5861632204 * s),
    ];
};

/**
 * Converts OK LCH color values to OK LAB.
 * @param {number} L The lightness value. (0, 1)
 * @param {number} C The chroma value. (0, 0.4)
 * @param {number} H The hue value. (0, 360)
 * @return {[number, number, number]} The OK LAB values.
 */
export const okLchToOkLab = (L, C, H) => {
    const radians = H * Math.PI / 180;

    return [
        L,
        C * Math.cos(radians),
        C * Math.sin(radians),
    ];
};

/**
 * Converts ProPhoto RGB color values to XYZ D50.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The XYZ D50 values.
 */
export const prophotoRgbToXyzD50 = (r, g, b) => {
    const decode = (value) => value <= 0.03125 ?
        (value / 16) :
        Math.pow(value, 1.8);

    r = decode(r);
    g = decode(g);
    b = decode(b);

    return [
        (0.7976749 * r) + (0.1351917 * g) + (0.0313534 * b),
        (0.2880402 * r) + (0.7118741 * g) + (0.0000857 * b),
        0.8252100 * b,
    ];
};

/**
 * Converts Rec. 2020 color values to XYZ D65.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The XYZ D65 values.
 */
export const rec2020ToXyzD65 = (r, g, b) => {
    const decode = (value) => value <= 0.08145 ?
        (value / 4.5) :
        Math.pow((value + 0.099) / 1.099, 2.2);

    r = decode(r);
    g = decode(g);
    b = decode(b);

    return [
        (0.6369580483012914 * r) + (0.14461690358620832 * g) + (0.1688809751641721 * b),
        (0.2627002120112671 * r) + (0.6779980715188708 * g) + (0.05930171646986196 * b),
        (0.028072693049087428 * g) + (1.060985057710791 * b),
    ];
};

/**
 * Converts RGB color values to SRGB.
 * @param {number} r The red value. (0, 255)
 * @param {number} g The green value. (0, 255)
 * @param {number} b The blue value. (0, 255)
 * @return {[number, number, number]} The SRGB values.
 */
export const rgbToSrgb = (r, g, b) => {
    return [r / 255, g / 255, b / 255];
};

/**
 * Converts SRGB Linear color values to SRGB.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The SRGB values.
 */
export const srgbLinearToSrgb = (r, g, b) => {
    const gamma = 1 / 2.4;
    const encode = (value) => value <= 0.0031308 ?
        (value * 12.92) :
        ((1.055 * Math.pow(value, gamma)) - 0.055);

    return [encode(r), encode(g), encode(b)];
};

/**
 * Converts SRGB Linear color values to XYZ D65.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The XYZ D65 values.
 */
export const srgbLinearToXyzD65 = (r, g, b) => {
    return [
        (0.4124564 * r) + (0.3575761 * g) + (0.1804375 * b),
        (0.2126729 * r) + (0.7151522 * g) + (0.0721750 * b),
        (0.0193339 * r) + (0.1191920 * g) + (0.9503041 * b),
    ];
};

/**
 * Converts SRGB color values to HSL.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The HSL values.
 */
export const srgbToHsl = (r, g, b) => {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    const d = max - min;

    let h;
    let s;

    if (d < 1e-12) {
        h = 0;
        s = 0;
    } else {
        s = l > 0.5 ?
            (d / (2 - max - min)) :
            (d / (max + min));

        switch (max) {
            case r:
                h = ((g - b) / d) + (g < b ? 6 : 0);
                break;
            case g:
                h = ((b - r) / d) + 2;
                break;
            case b:
                h = ((r - g) / d) + 4;
                break;
            default:
                h = 0;
                break;
        }

        h = (h * 60) % 360;

        if (h < 0) {
            h += 360;
        }
    }

    return [h, s, l];
};

/**
 * Converts SRGB color values to HSV.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The HSV values.
 */
export const srgbToHsv = (r, g, b) => {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const v = max;
    const d = max - min;
    const s = max < 1e-12 ?
        0 :
        (d / max);

    let h;

    if (d < 1e-12) {
        h = 0;
    } else if (max === r) {
        h = 60 * (((g - b) / d) % 6);
    } else if (max === g) {
        h = 60 * (((b - r) / d) + 2);
    } else {
        h = 60 * (((r - g) / d) + 4);
    }

    h %= 360;

    if (h < 0) {
        h += 360;
    }

    return [h, s, v];
};

/**
 * Converts SRGB color values to HWB.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The HWB values.
 */
export const srgbToHwb = (r, g, b) => {
    const [h] = srgbToHsv(r, g, b);

    return [
        h,
        Math.min(r, g, b),
        1 - Math.max(r, g, b),
    ];
};

/**
 * Converts SRGB color values to luma.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {number} The luma value.
 */
export const srgbToLuma = (r, g, b) => {
    const decode = (value) => value <= 0.03928 ?
        (value / 12.92) :
        Math.pow((value + 0.055) / 1.055, 2.4);

    r = decode(r);
    g = decode(g);
    b = decode(b);

    return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
};

/**
 * Converts SRGB color values to RGB.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The RGB values.
 */
export const srgbToRgb = (r, g, b) => {
    return [r * 255, g * 255, b * 255];
};

/**
 * Converts SRGB color values to SRGB Linear.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @return {[number, number, number]} The SRGB Linear values.
 */
export const srgbToSrgbLinear = (r, g, b) => {
    const decode = (value) => value <= 0.04045 ?
        (value / 12.92) :
        Math.pow((value + 0.055) / 1.055, 2.4);

    return [decode(r), decode(g), decode(b)];
};

/**
 * Converts XYZ D50 color values to LAB.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @return {[number, number, number]} The LAB values.
 */
export const xyzD50ToLab = (x, y, z) => {
    const encode = (value) => value > 0.008856 ?
        Math.pow(value, 1 / 3) :
        (((903.3 * value) + 16) / 116);

    const xr = x / 0.96422;
    const yr = y;
    const zr = z / 0.82521;

    const fx = encode(xr);
    const fy = encode(yr);
    const fz = encode(zr);

    return [
        (116 * fy) - 16,
        500 * (fx - fy),
        200 * (fy - fz),
    ];
};

/**
 * Converts XYZ D50 color values to ProPhoto RGB.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @return {[number, number, number]} The ProPhoto RGB values.
 */
export const xyzD50ToProPhotoRgb = (x, y, z) => {
    const encode = (value) => value <= 0.001953125 ?
        (value * 16) :
        Math.pow(value, 1 / 1.8);

    let r = (1.3459433 * x) - (0.2556075 * y) - (0.0511118 * z);
    let g = (-0.5445989 * x) + (1.5081673 * y) + (0.0205351 * z);
    let b = 1.2118128 * z;

    r = encode(r);
    g = encode(g);
    b = encode(b);

    return [r, g, b];
};

/**
 * Converts XYZ D50 color values to XYZ D65.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @return {[number, number, number]} The XYZ D65 values.
 */
export const xyzD50ToXyzD65 = (x, y, z) => {
    return [
        (0.955576618511 * x) + (-0.023039344223 * y) + (0.063163638894 * z),
        (-0.028289504216 * x) + (1.009941414544 * y) + (0.021007796040 * z),
        (0.012298185122 * x) + (-0.020483208309 * y) + (1.329909796254 * z),
    ];
};

/**
 * Converts XYZ D65 color values to A98 RGB.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @return {[number, number, number]} The A98 RGB values.
 */
export const xyzD65ToA98Rgb = (x, y, z) => {
    const r = (2.0413690 * x) - (0.5649464 * y) - (0.3446944 * z);
    const g = (-0.9692660 * x) + (1.8760108 * y) + (0.0415560 * z);
    const b = (0.0134474 * x) - (0.1183897 * y) + (1.0154096 * z);
    const gamma = 1 / 2.19921875;

    return [
        powSigned(r, gamma),
        powSigned(g, gamma),
        powSigned(b, gamma),
    ];
};

/**
 * Converts XYZ D65 color values to Display P3 Linear.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @return {[number, number, number]} The Display P3 Linear values.
 */
export const xyzD65ToDisplayP3Linear = (x, y, z) => {
    return [
        (2.493496911941425 * x) - (0.9313836179191239 * y) - (0.40271078445071684 * z),
        (-0.8294889695615747 * x) + (1.7626640603183463 * y) + (0.023624685841943577 * z),
        (0.03584583024378447 * x) - (0.07617238926804182 * y) + (0.9568845240076872 * z),
    ];
};

/**
 * Converts XYZ D65 color values to OK LAB.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @return {[number, number, number]} The OK LAB values.
 */
export const xyzD65ToOkLab = (x, y, z) => {
    const cbrt = (value) => value < 0 ?
        -Math.pow(-value, 1 / 3) :
        Math.pow(value, 1 / 3);

    let l = (0.8189330101 * x) + (0.3618667424 * y) - (0.1288597137 * z);
    let m = (0.0329845436 * x) + (0.9293118715 * y) + (0.0361456387 * z);
    let s = (0.0482003018 * x) + (0.2643662691 * y) + (0.6338517070 * z);

    l = cbrt(l);
    m = cbrt(m);
    s = cbrt(s);

    return [
        (0.2104542553 * l) + (0.7936177850 * m) - (0.0040720468 * s),
        (1.9779984951 * l) - (2.4285922050 * m) + (0.4505937099 * s),
        (0.0259040371 * l) + (0.7827717662 * m) - (0.8086757660 * s),
    ];
};

/**
 * Converts XYZ D65 color values to Rec. 2020.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @return {[number, number, number]} The Rec. 2020 values.
 */
export const xyzD65ToRec2020 = (x, y, z) => {
    const encode = (value) => value <= 0.0181 ?
        (value * 4.5) :
        ((1.099 * Math.pow(value, 1 / 2.2)) - 0.099);

    let r = (1.716651187971268 * x) - (0.355670783776392 * y) - (0.253366281373660 * z);
    let g = (-0.666684351832489 * x) + (1.616481236634939 * y) + (0.015768545813911 * z);
    let b = (0.017639857445310 * x) - (0.042770613257808 * y) + (0.942103121235474 * z);

    r = encode(r);
    g = encode(g);
    b = encode(b);

    return [r, g, b];
};

/**
 * Converts XYZ D65 color values to SRGB Linear.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @return {[number, number, number]} The SRGB Linear values.
 */
export const xyzD65ToSrgbLinear = (x, y, z) => {
    return [
        (3.2404542 * x) - (1.5371385 * y) - (0.4985314 * z),
        (-0.9692660 * x) + (1.8760108 * y) + (0.0415560 * z),
        (0.0556434 * x) - (0.2040259 * y) + (1.0572252 * z),
    ];
};

/**
 * Converts XYZ D65 color values to XYZ D50.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @return {[number, number, number]} The XYZ D50 values.
 */
export const xyzD65ToXyzD50 = (x, y, z) => {
    return [
        (1.047811216997 * x) + (0.022886603691 * y) + (-0.050127010796 * z),
        (0.029542454198 * x) + (0.990484427399 * y) + (-0.017049093754 * z),
        (-0.0092344585052 * x) + (0.015043613370 * y) + (0.752131651235 * z),
    ];
};
