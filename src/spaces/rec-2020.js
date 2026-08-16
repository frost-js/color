import RgbColor from '../channels/rgb-color.js';
import { rec2020ToXyzD65 } from '../conversions.js';

/**
 * Represents a Rec. 2020 color.
 */
export default class Rec2020 extends RgbColor {
    static COLOR_SPACE = 'rec2020';

    /** @inheritdoc */
    toRec2020() {
        return this;
    }

    /** @inheritdoc */
    toString(alpha = null, precision = 2) {
        return this.toColorString(alpha, precision);
    }

    /** @inheritdoc */
    toXyzD65() {
        const [x, y, z] = rec2020ToXyzD65(this.red, this.green, this.blue);

        return new this.constructor.XyzD65(x, y, z, this.alpha);
    }
}
