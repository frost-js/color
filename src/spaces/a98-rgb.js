import RgbColor from '../channels/rgb-color.js';
import { a98RgbToXyzD65 } from '../conversions.js';

/**
 * Represents an A98 RGB color.
 */
export default class A98Rgb extends RgbColor {
    static COLOR_SPACE = 'a98-rgb';

    /** @inheritdoc */
    toA98Rgb() {
        return this;
    }

    /** @inheritdoc */
    toString(alpha = null, precision = 2) {
        return this.toColorString(alpha, precision);
    }

    /** @inheritdoc */
    toXyzD65() {
        const [x, y, z] = a98RgbToXyzD65(this.red, this.green, this.blue);

        return new this.constructor.XyzD65(x, y, z, this.alpha);
    }
}
