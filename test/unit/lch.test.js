import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import { Lch } from '../../src/index.js';
import { assertClose, assertObjectClose } from '../support/assertions.js';

describe('Lch', function() {
    describe('#constructor', function() {
        it('preserves extended channels and clamps alpha', function() {
            const color = new Lch(150, -150, -30, 1.5);

            assert.strictEqual(color.toString(), 'lch(150% -150 330deg)');
        });
    });

    describe('#contrast', function() {
        it('calculates the contrast ratio', function() {
            const color1 = Lch.fromString('lavender');
            const color2 = Lch.fromString('black');

            assertClose(color1.contrast(color2), 17.063750102904255);
            assertClose(color2.contrast(color1), 17.063750102904255);
        });
    });

    describe('Channel getters', function() {
        it.each([
            ['returns the chroma channel', 'getChroma', 10.112556083083701],
            ['returns the hue channel', 'getHue', 285.9285772969358],
            ['returns the lightness channel', 'getLightness', 91.74228613147233],
        ])('%s', function(_, method, expected) {
            const color = Lch.fromString('lavender');

            assertClose(color[method](), expected);
        });
    });

    describe('#label', function() {
        it('returns the closest CSS color name', function() {
            const color = Lch.fromString('lavender').withLightness(50);

            assert.strictEqual(color.label(), 'slategray');
        });
    });

    describe('#luma', function() {
        it('returns the relative luminance', function() {
            const color = Lch.fromString('lavender');

            assertClose(color.luma(), 0.8031875051452128);
        });
    });

    describe('#space', function() {
        it('returns the color space', function() {
            const color = new Lch();

            assert.strictEqual(color.space(), 'lch');
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
            ['returns the color as OKLab', 'toOkLab', 'oklab(0.93 0.01 -0.03)'],
            ['returns the color as OKLCH', 'toOkLch', 'oklch(0.93 0.03 285.86deg)'],
            ['returns the color as ProPhoto RGB', 'toProPhotoRgb', 'color(prophoto-rgb 0.89 0.88 0.96)'],
            ['returns the color as Rec. 2020', 'toRec2020', 'color(rec2020 0.91 0.91 0.97)'],
            ['returns the color as RGB', 'toRgb', 'rgb(230 230 250)'],
            ['returns the color as sRGB', 'toSrgb', 'color(srgb 0.9 0.9 0.98)'],
            ['returns the color as linear sRGB', 'toSrgbLinear', 'color(srgb-linear 0.79 0.79 0.96)'],
            ['returns the color as XYZ D50', 'toXyzD50', 'color(xyz-d50 0.79 0.8 0.77)'],
            ['returns the color as XYZ D65', 'toXyzD65', 'color(xyz-d65 0.78 0.8 1.02)'],
        ])('%s', function(_, method, expected) {
            const color1 = Lch.fromString('lavender');
            const color2 = color1[method]();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), expected);
        });
    });

    describe('#toLch', function() {
        it('returns the color as LCH', function() {
            const color1 = Lch.fromString('lavender');
            const color2 = color1.toLch();

            assert.strictEqual(color2, color1);
        });
    });

    describe('#toObject', function() {
        it('returns the color channels', function() {
            const color = Lch.fromString('lavender');

            assertObjectClose(color.toObject(),
                {
                    lightness: 91.74228613147233,
                    chroma: 10.112556083083701,
                    hue: 285.9285772969358,
                    alpha: 1.0,
                },
            );
        });
    });

    describe('#toString', function() {
        it.each([
            ['returns the CSS color string', 'lavender', 'lch(91.74% 10.11 285.93deg)'],
            ['includes alpha when needed', 'rgb(230 230 250 / 50%)', 'lch(91.74% 10.11 285.93deg / 0.5)'],
        ])('%s', function(_, input, expected) {
            const color = Lch.fromString(input);

            assert.strictEqual(color.toString(), expected);
        });
    });

    describe('Channel updates', function() {
        it.each([
            ['returns a copy with a different chroma channel', 'withChroma', 50, 'lch(91.74% 50 285.93deg)'],
            ['returns a copy with a different hue channel', 'withHue', 100, 'lch(91.74% 10.11 100deg)'],
            ['returns a copy with a different lightness channel', 'withLightness', 50, 'lch(50% 10.11 285.93deg)'],
        ])('%s', function(_, method, value, expected) {
            const color = Lch.fromString('lavender')[method](value);

            assert.strictEqual(color.toString(), expected);
        });
    });
});
