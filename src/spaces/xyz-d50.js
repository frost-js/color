import XyzColor from '../channels/xyz-color.js';
import { xyzD50ToLab, xyzD50ToProPhotoRgb, xyzD50ToXyzD65 } from '../conversions.js';

/**
 * Represents an XYZ D50 color.
 */
export default class XyzD50 extends XyzColor {
    static COLOR_SPACE = 'xyz-d50';

    /** @inheritdoc */
    toLab() {
        const [lightness, a, b] = xyzD50ToLab(this.x, this.y, this.z);

        return new this.constructor.Lab(lightness, a, b, this.alpha);
    }

    /** @inheritdoc */
    toProPhotoRgb() {
        const [red, green, blue] = xyzD50ToProPhotoRgb(this.x, this.y, this.z);

        return new this.constructor.ProPhotoRgb(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toString(alpha = null, precision = 2) {
        return this.toColorString(alpha, precision);
    }

    /** @inheritdoc */
    toXyzD50() {
        return this;
    }

    /** @inheritdoc */
    toXyzD65() {
        const [x, y, z] = xyzD50ToXyzD65(this.x, this.y, this.z);

        return new this.constructor.XyzD65(x, y, z, this.alpha);
    }
}
