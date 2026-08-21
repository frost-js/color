import { CSS_ANGLE_REGEX, CSS_COLORS, CSS_NUMBER_REGEX } from './vars.js';

/**
 * Rounds a number to a fixed precision while normalizing negative zero.
 * @param {number} value The input value.
 * @param {number} [precision=0] The decimal precision.
 * @returns {number} The rounded value.
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
 * @throws {TypeError} If the value is not finite.
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
 * @returns {number} The clamped value.
 */
export const clamp = (value, min = 0, max = 1) => {
    ensureFinite(value);

    return Math.max(min, Math.min(max, value));
};

/**
 * Wraps a hue value into the 0-360 range.
 * @param {number} value The hue value.
 * @returns {number} The wrapped hue.
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
 * @returns {boolean} True when all primary channels fall within range.
 */
export const isInGamut = (color, space, gamutRanges) => {
    const [min, max] = gamutRanges[space];
    const epsilon = (max - min) * 1e-12;
    const values = Object.values(color.toObject());

    for (const value of values.slice(0, 3)) {
        if (!Number.isFinite(value) || value < min - epsilon || value > max + epsilon) {
            return false;
        }
    }

    return true;
};

/**
 * Parses a CSS angle token into degrees.
 * @param {string} value The raw CSS angle token.
 * @returns {number} The angle in degrees.
 */
export const parseCssAngle = (value) => {
    if (typeof value !== 'string') {
        throw new TypeError('CSS angle values must be strings.');
    }

    const match = value.match(CSS_ANGLE_REGEX);

    if (!match) {
        throw new SyntaxError('CSS angle value is not valid.');
    }

    const number = Number(match[1]);

    switch (match[2]) {
        case '%':
            return number * 3.6;
        case 'grad':
            return number * 0.9;
        case 'rad':
            return number * 180 / Math.PI;
        case 'turn':
            return number * 360;
        default:
            return number;
    }
};

/**
 * Parses CSS function arguments.
 * @param {string} value The raw CSS argument string.
 * @param {boolean} [allowCommas=false] Whether legacy comma separators are allowed.
 * @returns {[string, string, string, string]} The parsed arguments.
 */
export const parseCssArguments = (value, allowCommas = false) => {
    if (typeof value !== 'string') {
        throw new TypeError('CSS argument values must be strings.');
    }

    let parts = [];

    if (value.includes(',')) {
        if (allowCommas && !value.includes('/')) {
            parts = value.split(',').map((part) => part.trim());

            if (parts.length === 3) {
                parts.push('1');
            }
        }
    } else {
        const groups = value.split('/').map((group) => group.trim());

        if (groups.length <= 2) {
            parts = groups[0].split(' ');
            parts.push(groups[1] ?? '1');
        }
    }

    if (parts.length !== 4 || parts.includes('')) {
        throw new SyntaxError('CSS arguments are not valid.');
    }

    return parts;
};

/**
 * Parses a CSS numeric token, optionally mapping percentages into a range.
 * @param {string} value The raw CSS numeric token.
 * @param {number} [percentMultiplier=1] The range used for percentages.
 * @returns {number} The parsed numeric value.
 */
export const parseCssNumber = (value, percentMultiplier = 1) => {
    if (typeof value !== 'string') {
        throw new TypeError('CSS number values must be strings.');
    }

    const match = value.match(CSS_NUMBER_REGEX);

    if (!match) {
        throw new SyntaxError('CSS number value is not valid.');
    }

    const number = Number(match[1]);

    return match[2] ?
        (number / 100) * percentMultiplier :
        number;
};

/**
 * Finds an exact CSS color keyword for a hex triplet.
 * @param {string} hex The lowercase or uppercase hex string without `#`.
 * @returns {string|null} The matching CSS color keyword, if any.
 */
export const findCssColorName = (hex) => {
    return Object.entries(CSS_COLORS)
        .find(([, value]) => value === `#${hex}`)?.[0] ?? null;
};
