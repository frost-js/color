import Color from '../color.js';
import { ensureFinite } from '../helpers.js';

/**
 * Shared RGB-style channel storage and immutable update helpers.
 */
export default class RgbColor extends Color {
    /**
     * Creates an RGB-like color with red, green, blue, and alpha channels.
     * @param {number} [red=0] The red channel value.
     * @param {number} [green=0] The green channel value.
     * @param {number} [blue=0] The blue channel value.
     * @param {number} [alpha=1] The alpha channel value.
     */
    constructor(red = 0, green = 0, blue = 0, alpha = 1) {
        super(alpha);
        ensureFinite(red);
        ensureFinite(green);
        ensureFinite(blue);
        this.red = red;
        this.green = green;
        this.blue = blue;
        Object.freeze(this);
    }

    /**
     * Returns the blue channel.
     * @return {number} The blue channel value.
     */
    getBlue() {
        return this.blue;
    }

    /**
     * Returns the green channel.
     * @return {number} The green channel value.
     */
    getGreen() {
        return this.green;
    }

    /**
     * Returns the red channel.
     * @return {number} The red channel value.
     */
    getRed() {
        return this.red;
    }

    /**
     * Returns the color state as a plain object.
     * @return {{red: number, green: number, blue: number, alpha: number}} The channel object.
     */
    toObject() {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: this.alpha,
        };
    }

    /**
     * Returns a copy with a different blue channel.
     * @param {number} blue The replacement blue channel.
     * @return {RgbColor} A new color instance.
     */
    withBlue(blue) {
        return new this.constructor(this.red, this.green, blue, this.alpha);
    }

    /**
     * Returns a copy with a different green channel.
     * @param {number} green The replacement green channel.
     * @return {RgbColor} A new color instance.
     */
    withGreen(green) {
        return new this.constructor(this.red, green, this.blue, this.alpha);
    }

    /**
     * Returns a copy with a different red channel.
     * @param {number} red The replacement red channel.
     * @return {RgbColor} A new color instance.
     */
    withRed(red) {
        return new this.constructor(red, this.green, this.blue, this.alpha);
    }
}
