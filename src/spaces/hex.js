import { findCssColorName } from '../helpers.js';
import Rgb from './rgb.js';

/**
 * Represents an RGB color formatted as hexadecimal.
 */
export default class Hex extends Rgb {
    static COLOR_SPACE = 'hex';

    /** @inheritdoc */
    toHex() {
        return this;
    }

    /** @inheritdoc */
    toRgb() {
        return new Rgb(this.red, this.green, this.blue, this.alpha);
    }

    /**
     * Serializes the color as a hex string or CSS named color.
     * @param {boolean|null} [alpha=null] Whether to include alpha.
     * @param {number} [precision=2] The unused numeric precision.
     * @param {boolean} [shortenHex=true] Whether to shorten the hex form when possible.
     * @param {boolean} [name=false] Whether to prefer CSS named colors.
     * @returns {string} The serialized color string.
     */
    toString(alpha = null, precision = 2, shortenHex = true, name = false) {
        void precision;
        alpha ??= this.alpha < 1;

        if (name && alpha && this.alpha <= 0) {
            return 'transparent';
        }

        if (name && (!alpha || this.alpha >= 1)) {
            const colorName = findCssColorName(this.getHex(false, false));

            if (colorName) {
                return colorName;
            }
        }

        return `#${this.getHex(alpha, shortenHex)}`;
    }
}
