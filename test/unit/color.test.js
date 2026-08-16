import assert from 'node:assert/strict';
import { describe, it } from 'mocha';
import Color from '../../src/index.js';
import { assertClose } from '../assertions.js';

const {
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
} = Color;

describe('Color', function() {
    describe('Exports', function() {
        it('exports only the default Color API', async function() {
            const module = await import('../../src/index.js');

            assert.deepStrictEqual(Object.keys(module), ['default']);
            assert.strictEqual(module.default, Color);
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
        ['rgba(230, 230, 250, 0.5)', Rgb, 'rgb(230 230 250 / 50%)'],
        ['rgb(230, 230, 250)', Rgb, 'rgb(230 230 250)'],
        ['rgb(230 230 250 / 50%)', Rgb, 'rgb(230 230 250 / 50%)'],
        ['color(srgb 0.9 0.9 0.98)', Srgb, 'color(srgb 0.9 0.9 0.98)'],
        ['color(srgb-linear 0.79 0.79 0.96)', SrgbLinear, 'color(srgb-linear 0.79 0.79 0.96)'],
        ['color(srgb-linear 79% 79% 96%)', SrgbLinear, 'color(srgb-linear 0.79 0.79 0.96)'],
        ['color(srgb 90% 90% 98%)', Srgb, 'color(srgb 0.9 0.9 0.98)'],
        ['color(xyz 0.78 0.8 1.02)', XyzD65, 'color(xyz-d65 0.78 0.8 1.02)'],
        ['color(xyz-d50 0.79 0.8 0.77)', XyzD50, 'color(xyz-d50 0.79 0.8 0.77)'],
        ['color(xyz-d50 79% 80% 77%)', XyzD50, 'color(xyz-d50 0.79 0.8 0.77)'],
        ['color(xyz-d65 0.78 0.8 1.02)', XyzD65, 'color(xyz-d65 0.78 0.8 1.02)'],
        ['color(xyz-d65 78% 80% 102%)', XyzD65, 'color(xyz-d65 0.78 0.8 1.02)'],
        ['color(xyz 78% 80% 102%)', XyzD65, 'color(xyz-d65 0.78 0.8 1.02)'],
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
            const invalidColors = ['invalid', '#12345', '#1234567'];

            for (const color of invalidColors) {
                assert.throws(
                    () => Color.fromString(color),
                    (error) => error instanceof TypeError && error.message === `Color string \`${color}\` is not valid.`,
                );
            }
        });
    });

    describe('#fitGamut', function() {
        it('reduces chroma to fit the target gamut', function() {
            const color = Color.fromXyzD65(1, 0, 0);
            const source = color.toSrgbLinear();
            const fitted = color.fitGamut('srgb-linear').toSrgbLinear();

            assert.ok(source.getGreen() < 0);
            assert.ok(fitted.getRed() >= 0 && fitted.getRed() <= 1);
            assert.ok(fitted.getGreen() >= 0 && fitted.getGreen() <= 1);
            assert.ok(fitted.getBlue() >= 0 && fitted.getBlue() <= 1);
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
