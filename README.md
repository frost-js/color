# FrostColor

[![CI](https://github.com/elusivecodes/FrostColor/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/elusivecodes/FrostColor/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/%40fr0st%2Fcolor?style=flat-square)](https://www.npmjs.com/package/@fr0st/color)
[![npm downloads](https://img.shields.io/npm/dm/%40fr0st%2Fcolor?style=flat-square)](https://www.npmjs.com/package/@fr0st/color)
[![minzipped size](https://img.shields.io/bundlejs/size/%40fr0st%2Fcolor?format=minzip&style=flat-square)](https://bundlejs.com/?q=@fr0st/color)
[![license](https://img.shields.io/github/license/elusivecodes/FrostColor?style=flat-square)](./LICENSE)

FrostColor is a dependency-free JavaScript library for parsing, converting, inspecting, and formatting colors. It supports modern CSS color spaces as well as linear-light working spaces, preserves out-of-gamut channel values during conversion, and provides explicit gamut fitting when a bounded output is required.

## Highlights

- Default ESM `Color` export for Node and bundlers
- Browser UMD bundle in `dist/` exposed as `globalThis.Color`
- No runtime dependencies
- Immutable color instances and transformations
- Modern CSS color parsing, formatting, and named colors
- Conversion across bounded, wide-gamut, perceptual, and linear-light spaces
- Explicit gamut fitting without clipping intermediate conversions

## Installation

### Node / bundlers

Install the package from npm:

```shell
npm install @fr0st/color
```

FrostColor is an ES module:

```javascript
import Color from '@fr0st/color';
```

### Browser (UMD)

For a classic browser script, load either published UMD bundle from your own copy or a CDN. It creates a global `Color` class:

```html
<script src="./node_modules/@fr0st/color/dist/frost-color.min.js"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/@fr0st/color@latest/dist/frost-color.min.js"></script>
<script>
    const color = Color.fromString('oklch(0.7 0.15 250)');
</script>
```

The package exposes only `@fr0st/color` to Node and bundlers. The `dist/` files remain published for direct browser and CDN URLs, but package subpaths, internal `src/` paths, and package metadata are not part of the JavaScript API.

## Version 5 migration

Version 5 reflects a breaking redesign of the library:

- `Color` is now an abstract base class and API namespace. Use a factory such as `Color.fromRgb(...)`, parse a string, or construct a concrete class such as `new Color.Rgb(...)`.
- Factory and conversion names use camel case, for example `fromHsl`, `toOkLch`, and `toXyzD65`.
- HSV, CMY, CMYK, manipulation, palette, and color-scheme APIs from version 4 are no longer present.
- Formatting now uses modern CSS color syntax and each instance retains its concrete color-space type.

## Quick Start

```javascript
import Color from '@fr0st/color';

const source = Color.fromString('color(display-p3 1 0.2 0.1 / 80%)');
const srgb = source.fitGamut('srgb').toSrgb();
const translucent = srgb.withAlpha(0.5);

console.log(source.space());       // display-p3
console.log(srgb.toString());      // color(srgb ... / 0.8)
console.log(translucent.getAlpha()); // 0.5
console.log(source.getAlpha());    // 0.8; source was not changed
```

Color instances are immutable and frozen. Conversion and `with...` methods do not mutate their source; they return either a new instance or, when no conversion is needed, the same instance. Channel fields remain readable, but use the provided getters and `with...` methods instead of assigning them.

## Creating colors

### Parse a color string

`Color.fromString(value)` accepts the following forms:

- CSS named colors and `transparent`
- Hex colors: `#rgb`, `#rgba`, `#rrggbb`, and `#rrggbbaa`
- `rgb()` and legacy `rgba()`
- `hsl()` and legacy `hsla()`
- `hwb()`, `lab()`, `lch()`, `oklab()`, and `oklch()`
- `color()` using `a98-rgb`, `display-p3`, `display-p3-linear`, `prophoto-rgb`, `rec2020`, `srgb`, `srgb-linear`, `xyz`, `xyz-d50`, or `xyz-d65`

Space-separated syntax, commas and slashes, percentage channels, percentage alpha, and CSS angle units are normalized while parsing. The parser is intentionally permissive rather than enforcing the complete CSS grammar:

```javascript
const hex = Color.fromString('#663399cc');
const hsl = Color.fromString('hsl(270deg 50% 40% / 80%)');
const p3 = Color.fromString('color(display-p3 90% 20% 10%)');
const lab = Color.fromString('lab(60% 30 -20)');
```

This is a focused color-value parser, not a complete CSS value engine. CSS-wide keywords, `var()`, `calc()`, relative colors, and custom color profiles are outside its scope.

### Factories and concrete classes

The default export exposes every concrete class as a static property. Each `from...` factory takes three channels followed by optional `alpha = 1`.

| Factory or constructor | Concrete class | `space()` identifier | Channels | Native `toString()` form |
| --- | --- | --- | --- | --- |
| `fromA98Rgb(r, g, b, alpha)` | `Color.A98Rgb` | `a98-rgb` | normalized red, green, blue | `color(a98-rgb ...)` |
| `fromDisplayP3(r, g, b, alpha)` | `Color.DisplayP3` | `display-p3` | normalized red, green, blue | `color(display-p3 ...)` |
| `fromDisplayP3Linear(r, g, b, alpha)` | `Color.DisplayP3Linear` | `display-p3-linear` | linear red, green, blue | `color(display-p3-linear ...)` |
| `new Color.Hex(r, g, b, alpha)` or `fromString(...)` | `Color.Hex` | `hex` | red, green, blue on a 0–255 scale | `#rgb`, `#rgba`, `#rrggbb`, or `#rrggbbaa` |
| `fromHsl(h, s, l, alpha)` | `Color.Hsl` | `hsl` | hue in degrees, saturation and lightness in percent | `hsl(...)` |
| `fromHwb(h, w, b, alpha)` | `Color.Hwb` | `hwb` | hue in degrees, whiteness and blackness in percent | `hwb(...)` |
| `fromLab(l, a, b, alpha)` | `Color.Lab` | `lab` | lightness on a 0–100 scale, a, b | `lab(...)` |
| `fromLch(l, c, h, alpha)` | `Color.Lch` | `lch` | lightness on a 0–100 scale, chroma, hue in degrees | `lch(...)` |
| `fromOkLab(l, a, b, alpha)` | `Color.OkLab` | `oklab` | lightness on a 0–1 scale, a, b | `oklab(...)` |
| `fromOkLch(l, c, h, alpha)` | `Color.OkLch` | `oklch` | lightness on a 0–1 scale, chroma, hue in degrees | `oklch(...)` |
| `fromProPhotoRgb(r, g, b, alpha)` | `Color.ProPhotoRgb` | `prophoto-rgb` | normalized red, green, blue | `color(prophoto-rgb ...)` |
| `fromRec2020(r, g, b, alpha)` | `Color.Rec2020` | `rec2020` | normalized red, green, blue | `color(rec2020 ...)` |
| `fromRgb(r, g, b, alpha)` | `Color.Rgb` | `rgb` | red, green, blue on a 0–255 scale | `rgb(...)` |
| `fromSrgb(r, g, b, alpha)` | `Color.Srgb` | `srgb` | normalized red, green, blue | `color(srgb ...)` |
| `fromSrgbLinear(r, g, b, alpha)` | `Color.SrgbLinear` | `srgb-linear` | linear red, green, blue | `color(srgb-linear ...)` |
| `fromXyzD50(x, y, z, alpha)` | `Color.XyzD50` | `xyz-d50` | D50-relative x, y, z | `color(xyz-d50 ...)` |
| `fromXyzD65(x, y, z, alpha)` | `Color.XyzD65` | `xyz-d65` | D65-relative x, y, z | `color(xyz-d65 ...)` |

Factories on `Color` return the corresponding source-space class. The same inherited factories can construct directly in a chosen destination space:

```javascript
const okLch = Color.fromOkLch(0.7, 0.15, 250);
const lab = Color.Lab.fromOkLch(0.7, 0.15, 250);

console.log(okLch instanceof Color.OkLch); // true
console.log(lab instanceof Color.Lab);     // true
```

All channel inputs must be finite numbers. Alpha is clamped to 0–1 and hue is wrapped into 0–360 degrees. Other constructor channels deliberately retain finite extended values rather than being silently clipped, which allows out-of-gamut intermediate results.

## Converting colors

Use `to(space)` with any `space()` identifier from the table, or call a named conversion method. The `xyz` alias is accepted while parsing `color(...)`, but conversion uses the canonical `xyz-d65` identifier:

```javascript
const color = Color.fromString('#663399');

const lab = color.to('lab');
const p3 = color.toDisplayP3();
const rgb = color.toRgb();
```

The complete named conversion API is:

- `toA98Rgb()`
- `toDisplayP3()`
- `toDisplayP3Linear()`
- `toHex()`
- `toHsl()`
- `toHwb()`
- `toLab()`
- `toLch()`
- `toOkLab()`
- `toOkLch()`
- `toProPhotoRgb()`
- `toRec2020()`
- `toRgb()`
- `toSrgb()`
- `toSrgbLinear()`
- `toXyzD50()`
- `toXyzD65()`

Alpha is preserved through conversions. Converting to the instance's existing space returns that same instance; other conversions return a new concrete instance.

### Gamut fitting

Normal conversions preserve extended channel values. Use `fitGamut(target)` when output must fit a bounded RGB gamut:

```javascript
const vivid = Color.fromOkLch(0.72, 0.4, 30);
const displayable = vivid.fitGamut('srgb').toSrgb();
```

Gamut fitting maps through OKLCH and performs 24 binary-search iterations to reduce chroma until the converted channels fall within the target range. It preserves OKLCH lightness and returns the result in the source instance's color space. Supported targets are:

- `a98-rgb`
- `display-p3`
- `display-p3-linear`
- `prophoto-rgb`
- `rec2020`
- `rgb`
- `srgb`
- `srgb-linear`

## Inspecting and comparing colors

Every concrete color supports these methods:

| Method | Result |
| --- | --- |
| `getAlpha()` | Alpha in the 0–1 range |
| `space()` | The current color-space identifier |
| `toObject()` | A new object containing the three channels and alpha |
| `luma()` | Relative sRGB luminance |
| `contrast(other)` | Ratio calculated directly from the two colors' relative luminance values |
| `label()` | The nearest CSS named color by Euclidean channel distance in the current color space |

`contrast()` and `luma()` ignore alpha. Extended out-of-range channels are not clamped before either calculation.

## Reading and replacing channels

Channel-specific getters and copy methods depend on the concrete class:

| Class family | Getters | Copy methods |
| --- | --- | --- |
| A98 RGB, Display P3, Display P3 Linear, Hex, ProPhoto RGB, Rec. 2020, RGB, sRGB, linear sRGB | `getRed()`, `getGreen()`, `getBlue()` | `withRed()`, `withGreen()`, `withBlue()` |
| Lab and OKLab | `getLightness()`, `getA()`, `getB()` | `withLightness()`, `withA()`, `withB()` |
| LCH and OKLCH | `getLightness()`, `getChroma()`, `getHue()` | `withLightness()`, `withChroma()`, `withHue()` |
| HSL | `getHue()`, `getSaturation()`, `getLightness()` | `withHue()`, `withSaturation()`, `withLightness()` |
| HWB | `getHue()`, `getWhiteness()`, `getBlackness()` | `withHue()`, `withWhiteness()`, `withBlackness()` |
| XYZ D50 and XYZ D65 | `getX()`, `getY()`, `getZ()` | `withX()`, `withY()`, `withZ()` |

All classes also provide `withAlpha(alpha)`:

```javascript
const original = Color.fromRgb(102, 51, 153);
const changed = original.withRed(120).withAlpha(0.5);

console.log(original.toString()); // rgb(102 51 153)
console.log(changed.toString());  // rgb(120 51 153 / 50%)
```

## Formatting

`toString(alpha = null, precision = 2, ...options)` emits the native form listed in the spaces table. With `alpha = null`, alpha is included automatically only when it is below 1. Pass `true` to force it or `false` to omit it.

```javascript
const color = Color.fromRgb(102.1234, 51, 153, 0.8);

color.toString();         // rgb(102.12 51 153 / 80%)
color.toString(false, 0); // rgb(102 51 153)
color.toHex().toString(); // #663399cc
```

Additional formatting methods and options are:

- `Rgb#getHex(alpha = false, shortenHex = true)` returns hex digits without `#`.
- `Rgb#toString(alpha = null, precision = 2, name = false)` can prefer an exact CSS color name.
- `Hex#toString(alpha = null, precision = 2, shortenHex = true, name = false)` can shorten hex and prefer an exact CSS color name. Its `precision` argument is accepted for a consistent signature but is unused.
- `toColorString(alpha = null, precision = 2)` is the shared low-level serializer used by spaces whose native representation is `color(...)`.

## Errors

FrostColor throws `TypeError` when:

- a color string is malformed or unsupported;
- a channel is not a finite number;
- an unknown conversion space is requested;
- gamut fitting is requested for an unsupported space;
- the abstract `Color` class is constructed directly.

## Development

FrostColor supports Node.js `^20.19.0`, `^22.13.0`, or `>=24`.

```shell
npm ci
npm test
npm run js-lint
npm run build
npm pack --dry-run
```

CI tests all supported Node.js release lines, rebuilds the browser bundles, verifies that `dist/` is current, and validates the package contents. Publishing an npm release through GitHub runs the same checks and publishes with provenance.

## License

FrostColor is available under the [MIT License](LICENSE).
