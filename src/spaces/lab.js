import LabColor from '../channels/lab-color.js';
import { labToLch, labToXyzD50 } from '../conversions.js';
import { roundValue } from '../helpers.js';

/**
 * Represents a Lab color.
 */
export default class Lab extends LabColor {
    static COLOR_SPACE = 'lab';

    /** @inheritdoc */
    toLab() {
        return this;
    }

    /** @inheritdoc */
    toLch() {
        const [lightness, chroma, hue] = labToLch(this.lightness, this.a, this.b);

        return new this.constructor.Lch(lightness, chroma, hue, this.alpha);
    }

    /**
     * Serializes the color using CSS `lab(...)` syntax.
     * @param {boolean|null} [alpha=null] Whether to include alpha.
     * @param {number} [precision=2] The numeric precision.
     * @returns {string} The serialized color string.
     */
    toString(alpha = null, precision = 2) {
        alpha ??= this.alpha < 1;

        let result = `lab(${roundValue(this.lightness, precision)}% ${roundValue(this.a, precision)} ${roundValue(this.b, precision)}`;

        if (alpha) {
            result += ` / ${roundValue(this.alpha, precision)}`;
        }

        result += ')';

        return result;
    }

    /** @inheritdoc */
    toXyzD50() {
        const [x, y, z] = labToXyzD50(this.lightness, this.a, this.b);

        return new this.constructor.XyzD50(x, y, z, this.alpha);
    }

    /** @inheritdoc */
    toXyzD65() {
        return this.toXyzD50().toXyzD65();
    }
}
