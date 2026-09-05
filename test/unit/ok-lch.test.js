import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import { OkLch } from '../../src/index.js';
import { assertClose, assertObjectClose } from '../support/assertions.js';

describe('OkLch', function() {
    describe('#constructor', function() {
        it('preserves extended channels and clamps alpha', function() {
            const color = new OkLch(3, -1, -30, 1.5);

            assert.strictEqual(color.toString(), 'oklch(3 -1 330deg)');
        });
    });

    describe('#contrast', function() {
        it('calculates the contrast ratio', function() {
            const color1 = OkLch.fromString('lavender');
            const color2 = OkLch.fromString('black');

            assertClose(color1.contrast(color2), 17.063750102904255);
            assertClose(color2.contrast(color1), 17.063750102904255);
        });
    });

    describe('Channel getters', function() {
        it.each([
            ['returns the chroma channel', 'getChroma', 0.02694145858668466],
            ['returns the hue channel', 'getHue', 285.86477952157645],
            ['returns the lightness channel', 'getLightness', 0.9309023355374633],
        ])('%s', function(_, method, expected) {
            const color = OkLch.fromString('lavender');

            assertClose(color[method](), expected);
        });
    });

    describe('#label', function() {
        it('returns the closest CSS color name', function() {
            const color = OkLch.fromString('lavender').withLightness(0.5);

            assert.strictEqual(color.label(), 'darkslateblue');
        });
    });

    describe('#luma', function() {
        it('returns the relative luminance', function() {
            const color = OkLch.fromString('lavender');

            assertClose(color.luma(), 0.8031875051452128);
        });
    });

    describe('#space', function() {
        it('returns the color space', function() {
            const color = new OkLch();

            assert.strictEqual(color.space(), 'oklch');
        });
    });

    describe('Conversions', function() {
        it.each([
            ['returns the color as A98 RGB', 'toA98Rgb', 'color(a98-rgb 0.9 0.9 0.98)'],
            ['returns the color as Display P3', 'toDisplayP3', 'color(display-p3 0.9 0.9 0.97)'],
            ['returns the color as linear Display P3', 'toDisplayP3Linear', 'color(display-p3-linear 0.79 0.79 0.94)'],
            ['returns the color as hexadecimal', 'toHex', '#e6e6fa'],
            ['returns the color as HSL', 'toHsl', 'hsl(240deg 66.67% 94.12%)'],
            ['returns the color as HWB', 'toHwb', 'hwb(240deg 90.2% 1.96%)'],
            ['returns the color as Lab', 'toLab', 'lab(91.74% 2.78 -9.72)'],
            ['returns the color as LCH', 'toLch', 'lch(91.74% 10.11 285.93deg)'],
            ['returns the color as OKLab', 'toOkLab', 'oklab(0.93 0.01 -0.03)'],
            ['returns the color as ProPhoto RGB', 'toProPhotoRgb', 'color(prophoto-rgb 0.89 0.88 0.96)'],
            ['returns the color as Rec. 2020', 'toRec2020', 'color(rec2020 0.91 0.91 0.97)'],
            ['returns the color as RGB', 'toRgb', 'rgb(230 230 250)'],
            ['returns the color as sRGB', 'toSrgb', 'color(srgb 0.9 0.9 0.98)'],
            ['returns the color as linear sRGB', 'toSrgbLinear', 'color(srgb-linear 0.79 0.79 0.96)'],
            ['returns the color as XYZ D50', 'toXyzD50', 'color(xyz-d50 0.79 0.8 0.77)'],
            ['returns the color as XYZ D65', 'toXyzD65', 'color(xyz-d65 0.78 0.8 1.02)'],
        ])('%s', function(_, method, expected) {
            const color1 = OkLch.fromString('lavender');
            const color2 = color1[method]();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), expected);
        });
    });

    describe('#toOkLch', function() {
        it('returns the color as OKLCH', function() {
            const color1 = OkLch.fromString('lavender');
            const color2 = color1.toOkLch();

            assert.strictEqual(color2, color1);
        });
    });

    describe('#toObject', function() {
        it('returns the color channels', function() {
            const color = OkLch.fromString('lavender');

            assertObjectClose(color.toObject(),
                {
                    lightness: 0.9309023355374633,
                    chroma: 0.02694145858668466,
                    hue: 285.86477952157645,
                    alpha: 1.0,
                },
            );
        });
    });

    describe('#toString', function() {
        it.each([
            ['returns the CSS color string', 'lavender', 'oklch(0.93 0.03 285.86deg)'],
            ['includes alpha when needed', 'rgb(230 230 250 / 50%)', 'oklch(0.93 0.03 285.86deg / 0.5)'],
        ])('%s', function(_, input, expected) {
            const color = OkLch.fromString(input);

            assert.strictEqual(color.toString(), expected);
        });
    });

    describe('Channel updates', function() {
        it.each([
            ['returns a copy with a different chroma channel', 'withChroma', 0.2, 'oklch(0.93 0.2 285.86deg)'],
            ['returns a copy with a different hue channel', 'withHue', 100, 'oklch(0.93 0.03 100deg)'],
            ['returns a copy with a different lightness channel', 'withLightness', 0.5, 'oklch(0.5 0.03 285.86deg)'],
        ])('%s', function(_, method, value, expected) {
            const color = OkLch.fromString('lavender')[method](value);

            assert.strictEqual(color.toString(), expected);
        });
    });
});
