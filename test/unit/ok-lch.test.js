import assert from 'node:assert/strict';
import { describe, it } from 'mocha';
import Color from '../../src/index.js';
import { assertClose, assertObjectClose } from '../assertions.js';

const ColorClass = Color.OkLch;

describe('OkLch', function() {
    describe('#constructor', function() {
        it('preserves extended channels and clamps alpha', function() {
            const color = new ColorClass(...[
                3,
                -1,
                -30,
                1.5,
            ],
            );

            assert.strictEqual(color.toString(), 'oklch(3 -1 330deg)');
        });
    });

    describe('#contrast', function() {
        it('calculates the contrast ratio', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = ColorClass.fromString('black');

            assertClose(color1.contrast(color2), 17.06375119570234);
            assertClose(color2.contrast(color1), 17.06375119570234);
        });
    });

    describe('#getChroma', function() {
        it('returns the chroma channel', function() {
            const color = ColorClass.fromString('lavender');

            assertClose(color.getChroma(), 0.027017845397763564);
        });
    });

    describe('#getHue', function() {
        it('returns the hue channel', function() {
            const color = ColorClass.fromString('lavender');

            assertClose(color.getHue(), 285.80269594678555);
        });
    });

    describe('#getLightness', function() {
        it('returns the lightness channel', function() {
            const color = ColorClass.fromString('lavender');

            assertClose(color.getLightness(), 0.9309007554171675);
        });
    });

    describe('#label', function() {
        it('returns the closest CSS color name', function() {
            const color = ColorClass.fromString('lavender').withLightness(0.5);

            assert.strictEqual(color.label(), 'darkslateblue');
        });
    });

    describe('#luma', function() {
        it('returns the relative luminance', function() {
            const color = ColorClass.fromString('lavender');

            assertClose(color.luma(), 0.803187559785117);
        });
    });

    describe('#space', function() {
        it('returns the color space', function() {
            const color = new ColorClass();

            assert.strictEqual(color.space(), 'oklch');
        });
    });

    describe('#toA98Rgb', function() {
        it('returns the color as A98 RGB', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toA98Rgb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(a98-rgb 0.9 0.9 0.98)');
        });
    });

    describe('#toDisplayP3', function() {
        it('returns the color as Display P3', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toDisplayP3();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(display-p3 0.9 0.9 0.97)');
        });
    });

    describe('#toDisplayP3Linear', function() {
        it('returns the color as linear Display P3', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toDisplayP3Linear();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(display-p3-linear 0.79 0.79 0.94)');
        });
    });

    describe('#toHex', function() {
        it('returns the color as hexadecimal', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toHex();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), '#e6e6fa');
        });
    });

    describe('#toHsl', function() {
        it('returns the color as HSL', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toHsl();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'hsl(240deg 66.67% 94.12%)');
        });
    });

    describe('#toHwb', function() {
        it('returns the color as HWB', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toHwb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'hwb(240deg 90.2% 1.96%)');
        });
    });

    describe('#toLab', function() {
        it('returns the color as Lab', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toLab();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'lab(91.74% 2.78 -9.72)');
        });
    });

    describe('#toLch', function() {
        it('returns the color as LCH', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toLch();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'lch(91.74% 10.11 285.93deg)');
        });
    });

    describe('#toOkLab', function() {
        it('returns the color as OKLab', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toOkLab();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'oklab(0.93 0.01 -0.03)');
        });
    });

    describe('#toOkLch', function() {
        it('returns the color as OKLCH', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toOkLch();

            assert.strictEqual(color2, color1);
        });
    });

    describe('#toProPhotoRgb', function() {
        it('returns the color as ProPhoto RGB', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toProPhotoRgb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(prophoto-rgb 0.89 0.88 0.96)');
        });
    });

    describe('#toRec2020', function() {
        it('returns the color as Rec. 2020', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toRec2020();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(rec2020 0.89 0.89 0.97)');
        });
    });

    describe('#toRgb', function() {
        it('returns the color as RGB', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toRgb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'rgb(230 230 250)');
        });
    });

    describe('#toSrgb', function() {
        it('returns the color as sRGB', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toSrgb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(srgb 0.9 0.9 0.98)');
        });
    });

    describe('#toSrgbLinear', function() {
        it('returns the color as linear sRGB', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toSrgbLinear();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(srgb-linear 0.79 0.79 0.96)');
        });
    });

    describe('#toXyzD50', function() {
        it('returns the color as XYZ D50', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toXyzD50();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(xyz-d50 0.79 0.8 0.77)');
        });
    });

    describe('#toXyzD65', function() {
        it('returns the color as XYZ D65', function() {
            const color1 = ColorClass.fromString('lavender');
            const color2 = color1.toXyzD65();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(xyz-d65 0.78 0.8 1.02)');
        });
    });

    describe('#toObject', function() {
        it('returns the color channels', function() {
            const color = ColorClass.fromString('lavender');

            assertObjectClose(color.toObject(),
                {
                    lightness: 0.9309007554171675,
                    chroma: 0.027017845397763564,
                    hue: 285.80269594678555,
                    alpha: 1.0,
                },
            );
        });
    });

    describe('#toString', function() {
        it('returns the CSS color string', function() {
            const color = ColorClass.fromString('lavender');

            assert.strictEqual(color.toString(), 'oklch(0.93 0.03 285.8deg)');
        });

        it('includes alpha when needed', function() {
            const color = ColorClass.fromString('rgb(230 230 250 / 50%)');

            assert.strictEqual(color.toString(), 'oklch(0.93 0.03 285.8deg / 0.5)');
        });
    });

    describe('#withChroma', function() {
        it('returns a copy with a different chroma channel', function() {
            const color = ColorClass.fromString('lavender').withChroma(0.2);

            assert.strictEqual(color.toString(), 'oklch(0.93 0.2 285.8deg)');
        });
    });

    describe('#withHue', function() {
        it('returns a copy with a different hue channel', function() {
            const color = ColorClass.fromString('lavender').withHue(100);

            assert.strictEqual(color.toString(), 'oklch(0.93 0.03 100deg)');
        });
    });

    describe('#withLightness', function() {
        it('returns a copy with a different lightness channel', function() {
            const color = ColorClass.fromString('lavender').withLightness(0.5);

            assert.strictEqual(color.toString(), 'oklch(0.5 0.03 285.8deg)');
        });
    });
});
