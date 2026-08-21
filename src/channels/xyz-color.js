import Color from '../color.js';
import { ensureFinite } from '../helpers.js';

/**
 * Shared XYZ-style channel storage and immutable update helpers.
 */
export default class XyzColor extends Color {
    /**
     * Creates an XYZ-like color with x, y, z, and alpha channels.
     * @param {number} [x=0] The x channel value.
     * @param {number} [y=0] The y channel value.
     * @param {number} [z=0] The z channel value.
     * @param {number} [alpha=1] The alpha channel value.
     */
    constructor(x = 0, y = 0, z = 0, alpha = 1) {
        super(alpha);
        ensureFinite(x);
        ensureFinite(y);
        ensureFinite(z);
        this.x = x;
        this.y = y;
        this.z = z;
        Object.freeze(this);
    }

    /**
     * Returns the x channel.
     * @returns {number} The x channel value.
     */
    getX() {
        return this.x;
    }

    /**
     * Returns the y channel.
     * @returns {number} The y channel value.
     */
    getY() {
        return this.y;
    }

    /**
     * Returns the z channel.
     * @returns {number} The z channel value.
     */
    getZ() {
        return this.z;
    }

    /**
     * Returns the color state as a plain object.
     * @returns {{x: number, y: number, z: number, alpha: number}} The channel object.
     */
    toObject() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            alpha: this.alpha,
        };
    }

    /**
     * Returns a copy with a different x channel.
     * @param {number} x The replacement x channel.
     * @returns {XyzColor} A new color instance.
     */
    withX(x) {
        return new this.constructor(x, this.y, this.z, this.alpha);
    }

    /**
     * Returns a copy with a different y channel.
     * @param {number} y The replacement y channel.
     * @returns {XyzColor} A new color instance.
     */
    withY(y) {
        return new this.constructor(this.x, y, this.z, this.alpha);
    }

    /**
     * Returns a copy with a different z channel.
     * @param {number} z The replacement z channel.
     * @returns {XyzColor} A new color instance.
     */
    withZ(z) {
        return new this.constructor(this.x, this.y, z, this.alpha);
    }
}
