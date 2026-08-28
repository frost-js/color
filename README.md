# FrostColor

[![CI](https://github.com/elusivecodes/FrostColor/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/elusivecodes/FrostColor/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/elusivecodes/FrostColor/branch/main/graph/badge.svg)](https://codecov.io/gh/elusivecodes/FrostColor)
[![npm version](https://img.shields.io/npm/v/%40fr0st%2Fcolor?style=flat-square)](https://www.npmjs.com/package/@fr0st/color)
[![npm downloads](https://img.shields.io/npm/dm/%40fr0st%2Fcolor?style=flat-square)](https://www.npmjs.com/package/@fr0st/color)
[![JS gzip size](https://img.badgesize.io/elusivecodes/FrostColor/main/dist/frost-color.min.js?compression=gzip&label=JS%20gzip%20size&style=flat-square)](https://github.com/elusivecodes/FrostColor/blob/main/dist/frost-color.min.js)
[![license](https://img.shields.io/github/license/elusivecodes/FrostColor?style=flat-square)](./LICENSE)

FrostColor is a dependency-free JavaScript library for parsing, converting, inspecting, and formatting colors. It supports modern CSS color spaces as well as linear-light working spaces, preserves out-of-gamut channel values during conversion, and provides explicit gamut fitting when a bounded output is required.

## Highlights

- Default ESM `Color` export and named concrete-class exports for Node and bundlers
- Prebuilt ESM and UMD bundles in `dist/`, with UMD exposed as `globalThis.Color`
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
import Color, { DisplayP3 } from '@fr0st/color';

const color = Color.fromString('lavender');
const displayP3 = DisplayP3.fromString('lavender');
```

### Browser (ESM)

Import the minified ESM bundle directly from a CDN:

```html
<script type="module">
    import Color, { DisplayP3 } from 'https://cdn.jsdelivr.net/npm/@fr0st/color@latest/dist/frost-color.esm.min.js';

    const color = Color.fromString('lavender');
    const displayP3 = DisplayP3.fromString('lavender');
</script>
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

The package root resolves to the prebuilt ESM bundle. Published files under `dist/` and `src/` are also available through matching package subpaths.

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

Whitespace is normalized and parsing is case-insensitive. Functional notation requires exactly three channels and accepts one optional alpha value. Space-separated alpha uses `/`; legacy comma syntax is supported for RGB, HSL, and HWB, but separator styles cannot be mixed. Numeric tokens support signs, decimals, percentages, and scientific notation, and must not contain trailing characters or unknown units.

```javascript
const hex = Color.fromString('#663399cc');
const hsl = Color.fromString('hsl(270deg 50% 40% / 80%)');
const p3 = Color.fromString('color(display-p3 90% 20% 10%)');
const lab = Color.fromString('lab(60% 30 -20)');
```

This is a focused color-value parser, not a complete CSS value engine. CSS-wide keywords, `var()`, `calc()`, relative colors, and custom color profiles are outside its scope.

### Factories and concrete classes

Concrete classes are available both as named exports and as static properties on the default export. Each `from...` factory takes three channels followed by optional `alpha = 1`.

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

### Alpha compositing

Use `foreground.composite(background)` to composite a color over a background using source-over alpha compositing in sRGB. The result uses the foreground color's concrete class:

```javascript
const foreground = Color.fromString('rgb(255 255 255 / 50%)');
const background = Color.fromString('#000');
const result = foreground.composite(background);
```

### Gamut fitting

Normal conversions preserve extended channel values. Use `fitGamut(target)` when output must fit a bounded RGB gamut:

```javascript
const vivid = Color.fromOkLch(0.72, 0.4, 30);
const displayable = vivid.fitGamut('srgb').toSrgb();
```

Gamut fitting maps through OKLCH and uses a precision-bounded binary search to reduce chroma until the converted channels fall within the target range. Colors at or beyond the OKLCH lightness boundaries are fitted to black or white. Otherwise, it preserves OKLCH lightness and returns the result in the source instance's color space. Supported targets are:

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
| `composite(background)` | Source-over alpha composite calculated in sRGB |
| `luma()` | Relative sRGB luminance |
| `contrast(other)` | Ratio calculated from the relative luminance of two fully opaque colors |
| `label()` | The nearest CSS named color by Euclidean channel distance in the current color space |

`contrast()` requires both colors to be fully opaque. `luma()` ignores alpha. Extended out-of-range channels are not clamped before either calculation.

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
- contrast is requested with a translucent color;
- an unknown conversion space is requested;
- gamut fitting is requested for an unsupported space;
- the abstract `Color` class is constructed directly.

## Development

```bash
npm test
npm run lint
npm run build
```

## License

FrostColor is available under the [MIT License](LICENSE).
