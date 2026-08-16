import RgbColor from '../channels/rgb-color.js';
import { srgbLinearToSrgb, srgbLinearToXyzD65 } from '../conversions.js';

/**
 * Represents a linear sRGB color.
 */
export default class SrgbLinear extends RgbColor {
    static COLOR_SPACE = 'srgb-linear';

    /** @inheritdoc */
    toSrgb() {
        const [red, green, blue] = srgbLinearToSrgb(this.red, this.green, this.blue);

        return new this.constructor.Srgb(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toSrgbLinear() {
        return this;
    }

    /** @inheritdoc */
    toString(alpha = null, precision = 2) {
        return this.toColorString(alpha, precision);
    }

    /** @inheritdoc */
    toXyzD65() {
        const [x, y, z] = srgbLinearToXyzD65(this.red, this.green, this.blue);

        return new this.constructor.XyzD65(x, y, z, this.alpha);
    }
}
