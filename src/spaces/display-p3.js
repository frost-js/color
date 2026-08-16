import RgbColor from '../channels/rgb-color.js';
import { displayP3ToDisplayP3Linear } from '../conversions.js';

/**
 * Represents a Display P3 color.
 */
export default class DisplayP3 extends RgbColor {
    static COLOR_SPACE = 'display-p3';

    /** @inheritdoc */
    toDisplayP3() {
        return this;
    }

    /** @inheritdoc */
    toDisplayP3Linear() {
        const [red, green, blue] = displayP3ToDisplayP3Linear(this.red, this.green, this.blue);

        return new this.constructor.DisplayP3Linear(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toString(alpha = null, precision = 2) {
        return this.toColorString(alpha, precision);
    }

    /** @inheritdoc */
    toXyzD65() {
        return this.toDisplayP3Linear().toXyzD65();
    }
}
