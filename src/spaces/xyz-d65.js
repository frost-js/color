import XyzColor from '../channels/xyz-color.js';
import { xyzD65ToA98Rgb, xyzD65ToDisplayP3Linear, xyzD65ToOkLab, xyzD65ToRec2020, xyzD65ToSrgbLinear, xyzD65ToXyzD50 } from '../conversions.js';

/**
 * Represents an XYZ D65 color.
 */
export default class XyzD65 extends XyzColor {
    static COLOR_SPACE = 'xyz-d65';

    /** @inheritdoc */
    toA98Rgb() {
        const [red, green, blue] = xyzD65ToA98Rgb(this.x, this.y, this.z);

        return new this.constructor.A98Rgb(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toDisplayP3Linear() {
        const [red, green, blue] = xyzD65ToDisplayP3Linear(this.x, this.y, this.z);

        return new this.constructor.DisplayP3Linear(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toOkLab() {
        const [lightness, a, b] = xyzD65ToOkLab(this.x, this.y, this.z);

        return new this.constructor.OkLab(lightness, a, b, this.alpha);
    }

    /** @inheritdoc */
    toRec2020() {
        const [red, green, blue] = xyzD65ToRec2020(this.x, this.y, this.z);

        return new this.constructor.Rec2020(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toSrgbLinear() {
        const [red, green, blue] = xyzD65ToSrgbLinear(this.x, this.y, this.z);

        return new this.constructor.SrgbLinear(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toString(alpha = null, precision = 2) {
        return this.toColorString(alpha, precision);
    }

    /** @inheritdoc */
    toXyzD50() {
        const [x, y, z] = xyzD65ToXyzD50(this.x, this.y, this.z);

        return new this.constructor.XyzD50(x, y, z, this.alpha);
    }

    /** @inheritdoc */
    toXyzD65() {
        return this;
    }
}
