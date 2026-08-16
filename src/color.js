import { clamp, isInGamut, parseCssAngle, parseCssArguments, parseCssNumber, roundValue } from './helpers.js';
import { CONVERSION_MAP, CSS_COLORS, FIT_GAMUT_RANGES } from './vars.js';

/**
 * @typedef {import('./spaces/a98-rgb.js').default} A98Rgb
 * @typedef {import('./spaces/display-p3.js').default} DisplayP3
 * @typedef {import('./spaces/display-p3-linear.js').default} DisplayP3Linear
 * @typedef {import('./spaces/hex.js').default} Hex
 * @typedef {import('./spaces/hsl.js').default} Hsl
 * @typedef {import('./spaces/hwb.js').default} Hwb
 * @typedef {import('./spaces/lab.js').default} Lab
 * @typedef {import('./spaces/lch.js').default} Lch
 * @typedef {import('./spaces/ok-lab.js').default} OkLab
 * @typedef {import('./spaces/ok-lch.js').default} OkLch
 * @typedef {import('./spaces/pro-photo-rgb.js').default} ProPhotoRgb
 * @typedef {import('./spaces/rec-2020.js').default} Rec2020
 * @typedef {import('./spaces/rgb.js').default} Rgb
 * @typedef {import('./spaces/srgb.js').default} Srgb
 * @typedef {import('./spaces/srgb-linear.js').default} SrgbLinear
 * @typedef {import('./spaces/xyz-d50.js').default} XyzD50
 * @typedef {import('./spaces/xyz-d65.js').default} XyzD65
 */

/**
 * Provides color parsing, formatting, and conversion utilities.
 *
 * Note: Hue values are wrapped to 0-360 and alpha values are clamped to 0-1.
 * Other channels preserve extended values to avoid conversion clipping.
 */
export default class Color {
    static COLOR_SPACE = '';

    /**
     * Creates a color from A98 RGB channels.
     * @param {number} [red=0] The red channel value.
     * @param {number} [green=0] The green channel value.
     * @param {number} [blue=0] The blue channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromA98Rgb(red = 0, green = 0, blue = 0, alpha = 1) {
        return new this.A98Rgb(red, green, blue, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from Display P3 channels.
     * @param {number} [red=0] The red channel value.
     * @param {number} [green=0] The green channel value.
     * @param {number} [blue=0] The blue channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromDisplayP3(red = 0, green = 0, blue = 0, alpha = 1) {
        return new this.DisplayP3(red, green, blue, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from linear Display P3 channels.
     * @param {number} [red=0] The red channel value.
     * @param {number} [green=0] The green channel value.
     * @param {number} [blue=0] The blue channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromDisplayP3Linear(red = 0, green = 0, blue = 0, alpha = 1) {
        return new this.DisplayP3Linear(red, green, blue, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from HSL channels.
     * @param {number} [hue=0] The hue channel value in degrees.
     * @param {number} [saturation=0] The saturation channel value.
     * @param {number} [lightness=0] The lightness channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromHsl(hue = 0, saturation = 0, lightness = 0, alpha = 1) {
        return new this.Hsl(hue, saturation, lightness, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from HWB channels.
     * @param {number} [hue=0] The hue channel value in degrees.
     * @param {number} [whiteness=0] The whiteness channel value.
     * @param {number} [blackness=0] The blackness channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromHwb(hue = 0, whiteness = 0, blackness = 0, alpha = 1) {
        return new this.Hwb(hue, whiteness, blackness, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from Lab channels.
     * @param {number} [lightness=0] The lightness channel value.
     * @param {number} [a=0] The a channel value.
     * @param {number} [b=0] The b channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromLab(lightness = 0, a = 0, b = 0, alpha = 1) {
        return new this.Lab(lightness, a, b, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from LCH channels.
     * @param {number} [lightness=0] The lightness channel value.
     * @param {number} [chroma=0] The chroma channel value.
     * @param {number} [hue=0] The hue channel value in degrees.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromLch(lightness = 0, chroma = 0, hue = 0, alpha = 1) {
        return new this.Lch(lightness, chroma, hue, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from OKLab channels.
     * @param {number} [lightness=0] The lightness channel value.
     * @param {number} [a=0] The a channel value.
     * @param {number} [b=0] The b channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromOkLab(lightness = 0, a = 0, b = 0, alpha = 1) {
        return new this.OkLab(lightness, a, b, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from OKLCH channels.
     * @param {number} [lightness=0] The lightness channel value.
     * @param {number} [chroma=0] The chroma channel value.
     * @param {number} [hue=0] The hue channel value in degrees.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromOkLch(lightness = 0, chroma = 0, hue = 0, alpha = 1) {
        return new this.OkLch(lightness, chroma, hue, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from ProPhoto RGB channels.
     * @param {number} [red=0] The red channel value.
     * @param {number} [green=0] The green channel value.
     * @param {number} [blue=0] The blue channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromProPhotoRgb(red = 0, green = 0, blue = 0, alpha = 1) {
        return new this.ProPhotoRgb(red, green, blue, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from Rec. 2020 channels.
     * @param {number} [red=0] The red channel value.
     * @param {number} [green=0] The green channel value.
     * @param {number} [blue=0] The blue channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromRec2020(red = 0, green = 0, blue = 0, alpha = 1) {
        return new this.Rec2020(red, green, blue, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from RGB channels.
     * @param {number} [red=0] The red channel value.
     * @param {number} [green=0] The green channel value.
     * @param {number} [blue=0] The blue channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromRgb(red = 0, green = 0, blue = 0, alpha = 1) {
        return new this.Rgb(red, green, blue, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from sRGB channels.
     * @param {number} [red=0] The red channel value.
     * @param {number} [green=0] The green channel value.
     * @param {number} [blue=0] The blue channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromSrgb(red = 0, green = 0, blue = 0, alpha = 1) {
        return new this.Srgb(red, green, blue, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from linear sRGB channels.
     * @param {number} [red=0] The red channel value.
     * @param {number} [green=0] The green channel value.
     * @param {number} [blue=0] The blue channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromSrgbLinear(red = 0, green = 0, blue = 0, alpha = 1) {
        return new this.SrgbLinear(red, green, blue, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Parses a CSS color string into a color instance.
     * @param {string} string The CSS color string to parse.
     * @return {Color} The parsed color instance.
     * @throws {TypeError} Thrown when the string is not a supported CSS color value.
     */
    static fromString(string) {
        string = String(string).replace(/\s+/g, ' ').trim().toLowerCase();

        if (string === 'transparent') {
            return this.fromRgb(0, 0, 0, 0);
        }

        if (Object.hasOwn(CSS_COLORS, string)) {
            string = CSS_COLORS[string];
        }

        const hexMatch = string.match(/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);

        if (hexMatch) {
            let hex = hexMatch[1];

            if (hex.length <= 4) {
                hex = [...hex].map((char) => char + char).join('');
            }

            return new this.Hex(
                Number.parseInt(hex.slice(0, 2), 16),
                Number.parseInt(hex.slice(2, 4), 16),
                Number.parseInt(hex.slice(4, 6), 16),
                hex.length > 6 ?
                    (Number.parseInt(hex.slice(6, 8), 16) / 255) :
                    1,
            ).to(this.COLOR_SPACE);
        }

        try {
            const functionalMatch = string.match(/^(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)\((.+)\)$/);

            if (functionalMatch) {
                const [, space, rawParts] = functionalMatch;
                const parts = parseCssArguments(
                    rawParts,
                    ['rgb', 'rgba', 'hsl', 'hsla', 'hwb'].includes(space),
                );

                switch (space) {
                    case 'hsl':
                    case 'hsla':
                        return this.fromHsl(
                            parseCssAngle(parts[0]),
                            parseCssNumber(parts[1], 100),
                            parseCssNumber(parts[2], 100),
                            parseCssNumber(parts[3]),
                        );
                    case 'hwb':
                        return this.fromHwb(
                            parseCssAngle(parts[0]),
                            parseCssNumber(parts[1], 100),
                            parseCssNumber(parts[2], 100),
                            parseCssNumber(parts[3]),
                        );
                    case 'lab':
                        return this.fromLab(
                            parseCssNumber(parts[0], 100),
                            parseCssNumber(parts[1], 125),
                            parseCssNumber(parts[2], 125),
                            parseCssNumber(parts[3]),
                        );
                    case 'lch':
                        return this.fromLch(
                            parseCssNumber(parts[0], 100),
                            Math.max(0, parseCssNumber(parts[1], 150)),
                            parseCssAngle(parts[2]),
                            parseCssNumber(parts[3]),
                        );
                    case 'oklab':
                        return this.fromOkLab(
                            parseCssNumber(parts[0]),
                            parseCssNumber(parts[1], 0.4),
                            parseCssNumber(parts[2], 0.4),
                            parseCssNumber(parts[3]),
                        );
                    case 'oklch':
                        return this.fromOkLch(
                            parseCssNumber(parts[0]),
                            Math.max(0, parseCssNumber(parts[1], 0.4)),
                            parseCssAngle(parts[2]),
                            parseCssNumber(parts[3]),
                        );
                    case 'rgb':
                    case 'rgba':
                        return this.fromRgb(
                            parseCssNumber(parts[0], 255),
                            parseCssNumber(parts[1], 255),
                            parseCssNumber(parts[2], 255),
                            parseCssNumber(parts[3]),
                        );
                    default:
                        break;
                }
            }

            const colorMatch = string.match(/^color\((a98-rgb|display-p3(?:-linear)?|prophoto-rgb|rec2020|srgb(?:-linear)?|xyz(?:-d50|-d65)?)\s+(.+)\)$/);

            if (colorMatch) {
                const [, space, rawParts] = colorMatch;
                const parts = parseCssArguments(rawParts);
                const values = parts.map((value) => parseCssNumber(value));

                switch (space) {
                    case 'a98-rgb':
                        return this.fromA98Rgb(...values);
                    case 'display-p3':
                        return this.fromDisplayP3(...values);
                    case 'display-p3-linear':
                        return this.fromDisplayP3Linear(...values);
                    case 'prophoto-rgb':
                        return this.fromProPhotoRgb(...values);
                    case 'rec2020':
                        return this.fromRec2020(...values);
                    case 'srgb':
                        return this.fromSrgb(...values);
                    case 'srgb-linear':
                        return this.fromSrgbLinear(...values);
                    case 'xyz-d50':
                        return this.fromXyzD50(...values);
                    case 'xyz':
                    case 'xyz-d65':
                        return this.fromXyzD65(...values);
                    default:
                        break;
                }
            }
        } catch (error) {
            if (!(error instanceof SyntaxError)) {
                throw error;
            }
        }

        throw new TypeError(`Color string \`${string}\` is not valid.`);
    }

    /**
     * Creates a color from XYZ D50 channels.
     * @param {number} [x=0] The x channel value.
     * @param {number} [y=0] The y channel value.
     * @param {number} [z=0] The z channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromXyzD50(x = 0, y = 0, z = 0, alpha = 1) {
        return new this.XyzD50(x, y, z, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color from XYZ D65 channels.
     * @param {number} [x=0] The x channel value.
     * @param {number} [y=0] The y channel value.
     * @param {number} [z=0] The z channel value.
     * @param {number} [alpha=1] The alpha channel value.
     * @return {Color} The converted color instance.
     */
    static fromXyzD65(x = 0, y = 0, z = 0, alpha = 1) {
        return new this.XyzD65(x, y, z, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color base instance with an alpha channel.
     * @param {number} [alpha=1] The alpha channel value.
     * @throws {TypeError} Thrown when the abstract base class is instantiated directly.
     */
    constructor(alpha = 1) {
        if (new.target === Color) {
            throw new TypeError('Color is abstract and cannot be instantiated directly.');
        }

        this.alpha = clamp(alpha);
    }

    /**
     * Calculates the contrast between this and another color.
     * @param {Color} other The other color.
     * @return {number} The contrast ratio.
     */
    contrast(other) {
        const l1 = this.luma();
        const l2 = other.luma();

        if (l1 < l2) {
            return (l2 + 0.05) / (l1 + 0.05);
        }

        return (l1 + 0.05) / (l2 + 0.05);
    }

    /**
     * Fits the color into a supported gamut by reducing OKLCH chroma.
     * @param {string} [space='srgb'] The target gamut identifier.
     * @return {this} A color that fits within the requested gamut.
     * @throws {TypeError} Thrown when gamut fitting is unsupported for the target space.
     */
    fitGamut(space = 'srgb') {
        if (!Object.hasOwn(FIT_GAMUT_RANGES, space)) {
            throw new TypeError(`Color space \`${space}\` does not support gamut fitting.`);
        }

        const converted = this.to(space);

        if (isInGamut(converted, space, FIT_GAMUT_RANGES)) {
            return this;
        }

        const okLch = this.toOkLch();
        let low = 0;
        let high = Math.max(0, okLch.getChroma());
        let best = new this.constructor.OkLch(
            okLch.getLightness(),
            0,
            okLch.getHue(),
            okLch.getAlpha(),
        );

        for (let index = 0; index < 24; index += 1) {
            const mid = (low + high) / 2;
            const candidate = new this.constructor.OkLch(
                okLch.getLightness(),
                mid,
                okLch.getHue(),
                okLch.getAlpha(),
            );

            if (isInGamut(candidate.to(space), space, FIT_GAMUT_RANGES)) {
                best = candidate;
                low = mid;
            } else {
                high = mid;
            }
        }

        return best.to(this.constructor.COLOR_SPACE);
    }

    /**
     * Returns the alpha channel.
     * @return {number} The alpha channel value.
     */
    getAlpha() {
        return this.alpha;
    }

    /**
     * Returns the closest CSS named color for this color.
     * @return {string} The nearest CSS color keyword.
     */
    label() {
        const source = Object.values(this.toObject());
        let closest = '';
        let closestDistance = Number.POSITIVE_INFINITY;

        for (const [label, hex] of Object.entries(CSS_COLORS)) {
            const target = Object.values(this.constructor.fromString(hex).toObject());
            const distance = Math.hypot(
                source[0] - target[0],
                source[1] - target[1],
                source[2] - target[2],
            );

            if (distance < closestDistance) {
                closest = label;
                closestDistance = distance;
            }
        }

        return closest;
    }

    /**
     * Returns the relative luminance for this color.
     * @return {number} The relative luminance.
     */
    luma() {
        return this.toSrgb().luma();
    }

    /**
     * Returns the current color-space identifier.
     * @return {string} The color-space identifier.
     */
    space() {
        return this.constructor.COLOR_SPACE;
    }

    /**
     * Converts the color to another color space.
     * @param {string} space The target color-space identifier.
     * @return {Color} The converted color.
     * @throws {TypeError} Thrown when the target space is not supported.
     */
    to(space) {
        if (!space || this.constructor.COLOR_SPACE === space) {
            return this;
        }

        const method = CONVERSION_MAP[space];

        if (!method) {
            throw new TypeError(`Color space \`${space}\` is not valid.`);
        }

        return this[method]();
    }

    /**
     * Converts the color to A98 RGB.
     * @return {A98Rgb} The converted color.
     */
    toA98Rgb() {
        return this.toXyzD65().toA98Rgb();
    }

    /**
     * Serializes the color using CSS `color(...)` syntax.
     * @param {boolean|null} [alpha=null] Whether to include alpha.
     * @param {number} [precision=2] The numeric precision.
     * @return {string} The serialized color string.
     */
    toColorString(alpha = null, precision = 2) {
        alpha ??= this.alpha < 1;

        const values = Object.values(this.toObject());
        let result = `color(${this.constructor.COLOR_SPACE} ${roundValue(values[0], precision)} ${roundValue(values[1], precision)} ${roundValue(values[2], precision)}`;

        if (alpha) {
            result += ` / ${roundValue(this.alpha, precision)}`;
        }

        result += ')';

        return result;
    }

    /**
     * Converts the color to Display P3.
     * @return {DisplayP3} The converted color.
     */
    toDisplayP3() {
        return this.toDisplayP3Linear().toDisplayP3();
    }

    /**
     * Converts the color to linear Display P3.
     * @return {DisplayP3Linear} The converted color.
     */
    toDisplayP3Linear() {
        return this.toXyzD65().toDisplayP3Linear();
    }

    /**
     * Converts the color to Hex/RGB keyword formatting.
     * @return {Hex} The converted color.
     */
    toHex() {
        return this.toRgb().toHex();
    }

    /**
     * Converts the color to HSL.
     * @return {Hsl} The converted color.
     */
    toHsl() {
        return this.toSrgb().toHsl();
    }

    /**
     * Converts the color to HWB.
     * @return {Hwb} The converted color.
     */
    toHwb() {
        return this.toSrgb().toHwb();
    }

    /**
     * Converts the color to Lab.
     * @return {Lab} The converted color.
     */
    toLab() {
        return this.toXyzD50().toLab();
    }

    /**
     * Converts the color to LCH.
     * @return {Lch} The converted color.
     */
    toLch() {
        return this.toLab().toLch();
    }

    /**
     * Returns the color state as a plain object.
     * @return {Record<string, number>} The channel object.
     * @throws {TypeError} Thrown when a subclass does not implement serialization.
     */
    toObject() {
        throw new TypeError('Color.toObject must be implemented by subclasses.');
    }

    /**
     * Converts the color to OKLab.
     * @return {OkLab} The converted color.
     */
    toOkLab() {
        return this.toXyzD65().toOkLab();
    }

    /**
     * Converts the color to OKLCH.
     * @return {OkLch} The converted color.
     */
    toOkLch() {
        return this.toOkLab().toOkLch();
    }

    /**
     * Converts the color to ProPhoto RGB.
     * @return {ProPhotoRgb} The converted color.
     */
    toProPhotoRgb() {
        return this.toXyzD50().toProPhotoRgb();
    }

    /**
     * Converts the color to Rec. 2020.
     * @return {Rec2020} The converted color.
     */
    toRec2020() {
        return this.toXyzD65().toRec2020();
    }

    /**
     * Converts the color to RGB.
     * @return {Rgb} The converted color.
     */
    toRgb() {
        return this.toSrgb().toRgb();
    }

    /**
     * Converts the color to sRGB.
     * @return {Srgb} The converted color.
     */
    toSrgb() {
        return this.toSrgbLinear().toSrgb();
    }

    /**
     * Converts the color to linear sRGB.
     * @return {SrgbLinear} The converted color.
     */
    toSrgbLinear() {
        return this.toXyzD65().toSrgbLinear();
    }

    /**
     * Serializes the color to a CSS string.
     * @param {boolean|null} [alpha=null] Whether to include alpha when the format supports it.
     * @param {number} [precision=2] The numeric precision when the format supports it.
     * @return {string} The serialized color string.
     * @throws {TypeError} Thrown when a subclass does not implement string formatting.
     */
    toString() {
        throw new TypeError('Color.toString must be implemented by subclasses.');
    }

    /**
     * Converts the color to XYZ D50.
     * @return {XyzD50} The converted color.
     */
    toXyzD50() {
        return this.toXyzD65().toXyzD50();
    }

    /**
     * Converts the color to XYZ D65.
     * @return {XyzD65} The converted color.
     */
    toXyzD65() {
        return this.toSrgbLinear().toXyzD65();
    }

    /**
     * Returns a copy with a different alpha channel.
     * @param {number} alpha The replacement alpha channel.
     * @return {this} A new color instance.
     */
    withAlpha(alpha) {
        return new this.constructor(...Object.values({
            ...this.toObject(),
            alpha,
        }));
    }
}
