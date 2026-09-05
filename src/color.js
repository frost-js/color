/** @import A98Rgb from './spaces/a98-rgb.js' */
/** @import DisplayP3 from './spaces/display-p3.js' */
/** @import DisplayP3Linear from './spaces/display-p3-linear.js' */
/** @import Hex from './spaces/hex.js' */
/** @import Hsl from './spaces/hsl.js' */
/** @import Hwb from './spaces/hwb.js' */
/** @import Lab from './spaces/lab.js' */
/** @import Lch from './spaces/lch.js' */
/** @import OkLab from './spaces/ok-lab.js' */
/** @import OkLch from './spaces/ok-lch.js' */
/** @import ProPhotoRgb from './spaces/pro-photo-rgb.js' */
/** @import Rec2020 from './spaces/rec-2020.js' */
/** @import Rgb from './spaces/rgb.js' */
/** @import Srgb from './spaces/srgb.js' */
/** @import SrgbLinear from './spaces/srgb-linear.js' */
/** @import XyzD50 from './spaces/xyz-d50.js' */
/** @import XyzD65 from './spaces/xyz-d65.js' */

import { clamp, isInGamut, parseCssAngle, parseCssArguments, parseCssNumber, roundValue } from './helpers.js';
import { CONVERSION_MAP, CSS_COLORS, FIT_GAMUT_PRECISION, FIT_GAMUT_RANGES } from './vars.js';

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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
     */
    static fromSrgbLinear(red = 0, green = 0, blue = 0, alpha = 1) {
        return new this.SrgbLinear(red, green, blue, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Parses a CSS color string into a color instance.
     * @param {string} string The CSS color string to parse.
     * @returns {Color} The parsed color instance.
     * @throws {TypeError} If the string is not a supported CSS color value.
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
     * @returns {Color} The converted color instance.
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
     * @returns {Color} The converted color instance.
     */
    static fromXyzD65(x = 0, y = 0, z = 0, alpha = 1) {
        return new this.XyzD65(x, y, z, alpha).to(this.COLOR_SPACE);
    }

    /**
     * Creates a color base instance with an alpha channel.
     * @param {number} [alpha=1] The alpha channel value.
     * @throws {TypeError} If the abstract base class is instantiated directly.
     */
    constructor(alpha = 1) {
        if (new.target === Color) {
            throw new TypeError('Color is abstract and cannot be instantiated directly.');
        }

        this.alpha = clamp(alpha);
    }

    /**
     * Composites this color over a background color using source-over alpha compositing in sRGB.
     * @param {Color} background The background color.
     * @returns {this} The composited color in the foreground's concrete class.
     */
    composite(background) {
        const foreground = this.toSrgb();
        const convertedBackground = background.toSrgb();
        const foregroundAlpha = foreground.getAlpha();
        const backgroundAlpha = convertedBackground.getAlpha();
        const backgroundContribution = backgroundAlpha * (1 - foregroundAlpha);
        const alpha = foregroundAlpha + backgroundContribution;

        if (alpha === 0) {
            return this;
        }

        const foregroundWeight = foregroundAlpha / alpha;
        const backgroundWeight = backgroundContribution / alpha;
        const red = (foreground.getRed() * foregroundWeight) +
            (convertedBackground.getRed() * backgroundWeight);
        const green = (foreground.getGreen() * foregroundWeight) +
            (convertedBackground.getGreen() * backgroundWeight);
        const blue = (foreground.getBlue() * foregroundWeight) +
            (convertedBackground.getBlue() * backgroundWeight);

        return this.constructor.fromSrgb(red, green, blue, alpha);
    }

    /**
     * Calculates the contrast between this and another color.
     * @param {Color} other The other color.
     * @returns {number} The contrast ratio.
     * @throws {TypeError} If either color is not fully opaque.
     */
    contrast(other) {
        if (this.alpha < 1 || other.alpha < 1) {
            throw new TypeError('Contrast can only be calculated between fully opaque colors.');
        }

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
     * @returns {this} A color that fits within the requested gamut.
     * @throws {TypeError} If gamut fitting is unsupported for the target space.
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
        const lightness = okLch.getLightness();

        if (lightness <= 0 || lightness >= 1) {
            const fitted = okLch.withLightness(clamp(lightness)).withChroma(0);

            return fitted.to(this.constructor.COLOR_SPACE);
        }

        const chromaSign = Math.sign(okLch.getChroma());
        let low = 0;
        let high = Math.abs(okLch.getChroma());

        while (high - low > FIT_GAMUT_PRECISION) {
            const mid = (low + high) / 2;
            const candidate = okLch.withChroma(mid * chromaSign);

            if (isInGamut(candidate.to(space), space, FIT_GAMUT_RANGES)) {
                low = mid;
            } else {
                high = mid;
            }
        }

        return okLch.withChroma(low * chromaSign).to(this.constructor.COLOR_SPACE);
    }

    /**
     * Returns the alpha channel.
     * @returns {number} The alpha channel value.
     */
    getAlpha() {
        return this.alpha;
    }

    /**
     * Returns the closest CSS named color for this color.
     * @returns {string} The nearest CSS color keyword.
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
     * @returns {number} The relative luminance.
     */
    luma() {
        return this.toSrgb().luma();
    }

    /**
     * Returns the current color-space identifier.
     * @returns {string} The color-space identifier.
     */
    space() {
        return this.constructor.COLOR_SPACE;
    }

    /**
     * Converts the color to another color space.
     * @param {string} space The target color-space identifier.
     * @returns {Color} The converted color.
     * @throws {TypeError} If the target space is not supported.
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
     * @returns {A98Rgb} The converted color.
     */
    toA98Rgb() {
        return this.toXyzD65().toA98Rgb();
    }

    /**
     * Serializes the color using CSS `color(...)` syntax.
     * @param {boolean|null} [alpha=null] Whether to include alpha.
     * @param {number} [precision=2] The numeric precision.
     * @returns {string} The serialized color string.
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
     * @returns {DisplayP3} The converted color.
     */
    toDisplayP3() {
        return this.toDisplayP3Linear().toDisplayP3();
    }

    /**
     * Converts the color to linear Display P3.
     * @returns {DisplayP3Linear} The converted color.
     */
    toDisplayP3Linear() {
        return this.toXyzD65().toDisplayP3Linear();
    }

    /**
     * Converts the color to Hex/RGB keyword formatting.
     * @returns {Hex} The converted color.
     */
    toHex() {
        return this.toRgb().toHex();
    }

    /**
     * Converts the color to HSL.
     * @returns {Hsl} The converted color.
     */
    toHsl() {
        return this.toSrgb().toHsl();
    }

    /**
     * Converts the color to HWB.
     * @returns {Hwb} The converted color.
     */
    toHwb() {
        return this.toSrgb().toHwb();
    }

    /**
     * Converts the color to Lab.
     * @returns {Lab} The converted color.
     */
    toLab() {
        return this.toXyzD50().toLab();
    }

    /**
     * Converts the color to LCH.
     * @returns {Lch} The converted color.
     */
    toLch() {
        return this.toLab().toLch();
    }

    /**
     * Returns the color state as a plain object.
     * @abstract
     * @returns {Record<string, number>} The channel object.
     * @throws {TypeError} If a subclass does not implement serialization.
     */
    toObject() {
        throw new TypeError('Color.toObject must be implemented by subclasses.');
    }

    /**
     * Converts the color to OKLab.
     * @returns {OkLab} The converted color.
     */
    toOkLab() {
        return this.toXyzD65().toOkLab();
    }

    /**
     * Converts the color to OKLCH.
     * @returns {OkLch} The converted color.
     */
    toOkLch() {
        return this.toOkLab().toOkLch();
    }

    /**
     * Converts the color to ProPhoto RGB.
     * @returns {ProPhotoRgb} The converted color.
     */
    toProPhotoRgb() {
        return this.toXyzD50().toProPhotoRgb();
    }

    /**
     * Converts the color to Rec. 2020.
     * @returns {Rec2020} The converted color.
     */
    toRec2020() {
        return this.toXyzD65().toRec2020();
    }

    /**
     * Converts the color to RGB.
     * @returns {Rgb} The converted color.
     */
    toRgb() {
        return this.toSrgb().toRgb();
    }

    /**
     * Converts the color to sRGB.
     * @returns {Srgb} The converted color.
     */
    toSrgb() {
        return this.toSrgbLinear().toSrgb();
    }

    /**
     * Converts the color to linear sRGB.
     * @returns {SrgbLinear} The converted color.
     */
    toSrgbLinear() {
        return this.toXyzD65().toSrgbLinear();
    }

    /**
     * Serializes the color to a CSS string.
     * @param {boolean|null} [alpha=null] Whether to include alpha when the format supports it.
     * @param {number} [precision=2] The numeric precision when the format supports it.
     * @abstract
     * @returns {string} The serialized color string.
     * @throws {TypeError} If a subclass does not implement string formatting.
     */
    toString(alpha = null, precision = 2) {
        void alpha;
        void precision;

        throw new TypeError('Color.toString must be implemented by subclasses.');
    }

    /**
     * Converts the color to XYZ D50.
     * @returns {XyzD50} The converted color.
     */
    toXyzD50() {
        return this.toXyzD65().toXyzD50();
    }

    /**
     * Converts the color to XYZ D65.
     * @returns {XyzD65} The converted color.
     */
    toXyzD65() {
        return this.toSrgbLinear().toXyzD65();
    }

    /**
     * Returns a copy with a different alpha channel.
     * @param {number} alpha The replacement alpha channel.
     * @returns {this} A new color instance.
     */
    withAlpha(alpha) {
        const [channel1, channel2, channel3] = Object.values(this.toObject());

        return new this.constructor(channel1, channel2, channel3, alpha);
    }
}
