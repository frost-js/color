import Color from '../color.js';
import { ensureFinite } from '../helpers.js';

/**
 * Shared Lab-style channel storage and immutable update helpers.
 */
export default class LabColor extends Color {
    /**
     * Creates a Lab-like color with lightness, a, b, and alpha channels.
     * @param {number} [lightness=0] The lightness channel value.
     * @param {number} [a=0] The a channel value.
     * @param {number} [b=0] The b channel value.
     * @param {number} [alpha=1] The alpha channel value.
     */
    constructor(lightness = 0, a = 0, b = 0, alpha = 1) {
        super(alpha);
        ensureFinite(lightness);
        ensureFinite(a);
        ensureFinite(b);
        this.lightness = lightness;
        this.a = a;
        this.b = b;
        Object.freeze(this);
    }

    /**
     * Returns the a channel.
     * @returns {number} The a channel value.
     */
    getA() {
        return this.a;
    }

    /**
     * Returns the b channel.
     * @returns {number} The b channel value.
     */
    getB() {
        return this.b;
    }

    /**
     * Returns the lightness channel.
     * @returns {number} The lightness channel value.
     */
    getLightness() {
        return this.lightness;
    }

    /**
     * Returns the color state as a plain object.
     * @returns {{lightness: number, a: number, b: number, alpha: number}} The channel object.
     */
    toObject() {
        return {
            lightness: this.lightness,
            a: this.a,
            b: this.b,
            alpha: this.alpha,
        };
    }

    /**
     * Returns a copy with a different a channel.
     * @param {number} a The replacement a channel.
     * @returns {LabColor} A new color instance.
     */
    withA(a) {
        return new this.constructor(this.lightness, a, this.b, this.alpha);
    }

    /**
     * Returns a copy with a different b channel.
     * @param {number} b The replacement b channel.
     * @returns {LabColor} A new color instance.
     */
    withB(b) {
        return new this.constructor(this.lightness, this.a, b, this.alpha);
    }

    /**
     * Returns a copy with a different lightness channel.
     * @param {number} lightness The replacement lightness channel.
     * @returns {LabColor} A new color instance.
     */
    withLightness(lightness) {
        return new this.constructor(lightness, this.a, this.b, this.alpha);
    }
}
