import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import { Rgb } from '../../src/index.js';
import { assertClose, assertObjectClose } from '../support/assertions.js';

describe('Rgb', function() {
    describe('#constructor', function() {
        it('preserves extended channels and clamps alpha', function() {
            const color = new Rgb(300, -20, 500, 1.5);

            assert.strictEqual(color.toString(), 'rgb(300 -20 500)');
        });
    });

    describe('#contrast', function() {
        it('calculates the contrast ratio', function() {
            const color1 = Rgb.fromString('lavender');
            const color2 = Rgb.fromString('black');

            assertClose(color1.contrast(color2), 17.063750102904258);
            assertClose(color2.contrast(color1), 17.063750102904258);
        });
    });

    describe('Channel getters', function() {
        it.each([
            ['returns the blue channel', 'getBlue', 250.0],
            ['returns the green channel', 'getGreen', 230.0],
            ['returns the red channel', 'getRed', 230.0],
        ])('%s', function(_, method, expected) {
            const color = Rgb.fromString('lavender');

            assertClose(color[method](), expected);
        });
    });

    describe('#label', function() {
        it('returns the closest CSS color name', function() {
            const color = Rgb.fromString('lavender').withGreen(100);

            assert.strictEqual(color.label(), 'violet');
        });
    });

    describe('#luma', function() {
        it('returns the relative luminance', function() {
            const color = Rgb.fromString('lavender');

            assertClose(color.luma(), 0.8031875051452129);
        });
    });

    describe('#space', function() {
        it('returns the color space', function() {
            const color = new Rgb();

            assert.strictEqual(color.space(), 'rgb');
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
            ['returns the color as OKLCH', 'toOkLch', 'oklch(0.93 0.03 285.86deg)'],
            ['returns the color as ProPhoto RGB', 'toProPhotoRgb', 'color(prophoto-rgb 0.89 0.88 0.96)'],
            ['returns the color as Rec. 2020', 'toRec2020', 'color(rec2020 0.91 0.91 0.97)'],
            ['returns the color as sRGB', 'toSrgb', 'color(srgb 0.9 0.9 0.98)'],
            ['returns the color as linear sRGB', 'toSrgbLinear', 'color(srgb-linear 0.79 0.79 0.96)'],
            ['returns the color as XYZ D50', 'toXyzD50', 'color(xyz-d50 0.79 0.8 0.77)'],
            ['returns the color as XYZ D65', 'toXyzD65', 'color(xyz-d65 0.78 0.8 1.02)'],
        ])('%s', function(_, method, expected) {
            const color1 = Rgb.fromString('lavender');
            const color2 = color1[method]();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), expected);
        });
    });

    describe('#toRgb', function() {
        it('returns the color as RGB', function() {
            const color1 = Rgb.fromString('lavender');
            const color2 = color1.toRgb();

            assert.strictEqual(color2, color1);
        });
    });

    describe('#toObject', function() {
        it('returns the color channels', function() {
            const color = Rgb.fromString('lavender');

            assertObjectClose(color.toObject(),
                {
                    red: 230.0,
                    green: 230.0,
                    blue: 250.0,
                    alpha: 1.0,
                },
            );
        });
    });

    describe('#toString', function() {
        it.each([
            ['returns the CSS color string', 'lavender', [], 'rgb(230 230 250)'],
            ['returns a CSS color name', 'lavender', [undefined, 2, true], 'lavender'],
            ['includes alpha when needed', 'rgb(230 230 250 / 50%)', [], 'rgb(230 230 250 / 50%)'],
        ])('%s', function(_, input, args, expected) {
            const color = Rgb.fromString(input);

            assert.strictEqual(color.toString(...args), expected);
        });

        it.each([
            ['omits zero alpha when preferring names', 0, false, 'red'],
            ['omits partial alpha when preferring names', 0.5, false, 'red'],
            ['names a transparent color with automatic alpha', 0, null, 'transparent'],
            ['names a transparent color with explicit alpha', 0, true, 'transparent'],
            ['preserves partial alpha when preferring names', 0.5, null, 'rgb(255 0 0 / 50%)'],
        ])('%s', function(_, alpha, includeAlpha, expected) {
            const color = new Rgb(255, 0, 0, 0).withAlpha(alpha);

            assert.strictEqual(color.toString(includeAlpha, 2, true), expected);
        });

        it.each([
            ['preserves fractional channels when preferring color names', [254.6, 0.1, 0.1]],
            ['preserves extended channels when preferring color names', [300, -20, 0]],
        ])('%s', function(_, channels) {
            const color = new Rgb(...channels);

            assert.strictEqual(color.toString(false, 2, true), color.toString(false, 2));
        });
    });

    describe('Channel updates', function() {
        it.each([
            ['returns a copy with a different blue channel', 'withBlue', 100, 'rgb(230 230 100)'],
            ['returns a copy with a different green channel', 'withGreen', 100, 'rgb(230 100 250)'],
            ['returns a copy with a different red channel', 'withRed', 100, 'rgb(100 230 250)'],
        ])('%s', function(_, method, value, expected) {
            const color = Rgb.fromString('lavender')[method](value);

            assert.strictEqual(color.toString(), expected);
        });
    });
});
