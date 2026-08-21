import LchColor from '../channels/lch-color.js';
import { okLchToOkLab } from '../conversions.js';
import { roundValue } from '../helpers.js';

/**
 * Represents an OKLCH color.
 */
export default class OkLch extends LchColor {
    static COLOR_SPACE = 'oklch';

    /** @inheritdoc */
    toOkLab() {
        const [lightness, a, b] = okLchToOkLab(this.lightness, this.chroma, this.hue);

        return new this.constructor.OkLab(lightness, a, b, this.alpha);
    }

    /** @inheritdoc */
    toOkLch() {
        return this;
    }

    /**
     * Serializes the color using CSS `oklch(...)` syntax.
     * @param {boolean|null} [alpha=null] Whether to include alpha.
     * @param {number} [precision=2] The numeric precision.
     * @returns {string} The serialized color string.
     */
    toString(alpha = null, precision = 2) {
        alpha ??= this.alpha < 1;

        let result = `oklch(${roundValue(this.lightness, precision)} ${roundValue(this.chroma, precision)} ${roundValue(this.hue, precision)}deg`;

        if (alpha) {
            result += ` / ${roundValue(this.alpha, precision)}`;
        }

        result += ')';

        return result;
    }

    /** @inheritdoc */
    toXyzD65() {
        return this.toOkLab().toXyzD65();
    }
}
