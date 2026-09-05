import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import { Srgb } from '../../src/index.js';
import { assertClose, assertObjectClose } from '../support/assertions.js';

describe('Srgb', function() {
    describe('#constructor', function() {
        it('preserves extended channels and clamps alpha', function() {
            const color = new Srgb(2, -1, 3, 1.5);

            assert.strictEqual(color.toString(), 'color(srgb 2 -1 3)');
        });
    });

    describe('#contrast', function() {
        it('calculates the contrast ratio', function() {
            const color1 = Srgb.fromString('lavender');
            const color2 = Srgb.fromString('black');

            assertClose(color1.contrast(color2), 17.063750102904258);
            assertClose(color2.contrast(color1), 17.063750102904258);
        });
    });

    describe('Channel getters', function() {
        it.each([
            ['returns the blue channel', 'getBlue', 0.9803921568627451],
            ['returns the green channel', 'getGreen', 0.9019607843137255],
            ['returns the red channel', 'getRed', 0.9019607843137255],
        ])('%s', function(_, method, expected) {
            const color = Srgb.fromString('lavender');

            assertClose(color[method](), expected);
        });
    });

    describe('#label', function() {
        it('returns the closest CSS color name', function() {
            const color = Srgb.fromString('lavender').withGreen(0.5);

            assert.strictEqual(color.label(), 'violet');
        });
    });

    describe('#luma', function() {
        it('returns the relative luminance', function() {
            const color = Srgb.fromString('lavender');

            assertClose(color.luma(), 0.8031875051452129);
        });
    });

    describe('#space', function() {
        it('returns the color space', function() {
            const color = new Srgb();

            assert.strictEqual(color.space(), 'srgb');
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
            ['returns the color as RGB', 'toRgb', 'rgb(230 230 250)'],
            ['returns the color as linear sRGB', 'toSrgbLinear', 'color(srgb-linear 0.79 0.79 0.96)'],
            ['returns the color as XYZ D50', 'toXyzD50', 'color(xyz-d50 0.79 0.8 0.77)'],
            ['returns the color as XYZ D65', 'toXyzD65', 'color(xyz-d65 0.78 0.8 1.02)'],
        ])('%s', function(_, method, expected) {
            const color1 = Srgb.fromString('lavender');
            const color2 = color1[method]();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), expected);
        });
    });

    describe('#toSrgb', function() {
        it('returns the color as sRGB', function() {
            const color1 = Srgb.fromString('lavender');
            const color2 = color1.toSrgb();

            assert.strictEqual(color2, color1);
        });
    });

    describe('#toObject', function() {
        it('returns the color channels', function() {
            const color = Srgb.fromString('lavender');

            assertObjectClose(color.toObject(),
                {
                    red: 0.9019607843137255,
                    green: 0.9019607843137255,
                    blue: 0.9803921568627451,
                    alpha: 1.0,
                },
            );
        });
    });

    describe('#toString', function() {
        it.each([
            ['returns the CSS color string', 'lavender', 'color(srgb 0.9 0.9 0.98)'],
            ['includes alpha when needed', 'rgb(230 230 250 / 50%)', 'color(srgb 0.9 0.9 0.98 / 0.5)'],
        ])('%s', function(_, input, expected) {
            const color = Srgb.fromString(input);

            assert.strictEqual(color.toString(), expected);
        });
    });

    describe('Channel updates', function() {
        it.each([
            ['returns a copy with a different blue channel', 'withBlue', 0.5, 'color(srgb 0.9 0.9 0.5)'],
            ['returns a copy with a different green channel', 'withGreen', 0.5, 'color(srgb 0.9 0.5 0.98)'],
            ['returns a copy with a different red channel', 'withRed', 0.5, 'color(srgb 0.5 0.9 0.98)'],
        ])('%s', function(_, method, value, expected) {
            const color = Srgb.fromString('lavender')[method](value);

            assert.strictEqual(color.toString(), expected);
        });
    });
});
