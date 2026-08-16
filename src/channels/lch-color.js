import Color from '../color.js';
import { clampHue, ensureFinite } from '../helpers.js';

/**
 * Shared LCH-style channel storage and immutable update helpers.
 */
export default class LchColor extends Color {
    /**
     * Creates an LCH-like color with lightness, chroma, hue, and alpha channels.
     * @param {number} [lightness=0] The lightness channel value.
     * @param {number} [chroma=0] The chroma channel value.
     * @param {number} [hue=0] The hue channel value in degrees.
     * @param {number} [alpha=1] The alpha channel value.
     */
    constructor(lightness = 0, chroma = 0, hue = 0, alpha = 1) {
        super(alpha);
        ensureFinite(lightness);
        ensureFinite(chroma);
        this.lightness = lightness;
        this.chroma = chroma;
        this.hue = clampHue(hue);
        Object.freeze(this);
    }

    /**
     * Returns the chroma channel.
     * @return {number} The chroma channel value.
     */
    getChroma() {
        return this.chroma;
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
     * Returns the color state as a plain object.
     * @return {{lightness: number, chroma: number, hue: number, alpha: number}} The channel object.
     */
    toObject() {
        return {
            lightness: this.lightness,
            chroma: this.chroma,
            hue: this.hue,
            alpha: this.alpha,
        };
    }

    /**
     * Returns a copy with a different chroma channel.
     * @param {number} chroma The replacement chroma channel.
     * @return {LchColor} A new color instance.
     */
    withChroma(chroma) {
        return new this.constructor(this.lightness, chroma, this.hue, this.alpha);
    }

    /**
     * Returns a copy with a different hue channel.
     * @param {number} hue The replacement hue channel in degrees.
     * @return {LchColor} A new color instance.
     */
    withHue(hue) {
        return new this.constructor(this.lightness, this.chroma, hue, this.alpha);
    }

    /**
     * Returns a copy with a different lightness channel.
     * @param {number} lightness The replacement lightness channel.
     * @return {LchColor} A new color instance.
     */
    withLightness(lightness) {
        return new this.constructor(lightness, this.chroma, this.hue, this.alpha);
    }
}
