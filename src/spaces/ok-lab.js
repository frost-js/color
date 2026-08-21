import LabColor from '../channels/lab-color.js';
import { okLabToOkLch, okLabToXyzD65 } from '../conversions.js';
import { roundValue } from '../helpers.js';

/**
 * Represents an OKLab color.
 */
export default class OkLab extends LabColor {
    static COLOR_SPACE = 'oklab';

    /** @inheritdoc */
    toOkLab() {
        return this;
    }

    /** @inheritdoc */
    toOkLch() {
        const [lightness, chroma, hue] = okLabToOkLch(this.lightness, this.a, this.b);

        return new this.constructor.OkLch(lightness, chroma, hue, this.alpha);
    }

    /**
     * Serializes the color using CSS `oklab(...)` syntax.
     * @param {boolean|null} [alpha=null] Whether to include alpha.
     * @param {number} [precision=2] The numeric precision.
     * @returns {string} The serialized color string.
     */
    toString(alpha = null, precision = 2) {
        alpha ??= this.alpha < 1;

        let result = `oklab(${roundValue(this.lightness, precision)} ${roundValue(this.a, precision)} ${roundValue(this.b, precision)}`;

        if (alpha) {
            result += ` / ${roundValue(this.alpha, precision)}`;
        }

        result += ')';

        return result;
    }

    /** @inheritdoc */
    toXyzD65() {
        const [x, y, z] = okLabToXyzD65(this.lightness, this.a, this.b);

        return new this.constructor.XyzD65(x, y, z, this.alpha);
    }
}
