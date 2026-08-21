import LchColor from '../channels/lch-color.js';
import { lchToLab } from '../conversions.js';
import { roundValue } from '../helpers.js';

/**
 * Represents an LCH color.
 */
export default class Lch extends LchColor {
    static COLOR_SPACE = 'lch';

    /** @inheritdoc */
    toLab() {
        const [lightness, a, b] = lchToLab(this.lightness, this.chroma, this.hue);

        return new this.constructor.Lab(lightness, a, b, this.alpha);
    }

    /** @inheritdoc */
    toLch() {
        return this;
    }

    /**
     * Serializes the color using CSS `lch(...)` syntax.
     * @param {boolean|null} [alpha=null] Whether to include alpha.
     * @param {number} [precision=2] The numeric precision.
     * @returns {string} The serialized color string.
     */
    toString(alpha = null, precision = 2) {
        alpha ??= this.alpha < 1;

        let result = `lch(${roundValue(this.lightness, precision)}% ${roundValue(this.chroma, precision)} ${roundValue(this.hue, precision)}deg`;

        if (alpha) {
            result += ` / ${roundValue(this.alpha, precision)}`;
        }

        result += ')';

        return result;
    }

    /** @inheritdoc */
    toXyzD65() {
        return this.toLab().toXyzD65();
    }
}
