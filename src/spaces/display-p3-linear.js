import RgbColor from '../channels/rgb-color.js';
import { displayP3LinearToDisplayP3, displayP3LinearToXyzD65 } from '../conversions.js';

/**
 * Represents a linear Display P3 color.
 */
export default class DisplayP3Linear extends RgbColor {
    static COLOR_SPACE = 'display-p3-linear';

    /** @inheritdoc */
    toDisplayP3() {
        const [red, green, blue] = displayP3LinearToDisplayP3(this.red, this.green, this.blue);

        return new this.constructor.DisplayP3(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toDisplayP3Linear() {
        return this;
    }

    /** @inheritdoc */
    toString(alpha = null, precision = 2) {
        return this.toColorString(alpha, precision);
    }

    /** @inheritdoc */
    toXyzD65() {
        const [x, y, z] = displayP3LinearToXyzD65(this.red, this.green, this.blue);

        return new this.constructor.XyzD65(x, y, z, this.alpha);
    }
}
