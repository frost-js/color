import Color from '../color.js';
import { hslToSrgb } from '../conversions.js';
import { clampHue, ensureFinite, roundValue } from '../helpers.js';

/**
 * Represents an HSL color.
 */
export default class Hsl extends Color {
    static COLOR_SPACE = 'hsl';

    /**
     * Creates an HSL color.
     * @param {number} [hue=0] The hue channel value in degrees.
     * @param {number} [saturation=0] The saturation channel value.
     * @param {number} [lightness=0] The lightness channel value.
     * @param {number} [alpha=1] The alpha channel value.
     */
    constructor(hue = 0, saturation = 0, lightness = 0, alpha = 1) {
        super(alpha);
        this.hue = clampHue(hue);
        ensureFinite(saturation);
        ensureFinite(lightness);
        this.saturation = saturation;
        this.lightness = lightness;
        Object.freeze(this);
    }

    /**
     * Returns the hue channel.
     * @return {number} The hue channel value in degrees.
     */
    getHue() {
        return this.hue;
    }

    /**
     * Returns the lightness channel.
     * @return {number} The lightness channel value.
     */
    getLightness() {
        return this.lightness;
    }

    /**
     * Returns the saturation channel.
     * @return {number} The saturation channel value.
     */
    getSaturation() {
        return this.saturation;
    }

    /** @inheritdoc */
    toHsl() {
        return this;
    }

    /**
     * Returns the color state as a plain object.
     * @return {{hue: number, saturation: number, lightness: number, alpha: number}} The channel object.
     */
    toObject() {
        return {
            hue: this.hue,
            saturation: this.saturation,
            lightness: this.lightness,
            alpha: this.alpha,
        };
    }

    /** @inheritdoc */
    toSrgb() {
        const [red, green, blue] = hslToSrgb(this.hue, this.saturation / 100, this.lightness / 100);

        return new this.constructor.Srgb(red, green, blue, this.alpha);
    }

    /** @inheritdoc */
    toSrgbLinear() {
        return this.toSrgb().toSrgbLinear();
    }

    /**
     * Serializes the color using CSS `hsl(...)` syntax.
     * @param {boolean|null} [alpha=null] Whether to include alpha.
     * @param {number} [precision=2] The numeric precision.
     * @return {string} The serialized color string.
     */
    toString(alpha = null, precision = 2) {
        alpha ??= this.alpha < 1;

        let result = `hsl(${roundValue(this.hue, precision)}deg ${roundValue(this.saturation, precision)}% ${roundValue(this.lightness, precision)}%`;

        if (alpha) {
            result += ` / ${roundValue(this.alpha * 100, Math.max(0, precision - 2))}%`;
        }

        result += ')';

        return result;
    }

    /**
     * Returns a copy with a different hue channel.
     * @param {number} hue The replacement hue channel.
     * @return {Hsl} A new color instance.
     */
    withHue(hue) {
        return new this.constructor(hue, this.saturation, this.lightness, this.alpha);
    }

    /**
     * Returns a copy with a different lightness channel.
     * @param {number} lightness The replacement lightness channel.
     * @return {Hsl} A new color instance.
     */
    withLightness(lightness) {
        return new this.constructor(this.hue, this.saturation, lightness, this.alpha);
    }

    /**
     * Returns a copy with a different saturation channel.
     * @param {number} saturation The replacement saturation channel.
     * @return {Hsl} A new color instance.
     */
    withSaturation(saturation) {
        return new this.constructor(this.hue, saturation, this.lightness, this.alpha);
    }
}
