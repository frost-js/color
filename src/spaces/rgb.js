import RgbColor from '../channels/rgb-color.js';
import { rgbToSrgb } from '../conversions.js';
import { clamp, findCssColorName, roundValue } from '../helpers.js';

/**
 * Represents an RGB color using 0-255 channel values.
 */
export default class Rgb extends RgbColor {
    static COLOR_SPACE = 'rgb';

    /**
     * Returns the color as a hex string without the leading `#`.
     * @param {boolean} [alpha=false] Whether to include alpha.
     * @param {boolean} [shortenHex=true] Whether to shorten the hex form when possible.
     * @returns {string} The hex string.
     */
    getHex(alpha = false, shortenHex = true) {
        const channels = [this.red, this.green, this.blue];

        if (alpha) {
            channels.push(this.alpha * 255);
        }

        const bytes = channels.map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0'));

        if (shortenHex && bytes.every((byte) => byte[0] === byte[1])) {
            return bytes.map((byte) => byte[0]).join('');
        }

        return bytes.join('');
    }

    /** @inheritdoc */
    toHex() {
        return new this.constructor.Hex(this.red, this.green, this.blue, this.alpha);
    }

    /** @inheritdoc */
    toRgb() {
        return this;
    }

    /** @inheritdoc */
    toSrgb() {
        const [red, green, blue] = rgbToSrgb(this.red, this.green, this.blue);

        return new this.constructor.Srgb(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toSrgbLinear() {
        return this.toSrgb().toSrgbLinear();
    }

    /**
     * Serializes the color using CSS `rgb(...)` syntax or a CSS named color.
     * @param {boolean|null} [alpha=null] Whether to include alpha.
     * @param {number} [precision=2] The numeric precision.
     * @param {boolean} [name=false] Whether to prefer CSS named colors.
     * @returns {string} The serialized color string.
     */
    toString(alpha = null, precision = 2, name = false) {
        alpha ??= this.alpha < 1;

        if (name && alpha && this.alpha <= 0) {
            return 'transparent';
        }

        if (name && (!alpha || this.alpha >= 1) &&
            [this.red, this.green, this.blue].every((value) => Number.isInteger(value) && value >= 0 && value <= 255)) {
            const colorName = findCssColorName(this.getHex(false, false));

            if (colorName) {
                return colorName;
            }
        }

        let result = `rgb(${roundValue(this.red, precision)} ${roundValue(this.green, precision)} ${roundValue(this.blue, precision)}`;

        if (alpha) {
            result += ` / ${roundValue(this.alpha * 100, Math.max(0, precision - 2))}%`;
        }

        result += ')';

        return result;
    }
}
