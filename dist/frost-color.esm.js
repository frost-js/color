//#region src/vars.js
/**
* Maps CSS color-space identifiers to instance conversion method names.
* @type {Readonly<Record<string, string>>}
*/
var CONVERSION_MAP = Object.freeze({
	"a98-rgb": "toA98Rgb",
	"display-p3": "toDisplayP3",
	"display-p3-linear": "toDisplayP3Linear",
	"hex": "toHex",
	"hsl": "toHsl",
	"hwb": "toHwb",
	"lab": "toLab",
	"lch": "toLch",
	"oklab": "toOkLab",
	"oklch": "toOkLch",
	"prophoto-rgb": "toProPhotoRgb",
	"rec2020": "toRec2020",
	"rgb": "toRgb",
	"srgb": "toSrgb",
	"srgb-linear": "toSrgbLinear",
	"xyz-d50": "toXyzD50",
	"xyz-d65": "toXyzD65"
});
/**
* Matches the numeric portion of a CSS number token.
* @type {string}
*/
var CSS_NUMBER_PATTERN = "[+-]?(?:\\d+|\\d*\\.\\d+)(?:e[+-]?\\d+)?";
/**
* Matches a complete CSS angle token.
* @type {RegExp}
*/
var CSS_ANGLE_REGEX = new RegExp(`^(${CSS_NUMBER_PATTERN})(deg|grad|rad|turn|%)?$`);
/**
* Matches a complete CSS number or percentage token.
* @type {RegExp}
*/
var CSS_NUMBER_REGEX = new RegExp(`^(${CSS_NUMBER_PATTERN})(%)?$`);
/**
* Sets the chroma search precision used when fitting colors into a gamut.
* @type {number}
*/
var FIT_GAMUT_PRECISION = 1e-4;
/**
* Declares the channel bounds used when fitting colors into supported gamuts.
* @type {Readonly<Record<string, [number, number]>>}
*/
var FIT_GAMUT_RANGES = Object.freeze({
	"a98-rgb": [0, 1],
	"display-p3": [0, 1],
	"display-p3-linear": [0, 1],
	"prophoto-rgb": [0, 1],
	"rec2020": [0, 1],
	"rgb": [0, 255],
	"srgb": [0, 1],
	"srgb-linear": [0, 1]
});
/**
* Maps CSS named color keywords to canonical hex values.
* @type {Readonly<Record<string, string>>}
*/
var CSS_COLORS = Object.freeze({
	aliceblue: "#f0f8ff",
	antiquewhite: "#faebd7",
	aqua: "#00ffff",
	aquamarine: "#7fffd4",
	azure: "#f0ffff",
	beige: "#f5f5dc",
	bisque: "#ffe4c4",
	black: "#000000",
	blanchedalmond: "#ffebcd",
	blue: "#0000ff",
	blueviolet: "#8a2be2",
	brown: "#a52a2a",
	burlywood: "#deb887",
	cadetblue: "#5f9ea0",
	chartreuse: "#7fff00",
	chocolate: "#d2691e",
	coral: "#ff7f50",
	cornflowerblue: "#6495ed",
	cornsilk: "#fff8dc",
	crimson: "#dc143c",
	cyan: "#00ffff",
	darkblue: "#00008b",
	darkcyan: "#008b8b",
	darkgoldenrod: "#b8860b",
	darkgray: "#a9a9a9",
	darkgreen: "#006400",
	darkgrey: "#a9a9a9",
	darkkhaki: "#bdb76b",
	darkmagenta: "#8b008b",
	darkolivegreen: "#556b2f",
	darkorange: "#ff8c00",
	darkorchid: "#9932cc",
	darkred: "#8b0000",
	darksalmon: "#e9967a",
	darkseagreen: "#8fbc8f",
	darkslateblue: "#483d8b",
	darkslategray: "#2f4f4f",
	darkslategrey: "#2f4f4f",
	darkturquoise: "#00ced1",
	darkviolet: "#9400d3",
	deeppink: "#ff1493",
	deepskyblue: "#00bfff",
	dimgray: "#696969",
	dimgrey: "#696969",
	dodgerblue: "#1e90ff",
	firebrick: "#b22222",
	floralwhite: "#fffaf0",
	forestgreen: "#228b22",
	fuchsia: "#ff00ff",
	gainsboro: "#dcdcdc",
	ghostwhite: "#f8f8ff",
	gold: "#ffd700",
	goldenrod: "#daa520",
	gray: "#808080",
	green: "#008000",
	greenyellow: "#adff2f",
	grey: "#808080",
	honeydew: "#f0fff0",
	hotpink: "#ff69b4",
	indianred: "#cd5c5c",
	indigo: "#4b0082",
	ivory: "#fffff0",
	khaki: "#f0e68c",
	lavender: "#e6e6fa",
	lavenderblush: "#fff0f5",
	lawngreen: "#7cfc00",
	lemonchiffon: "#fffacd",
	lightblue: "#add8e6",
	lightcoral: "#f08080",
	lightcyan: "#e0ffff",
	lightgoldenrodyellow: "#fafad2",
	lightgray: "#d3d3d3",
	lightgreen: "#90ee90",
	lightgrey: "#d3d3d3",
	lightpink: "#ffb6c1",
	lightsalmon: "#ffa07a",
	lightseagreen: "#20b2aa",
	lightskyblue: "#87cefa",
	lightslategray: "#778899",
	lightslategrey: "#778899",
	lightsteelblue: "#b0c4de",
	lightyellow: "#ffffe0",
	lime: "#00ff00",
	limegreen: "#32cd32",
	linen: "#faf0e6",
	magenta: "#ff00ff",
	maroon: "#800000",
	mediumaquamarine: "#66cdaa",
	mediumblue: "#0000cd",
	mediumorchid: "#ba55d3",
	mediumpurple: "#9370db",
	mediumseagreen: "#3cb371",
	mediumslateblue: "#7b68ee",
	mediumspringgreen: "#00fa9a",
	mediumturquoise: "#48d1cc",
	mediumvioletred: "#c71585",
	midnightblue: "#191970",
	mintcream: "#f5fffa",
	mistyrose: "#ffe4e1",
	moccasin: "#ffe4b5",
	navajowhite: "#ffdead",
	navy: "#000080",
	oldlace: "#fdf5e6",
	olive: "#808000",
	olivedrab: "#6b8e23",
	orange: "#ffa500",
	orangered: "#ff4500",
	orchid: "#da70d6",
	palegoldenrod: "#eee8aa",
	palegreen: "#98fb98",
	paleturquoise: "#afeeee",
	palevioletred: "#db7093",
	papayawhip: "#ffefd5",
	peachpuff: "#ffdab9",
	peru: "#cd853f",
	pink: "#ffc0cb",
	plum: "#dda0dd",
	powderblue: "#b0e0e6",
	purple: "#800080",
	rebeccapurple: "#663399",
	red: "#ff0000",
	rosybrown: "#bc8f8f",
	royalblue: "#4169e1",
	saddlebrown: "#8b4513",
	salmon: "#fa8072",
	sandybrown: "#f4a460",
	seagreen: "#2e8b57",
	seashell: "#fff5ee",
	sienna: "#a0522d",
	silver: "#c0c0c0",
	skyblue: "#87ceeb",
	slateblue: "#6a5acd",
	slategray: "#708090",
	slategrey: "#708090",
	snow: "#fffafa",
	springgreen: "#00ff7f",
	steelblue: "#4682b4",
	tan: "#d2b48c",
	teal: "#008080",
	thistle: "#d8bfd8",
	tomato: "#ff6347",
	turquoise: "#40e0d0",
	violet: "#ee82ee",
	wheat: "#f5deb3",
	white: "#ffffff",
	whitesmoke: "#f5f5f5",
	yellow: "#ffff00",
	yellowgreen: "#9acd32"
});

//#endregion
//#region src/helpers.js
/**
* Rounds a number to a fixed precision while normalizing negative zero.
* @param {number} value The input value.
* @param {number} [precision=0] The decimal precision.
* @returns {number} The rounded value.
*/
var roundValue = (value, precision = 0) => {
	const factor = 10 ** precision;
	const rounded = (value < 0 ? -1 : 1) * (Math.round((Math.abs(value) + Number.EPSILON) * factor) / factor);
	return Object.is(rounded, -0) ? 0 : rounded;
};
/**
* Ensures a numeric value is finite.
* @param {number} value The value to validate.
* @throws {TypeError} If the value is not finite.
*/
var ensureFinite = (value) => {
	if (!Number.isFinite(value)) throw new TypeError("Color channel values must be finite numbers.");
};
/**
* Clamps a value between a minimum and maximum bound.
* @param {number} value The value to clamp.
* @param {number} [min=0] The minimum value.
* @param {number} [max=1] The maximum value.
* @returns {number} The clamped value.
*/
var clamp = (value, min = 0, max = 1) => {
	ensureFinite(value);
	return Math.max(min, Math.min(max, value));
};
/**
* Wraps a hue value into the 0-360 range.
* @param {number} value The hue value.
* @returns {number} The wrapped hue.
*/
var clampHue = (value) => {
	ensureFinite(value);
	value %= 360;
	if (value < 0) value += 360;
	return value;
};
/**
* Checks whether a color is within gamut bounds for the target space.
* @param {{toObject(): Record<string, number>}} color The color to inspect.
* @param {string} space The target color space key.
* @param {Record<string, [number, number]>} gamutRanges The gamut map.
* @returns {boolean} True when all primary channels fall within range.
*/
var isInGamut = (color, space, gamutRanges) => {
	const [min, max] = gamutRanges[space];
	const epsilon = (max - min) * 1e-12;
	const values = Object.values(color.toObject());
	for (const value of values.slice(0, 3)) if (!Number.isFinite(value) || value < min - epsilon || value > max + epsilon) return false;
	return true;
};
/**
* Parses a CSS angle token into degrees.
* @param {string} value The raw CSS angle token.
* @returns {number} The angle in degrees.
*/
var parseCssAngle = (value) => {
	if (typeof value !== "string") throw new TypeError("CSS angle values must be strings.");
	const match = value.match(CSS_ANGLE_REGEX);
	if (!match) throw new SyntaxError("CSS angle value is not valid.");
	const number = Number(match[1]);
	switch (match[2]) {
		case "%": return number * 3.6;
		case "grad": return number * .9;
		case "rad": return number * 180 / Math.PI;
		case "turn": return number * 360;
		default: return number;
	}
};
/**
* Parses CSS function arguments.
* @param {string} value The raw CSS argument string.
* @param {boolean} [allowCommas=false] Whether legacy comma separators are allowed.
* @returns {[string, string, string, string]} The parsed arguments.
*/
var parseCssArguments = (value, allowCommas = false) => {
	if (typeof value !== "string") throw new TypeError("CSS argument values must be strings.");
	let parts = [];
	if (value.includes(",")) {
		if (allowCommas && !value.includes("/")) {
			parts = value.split(",").map((part) => part.trim());
			if (parts.length === 3) parts.push("1");
		}
	} else {
		const groups = value.split("/").map((group) => group.trim());
		if (groups.length <= 2) {
			parts = groups[0].split(" ");
			parts.push(groups[1] ?? "1");
		}
	}
	if (parts.length !== 4 || parts.includes("")) throw new SyntaxError("CSS arguments are not valid.");
	return parts;
};
/**
* Parses a CSS numeric token, optionally mapping percentages into a range.
* @param {string} value The raw CSS numeric token.
* @param {number} [percentMultiplier=1] The range used for percentages.
* @returns {number} The parsed numeric value.
*/
var parseCssNumber = (value, percentMultiplier = 1) => {
	if (typeof value !== "string") throw new TypeError("CSS number values must be strings.");
	const match = value.match(CSS_NUMBER_REGEX);
	if (!match) throw new SyntaxError("CSS number value is not valid.");
	const number = Number(match[1]);
	return match[2] ? number / 100 * percentMultiplier : number;
};
/**
* Finds an exact CSS color keyword for a hex triplet.
* @param {string} hex The lowercase or uppercase hex string without `#`.
* @returns {string|null} The matching CSS color keyword, if any.
*/
var findCssColorName = (hex) => {
	return Object.entries(CSS_COLORS).find(([, value]) => value === `#${hex}`)?.[0] ?? null;
};

//#endregion
//#region src/color.js
/** @import A98Rgb from './spaces/a98-rgb.js' */
/** @import DisplayP3 from './spaces/display-p3.js' */
/** @import DisplayP3Linear from './spaces/display-p3-linear.js' */
/** @import Hex from './spaces/hex.js' */
/** @import Hsl from './spaces/hsl.js' */
/** @import Hwb from './spaces/hwb.js' */
/** @import Lab from './spaces/lab.js' */
/** @import Lch from './spaces/lch.js' */
/** @import OkLab from './spaces/ok-lab.js' */
/** @import OkLch from './spaces/ok-lch.js' */
/** @import ProPhotoRgb from './spaces/pro-photo-rgb.js' */
/** @import Rec2020 from './spaces/rec-2020.js' */
/** @import Rgb from './spaces/rgb.js' */
/** @import Srgb from './spaces/srgb.js' */
/** @import SrgbLinear from './spaces/srgb-linear.js' */
/** @import XyzD50 from './spaces/xyz-d50.js' */
/** @import XyzD65 from './spaces/xyz-d65.js' */
/**
* Provides color parsing, formatting, and conversion utilities.
*
* Note: Hue values are wrapped to 0-360 and alpha values are clamped to 0-1.
* Other channels preserve extended values to avoid conversion clipping.
*/
var Color = class Color {
	static COLOR_SPACE = "";
	/**
	* Creates a color from A98 RGB channels.
	* @param {number} [red=0] The red channel value.
	* @param {number} [green=0] The green channel value.
	* @param {number} [blue=0] The blue channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromA98Rgb(red = 0, green = 0, blue = 0, alpha = 1) {
		return new this.A98Rgb(red, green, blue, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from Display P3 channels.
	* @param {number} [red=0] The red channel value.
	* @param {number} [green=0] The green channel value.
	* @param {number} [blue=0] The blue channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromDisplayP3(red = 0, green = 0, blue = 0, alpha = 1) {
		return new this.DisplayP3(red, green, blue, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from linear Display P3 channels.
	* @param {number} [red=0] The red channel value.
	* @param {number} [green=0] The green channel value.
	* @param {number} [blue=0] The blue channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromDisplayP3Linear(red = 0, green = 0, blue = 0, alpha = 1) {
		return new this.DisplayP3Linear(red, green, blue, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from HSL channels.
	* @param {number} [hue=0] The hue channel value in degrees.
	* @param {number} [saturation=0] The saturation channel value.
	* @param {number} [lightness=0] The lightness channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromHsl(hue = 0, saturation = 0, lightness = 0, alpha = 1) {
		return new this.Hsl(hue, saturation, lightness, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from HWB channels.
	* @param {number} [hue=0] The hue channel value in degrees.
	* @param {number} [whiteness=0] The whiteness channel value.
	* @param {number} [blackness=0] The blackness channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromHwb(hue = 0, whiteness = 0, blackness = 0, alpha = 1) {
		return new this.Hwb(hue, whiteness, blackness, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from Lab channels.
	* @param {number} [lightness=0] The lightness channel value.
	* @param {number} [a=0] The a channel value.
	* @param {number} [b=0] The b channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromLab(lightness = 0, a = 0, b = 0, alpha = 1) {
		return new this.Lab(lightness, a, b, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from LCH channels.
	* @param {number} [lightness=0] The lightness channel value.
	* @param {number} [chroma=0] The chroma channel value.
	* @param {number} [hue=0] The hue channel value in degrees.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromLch(lightness = 0, chroma = 0, hue = 0, alpha = 1) {
		return new this.Lch(lightness, chroma, hue, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from OKLab channels.
	* @param {number} [lightness=0] The lightness channel value.
	* @param {number} [a=0] The a channel value.
	* @param {number} [b=0] The b channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromOkLab(lightness = 0, a = 0, b = 0, alpha = 1) {
		return new this.OkLab(lightness, a, b, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from OKLCH channels.
	* @param {number} [lightness=0] The lightness channel value.
	* @param {number} [chroma=0] The chroma channel value.
	* @param {number} [hue=0] The hue channel value in degrees.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromOkLch(lightness = 0, chroma = 0, hue = 0, alpha = 1) {
		return new this.OkLch(lightness, chroma, hue, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from ProPhoto RGB channels.
	* @param {number} [red=0] The red channel value.
	* @param {number} [green=0] The green channel value.
	* @param {number} [blue=0] The blue channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromProPhotoRgb(red = 0, green = 0, blue = 0, alpha = 1) {
		return new this.ProPhotoRgb(red, green, blue, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from Rec. 2020 channels.
	* @param {number} [red=0] The red channel value.
	* @param {number} [green=0] The green channel value.
	* @param {number} [blue=0] The blue channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromRec2020(red = 0, green = 0, blue = 0, alpha = 1) {
		return new this.Rec2020(red, green, blue, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from RGB channels.
	* @param {number} [red=0] The red channel value.
	* @param {number} [green=0] The green channel value.
	* @param {number} [blue=0] The blue channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromRgb(red = 0, green = 0, blue = 0, alpha = 1) {
		return new this.Rgb(red, green, blue, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from sRGB channels.
	* @param {number} [red=0] The red channel value.
	* @param {number} [green=0] The green channel value.
	* @param {number} [blue=0] The blue channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromSrgb(red = 0, green = 0, blue = 0, alpha = 1) {
		return new this.Srgb(red, green, blue, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from linear sRGB channels.
	* @param {number} [red=0] The red channel value.
	* @param {number} [green=0] The green channel value.
	* @param {number} [blue=0] The blue channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromSrgbLinear(red = 0, green = 0, blue = 0, alpha = 1) {
		return new this.SrgbLinear(red, green, blue, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Parses a CSS color string into a color instance.
	* @param {string} string The CSS color string to parse.
	* @returns {Color} The parsed color instance.
	* @throws {TypeError} If the string is not a supported CSS color value.
	*/
	static fromString(string) {
		string = String(string).replace(/\s+/g, " ").trim().toLowerCase();
		if (string === "transparent") return this.fromRgb(0, 0, 0, 0);
		if (Object.hasOwn(CSS_COLORS, string)) string = CSS_COLORS[string];
		const hexMatch = string.match(/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
		if (hexMatch) {
			let hex = hexMatch[1];
			if (hex.length <= 4) hex = [...hex].map((char) => char + char).join("");
			return new this.Hex(Number.parseInt(hex.slice(0, 2), 16), Number.parseInt(hex.slice(2, 4), 16), Number.parseInt(hex.slice(4, 6), 16), hex.length > 6 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1).to(this.COLOR_SPACE);
		}
		try {
			const functionalMatch = string.match(/^(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)\((.+)\)$/);
			if (functionalMatch) {
				const [, space, rawParts] = functionalMatch;
				const parts = parseCssArguments(rawParts, [
					"rgb",
					"rgba",
					"hsl",
					"hsla",
					"hwb"
				].includes(space));
				switch (space) {
					case "hsl":
					case "hsla": return this.fromHsl(parseCssAngle(parts[0]), parseCssNumber(parts[1], 100), parseCssNumber(parts[2], 100), parseCssNumber(parts[3]));
					case "hwb": return this.fromHwb(parseCssAngle(parts[0]), parseCssNumber(parts[1], 100), parseCssNumber(parts[2], 100), parseCssNumber(parts[3]));
					case "lab": return this.fromLab(parseCssNumber(parts[0], 100), parseCssNumber(parts[1], 125), parseCssNumber(parts[2], 125), parseCssNumber(parts[3]));
					case "lch": return this.fromLch(parseCssNumber(parts[0], 100), Math.max(0, parseCssNumber(parts[1], 150)), parseCssAngle(parts[2]), parseCssNumber(parts[3]));
					case "oklab": return this.fromOkLab(parseCssNumber(parts[0]), parseCssNumber(parts[1], .4), parseCssNumber(parts[2], .4), parseCssNumber(parts[3]));
					case "oklch": return this.fromOkLch(parseCssNumber(parts[0]), Math.max(0, parseCssNumber(parts[1], .4)), parseCssAngle(parts[2]), parseCssNumber(parts[3]));
					case "rgb":
					case "rgba": return this.fromRgb(parseCssNumber(parts[0], 255), parseCssNumber(parts[1], 255), parseCssNumber(parts[2], 255), parseCssNumber(parts[3]));
				}
			}
			const colorMatch = string.match(/^color\((a98-rgb|display-p3(?:-linear)?|prophoto-rgb|rec2020|srgb(?:-linear)?|xyz(?:-d50|-d65)?)\s+(.+)\)$/);
			if (colorMatch) {
				const [, space, rawParts] = colorMatch;
				const values = parseCssArguments(rawParts).map((value) => parseCssNumber(value));
				switch (space) {
					case "a98-rgb": return this.fromA98Rgb(...values);
					case "display-p3": return this.fromDisplayP3(...values);
					case "display-p3-linear": return this.fromDisplayP3Linear(...values);
					case "prophoto-rgb": return this.fromProPhotoRgb(...values);
					case "rec2020": return this.fromRec2020(...values);
					case "srgb": return this.fromSrgb(...values);
					case "srgb-linear": return this.fromSrgbLinear(...values);
					case "xyz-d50": return this.fromXyzD50(...values);
					case "xyz":
					case "xyz-d65": return this.fromXyzD65(...values);
				}
			}
		} catch (error) {
			if (!(error instanceof SyntaxError)) throw error;
		}
		throw new TypeError(`Color string \`${string}\` is not valid.`);
	}
	/**
	* Creates a color from XYZ D50 channels.
	* @param {number} [x=0] The x channel value.
	* @param {number} [y=0] The y channel value.
	* @param {number} [z=0] The z channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromXyzD50(x = 0, y = 0, z = 0, alpha = 1) {
		return new this.XyzD50(x, y, z, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color from XYZ D65 channels.
	* @param {number} [x=0] The x channel value.
	* @param {number} [y=0] The y channel value.
	* @param {number} [z=0] The z channel value.
	* @param {number} [alpha=1] The alpha channel value.
	* @returns {Color} The converted color instance.
	*/
	static fromXyzD65(x = 0, y = 0, z = 0, alpha = 1) {
		return new this.XyzD65(x, y, z, alpha).to(this.COLOR_SPACE);
	}
	/**
	* Creates a color base instance with an alpha channel.
	* @param {number} [alpha=1] The alpha channel value.
	* @throws {TypeError} If the abstract base class is instantiated directly.
	*/
	constructor(alpha = 1) {
		if (new.target === Color) throw new TypeError("Color is abstract and cannot be instantiated directly.");
		this.alpha = clamp(alpha);
	}
	/**
	* Composites this color over a background color using source-over alpha compositing in sRGB.
	* @param {Color} background The background color.
	* @returns {this} The composited color in the foreground's concrete class.
	*/
	composite(background) {
		const foreground = this.toSrgb();
		const convertedBackground = background.toSrgb();
		const foregroundAlpha = foreground.getAlpha();
		const backgroundContribution = convertedBackground.getAlpha() * (1 - foregroundAlpha);
		const alpha = foregroundAlpha + backgroundContribution;
		if (alpha === 0) return this;
		const foregroundWeight = foregroundAlpha / alpha;
		const backgroundWeight = backgroundContribution / alpha;
		const red = foreground.getRed() * foregroundWeight + convertedBackground.getRed() * backgroundWeight;
		const green = foreground.getGreen() * foregroundWeight + convertedBackground.getGreen() * backgroundWeight;
		const blue = foreground.getBlue() * foregroundWeight + convertedBackground.getBlue() * backgroundWeight;
		return this.constructor.fromSrgb(red, green, blue, alpha);
	}
	/**
	* Calculates the contrast between this and another color.
	* @param {Color} other The other color.
	* @returns {number} The contrast ratio.
	* @throws {TypeError} If either color is not fully opaque.
	*/
	contrast(other) {
		if (this.alpha < 1 || other.alpha < 1) throw new TypeError("Contrast can only be calculated between fully opaque colors.");
		const l1 = this.luma();
		const l2 = other.luma();
		if (l1 < l2) return (l2 + .05) / (l1 + .05);
		return (l1 + .05) / (l2 + .05);
	}
	/**
	* Fits the color into a supported gamut by reducing OKLCH chroma.
	* @param {string} [space='srgb'] The target gamut identifier.
	* @returns {this} A color that fits within the requested gamut.
	* @throws {TypeError} If gamut fitting is unsupported for the target space.
	*/
	fitGamut(space = "srgb") {
		if (!Object.hasOwn(FIT_GAMUT_RANGES, space)) throw new TypeError(`Color space \`${space}\` does not support gamut fitting.`);
		const converted = this.to(space);
		if (isInGamut(converted, space, FIT_GAMUT_RANGES)) return this;
		const okLch = this.toOkLch();
		const lightness = okLch.getLightness();
		if (lightness <= 0 || lightness >= 1) return okLch.withLightness(clamp(lightness)).withChroma(0).to(this.constructor.COLOR_SPACE);
		const chromaSign = Math.sign(okLch.getChroma());
		let low = 0;
		let high = Math.abs(okLch.getChroma());
		while (high - low > FIT_GAMUT_PRECISION) {
			const mid = (low + high) / 2;
			const candidate = okLch.withChroma(mid * chromaSign);
			if (isInGamut(candidate.to(space), space, FIT_GAMUT_RANGES)) low = mid;
			else high = mid;
		}
		return okLch.withChroma(low * chromaSign).to(this.constructor.COLOR_SPACE);
	}
	/**
	* Returns the alpha channel.
	* @returns {number} The alpha channel value.
	*/
	getAlpha() {
		return this.alpha;
	}
	/**
	* Returns the closest CSS named color for this color.
	* @returns {string} The nearest CSS color keyword.
	*/
	label() {
		const source = Object.values(this.toObject());
		let closest = "";
		let closestDistance = Number.POSITIVE_INFINITY;
		for (const [label, hex] of Object.entries(CSS_COLORS)) {
			const target = Object.values(this.constructor.fromString(hex).toObject());
			const distance = Math.hypot(source[0] - target[0], source[1] - target[1], source[2] - target[2]);
			if (distance < closestDistance) {
				closest = label;
				closestDistance = distance;
			}
		}
		return closest;
	}
	/**
	* Returns the relative luminance for this color.
	* @returns {number} The relative luminance.
	*/
	luma() {
		return this.toSrgb().luma();
	}
	/**
	* Returns the current color-space identifier.
	* @returns {string} The color-space identifier.
	*/
	space() {
		return this.constructor.COLOR_SPACE;
	}
	/**
	* Converts the color to another color space.
	* @param {string} space The target color-space identifier.
	* @returns {Color} The converted color.
	* @throws {TypeError} If the target space is not supported.
	*/
	to(space) {
		if (!space || this.constructor.COLOR_SPACE === space) return this;
		const method = CONVERSION_MAP[space];
		if (!method) throw new TypeError(`Color space \`${space}\` is not valid.`);
		return this[method]();
	}
	/**
	* Converts the color to A98 RGB.
	* @returns {A98Rgb} The converted color.
	*/
	toA98Rgb() {
		return this.toXyzD65().toA98Rgb();
	}
	/**
	* Serializes the color using CSS `color(...)` syntax.
	* @param {boolean|null} [alpha=null] Whether to include alpha.
	* @param {number} [precision=2] The numeric precision.
	* @returns {string} The serialized color string.
	*/
	toColorString(alpha = null, precision = 2) {
		alpha ??= this.alpha < 1;
		const values = Object.values(this.toObject());
		let result = `color(${this.constructor.COLOR_SPACE} ${roundValue(values[0], precision)} ${roundValue(values[1], precision)} ${roundValue(values[2], precision)}`;
		if (alpha) result += ` / ${roundValue(this.alpha, precision)}`;
		result += ")";
		return result;
	}
	/**
	* Converts the color to Display P3.
	* @returns {DisplayP3} The converted color.
	*/
	toDisplayP3() {
		return this.toDisplayP3Linear().toDisplayP3();
	}
	/**
	* Converts the color to linear Display P3.
	* @returns {DisplayP3Linear} The converted color.
	*/
	toDisplayP3Linear() {
		return this.toXyzD65().toDisplayP3Linear();
	}
	/**
	* Converts the color to Hex/RGB keyword formatting.
	* @returns {Hex} The converted color.
	*/
	toHex() {
		return this.toRgb().toHex();
	}
	/**
	* Converts the color to HSL.
	* @returns {Hsl} The converted color.
	*/
	toHsl() {
		return this.toSrgb().toHsl();
	}
	/**
	* Converts the color to HWB.
	* @returns {Hwb} The converted color.
	*/
	toHwb() {
		return this.toSrgb().toHwb();
	}
	/**
	* Converts the color to Lab.
	* @returns {Lab} The converted color.
	*/
	toLab() {
		return this.toXyzD50().toLab();
	}
	/**
	* Converts the color to LCH.
	* @returns {Lch} The converted color.
	*/
	toLch() {
		return this.toLab().toLch();
	}
	/**
	* Returns the color state as a plain object.
	* @abstract
	* @returns {Record<string, number>} The channel object.
	* @throws {TypeError} If a subclass does not implement serialization.
	*/
	toObject() {
		throw new TypeError("Color.toObject must be implemented by subclasses.");
	}
	/**
	* Converts the color to OKLab.
	* @returns {OkLab} The converted color.
	*/
	toOkLab() {
		return this.toXyzD65().toOkLab();
	}
	/**
	* Converts the color to OKLCH.
	* @returns {OkLch} The converted color.
	*/
	toOkLch() {
		return this.toOkLab().toOkLch();
	}
	/**
	* Converts the color to ProPhoto RGB.
	* @returns {ProPhotoRgb} The converted color.
	*/
	toProPhotoRgb() {
		return this.toXyzD50().toProPhotoRgb();
	}
	/**
	* Converts the color to Rec. 2020.
	* @returns {Rec2020} The converted color.
	*/
	toRec2020() {
		return this.toXyzD65().toRec2020();
	}
	/**
	* Converts the color to RGB.
	* @returns {Rgb} The converted color.
	*/
	toRgb() {
		return this.toSrgb().toRgb();
	}
	/**
	* Converts the color to sRGB.
	* @returns {Srgb} The converted color.
	*/
	toSrgb() {
		return this.toSrgbLinear().toSrgb();
	}
	/**
	* Converts the color to linear sRGB.
	* @returns {SrgbLinear} The converted color.
	*/
	toSrgbLinear() {
		return this.toXyzD65().toSrgbLinear();
	}
	/**
	* Serializes the color to a CSS string.
	* @param {boolean|null} [alpha=null] Whether to include alpha when the format supports it.
	* @param {number} [precision=2] The numeric precision when the format supports it.
	* @abstract
	* @returns {string} The serialized color string.
	* @throws {TypeError} If a subclass does not implement string formatting.
	*/
	toString(alpha = null, precision = 2) {
		throw new TypeError("Color.toString must be implemented by subclasses.");
	}
	/**
	* Converts the color to XYZ D50.
	* @returns {XyzD50} The converted color.
	*/
	toXyzD50() {
		return this.toXyzD65().toXyzD50();
	}
	/**
	* Converts the color to XYZ D65.
	* @returns {XyzD65} The converted color.
	*/
	toXyzD65() {
		return this.toSrgbLinear().toXyzD65();
	}
	/**
	* Returns a copy with a different alpha channel.
	* @param {number} alpha The replacement alpha channel.
	* @returns {this} A new color instance.
	*/
	withAlpha(alpha) {
		const [channel1, channel2, channel3] = Object.values(this.toObject());
		return new this.constructor(channel1, channel2, channel3, alpha);
	}
};

//#endregion
//#region src/channels/rgb-color.js
/**
* Shared RGB-style channel storage and immutable update helpers.
*/
var RgbColor = class extends Color {
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
	* @returns {number} The blue channel value.
	*/
	getBlue() {
		return this.blue;
	}
	/**
	* Returns the green channel.
	* @returns {number} The green channel value.
	*/
	getGreen() {
		return this.green;
	}
	/**
	* Returns the red channel.
	* @returns {number} The red channel value.
	*/
	getRed() {
		return this.red;
	}
	/**
	* Returns the color state as a plain object.
	* @returns {{red: number, green: number, blue: number, alpha: number}} The channel object.
	*/
	toObject() {
		return {
			red: this.red,
			green: this.green,
			blue: this.blue,
			alpha: this.alpha
		};
	}
	/**
	* Returns a copy with a different blue channel.
	* @param {number} blue The replacement blue channel.
	* @returns {RgbColor} A new color instance.
	*/
	withBlue(blue) {
		return new this.constructor(this.red, this.green, blue, this.alpha);
	}
	/**
	* Returns a copy with a different green channel.
	* @param {number} green The replacement green channel.
	* @returns {RgbColor} A new color instance.
	*/
	withGreen(green) {
		return new this.constructor(this.red, green, this.blue, this.alpha);
	}
	/**
	* Returns a copy with a different red channel.
	* @param {number} red The replacement red channel.
	* @returns {RgbColor} A new color instance.
	*/
	withRed(red) {
		return new this.constructor(red, this.green, this.blue, this.alpha);
	}
};

//#endregion
//#region src/conversions.js
/**
* Applies a sign-preserving power transform.
* @param {number} value The value.
* @param {number} exponent The exponent.
* @returns {number} The transformed value.
*/
var powSigned = (value, exponent) => {
	return value < 0 ? -Math.pow(-value, exponent) : Math.pow(value, exponent);
};
/**
* Converts a linear SRGB channel to gamma-corrected form.
* @param {number} value The channel value.
* @returns {number} The gamma-corrected channel value.
*/
var linearSrgbChannelToSrgb = (value) => {
	const absolute = Math.abs(value);
	return absolute <= .0031308 ? value * 12.92 : (value < 0 ? -1 : 1) * (1.055 * Math.pow(absolute, 1 / 2.4) - .055);
};
/**
* Calculates the R, G or B value via hue interpolation.
* @param {number} p The first value.
* @param {number} q The second value.
* @param {number} t The shifted hue value.
* @returns {number} The R, G or B value.
*/
var rgbHue = (p, q, t) => {
	t = (t + 1) % 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
};
/**
* Converts a gamma-corrected SRGB channel to linear form.
* @param {number} value The channel value.
* @returns {number} The linear channel value.
*/
var srgbChannelToLinear = (value) => {
	const absolute = Math.abs(value);
	return absolute <= .04045 ? value / 12.92 : (value < 0 ? -1 : 1) * Math.pow((absolute + .055) / 1.055, 2.4);
};
/**
* Converts A98 RGB color values to XYZ D65.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The XYZ D65 values.
*/
var a98RgbToXyzD65 = (r, g, b) => {
	r = powSigned(r, 2.19921875);
	g = powSigned(g, 2.19921875);
	b = powSigned(b, 2.19921875);
	return [
		.5766690429101308 * r + .1855582379065463 * g + .1882286462349947 * b,
		.2973449752505362 * r + .627363566255466 * g + .0752914584939979 * b,
		.0270313613864124 * r + .0706888525358271 * g + .9913375368376389 * b
	];
};
/**
* Converts Display P3 Linear color values to Display P3.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The Display P3 values.
*/
var displayP3LinearToDisplayP3 = (r, g, b) => {
	return [
		linearSrgbChannelToSrgb(r),
		linearSrgbChannelToSrgb(g),
		linearSrgbChannelToSrgb(b)
	];
};
/**
* Converts Display P3 Linear color values to XYZ D65.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The XYZ D65 values.
*/
var displayP3LinearToXyzD65 = (r, g, b) => {
	return [
		.4865709486482163 * r + .2656676931690929 * g + .1982172852343625 * b,
		.2289745640697488 * r + .6917385218365062 * g + .079286914093745 * b,
		.0451133818589026 * g + 1.0439443689009757 * b
	];
};
/**
* Converts Display P3 color values to Display P3 Linear.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The Display P3 Linear values.
*/
var displayP3ToDisplayP3Linear = (r, g, b) => {
	return [
		srgbChannelToLinear(r),
		srgbChannelToLinear(g),
		srgbChannelToLinear(b)
	];
};
/**
* Converts HSL color values to SRGB.
* @param {number} h The hue value. (0, 360)
* @param {number} s The saturation value. (0, 1)
* @param {number} l The lightness value. (0, 1)
* @returns {[number, number, number]} The SRGB values.
*/
var hslToSrgb = (h, s, l) => {
	h = h % 360 / 360;
	let r = l;
	let g = l;
	let b = l;
	if (s !== 0) {
		const q = l < .5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = rgbHue(p, q, h + 1 / 3);
		g = rgbHue(p, q, h);
		b = rgbHue(p, q, h - 1 / 3);
	}
	return [
		r,
		g,
		b
	];
};
/**
* Converts HSV color values to SRGB.
* @param {number} h The hue value. (0, 360)
* @param {number} s The saturation value. (0, 1)
* @param {number} v The brightness value. (0, 1)
* @returns {[number, number, number]} The SRGB values.
*/
var hsvToSrgb = (h, s, v) => {
	h = (h + 360) % 360;
	const c = v * s;
	const x = c * (1 - Math.abs(h / 60 % 2 - 1));
	const m = v - c;
	let r1;
	let g1;
	let b1;
	if (h < 60) [r1, g1, b1] = [
		c,
		x,
		0
	];
	else if (h < 120) [r1, g1, b1] = [
		x,
		c,
		0
	];
	else if (h < 180) [r1, g1, b1] = [
		0,
		c,
		x
	];
	else if (h < 240) [r1, g1, b1] = [
		0,
		x,
		c
	];
	else if (h < 300) [r1, g1, b1] = [
		x,
		0,
		c
	];
	else [r1, g1, b1] = [
		c,
		0,
		x
	];
	return [
		r1 + m,
		g1 + m,
		b1 + m
	];
};
/**
* Converts HWB color values to SRGB.
* @param {number} h The hue value. (0, 360)
* @param {number} w The whiteness value. (0, 1)
* @param {number} bl The blackness value. (0, 1)
* @returns {[number, number, number]} The SRGB values.
*/
var hwbToSrgb = (h, w, bl) => {
	const total = w + bl;
	if (total > 1) {
		w /= total;
		bl /= total;
	}
	const [r, g, b] = hsvToSrgb(h, 1, 1);
	const factor = 1 - w - bl;
	return [
		r * factor + w,
		g * factor + w,
		b * factor + w
	];
};
/**
* Converts LAB color values to LCH.
* @param {number} L The lightness value. (0, 100)
* @param {number} a The a value. (-128, 127)
* @param {number} b The b value. (-128, 127)
* @returns {[number, number, number]} The LCH values.
*/
var labToLch = (L, a, b) => {
	const C = Math.hypot(a, b);
	let H = Math.atan2(b, a) * 180 / Math.PI % 360;
	if (H < 0) H += 360;
	return [
		L,
		C,
		H
	];
};
/**
* Converts LAB color values to XYZ D50.
* @param {number} L The lightness value. (0, 100)
* @param {number} a The a value. (-128, 127)
* @param {number} b The b value. (-128, 127)
* @returns {[number, number, number]} The XYZ D50 values.
*/
var labToXyzD50 = (L, a, b) => {
	const epsilon = 216 / 24389;
	const kappa = 24389 / 27;
	const fy = (L + 16) / 116;
	const fx = fy + a / 500;
	const fz = fy - b / 200;
	const fx3 = fx ** 3;
	const fz3 = fz ** 3;
	const xr = fx3 > epsilon ? fx3 : (116 * fx - 16) / kappa;
	const yr = L > kappa * epsilon ? fy ** 3 : L / kappa;
	const zr = fz3 > epsilon ? fz3 : (116 * fz - 16) / kappa;
	return [
		xr * .9642956764295677,
		yr,
		zr * .8251046025104602
	];
};
/**
* Converts LCH color values to LAB.
* @param {number} L The lightness value. (0, 100)
* @param {number} C The chroma value. (0, 230)
* @param {number} H The hue value. (0, 360)
* @returns {[number, number, number]} The LAB values.
*/
var lchToLab = (L, C, H) => {
	const radians = H * Math.PI / 180;
	return [
		L,
		C * Math.cos(radians),
		C * Math.sin(radians)
	];
};
/**
* Converts OK LAB color values to OK LCH.
* @param {number} L The lightness value. (0, 1)
* @param {number} a The a value. (-0.4, 0.4)
* @param {number} b The b value. (-0.4, 0.4)
* @returns {[number, number, number]} The OK LCH values.
*/
var okLabToOkLch = (L, a, b) => {
	const C = Math.hypot(a, b);
	let H = Math.atan2(b, a) * 180 / Math.PI % 360;
	if (H < 0) H += 360;
	return [
		L,
		C,
		H
	];
};
/**
* Converts OK LAB color values to XYZ D65.
* @param {number} L The lightness value. (0, 1)
* @param {number} a The a value. (-0.4, 0.4)
* @param {number} b The b value. (-0.4, 0.4)
* @returns {[number, number, number]} The XYZ D65 values.
*/
var okLabToXyzD65 = (L, a, b) => {
	const l = Math.pow(L + .3963377773761749 * a + .2158037573099136 * b, 3);
	const m = Math.pow(L - .1055613458156586 * a - .0638541728258133 * b, 3);
	const s = Math.pow(L - .0894841775298119 * a - 1.2914855480194092 * b, 3);
	return [
		1.2268798758459243 * l - .5578149944602171 * m + .2813910456659647 * s,
		-.0405757452148008 * l + 1.112286803280317 * m - .0717110580655164 * s,
		-.0763729366746601 * l - .4214933324022432 * m + 1.5869240198367816 * s
	];
};
/**
* Converts OK LCH color values to OK LAB.
* @param {number} L The lightness value. (0, 1)
* @param {number} C The chroma value. (0, 0.4)
* @param {number} H The hue value. (0, 360)
* @returns {[number, number, number]} The OK LAB values.
*/
var okLchToOkLab = (L, C, H) => {
	const radians = H * Math.PI / 180;
	return [
		L,
		C * Math.cos(radians),
		C * Math.sin(radians)
	];
};
/**
* Converts ProPhoto RGB color values to XYZ D50.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The XYZ D50 values.
*/
var prophotoRgbToXyzD50 = (r, g, b) => {
	const decode = (value) => Math.abs(value) <= .03125 ? value / 16 : powSigned(value, 1.8);
	r = decode(r);
	g = decode(g);
	b = decode(b);
	return [
		.7977666449006423 * r + .1351812974005331 * g + .0313477341283922 * b,
		.2880748288194013 * r + .711835234241873 * g + 899369387256e-16 * b,
		.8251046025104602 * b
	];
};
/**
* Converts Rec. 2020 color values to XYZ D65.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The XYZ D65 values.
*/
var rec2020ToXyzD65 = (r, g, b) => {
	r = powSigned(r, 2.4);
	g = powSigned(g, 2.4);
	b = powSigned(b, 2.4);
	return [
		.6369580483012913 * r + .1446169035862084 * g + .1688809751641721 * b,
		.262700212011267 * r + .677998071518871 * g + .0593017164698619 * b,
		.0280726930490875 * g + 1.0609850577107909 * b
	];
};
/**
* Converts RGB color values to SRGB.
* @param {number} r The red value. (0, 255)
* @param {number} g The green value. (0, 255)
* @param {number} b The blue value. (0, 255)
* @returns {[number, number, number]} The SRGB values.
*/
var rgbToSrgb = (r, g, b) => {
	return [
		r / 255,
		g / 255,
		b / 255
	];
};
/**
* Converts SRGB Linear color values to SRGB.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The SRGB values.
*/
var srgbLinearToSrgb = (r, g, b) => {
	return [
		linearSrgbChannelToSrgb(r),
		linearSrgbChannelToSrgb(g),
		linearSrgbChannelToSrgb(b)
	];
};
/**
* Converts SRGB Linear color values to XYZ D65.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The XYZ D65 values.
*/
var srgbLinearToXyzD65 = (r, g, b) => {
	return [
		.4123907992659595 * r + .357584339383878 * g + .1804807884018343 * b,
		.2126390058715104 * r + .7151686787677559 * g + .0721923153607337 * b,
		.0193308187155918 * r + .119194779794626 * g + .9505321522496606 * b
	];
};
/**
* Converts SRGB color values to HSL.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The HSL values.
*/
var srgbToHsl = (r, g, b) => {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	const d = max - min;
	let h;
	let s;
	if (d < 1e-12 || l === 0 || l === 1) {
		h = 0;
		s = 0;
	} else {
		s = l > .5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
			default: h = 0;
		}
		h = h * 60 % 360;
		if (h < 0) h += 360;
	}
	return [
		h,
		s,
		l
	];
};
/**
* Converts SRGB color values to HSV.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The HSV values.
*/
var srgbToHsv = (r, g, b) => {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const v = max;
	const d = max - min;
	const s = max < 1e-12 ? 0 : d / max;
	let h;
	if (d < 1e-12) h = 0;
	else if (max === r) h = 60 * ((g - b) / d % 6);
	else if (max === g) h = 60 * ((b - r) / d + 2);
	else h = 60 * ((r - g) / d + 4);
	h %= 360;
	if (h < 0) h += 360;
	return [
		h,
		s,
		v
	];
};
/**
* Converts SRGB color values to HWB.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The HWB values.
*/
var srgbToHwb = (r, g, b) => {
	const [h] = srgbToHsv(r, g, b);
	return [
		h,
		Math.min(r, g, b),
		1 - Math.max(r, g, b)
	];
};
/**
* Converts SRGB color values to luma.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {number} The luma value.
*/
var srgbToLuma = (r, g, b) => {
	r = srgbChannelToLinear(r);
	g = srgbChannelToLinear(g);
	b = srgbChannelToLinear(b);
	return .2126 * r + .7152 * g + .0722 * b;
};
/**
* Converts SRGB color values to RGB.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The RGB values.
*/
var srgbToRgb = (r, g, b) => {
	return [
		r * 255,
		g * 255,
		b * 255
	];
};
/**
* Converts SRGB color values to SRGB Linear.
* @param {number} r The red value. (0, 1)
* @param {number} g The green value. (0, 1)
* @param {number} b The blue value. (0, 1)
* @returns {[number, number, number]} The SRGB Linear values.
*/
var srgbToSrgbLinear = (r, g, b) => {
	return [
		srgbChannelToLinear(r),
		srgbChannelToLinear(g),
		srgbChannelToLinear(b)
	];
};
/**
* Converts XYZ D50 color values to LAB.
* @param {number} x The x value. (0, 1)
* @param {number} y The y value. (0, 1)
* @param {number} z The z value. (0, 1)
* @returns {[number, number, number]} The LAB values.
*/
var xyzD50ToLab = (x, y, z) => {
	const epsilon = 216 / 24389;
	const kappa = 24389 / 27;
	const encode = (value) => value > epsilon ? Math.pow(value, 1 / 3) : (kappa * value + 16) / 116;
	const xr = x / .9642956764295677;
	const yr = y;
	const zr = z / .8251046025104602;
	const fx = encode(xr);
	const fy = encode(yr);
	const fz = encode(zr);
	return [
		116 * fy - 16,
		500 * (fx - fy),
		200 * (fy - fz)
	];
};
/**
* Converts XYZ D50 color values to ProPhoto RGB.
* @param {number} x The x value. (0, 1)
* @param {number} y The y value. (0, 1)
* @param {number} z The z value. (0, 1)
* @returns {[number, number, number]} The ProPhoto RGB values.
*/
var xyzD50ToProPhotoRgb = (x, y, z) => {
	const encode = (value) => Math.abs(value) >= .001953125 ? powSigned(value, 1 / 1.8) : value * 16;
	let r = 1.3457868816471583 * x - .2555720873797946 * y - .0511018649755453 * z;
	let g = -.5446307051249019 * x + 1.5082477428451468 * y + .0205274474364214 * z;
	let b = 1.2119675456389452 * z;
	r = encode(r);
	g = encode(g);
	b = encode(b);
	return [
		r,
		g,
		b
	];
};
/**
* Converts XYZ D50 color values to XYZ D65.
* @param {number} x The x value. (0, 1)
* @param {number} y The y value. (0, 1)
* @param {number} z The z value. (0, 1)
* @returns {[number, number, number]} The XYZ D65 values.
*/
var xyzD50ToXyzD65 = (x, y, z) => {
	return [
		.955473421488075 * x - .0230984549487647 * y + .0632592432005707 * z,
		-.0283697093338637 * x + 1.0099953980813041 * y + .0210414411919173 * z,
		.012314014864482 * x - .020507649298899 * y + 1.330365926242124 * z
	];
};
/**
* Converts XYZ D65 color values to A98 RGB.
* @param {number} x The x value. (0, 1)
* @param {number} y The y value. (0, 1)
* @param {number} z The z value. (0, 1)
* @returns {[number, number, number]} The A98 RGB values.
*/
var xyzD65ToA98Rgb = (x, y, z) => {
	const r = 2.041587903810746 * x - .5650069742788596 * y - .3447313507783295 * z;
	const g = -.9692436362808798 * x + 1.8759675015077206 * y + .0415550574071756 * z;
	const b = .013444280632031 * x - .1183623922310182 * y + 1.0151749943912054 * z;
	const gamma = 1 / 2.19921875;
	return [
		powSigned(r, gamma),
		powSigned(g, gamma),
		powSigned(b, gamma)
	];
};
/**
* Converts XYZ D65 color values to Display P3 Linear.
* @param {number} x The x value. (0, 1)
* @param {number} y The y value. (0, 1)
* @param {number} z The z value. (0, 1)
* @returns {[number, number, number]} The Display P3 Linear values.
*/
var xyzD65ToDisplayP3Linear = (x, y, z) => {
	return [
		2.4934969119414245 * x - .9313836179191236 * y - .4027107844507168 * z,
		-.829488969561575 * x + 1.7626640603183468 * y + .0236246858419436 * z,
		.0358458302437843 * x - .0761723892680417 * y + .9568845240076873 * z
	];
};
/**
* Converts XYZ D65 color values to OK LAB.
* @param {number} x The x value. (0, 1)
* @param {number} y The y value. (0, 1)
* @param {number} z The z value. (0, 1)
* @returns {[number, number, number]} The OK LAB values.
*/
var xyzD65ToOkLab = (x, y, z) => {
	let l = .819022437996703 * x + .3619062600528904 * y - .1288737815209879 * z;
	let m = .0329836539323885 * x + .9292868615863434 * y + .0361446663506424 * z;
	let s = .0481771893596242 * x + .2642395317527308 * y + .6335478284694309 * z;
	l = Math.cbrt(l);
	m = Math.cbrt(m);
	s = Math.cbrt(s);
	return [
		.210454268309314 * l + .7936177747023054 * m - .0040720430116193 * s,
		1.9779985324311684 * l - 2.42859224204858 * m + .450593709617411 * s,
		.0259040424655478 * l + .7827717124575296 * m - .8086757549230774 * s
	];
};
/**
* Converts XYZ D65 color values to Rec. 2020.
* @param {number} x The x value. (0, 1)
* @param {number} y The y value. (0, 1)
* @param {number} z The z value. (0, 1)
* @returns {[number, number, number]} The Rec. 2020 values.
*/
var xyzD65ToRec2020 = (x, y, z) => {
	const r = 1.7166511879712676 * x - .3556707837763924 * y - .2533662813736598 * z;
	const g = -.666684351832489 * x + 1.616481236634939 * y + .0157685458139111 * z;
	const b = .0176398574453109 * x - .0427706132578087 * y + .942103121235474 * z;
	return [
		powSigned(r, 1 / 2.4),
		powSigned(g, 1 / 2.4),
		powSigned(b, 1 / 2.4)
	];
};
/**
* Converts XYZ D65 color values to SRGB Linear.
* @param {number} x The x value. (0, 1)
* @param {number} y The y value. (0, 1)
* @param {number} z The z value. (0, 1)
* @returns {[number, number, number]} The SRGB Linear values.
*/
var xyzD65ToSrgbLinear = (x, y, z) => {
	return [
		3.2409699419045213 * x - 1.5373831775700935 * y - .4986107602930033 * z,
		-.9692436362808798 * x + 1.8759675015077206 * y + .0415550574071756 * z,
		.0556300796969936 * x - .2039769588889766 * y + 1.0569715142428786 * z
	];
};
/**
* Converts XYZ D65 color values to XYZ D50.
* @param {number} x The x value. (0, 1)
* @param {number} y The y value. (0, 1)
* @param {number} z The z value. (0, 1)
* @returns {[number, number, number]} The XYZ D50 values.
*/
var xyzD65ToXyzD50 = (x, y, z) => {
	return [
		1.0479297925449969 * x + .0229468706016097 * y - .0501922662892052 * z,
		.029627808770056 * x + .9904344267538799 * y - .0170737990634188 * z,
		-.0092430406462045 * x + .0150551914902982 * y + .7518742814281371 * z
	];
};

//#endregion
//#region src/spaces/a98-rgb.js
/**
* Represents an A98 RGB color.
*/
var A98Rgb = class extends RgbColor {
	static COLOR_SPACE = "a98-rgb";
	/** @inheritdoc */
	toA98Rgb() {
		return this;
	}
	/** @inheritdoc */
	toString(alpha = null, precision = 2) {
		return this.toColorString(alpha, precision);
	}
	/** @inheritdoc */
	toXyzD65() {
		const [x, y, z] = a98RgbToXyzD65(this.red, this.green, this.blue);
		return new this.constructor.XyzD65(x, y, z, this.alpha);
	}
};

//#endregion
//#region src/spaces/display-p3-linear.js
/**
* Represents a linear Display P3 color.
*/
var DisplayP3Linear = class extends RgbColor {
	static COLOR_SPACE = "display-p3-linear";
	/** @inheritdoc */
	toDisplayP3() {
		const [red, green, blue] = displayP3LinearToDisplayP3(this.red, this.green, this.blue);
		return new this.constructor.DisplayP3(red, green, blue, this.alpha);
	}
	/** @inheritdoc */
	toDisplayP3Linear() {
		return this;
	}
	/** @inheritdoc */
	toString(alpha = null, precision = 2) {
		return this.toColorString(alpha, precision);
	}
	/** @inheritdoc */
	toXyzD65() {
		const [x, y, z] = displayP3LinearToXyzD65(this.red, this.green, this.blue);
		return new this.constructor.XyzD65(x, y, z, this.alpha);
	}
};

//#endregion
//#region src/spaces/display-p3.js
/**
* Represents a Display P3 color.
*/
var DisplayP3 = class extends RgbColor {
	static COLOR_SPACE = "display-p3";
	/** @inheritdoc */
	toDisplayP3() {
		return this;
	}
	/** @inheritdoc */
	toDisplayP3Linear() {
		const [red, green, blue] = displayP3ToDisplayP3Linear(this.red, this.green, this.blue);
		return new this.constructor.DisplayP3Linear(red, green, blue, this.alpha);
	}
	/** @inheritdoc */
	toString(alpha = null, precision = 2) {
		return this.toColorString(alpha, precision);
	}
	/** @inheritdoc */
	toXyzD65() {
		return this.toDisplayP3Linear().toXyzD65();
	}
};

//#endregion
//#region src/spaces/rgb.js
/**
* Represents an RGB color using 0-255 channel values.
*/
var Rgb = class extends RgbColor {
	static COLOR_SPACE = "rgb";
	/**
	* Returns the color as a hex string without the leading `#`.
	* @param {boolean} [alpha=false] Whether to include alpha.
	* @param {boolean} [shortenHex=true] Whether to shorten the hex form when possible.
	* @returns {string} The hex string.
	*/
	getHex(alpha = false, shortenHex = true) {
		const channels = [
			this.red,
			this.green,
			this.blue
		];
		if (alpha) channels.push(this.alpha * 255);
		const bytes = channels.map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0"));
		if (shortenHex && bytes.every((byte) => byte[0] === byte[1])) return bytes.map((byte) => byte[0]).join("");
		return bytes.join("");
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
		if (name && alpha && this.alpha <= 0) return "transparent";
		if (name && (!alpha || this.alpha >= 1) && [
			this.red,
			this.green,
			this.blue
		].every((value) => Number.isInteger(value) && value >= 0 && value <= 255)) {
			const colorName = findCssColorName(this.getHex(false, false));
			if (colorName) return colorName;
		}
		let result = `rgb(${roundValue(this.red, precision)} ${roundValue(this.green, precision)} ${roundValue(this.blue, precision)}`;
		if (alpha) result += ` / ${roundValue(this.alpha * 100, Math.max(0, precision - 2))}%`;
		result += ")";
		return result;
	}
};

//#endregion
//#region src/spaces/hex.js
/**
* Represents an RGB color formatted as hexadecimal.
*/
var Hex = class extends Rgb {
	static COLOR_SPACE = "hex";
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
		alpha ??= this.alpha < 1;
		if (name && alpha && this.alpha <= 0) return "transparent";
		if (name && (!alpha || this.alpha >= 1)) {
			const colorName = findCssColorName(this.getHex(false, false));
			if (colorName) return colorName;
		}
		return `#${this.getHex(alpha, shortenHex)}`;
	}
};

//#endregion
//#region src/spaces/hsl.js
/**
* Represents an HSL color.
*/
var Hsl = class extends Color {
	static COLOR_SPACE = "hsl";
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
	* @returns {number} The hue channel value in degrees.
	*/
	getHue() {
		return this.hue;
	}
	/**
	* Returns the lightness channel.
	* @returns {number} The lightness channel value.
	*/
	getLightness() {
		return this.lightness;
	}
	/**
	* Returns the saturation channel.
	* @returns {number} The saturation channel value.
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
	* @returns {{hue: number, saturation: number, lightness: number, alpha: number}} The channel object.
	*/
	toObject() {
		return {
			hue: this.hue,
			saturation: this.saturation,
			lightness: this.lightness,
			alpha: this.alpha
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
	* @returns {string} The serialized color string.
	*/
	toString(alpha = null, precision = 2) {
		alpha ??= this.alpha < 1;
		let result = `hsl(${roundValue(this.hue, precision)}deg ${roundValue(this.saturation, precision)}% ${roundValue(this.lightness, precision)}%`;
		if (alpha) result += ` / ${roundValue(this.alpha * 100, Math.max(0, precision - 2))}%`;
		result += ")";
		return result;
	}
	/**
	* Returns a copy with a different hue channel.
	* @param {number} hue The replacement hue channel.
	* @returns {Hsl} A new color instance.
	*/
	withHue(hue) {
		return new this.constructor(hue, this.saturation, this.lightness, this.alpha);
	}
	/**
	* Returns a copy with a different lightness channel.
	* @param {number} lightness The replacement lightness channel.
	* @returns {Hsl} A new color instance.
	*/
	withLightness(lightness) {
		return new this.constructor(this.hue, this.saturation, lightness, this.alpha);
	}
	/**
	* Returns a copy with a different saturation channel.
	* @param {number} saturation The replacement saturation channel.
	* @returns {Hsl} A new color instance.
	*/
	withSaturation(saturation) {
		return new this.constructor(this.hue, saturation, this.lightness, this.alpha);
	}
};

//#endregion
//#region src/spaces/hwb.js
/**
* Represents an HWB color.
*/
var Hwb = class extends Color {
	static COLOR_SPACE = "hwb";
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
			alpha: this.alpha
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
		if (alpha) result += ` / ${roundValue(this.alpha * 100, Math.max(0, precision - 2))}%`;
		result += ")";
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
};

//#endregion
//#region src/channels/lab-color.js
/**
* Shared Lab-style channel storage and immutable update helpers.
*/
var LabColor = class extends Color {
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
			alpha: this.alpha
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
};

//#endregion
//#region src/spaces/lab.js
/**
* Represents a Lab color.
*/
var Lab = class extends LabColor {
	static COLOR_SPACE = "lab";
	/** @inheritdoc */
	toLab() {
		return this;
	}
	/** @inheritdoc */
	toLch() {
		const [lightness, chroma, hue] = labToLch(this.lightness, this.a, this.b);
		return new this.constructor.Lch(lightness, chroma, hue, this.alpha);
	}
	/**
	* Serializes the color using CSS `lab(...)` syntax.
	* @param {boolean|null} [alpha=null] Whether to include alpha.
	* @param {number} [precision=2] The numeric precision.
	* @returns {string} The serialized color string.
	*/
	toString(alpha = null, precision = 2) {
		alpha ??= this.alpha < 1;
		let result = `lab(${roundValue(this.lightness, precision)}% ${roundValue(this.a, precision)} ${roundValue(this.b, precision)}`;
		if (alpha) result += ` / ${roundValue(this.alpha, precision)}`;
		result += ")";
		return result;
	}
	/** @inheritdoc */
	toXyzD50() {
		const [x, y, z] = labToXyzD50(this.lightness, this.a, this.b);
		return new this.constructor.XyzD50(x, y, z, this.alpha);
	}
	/** @inheritdoc */
	toXyzD65() {
		return this.toXyzD50().toXyzD65();
	}
};

//#endregion
//#region src/channels/lch-color.js
/**
* Shared LCH-style channel storage and immutable update helpers.
*/
var LchColor = class extends Color {
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
	* @returns {number} The chroma channel value.
	*/
	getChroma() {
		return this.chroma;
	}
	/**
	* Returns the hue channel.
	* @returns {number} The hue channel value in degrees.
	*/
	getHue() {
		return this.hue;
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
	* @returns {{lightness: number, chroma: number, hue: number, alpha: number}} The channel object.
	*/
	toObject() {
		return {
			lightness: this.lightness,
			chroma: this.chroma,
			hue: this.hue,
			alpha: this.alpha
		};
	}
	/**
	* Returns a copy with a different chroma channel.
	* @param {number} chroma The replacement chroma channel.
	* @returns {LchColor} A new color instance.
	*/
	withChroma(chroma) {
		return new this.constructor(this.lightness, chroma, this.hue, this.alpha);
	}
	/**
	* Returns a copy with a different hue channel.
	* @param {number} hue The replacement hue channel in degrees.
	* @returns {LchColor} A new color instance.
	*/
	withHue(hue) {
		return new this.constructor(this.lightness, this.chroma, hue, this.alpha);
	}
	/**
	* Returns a copy with a different lightness channel.
	* @param {number} lightness The replacement lightness channel.
	* @returns {LchColor} A new color instance.
	*/
	withLightness(lightness) {
		return new this.constructor(lightness, this.chroma, this.hue, this.alpha);
	}
};

//#endregion
//#region src/spaces/lch.js
/**
* Represents an LCH color.
*/
var Lch = class extends LchColor {
	static COLOR_SPACE = "lch";
	/** @inheritdoc */
	toLab() {
		const [lightness, a, b] = lchToLab(this.lightness, this.chroma, this.hue);
		return new this.constructor.Lab(lightness, a, b, this.alpha);
	}
	/** @inheritdoc */
	toLch() {
		return this;
	}
	/**
	* Serializes the color using CSS `lch(...)` syntax.
	* @param {boolean|null} [alpha=null] Whether to include alpha.
	* @param {number} [precision=2] The numeric precision.
	* @returns {string} The serialized color string.
	*/
	toString(alpha = null, precision = 2) {
		alpha ??= this.alpha < 1;
		let result = `lch(${roundValue(this.lightness, precision)}% ${roundValue(this.chroma, precision)} ${roundValue(this.hue, precision)}deg`;
		if (alpha) result += ` / ${roundValue(this.alpha, precision)}`;
		result += ")";
		return result;
	}
	/** @inheritdoc */
	toXyzD65() {
		return this.toLab().toXyzD65();
	}
};

//#endregion
//#region src/spaces/ok-lab.js
/**
* Represents an OKLab color.
*/
var OkLab = class extends LabColor {
	static COLOR_SPACE = "oklab";
	/** @inheritdoc */
	toOkLab() {
		return this;
	}
	/** @inheritdoc */
	toOkLch() {
		const [lightness, chroma, hue] = okLabToOkLch(this.lightness, this.a, this.b);
		return new this.constructor.OkLch(lightness, chroma, hue, this.alpha);
	}
	/**
	* Serializes the color using CSS `oklab(...)` syntax.
	* @param {boolean|null} [alpha=null] Whether to include alpha.
	* @param {number} [precision=2] The numeric precision.
	* @returns {string} The serialized color string.
	*/
	toString(alpha = null, precision = 2) {
		alpha ??= this.alpha < 1;
		let result = `oklab(${roundValue(this.lightness, precision)} ${roundValue(this.a, precision)} ${roundValue(this.b, precision)}`;
		if (alpha) result += ` / ${roundValue(this.alpha, precision)}`;
		result += ")";
		return result;
	}
	/** @inheritdoc */
	toXyzD65() {
		const [x, y, z] = okLabToXyzD65(this.lightness, this.a, this.b);
		return new this.constructor.XyzD65(x, y, z, this.alpha);
	}
};

//#endregion
//#region src/spaces/ok-lch.js
/**
* Represents an OKLCH color.
*/
var OkLch = class extends LchColor {
	static COLOR_SPACE = "oklch";
	/** @inheritdoc */
	toOkLab() {
		const [lightness, a, b] = okLchToOkLab(this.lightness, this.chroma, this.hue);
		return new this.constructor.OkLab(lightness, a, b, this.alpha);
	}
	/** @inheritdoc */
	toOkLch() {
		return this;
	}
	/**
	* Serializes the color using CSS `oklch(...)` syntax.
	* @param {boolean|null} [alpha=null] Whether to include alpha.
	* @param {number} [precision=2] The numeric precision.
	* @returns {string} The serialized color string.
	*/
	toString(alpha = null, precision = 2) {
		alpha ??= this.alpha < 1;
		let result = `oklch(${roundValue(this.lightness, precision)} ${roundValue(this.chroma, precision)} ${roundValue(this.hue, precision)}deg`;
		if (alpha) result += ` / ${roundValue(this.alpha, precision)}`;
		result += ")";
		return result;
	}
	/** @inheritdoc */
	toXyzD65() {
		return this.toOkLab().toXyzD65();
	}
};

//#endregion
//#region src/spaces/pro-photo-rgb.js
/**
* Represents a ProPhoto RGB color.
*/
var ProPhotoRgb = class extends RgbColor {
	static COLOR_SPACE = "prophoto-rgb";
	/** @inheritdoc */
	toProPhotoRgb() {
		return this;
	}
	/** @inheritdoc */
	toString(alpha = null, precision = 2) {
		return this.toColorString(alpha, precision);
	}
	/** @inheritdoc */
	toXyzD50() {
		const [x, y, z] = prophotoRgbToXyzD50(this.red, this.green, this.blue);
		return new this.constructor.XyzD50(x, y, z, this.alpha);
	}
	/** @inheritdoc */
	toXyzD65() {
		return this.toXyzD50().toXyzD65();
	}
};

//#endregion
//#region src/spaces/rec-2020.js
/**
* Represents a Rec. 2020 color.
*/
var Rec2020 = class extends RgbColor {
	static COLOR_SPACE = "rec2020";
	/** @inheritdoc */
	toRec2020() {
		return this;
	}
	/** @inheritdoc */
	toString(alpha = null, precision = 2) {
		return this.toColorString(alpha, precision);
	}
	/** @inheritdoc */
	toXyzD65() {
		const [x, y, z] = rec2020ToXyzD65(this.red, this.green, this.blue);
		return new this.constructor.XyzD65(x, y, z, this.alpha);
	}
};

//#endregion
//#region src/spaces/srgb-linear.js
/**
* Represents a linear sRGB color.
*/
var SrgbLinear = class extends RgbColor {
	static COLOR_SPACE = "srgb-linear";
	/** @inheritdoc */
	toSrgb() {
		const [red, green, blue] = srgbLinearToSrgb(this.red, this.green, this.blue);
		return new this.constructor.Srgb(red, green, blue, this.alpha);
	}
	/** @inheritdoc */
	toSrgbLinear() {
		return this;
	}
	/** @inheritdoc */
	toString(alpha = null, precision = 2) {
		return this.toColorString(alpha, precision);
	}
	/** @inheritdoc */
	toXyzD65() {
		const [x, y, z] = srgbLinearToXyzD65(this.red, this.green, this.blue);
		return new this.constructor.XyzD65(x, y, z, this.alpha);
	}
};

//#endregion
//#region src/spaces/srgb.js
/**
* Represents an sRGB color.
*/
var Srgb = class extends RgbColor {
	static COLOR_SPACE = "srgb";
	/** @inheritdoc */
	luma() {
		return srgbToLuma(this.red, this.green, this.blue);
	}
	/** @inheritdoc */
	toHsl() {
		const [hue, saturation, lightness] = srgbToHsl(this.red, this.green, this.blue);
		return new this.constructor.Hsl(hue, saturation * 100, lightness * 100, this.alpha);
	}
	/** @inheritdoc */
	toHwb() {
		const [hue, whiteness, blackness] = srgbToHwb(this.red, this.green, this.blue);
		return new this.constructor.Hwb(hue, whiteness * 100, blackness * 100, this.alpha);
	}
	/** @inheritdoc */
	toRgb() {
		const [red, green, blue] = srgbToRgb(this.red, this.green, this.blue);
		return new this.constructor.Rgb(red, green, blue, this.alpha);
	}
	/** @inheritdoc */
	toSrgb() {
		return this;
	}
	/** @inheritdoc */
	toSrgbLinear() {
		const [red, green, blue] = srgbToSrgbLinear(this.red, this.green, this.blue);
		return new this.constructor.SrgbLinear(red, green, blue, this.alpha);
	}
	/** @inheritdoc */
	toString(alpha = null, precision = 2) {
		return this.toColorString(alpha, precision);
	}
};

//#endregion
//#region src/channels/xyz-color.js
/**
* Shared XYZ-style channel storage and immutable update helpers.
*/
var XyzColor = class extends Color {
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
			alpha: this.alpha
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
};

//#endregion
//#region src/spaces/xyz-d50.js
/**
* Represents an XYZ D50 color.
*/
var XyzD50 = class extends XyzColor {
	static COLOR_SPACE = "xyz-d50";
	/** @inheritdoc */
	toLab() {
		const [lightness, a, b] = xyzD50ToLab(this.x, this.y, this.z);
		return new this.constructor.Lab(lightness, a, b, this.alpha);
	}
	/** @inheritdoc */
	toProPhotoRgb() {
		const [red, green, blue] = xyzD50ToProPhotoRgb(this.x, this.y, this.z);
		return new this.constructor.ProPhotoRgb(red, green, blue, this.alpha);
	}
	/** @inheritdoc */
	toString(alpha = null, precision = 2) {
		return this.toColorString(alpha, precision);
	}
	/** @inheritdoc */
	toXyzD50() {
		return this;
	}
	/** @inheritdoc */
	toXyzD65() {
		const [x, y, z] = xyzD50ToXyzD65(this.x, this.y, this.z);
		return new this.constructor.XyzD65(x, y, z, this.alpha);
	}
};

//#endregion
//#region src/spaces/xyz-d65.js
/**
* Represents an XYZ D65 color.
*/
var XyzD65 = class extends XyzColor {
	static COLOR_SPACE = "xyz-d65";
	/** @inheritdoc */
	toA98Rgb() {
		const [red, green, blue] = xyzD65ToA98Rgb(this.x, this.y, this.z);
		return new this.constructor.A98Rgb(red, green, blue, this.alpha);
	}
	/** @inheritdoc */
	toDisplayP3Linear() {
		const [red, green, blue] = xyzD65ToDisplayP3Linear(this.x, this.y, this.z);
		return new this.constructor.DisplayP3Linear(red, green, blue, this.alpha);
	}
	/** @inheritdoc */
	toOkLab() {
		const [lightness, a, b] = xyzD65ToOkLab(this.x, this.y, this.z);
		return new this.constructor.OkLab(lightness, a, b, this.alpha);
	}
	/** @inheritdoc */
	toRec2020() {
		const [red, green, blue] = xyzD65ToRec2020(this.x, this.y, this.z);
		return new this.constructor.Rec2020(red, green, blue, this.alpha);
	}
	/** @inheritdoc */
	toSrgbLinear() {
		const [red, green, blue] = xyzD65ToSrgbLinear(this.x, this.y, this.z);
		return new this.constructor.SrgbLinear(red, green, blue, this.alpha);
	}
	/** @inheritdoc */
	toString(alpha = null, precision = 2) {
		return this.toColorString(alpha, precision);
	}
	/** @inheritdoc */
	toXyzD50() {
		const [x, y, z] = xyzD65ToXyzD50(this.x, this.y, this.z);
		return new this.constructor.XyzD50(x, y, z, this.alpha);
	}
	/** @inheritdoc */
	toXyzD65() {
		return this;
	}
};

//#endregion
//#region src/index.js
Object.assign(Color, {
	A98Rgb,
	DisplayP3,
	DisplayP3Linear,
	Hex,
	Hsl,
	Hwb,
	Lab,
	Lch,
	OkLab,
	OkLch,
	ProPhotoRgb,
	Rec2020,
	Rgb,
	Srgb,
	SrgbLinear,
	XyzD50,
	XyzD65
});
var src_default = Color;

//#endregion
export { A98Rgb, DisplayP3, DisplayP3Linear, Hex, Hsl, Hwb, Lab, Lch, OkLab, OkLch, ProPhotoRgb, Rec2020, Rgb, Srgb, SrgbLinear, XyzD50, XyzD65, src_default as default };
//# sourceMappingURL=frost-color.esm.js.map