import RgbColor from '../channels/rgb-color.js';
import { prophotoRgbToXyzD50 } from '../conversions.js';

/**
 * Represents a ProPhoto RGB color.
 */
export default class ProPhotoRgb extends RgbColor {
    static COLOR_SPACE = 'prophoto-rgb';

    /** @inheritdoc */
    toProPhotoRgb() {
        return this;
    }

    /** @inheritdoc */
    toString(alpha = null, precision = 2) {
        return this.toColorString(alpha, precision);
    }

    /** @inheritdoc */
    toXyzD50() {
        const [x, y, z] = prophotoRgbToXyzD50(this.red, this.green, this.blue);

        return new this.constructor.XyzD50(x, y, z, this.alpha);
    }

    /** @inheritdoc */
    toXyzD65() {
        return this.toXyzD50().toXyzD65();
    }
}
