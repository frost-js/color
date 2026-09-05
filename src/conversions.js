/**
 * Applies a sign-preserving power transform.
 * @param {number} value The value.
 * @param {number} exponent The exponent.
 * @returns {number} The transformed value.
 */
const powSigned = (value, exponent) => {
    return value < 0 ?
        -(Math.pow(-value, exponent)) :
        Math.pow(value, exponent);
};

/**
 * Converts a linear SRGB channel to gamma-corrected form.
 * @param {number} value The channel value.
 * @returns {number} The gamma-corrected channel value.
 */
const linearSrgbChannelToSrgb = (value) => {
    const absolute = Math.abs(value);
    const sign = value < 0 ? -1 : 1;

    return absolute <= 0.0031308 ?
        value * 12.92 :
        sign * ((1.055 * Math.pow(absolute, 1 / 2.4)) - 0.055);
};

/**
 * Calculates the R, G or B value via hue interpolation.
 * @param {number} p The first value.
 * @param {number} q The second value.
 * @param {number} t The shifted hue value.
 * @returns {number} The R, G or B value.
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
 * Converts a gamma-corrected SRGB channel to linear form.
 * @param {number} value The channel value.
 * @returns {number} The linear channel value.
 */
const srgbChannelToLinear = (value) => {
    const absolute = Math.abs(value);
    const sign = value < 0 ? -1 : 1;

    return absolute <= 0.04045 ?
        value / 12.92 :
        sign * Math.pow((absolute + 0.055) / 1.055, 2.4);
};

/**
 * Converts A98 RGB color values to XYZ D65.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @returns {[number, number, number]} The XYZ D65 values.
 */
export const a98RgbToXyzD65 = (r, g, b) => {
    r = powSigned(r, 2.19921875);
    g = powSigned(g, 2.19921875);
    b = powSigned(b, 2.19921875);

    return [
        (0.5766690429101308 * r) + (0.1855582379065463 * g) + (0.1882286462349947 * b),
        (0.2973449752505362 * r) + (0.6273635662554660 * g) + (0.0752914584939979 * b),
        (0.0270313613864124 * r) + (0.0706888525358271 * g) + (0.9913375368376389 * b),
    ];
};

/**
 * Converts Display P3 Linear color values to Display P3.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @returns {[number, number, number]} The Display P3 values.
 */
export const displayP3LinearToDisplayP3 = (r, g, b) => {
    return [
        linearSrgbChannelToSrgb(r),
        linearSrgbChannelToSrgb(g),
        linearSrgbChannelToSrgb(b),
    ];
};

/**
 * Converts Display P3 Linear color values to XYZ D65.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @returns {[number, number, number]} The XYZ D65 values.
 */
export const displayP3LinearToXyzD65 = (r, g, b) => {
    return [
        (0.4865709486482163 * r) + (0.2656676931690929 * g) + (0.1982172852343625 * b),
        (0.2289745640697488 * r) + (0.6917385218365062 * g) + (0.0792869140937450 * b),
        (0.0451133818589026 * g) + (1.0439443689009757 * b),
    ];
};

/**
 * Converts Display P3 color values to Display P3 Linear.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @returns {[number, number, number]} The Display P3 Linear values.
 */
export const displayP3ToDisplayP3Linear = (r, g, b) => {
    return [
        srgbChannelToLinear(r),
        srgbChannelToLinear(g),
        srgbChannelToLinear(b),
    ];
};

/**
 * Converts HSL color values to SRGB.
 * @param {number} h The hue value. (0, 360)
 * @param {number} s The saturation value. (0, 1)
 * @param {number} l The lightness value. (0, 1)
 * @returns {[number, number, number]} The SRGB values.
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
 * @returns {[number, number, number]} The SRGB values.
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
 * @returns {[number, number, number]} The SRGB values.
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
 * @returns {[number, number, number]} The LCH values.
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
 * @returns {[number, number, number]} The XYZ D50 values.
 */
export const labToXyzD50 = (L, a, b) => {
    const epsilon = 216 / 24389;
    const kappa = 24389 / 27;
    const fy = (L + 16) / 116;
    const fx = fy + (a / 500);
    const fz = fy - (b / 200);

    const fx3 = fx ** 3;
    const fz3 = fz ** 3;

    const xr = fx3 > epsilon ?
        fx3 :
        (((116 * fx) - 16) / kappa);
    const yr = L > (kappa * epsilon) ?
        (fy ** 3) :
        (L / kappa);
    const zr = fz3 > epsilon ?
        fz3 :
        (((116 * fz) - 16) / kappa);

    return [
        xr * 0.9642956764295677,
        yr,
        zr * 0.8251046025104602,
    ];
};

/**
 * Converts LCH color values to LAB.
 * @param {number} L The lightness value. (0, 100)
 * @param {number} C The chroma value. (0, 230)
 * @param {number} H The hue value. (0, 360)
 * @returns {[number, number, number]} The LAB values.
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
 * @returns {[number, number, number]} The OK LCH values.
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
 * @returns {[number, number, number]} The XYZ D65 values.
 */
export const okLabToXyzD65 = (L, a, b) => {
    const l = Math.pow(L + (0.3963377773761749 * a) + (0.2158037573099136 * b), 3);
    const m = Math.pow(L - (0.1055613458156586 * a) - (0.0638541728258133 * b), 3);
    const s = Math.pow(L - (0.0894841775298119 * a) - (1.2914855480194092 * b), 3);

    return [
        (1.2268798758459243 * l) - (0.5578149944602171 * m) + (0.2813910456659647 * s),
        (-0.0405757452148008 * l) + (1.1122868032803170 * m) - (0.0717110580655164 * s),
        (-0.0763729366746601 * l) - (0.4214933324022432 * m) + (1.5869240198367816 * s),
    ];
};

/**
 * Converts OK LCH color values to OK LAB.
 * @param {number} L The lightness value. (0, 1)
 * @param {number} C The chroma value. (0, 0.4)
 * @param {number} H The hue value. (0, 360)
 * @returns {[number, number, number]} The OK LAB values.
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
 * @returns {[number, number, number]} The XYZ D50 values.
 */
export const prophotoRgbToXyzD50 = (r, g, b) => {
    const decode = (value) => Math.abs(value) <= 0.03125 ?
        value / 16 :
        powSigned(value, 1.8);

    r = decode(r);
    g = decode(g);
    b = decode(b);

    return [
        (0.7977666449006423 * r) + (0.1351812974005331 * g) + (0.0313477341283922 * b),
        (0.2880748288194013 * r) + (0.7118352342418730 * g) + (0.0000899369387256 * b),
        0.8251046025104602 * b,
    ];
};

/**
 * Converts Rec. 2020 color values to XYZ D65.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @returns {[number, number, number]} The XYZ D65 values.
 */
export const rec2020ToXyzD65 = (r, g, b) => {
    r = powSigned(r, 2.4);
    g = powSigned(g, 2.4);
    b = powSigned(b, 2.4);

    return [
        (0.6369580483012913 * r) + (0.1446169035862084 * g) + (0.1688809751641721 * b),
        (0.2627002120112670 * r) + (0.6779980715188710 * g) + (0.0593017164698619 * b),
        (0.0280726930490875 * g) + (1.0609850577107909 * b),
    ];
};

/**
 * Converts RGB color values to SRGB.
 * @param {number} r The red value. (0, 255)
 * @param {number} g The green value. (0, 255)
 * @param {number} b The blue value. (0, 255)
 * @returns {[number, number, number]} The SRGB values.
 */
export const rgbToSrgb = (r, g, b) => {
    return [r / 255, g / 255, b / 255];
};

/**
 * Converts SRGB Linear color values to SRGB.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @returns {[number, number, number]} The SRGB values.
 */
export const srgbLinearToSrgb = (r, g, b) => {
    return [
        linearSrgbChannelToSrgb(r),
        linearSrgbChannelToSrgb(g),
        linearSrgbChannelToSrgb(b),
    ];
};

/**
 * Converts SRGB Linear color values to XYZ D65.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @returns {[number, number, number]} The XYZ D65 values.
 */
export const srgbLinearToXyzD65 = (r, g, b) => {
    return [
        (0.4123907992659595 * r) + (0.3575843393838780 * g) + (0.1804807884018343 * b),
        (0.2126390058715104 * r) + (0.7151686787677559 * g) + (0.0721923153607337 * b),
        (0.0193308187155918 * r) + (0.1191947797946260 * g) + (0.9505321522496606 * b),
    ];
};

/**
 * Converts SRGB color values to HSL.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @returns {[number, number, number]} The HSL values.
 */
export const srgbToHsl = (r, g, b) => {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    const d = max - min;

    let h;
    let s;

    // Saturation is undefined at the lightness boundaries.
    if (d < 1e-12 || l === 0 || l === 1) {
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
 * @returns {[number, number, number]} The HSV values.
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
 * @returns {[number, number, number]} The HWB values.
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
 * @returns {number} The luma value.
 */
export const srgbToLuma = (r, g, b) => {
    r = srgbChannelToLinear(r);
    g = srgbChannelToLinear(g);
    b = srgbChannelToLinear(b);

    return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
};

/**
 * Converts SRGB color values to RGB.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @returns {[number, number, number]} The RGB values.
 */
export const srgbToRgb = (r, g, b) => {
    return [r * 255, g * 255, b * 255];
};

/**
 * Converts SRGB color values to SRGB Linear.
 * @param {number} r The red value. (0, 1)
 * @param {number} g The green value. (0, 1)
 * @param {number} b The blue value. (0, 1)
 * @returns {[number, number, number]} The SRGB Linear values.
 */
export const srgbToSrgbLinear = (r, g, b) => {
    return [
        srgbChannelToLinear(r),
        srgbChannelToLinear(g),
        srgbChannelToLinear(b),
    ];
};

/**
 * Converts XYZ D50 color values to LAB.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @returns {[number, number, number]} The LAB values.
 */
export const xyzD50ToLab = (x, y, z) => {
    const epsilon = 216 / 24389;
    const kappa = 24389 / 27;
    const encode = (value) => value > epsilon ?
        Math.pow(value, 1 / 3) :
        (((kappa * value) + 16) / 116);

    const xr = x / 0.9642956764295677;
    const yr = y;
    const zr = z / 0.8251046025104602;

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
 * @returns {[number, number, number]} The ProPhoto RGB values.
 */
export const xyzD50ToProPhotoRgb = (x, y, z) => {
    const encode = (value) => Math.abs(value) >= 0.001953125 ?
        powSigned(value, 1 / 1.8) :
        value * 16;

    let r = (1.3457868816471583 * x) - (0.2555720873797946 * y) - (0.0511018649755453 * z);
    let g = (-0.5446307051249019 * x) + (1.5082477428451468 * y) + (0.0205274474364214 * z);
    let b = 1.2119675456389452 * z;

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
 * @returns {[number, number, number]} The XYZ D65 values.
 */
export const xyzD50ToXyzD65 = (x, y, z) => {
    return [
        (0.9554734214880750 * x) - (0.0230984549487647 * y) + (0.0632592432005707 * z),
        (-0.0283697093338637 * x) + (1.0099953980813041 * y) + (0.0210414411919173 * z),
        (0.0123140148644820 * x) - (0.0205076492988990 * y) + (1.330365926242124 * z),
    ];
};

/**
 * Converts XYZ D65 color values to A98 RGB.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @returns {[number, number, number]} The A98 RGB values.
 */
export const xyzD65ToA98Rgb = (x, y, z) => {
    const r = (2.0415879038107461 * x) - (0.5650069742788596 * y) - (0.3447313507783295 * z);
    const g = (-0.9692436362808798 * x) + (1.8759675015077206 * y) + (0.0415550574071756 * z);
    const b = (0.0134442806320310 * x) - (0.1183623922310182 * y) + (1.0151749943912054 * z);
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
 * @returns {[number, number, number]} The Display P3 Linear values.
 */
export const xyzD65ToDisplayP3Linear = (x, y, z) => {
    return [
        (2.4934969119414245 * x) - (0.9313836179191236 * y) - (0.4027107844507168 * z),
        (-0.8294889695615750 * x) + (1.7626640603183468 * y) + (0.0236246858419436 * z),
        (0.0358458302437843 * x) - (0.0761723892680417 * y) + (0.9568845240076873 * z),
    ];
};

/**
 * Converts XYZ D65 color values to OK LAB.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @returns {[number, number, number]} The OK LAB values.
 */
export const xyzD65ToOkLab = (x, y, z) => {
    let l = (0.8190224379967030 * x) + (0.3619062600528904 * y) - (0.1288737815209879 * z);
    let m = (0.0329836539323885 * x) + (0.9292868615863434 * y) + (0.0361446663506424 * z);
    let s = (0.0481771893596242 * x) + (0.2642395317527308 * y) + (0.6335478284694309 * z);

    l = Math.cbrt(l);
    m = Math.cbrt(m);
    s = Math.cbrt(s);

    return [
        (0.2104542683093140 * l) + (0.7936177747023054 * m) - (0.0040720430116193 * s),
        (1.9779985324311684 * l) - (2.4285922420485799 * m) + (0.4505937096174110 * s),
        (0.0259040424655478 * l) + (0.7827717124575296 * m) - (0.8086757549230774 * s),
    ];
};

/**
 * Converts XYZ D65 color values to Rec. 2020.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @returns {[number, number, number]} The Rec. 2020 values.
 */
export const xyzD65ToRec2020 = (x, y, z) => {
    const r = (1.7166511879712676 * x) - (0.3556707837763924 * y) - (0.2533662813736598 * z);
    const g = (-0.6666843518324890 * x) + (1.6164812366349390 * y) + (0.0157685458139111 * z);
    const b = (0.0176398574453109 * x) - (0.0427706132578087 * y) + (0.9421031212354740 * z);

    return [
        powSigned(r, 1 / 2.4),
        powSigned(g, 1 / 2.4),
        powSigned(b, 1 / 2.4),
    ];
};

/**
 * Converts XYZ D65 color values to SRGB Linear.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @returns {[number, number, number]} The SRGB Linear values.
 */
export const xyzD65ToSrgbLinear = (x, y, z) => {
    return [
        (3.2409699419045213 * x) - (1.5373831775700935 * y) - (0.4986107602930033 * z),
        (-0.9692436362808798 * x) + (1.8759675015077206 * y) + (0.0415550574071756 * z),
        (0.0556300796969936 * x) - (0.2039769588889766 * y) + (1.0569715142428786 * z),
    ];
};

/**
 * Converts XYZ D65 color values to XYZ D50.
 * @param {number} x The x value. (0, 1)
 * @param {number} y The y value. (0, 1)
 * @param {number} z The z value. (0, 1)
 * @returns {[number, number, number]} The XYZ D50 values.
 */
export const xyzD65ToXyzD50 = (x, y, z) => {
    return [
        (1.0479297925449969 * x) + (0.0229468706016097 * y) - (0.0501922662892052 * z),
        (0.0296278087700560 * x) + (0.9904344267538799 * y) - (0.0170737990634188 * z),
        (-0.0092430406462045 * x) + (0.0150551914902982 * y) + (0.7518742814281371 * z),
    ];
};
