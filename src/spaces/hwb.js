import Color from '../color.js';
import { hwbToSrgb } from '../conversions.js';
import { clampHue, ensureFinite, roundValue } from '../helpers.js';

/**
 * Represents an HWB color.
 */
export default class Hwb extends Color {
    static COLOR_SPACE = 'hwb';

    /**
     * Creates an HWB color.
     * @param {number} [hue=0] The hue channel value in degrees.
     * @param {number} [whiteness=0] The whiteness channel value.
     * @param {number} [blackness=0] The blackness channel value.
     * @param {number} [alpha=1] The alpha channel value.
     */
    constructor(hue = 0, whiteness = 0, blackness = 0, alpha = 1) {
        super(alpha);
        this.hue = clampHue(hue);
        ensureFinite(whiteness);
        ensureFinite(blackness);
        this.whiteness = whiteness;
        this.blackness = blackness;
        Object.freeze(this);
    }

    /**
     * Returns the blackness channel.
     * @returns {number} The blackness channel value.
     */
    getBlackness() {
        return this.blackness;
    }

    /**
     * Returns the hue channel.
     * @returns {number} The hue channel value in degrees.
     */
    getHue() {
        return this.hue;
    }

    /**
     * Returns the whiteness channel.
     * @returns {number} The whiteness channel value.
     */
    getWhiteness() {
        return this.whiteness;
    }

    /** @inheritdoc */
    toHwb() {
        return this;
    }

    /**
     * Returns the color state as a plain object.
     * @returns {{hue: number, whiteness: number, blackness: number, alpha: number}} The channel object.
     */
    toObject() {
        return {
            hue: this.hue,
            whiteness: this.whiteness,
            blackness: this.blackness,
            alpha: this.alpha,
        };
    }

    /** @inheritdoc */
    toSrgb() {
        const [red, green, blue] = hwbToSrgb(this.hue, this.whiteness / 100, this.blackness / 100);

        return new this.constructor.Srgb(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toSrgbLinear() {
        return this.toSrgb().toSrgbLinear();
    }

    /**
     * Serializes the color using CSS `hwb(...)` syntax.
     * @param {boolean|null} [alpha=null] Whether to include alpha.
     * @param {number} [precision=2] The numeric precision.
     * @returns {string} The serialized color string.
     */
    toString(alpha = null, precision = 2) {
        alpha ??= this.alpha < 1;

        let result = `hwb(${roundValue(this.hue, precision)}deg ${roundValue(this.whiteness, precision)}% ${roundValue(this.blackness, precision)}%`;

        if (alpha) {
            result += ` / ${roundValue(this.alpha * 100, Math.max(0, precision - 2))}%`;
        }

        result += ')';

        return result;
    }

    /**
     * Returns a copy with a different blackness channel.
     * @param {number} blackness The replacement blackness channel.
     * @returns {Hwb} A new color instance.
     */
    withBlackness(blackness) {
        return new this.constructor(this.hue, this.whiteness, blackness, this.alpha);
    }

    /**
     * Returns a copy with a different hue channel.
     * @param {number} hue The replacement hue channel.
     * @returns {Hwb} A new color instance.
     */
    withHue(hue) {
        return new this.constructor(hue, this.whiteness, this.blackness, this.alpha);
    }

    /**
     * Returns a copy with a different whiteness channel.
     * @param {number} whiteness The replacement whiteness channel.
     * @returns {Hwb} A new color instance.
     */
    withWhiteness(whiteness) {
        return new this.constructor(this.hue, whiteness, this.blackness, this.alpha);
    }
}
