import { CSS_COLORS } from './vars.js';

/**
 * Rounds a number to a fixed precision while normalizing negative zero.
 * @param {number} value The input value.
 * @param {number} [precision=0] The decimal precision.
 * @return {number} The rounded value.
 */
export const roundValue = (value, precision = 0) => {
    const factor = 10 ** precision;
    const sign = value < 0 ? -1 : 1;
    const rounded = sign * (Math.round((Math.abs(value) + Number.EPSILON) * factor) / factor);

    return Object.is(rounded, -0) ? 0 : rounded;
};

/**
 * Ensures a numeric value is finite.
 * @param {number} value The value to validate.
 * @return {void}
 * @throws {TypeError} Thrown when the value is not finite.
 */
export const ensureFinite = (value) => {
    if (!Number.isFinite(value)) {
        throw new TypeError('Color channel values must be finite numbers.');
    }
};

/**
 * Clamps a value between a minimum and maximum bound.
 * @param {number} value The value to clamp.
 * @param {number} [min=0] The minimum value.
 * @param {number} [max=1] The maximum value.
 * @return {number} The clamped value.
 */
export const clamp = (value, min = 0, max = 1) => {
    ensureFinite(value);

    return Math.max(min, Math.min(max, value));
};

/**
 * Wraps a hue value into the 0-360 range.
 * @param {number} value The hue value.
 * @return {number} The wrapped hue.
 */
export const clampHue = (value) => {
    ensureFinite(value);
    value %= 360;

    if (value < 0) {
        value += 360;
    }

    return value;
};

/**
 * Checks whether a color is within gamut bounds for the target space.
 * @param {{toObject(): Record<string, number>}} color The color to inspect.
 * @param {string} space The target color space key.
 * @param {Record<string, [number, number]>} gamutRanges The gamut map.
 * @return {boolean} True when all primary channels fall within range.
 */
export const isInGamut = (color, space, gamutRanges) => {
    const [min, max] = gamutRanges[space];
    const values = Object.values(color.toObject());

    for (const value of values.slice(0, 3)) {
        if (!Number.isFinite(value) || value < min || value > max) {
            return false;
        }
    }

    return true;
};

/**
 * Parses a CSS angle token into degrees.
 * @param {string} value The raw CSS angle token.
 * @return {number} The angle in degrees.
 */
export const parseCssAngle = (value) => {
    if (typeof value !== 'string') {
        throw new TypeError('CSS angle values must be strings.');
    }

    value = String(value);
    const number = Number.parseFloat(value) || 0;

    if (value.endsWith('%')) {
        return (number / 100) * 360;
    }

    if (value.endsWith('grad')) {
        return number * 0.9;
    }

    if (value.endsWith('rad')) {
        return number * 180 / Math.PI;
    }

    if (value.endsWith('turn')) {
        return number * 360;
    }

    return number;
};

/**
 * Parses a CSS numeric token, optionally mapping percentages into a range.
 * @param {string} value The raw CSS numeric token.
 * @param {number} [percentMultiplier=1] The range used for percentages.
 * @return {number} The parsed numeric value.
 */
export const parseCssNumber = (value, percentMultiplier = 1) => {
    if (typeof value !== 'string') {
        throw new TypeError('CSS number values must be strings.');
    }

    value = String(value);
    const number = Number.parseFloat(value) || 0;

    return value.endsWith('%') ?
        (number / 100) * percentMultiplier :
        number;
};

/**
 * Finds an exact CSS color keyword for a hex triplet.
 * @param {string} hex The lowercase or uppercase hex string without `#`.
 * @return {string|null} The matching CSS color keyword, if any.
 */
export const findCssColorName = (hex) => {
    return Object.entries(CSS_COLORS)
        .find(([, value]) => value === `#${hex}`)?.[0] ?? null;
};
