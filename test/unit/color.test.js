import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import Color, {
    A98Rgb,
    DisplayP3,
    DisplayP3Linear,
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
    XyzD65,
} from '../../src/index.js';
import { assertClose } from '../support/assertions.js';

describe('Color', function() {
    describe('Exports', function() {
        it('exports the default Color API and concrete classes', async function() {
            const module = await import('../../src/index.js');

            assert.deepStrictEqual(Object.keys(module), [
                'A98Rgb',
                'DisplayP3',
                'DisplayP3Linear',
                'Hex',
                'Hsl',
                'Hwb',
                'Lab',
                'Lch',
                'OkLab',
                'OkLch',
                'ProPhotoRgb',
                'Rec2020',
                'Rgb',
                'Srgb',
                'SrgbLinear',
                'XyzD50',
                'XyzD65',
                'default',
            ]);
            assert.strictEqual(module.default, Color);
            assert.strictEqual(module.Rgb, Rgb);
            assert.strictEqual(module.default.Rgb, Rgb);
        });
    });

    const createCases = [
        ['fromA98Rgb', [0.9, 0.9, 0.98], A98Rgb, 'color(a98-rgb 0.9 0.9 0.98)'],
        ['fromDisplayP3', [0.9, 0.9, 0.97], DisplayP3, 'color(display-p3 0.9 0.9 0.97)'],
        ['fromDisplayP3Linear', [0.79, 0.79, 0.94], DisplayP3Linear, 'color(display-p3-linear 0.79 0.79 0.94)'],
        ['fromHsl', [240, 66.67, 94.12], Hsl, 'hsl(240deg 66.67% 94.12%)'],
        ['fromHwb', [120, 90.2, 1.96], Hwb, 'hwb(120deg 90.2% 1.96%)'],
        ['fromLab', [91.74, 2.78, -9.72], Lab, 'lab(91.74% 2.78 -9.72)'],
        ['fromLch', [91.74, 10.11, 285.93], Lch, 'lch(91.74% 10.11 285.93deg)'],
        ['fromOkLab', [0.93, 0.01, -0.03], OkLab, 'oklab(0.93 0.01 -0.03)'],
        ['fromOkLch', [0.93, 0.03, 285.8], OkLch, 'oklch(0.93 0.03 285.8deg)'],
        ['fromProPhotoRgb', [0.89, 0.88, 0.96], ProPhotoRgb, 'color(prophoto-rgb 0.89 0.88 0.96)'],
        ['fromRec2020', [0.89, 0.89, 0.97], Rec2020, 'color(rec2020 0.89 0.89 0.97)'],
        ['fromRgb', [230, 230, 250], Rgb, 'rgb(230 230 250)'],
        ['fromSrgb', [0.9, 0.9, 0.98], Srgb, 'color(srgb 0.9 0.9 0.98)'],
        ['fromSrgbLinear', [0.79, 0.79, 0.96], SrgbLinear, 'color(srgb-linear 0.79 0.79 0.96)'],
        ['fromXyzD50', [0.79, 0.8, 0.77], XyzD50, 'color(xyz-d50 0.79 0.8 0.77)'],
        ['fromXyzD65', [0.78, 0.8, 1.02], XyzD65, 'color(xyz-d65 0.78 0.8 1.02)'],
    ];

    for (const [method, args, ClassType, expected] of createCases) {
        describe(`#${method}`, function() {
            it(`creates an instance of ${ClassType.name}`, function() {
                const color = Color[method](...args);

                assert.ok(color instanceof ClassType);
                assert.strictEqual(color.toString(), expected);
            });
        });
    }

    describe('Factory validation', function() {
        it('rejects a non-finite alpha channel', function() {
            assert.throws(
                () => Color.fromSrgb(0, 0, 0, NaN),
                (error) => error instanceof TypeError && error.message === 'Color channel values must be finite numbers.',
            );
        });

        it('rejects a non-finite HSL hue channel', function() {
            assert.throws(
                () => Color.fromHsl(Infinity),
                (error) => error instanceof TypeError && error.message === 'Color channel values must be finite numbers.',
            );
        });

        it('rejects a non-finite HWB whiteness channel', function() {
            assert.throws(
                () => Color.fromHwb(0, -Infinity),
                (error) => error instanceof TypeError && error.message === 'Color channel values must be finite numbers.',
            );
        });

        it('rejects a non-finite Lab a channel', function() {
            assert.throws(
                () => Color.fromLab(0, NaN),
                (error) => error instanceof TypeError && error.message === 'Color channel values must be finite numbers.',
            );
        });

        it('rejects a non-finite LCH hue channel', function() {
            assert.throws(
                () => Color.fromLch(0, 0, Infinity),
                (error) => error instanceof TypeError && error.message === 'Color channel values must be finite numbers.',
            );
        });

        it('rejects a non-finite OKLab b channel', function() {
            assert.throws(
                () => Color.fromOkLab(0, 0, -Infinity),
                (error) => error instanceof TypeError && error.message === 'Color channel values must be finite numbers.',
            );
        });

        it('rejects a non-finite OKLCH chroma channel', function() {
            assert.throws(
                () => Color.fromOkLch(0, NaN),
                (error) => error instanceof TypeError && error.message === 'Color channel values must be finite numbers.',
            );
        });

        it('rejects a non-finite RGB channel', function() {
            assert.throws(
                () => Color.fromRgb(Infinity),
                (error) => error instanceof TypeError && error.message === 'Color channel values must be finite numbers.',
            );
        });

        it('rejects a non-finite RGB-style channel', function() {
            assert.throws(
                () => Color.fromA98Rgb(NaN),
                (error) => error instanceof TypeError && error.message === 'Color channel values must be finite numbers.',
            );
        });

        it('rejects a non-finite XYZ-style channel', function() {
            assert.throws(
                () => Color.fromXyzD65(-Infinity),
                (error) => error instanceof TypeError && error.message === 'Color channel values must be finite numbers.',
            );
        });
    });

    describe('#composite', function() {
        it('composites over an opaque background', function() {
            const foreground = Color.fromString('color(srgb 1 0 0 / 0.5)');
            const background = Color.fromString('color(srgb 0 0 1)');
            const result = foreground.composite(background);

            assert.strictEqual(result.constructor, foreground.constructor);
            assert.strictEqual(result.toString(), 'color(srgb 0.5 0 0.5)');
        });

        it('preserves an opaque foreground', function() {
            const foreground = Color.fromString('rgb(255 0 0)');
            const background = Color.fromString('rgb(0 0 255 / 50%)');
            const result = foreground.composite(background);

            assert.strictEqual(result.constructor, foreground.constructor);
            assert.strictEqual(result.toString(), 'rgb(255 0 0)');
        });

        it('composites two translucent colors', function() {
            const foreground = Color.fromString('rgb(255 0 0 / 50%)');
            const background = Color.fromString('rgb(0 0 255 / 50%)');
            const result = foreground.composite(background);

            assert.strictEqual(result.constructor, foreground.constructor);
            assert.strictEqual(result.toString(), 'rgb(170 0 85 / 75%)');
        });

        it('preserves a foreground over a transparent background', function() {
            const foreground = Color.fromString('rgb(255 0 0 / 50%)');
            const background = Color.fromString('rgb(0 0 255 / 0%)');
            const result = foreground.composite(background);

            assert.strictEqual(result.constructor, foreground.constructor);
            assert.strictEqual(result.toString(), 'rgb(255 0 0 / 50%)');
        });

        it('preserves the foreground when both colors are transparent', function() {
            const foreground = Color.fromString('rgb(255 0 0 / 0%)');
            const background = Color.fromString('rgb(0 0 255 / 0%)');
            const result = foreground.composite(background);

            assert.strictEqual(result.constructor, foreground.constructor);
            assert.strictEqual(result.toString(), 'rgb(255 0 0 / 0%)');
        });

        it('uses the background beneath a transparent foreground', function() {
            const foreground = Color.fromString('rgb(255 0 0 / 0%)');
            const background = Color.fromString('rgb(0 0 255)');
            const result = foreground.composite(background);

            assert.strictEqual(result.constructor, foreground.constructor);
            assert.strictEqual(result.toString(), 'rgb(0 0 255)');
        });
    });

    describe('#contrast', function() {
        it('rejects a translucent source color', function() {
            const color = Color.fromRgb(0, 0, 0, 0.5);
            const other = Color.fromRgb();

            assert.throws(
                () => color.contrast(other),
                (error) => error instanceof TypeError && error.message === 'Contrast can only be calculated between fully opaque colors.',
            );
        });

        it('rejects a translucent comparison color', function() {
            const color = Color.fromRgb();
            const other = Color.fromRgb(0, 0, 0, 0.5);

            assert.throws(
                () => color.contrast(other),
                (error) => error instanceof TypeError && error.message === 'Contrast can only be calculated between fully opaque colors.',
            );
        });
    });

    const stringCases = [
        ['color(a98-rgb 0.9 0.9 0.98)', A98Rgb, 'color(a98-rgb 0.9 0.9 0.98)'],
        ['color(a98-rgb 90% 90% 98%)', A98Rgb, 'color(a98-rgb 0.9 0.9 0.98)'],
        ['color(display-p3 25% 50% 75%)', DisplayP3, 'color(display-p3 0.25 0.5 0.75)'],
        ['color(display-p3 0.9 0.9 0.97)', DisplayP3, 'color(display-p3 0.9 0.9 0.97)'],
        ['color(display-p3-linear 0.79 0.79 0.94)', DisplayP3Linear, 'color(display-p3-linear 0.79 0.79 0.94)'],
        ['color(display-p3-linear 79% 79% 94%)', DisplayP3Linear, 'color(display-p3-linear 0.79 0.79 0.94)'],
        ['color(display-p3 90% 90% 97%)', DisplayP3, 'color(display-p3 0.9 0.9 0.97)'],
        ['#e6e6fa', Rgb, '#e6e6fa'],
        ['#f00', Rgb, '#f00'],
        ['#f008', Rgb, '#f008'],
        ['#e6e6fa80', Rgb, '#e6e6fa80'],
        ['hsl(240deg 66.67% 94.12%)', Hsl, 'hsl(240deg 66.67% 94.12%)'],
        ['hsl(266.6667grad 66.67% 94.12%)', Hsl, 'hsl(240deg 66.67% 94.12%)'],
        ['hsl(240, 66.67%, 94.12%)', Hsl, 'hsl(240deg 66.67% 94.12%)'],
        ['hsla(240, 66.67%, 94.12%, 0.5)', Hsl, 'hsl(240deg 66.67% 94.12% / 50%)'],
        ['hsl(66.667% 66.67% 94.12%)', Hsl, 'hsl(240deg 66.67% 94.12%)'],
        ['hsl(240deg 66.67% 94.12% / 50%)', Hsl, 'hsl(240deg 66.67% 94.12% / 50%)'],
        ['hsl(4.18879rad 66.67% 94.12%)', Hsl, 'hsl(240deg 66.67% 94.12%)'],
        ['hsl(0.66667turn 66.67% 94.12%)', Hsl, 'hsl(240deg 66.67% 94.12%)'],
        ['hwb(240deg 90.2% 1.96%)', Hwb, 'hwb(240deg 90.2% 1.96%)'],
        ['hwb(240, 90.2%, 1.96%)', Hwb, 'hwb(240deg 90.2% 1.96%)'],
        ['hwb(240deg 90.2% 1.96% / 0.5)', Hwb, 'hwb(240deg 90.2% 1.96% / 50%)'],
        ['lab(91.74 2.78 -9.72)', Lab, 'lab(91.74% 2.78 -9.72)'],
        ['lab(91.74% 2.224% -7.776%)', Lab, 'lab(91.74% 2.78 -9.72)'],
        ['lab(50% 100% -100%)', Lab, 'lab(50% 125 -125)'],
        ['lch(91.74 10.11 285.93)', Lch, 'lch(91.74% 10.11 285.93deg)'],
        ['lch(50% -10 120)', Lch, 'lch(50% 0 120deg)'],
        ['lch(91.74% 6.74% 285.93)', Lch, 'lch(91.74% 10.11 285.93deg)'],
        ['lch(50% 100% 120)', Lch, 'lch(50% 150 120deg)'],
        ['red', Rgb, '#f00'],
        ['oklab(0.93 0.01 -0.03)', OkLab, 'oklab(0.93 0.01 -0.03)'],
        ['oklab(93% 25% -75%)', OkLab, 'oklab(0.93 0.1 -0.3)'],
        ['oklab(50% 100% -100%)', OkLab, 'oklab(0.5 0.4 -0.4)'],
        ['oklch(0.93 0.03 285.8)', OkLch, 'oklch(0.93 0.03 285.8deg)'],
        ['oklch(50% -10% 120)', OkLch, 'oklch(0.5 0 120deg)'],
        ['oklch(93% 75% 285.8)', OkLch, 'oklch(0.93 0.3 285.8deg)'],
        ['oklch(50% 100% 120)', OkLch, 'oklch(0.5 0.4 120deg)'],
        ['color(srgb 1.2 0 0)', Srgb, 'color(srgb 1.2 0 0)'],
        ['rgb(300 0 0)', Rgb, 'rgb(300 0 0)'],
        ['color(prophoto-rgb 0.89 0.88 0.96)', ProPhotoRgb, 'color(prophoto-rgb 0.89 0.88 0.96)'],
        ['color(prophoto-rgb 89% 88% 96%)', ProPhotoRgb, 'color(prophoto-rgb 0.89 0.88 0.96)'],
        ['color(rec2020 0.89 0.89 0.97)', Rec2020, 'color(rec2020 0.89 0.89 0.97)'],
        ['color(rec2020 89% 89% 97%)', Rec2020, 'color(rec2020 0.89 0.89 0.97)'],
        ['rgb(230 230 250)', Rgb, 'rgb(230 230 250)'],
        ['rgb(+1 .5 1e2 / 5e-1)', Rgb, 'rgb(1 0.5 100 / 50%)'],
        ['rgba(230, 230, 250, 0.5)', Rgb, 'rgb(230 230 250 / 50%)'],
        ['rgb(230, 230, 250)', Rgb, 'rgb(230 230 250)'],
        ['rgb(230 230 250 / 50%)', Rgb, 'rgb(230 230 250 / 50%)'],
        ['color(srgb 0.9 0.9 0.98)', Srgb, 'color(srgb 0.9 0.9 0.98)'],
        ['color(srgb +.1 1.0 1e-2 / 5e-1)', Srgb, 'color(srgb 0.1 1 0.01 / 0.5)'],
        ['color(srgb-linear 0.79 0.79 0.96)', SrgbLinear, 'color(srgb-linear 0.79 0.79 0.96)'],
        ['color(srgb-linear 79% 79% 96%)', SrgbLinear, 'color(srgb-linear 0.79 0.79 0.96)'],
        ['color(srgb 90% 90% 98%)', Srgb, 'color(srgb 0.9 0.9 0.98)'],
        ['color(xyz 0.78 0.8 1.02)', XyzD65, 'color(xyz-d65 0.78 0.8 1.02)'],
        ['color(xyz-d50 0.79 0.8 0.77)', XyzD50, 'color(xyz-d50 0.79 0.8 0.77)'],
        ['color(xyz-d50 79% 80% 77%)', XyzD50, 'color(xyz-d50 0.79 0.8 0.77)'],
        ['color(xyz-d65 0.78 0.8 1.02)', XyzD65, 'color(xyz-d65 0.78 0.8 1.02)'],
        ['color(xyz-d65 78% 80% 102%)', XyzD65, 'color(xyz-d65 0.78 0.8 1.02)'],
        ['color(xyz 78% 80% 102%)', XyzD65, 'color(xyz-d65 0.78 0.8 1.02)'],
        [' RGB( 230   230  250 / 50% ) ', Rgb, 'rgb(230 230 250 / 50%)'],
    ];

    describe('#fromString', function() {
        for (const [input, ClassType, expected] of stringCases) {
            it(`parses ${input}`, function() {
                const color = Color.fromString(input);

                assert.ok(color instanceof ClassType);
                assert.strictEqual(color.toString(), expected);
            });
        }

        it('parses transparent', function() {
            const color = Color.fromString('transparent');

            assert.ok(color instanceof Rgb);
            assert.strictEqual(color.toString(undefined, 2, true), 'transparent');
        });

        it('throws an error for an invalid color string', function() {
            const invalidColors = [
                'rgb(1 2 3 / nope)',
                'hsl(240wat 50% 50%)',
                'color(srgb 1 2 3 0.5)',
                'color(srgb 1, 2, 3)',
                'color(srgb 1 2 3 / 0.5 1)',
                'color(srgb 1 2 nope)',
                'color(srgb 1 2)',
                'rgb(1,,3)',
                'rgb(1 2 3 / 0.5 1)',
                'rgb(1 2 3 0.5)',
                'invalid',
                'rgb(foo 0 0)',
                'rgb(50%% 0 0)',
                '#12345',
                '#1234567',
                'rgb(1, 2 3)',
                'rgb(1, 2, 3 / 0.5)',
                'rgb(1 2)',
                'rgb(1. 2 3)',
                'rgb(1foo 2 3)',
            ];

            for (const color of invalidColors) {
                assert.throws(
                    () => Color.fromString(color),
                    (error) => error instanceof TypeError && error.message === `Color string \`${color}\` is not valid.`,
                );
            }
        });

        it('throws a finite-number error for an overflowing channel', function() {
            assert.throws(
                () => Color.fromString('rgb(1e309 0 0)'),
                (error) => error instanceof TypeError && error.message === 'Color channel values must be finite numbers.',
            );
        });
    });

    describe('#fitGamut', function() {
        const assertFittedColor = (values, expected) => {
            const result = Color.fromOkLch(...values).fitGamut();
            const srgb = result.toSrgb();

            assert.strictEqual(result.toString(), expected);
            assert.ok(srgb.getRed() >= -1e-12 && srgb.getRed() <= 1 + 1e-12);
            assert.ok(srgb.getGreen() >= -1e-12 && srgb.getGreen() <= 1 + 1e-12);
            assert.ok(srgb.getBlue() >= -1e-12 && srgb.getBlue() <= 1 + 1e-12);
        };

        it('fits lightness below the lower boundary to black', function() {
            assertFittedColor([-1, 0.2, 30, 0.5], 'oklch(0 0 30deg / 0.5)');
        });

        it('converges for very large chroma values', function() {
            assertFittedColor([0.5, 1e8, 30], 'oklch(0.5 0.2 30deg)');
        });

        it('reduces chroma to fit the target gamut', function() {
            assertFittedColor([0.5, 0.4, 30], 'oklch(0.5 0.2 30deg)');
        });

        it('fits lightness above the upper boundary to white', function() {
            assertFittedColor([2, 0.2, 30, 0.5], 'oklch(1 0 30deg / 0.5)');
        });
    });

    describe('Immutability', function() {
        it('freezes color instances while updates return copies', function() {
            const colors = [
                Color.fromRgb(1, 2, 3),
                Color.fromHsl(120, 50, 50),
                Color.fromHwb(120, 10, 20),
                Color.fromLab(50, 1, 2),
                Color.fromLch(50, 10, 20),
                Color.fromOkLab(0.5, 0.1, 0.2),
                Color.fromOkLch(0.5, 0.1, 20),
                Color.fromXyzD65(0.1, 0.2, 0.3),
            ];

            assert.ok(colors.every((color) => Object.isFrozen(color)));

            const color = colors[0];
            const changed = color.withRed(10);

            assert.throws(() => {
                color.red = 10;
            }, TypeError);
            assert.notStrictEqual(changed, color);
            assert.strictEqual(color.getRed(), 1);
            assert.strictEqual(changed.getRed(), 10);
        });
    });

    describe('#getAlpha', function() {
        it('returns the alpha channel', function() {
            const color = Color.fromString('rgb(230 230 250 / 50%)');

            assert.strictEqual(color.getAlpha(), 0.5);
        });
    });

    describe('#toOkLch', function() {
        it('round-trips through OKLCH', function() {
            const color = Color.fromOkLab(0.7, 0.4, 0.4);
            const result = color.toOkLch().toOkLab();

            assertClose(result.getLightness(), 0.7, 1e-12);
            assertClose(result.getA(), 0.4, 1e-12);
            assertClose(result.getB(), 0.4, 1e-12);
        });
    });

    describe('#to', function() {
        it('throws an error for an invalid color space', function() {
            assert.throws(
                () => Color.fromString('lavender').to('invalid'),
                (error) => error instanceof TypeError && error.message === 'Color space `invalid` is not valid.',
            );
        });
    });

    describe('#toXyzD65', function() {
        it('round-trips XYZ chromatic adaptation', function() {
            const color = Color.fromXyzD50(0, 0, 1);
            const result = color.toXyzD65().toXyzD50();

            assertClose(result.getX(), 0, 1e-6);
            assertClose(result.getY(), 0, 1e-6);
            assertClose(result.getZ(), 1, 1e-6);
        });
    });
});
