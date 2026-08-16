import RgbColor from '../channels/rgb-color.js';
import { srgbToHsl, srgbToHwb, srgbToLuma, srgbToRgb, srgbToSrgbLinear } from '../conversions.js';

/**
 * Represents an sRGB color.
 */
export default class Srgb extends RgbColor {
    static COLOR_SPACE = 'srgb';

    /** @inheritdoc */
    luma() {
        return srgbToLuma(this.red, this.green, this.blue);
    }

    /** @inheritdoc */
    toHsl() {
        const [hue, saturation, lightness] = srgbToHsl(this.red, this.green, this.blue);

        return new this.constructor.Hsl(hue, saturation * 100, lightness * 100, this.alpha);
    }

    /** @inheritdoc */
    toHwb() {
        const [hue, whiteness, blackness] = srgbToHwb(this.red, this.green, this.blue);

        return new this.constructor.Hwb(hue, whiteness * 100, blackness * 100, this.alpha);
    }

    /** @inheritdoc */
    toRgb() {
        const [red, green, blue] = srgbToRgb(this.red, this.green, this.blue);

        return new this.constructor.Rgb(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toSrgb() {
        return this;
    }

    /** @inheritdoc */
    toSrgbLinear() {
        const [red, green, blue] = srgbToSrgbLinear(this.red, this.green, this.blue);

        return new this.constructor.SrgbLinear(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toString(alpha = null, precision = 2) {
        return this.toColorString(alpha, precision);
    }
}
