import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import { XyzD50 } from '../../src/index.js';
import { assertClose, assertObjectClose } from '../support/assertions.js';

describe('XyzD50', function() {
    describe('#constructor', function() {
        it('preserves extended channels and clamps alpha', function() {
            const color = new XyzD50(...[
                2,
                -1,
                3,
                1.5,
            ],
            );

            assert.strictEqual(color.toString(), 'color(xyz-d50 2 -1 3)');
        });
    });

    describe('#contrast', function() {
        it('calculates the contrast ratio', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = XyzD50.fromString('black');

            assertClose(color1.contrast(color2), 17.06375010290425);
            assertClose(color2.contrast(color1), 17.06375010290425);
        });
    });

    describe('#getX', function() {
        it('returns the x channel', function() {
            const color = XyzD50.fromString('lavender');

            assertClose(color.getX(), 0.7866066805175997);
        });
    });

    describe('#getY', function() {
        it('returns the y channel', function() {
            const color = XyzD50.fromString('lavender');

            assertClose(color.getY(), 0.8012805325415433);
        });
    });

    describe('#getZ', function() {
        it('returns the z channel', function() {
            const color = XyzD50.fromString('lavender');

            assertClose(color.getZ(), 0.7704981789726744);
        });
    });

    describe('#label', function() {
        it('returns the closest CSS color name', function() {
            const color = XyzD50.fromString('lavender').withY(0.5);

            assert.strictEqual(color.label(), 'violet');
        });
    });

    describe('#luma', function() {
        it('returns the relative luminance', function() {
            const color = XyzD50.fromString('lavender');

            assertClose(color.luma(), 0.8031875051452126);
        });
    });

    describe('#space', function() {
        it('returns the color space', function() {
            const color = new XyzD50();

            assert.strictEqual(color.space(), 'xyz-d50');
        });
    });

    describe('#toA98Rgb', function() {
        it('returns the color as A98 RGB', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toA98Rgb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(a98-rgb 0.9 0.9 0.98)');
        });
    });

    describe('#toDisplayP3', function() {
        it('returns the color as Display P3', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toDisplayP3();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(display-p3 0.9 0.9 0.97)');
        });
    });

    describe('#toDisplayP3Linear', function() {
        it('returns the color as linear Display P3', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toDisplayP3Linear();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(display-p3-linear 0.79 0.79 0.94)');
        });
    });

    describe('#toHex', function() {
        it('returns the color as hexadecimal', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toHex();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), '#e6e6fa');
        });
    });

    describe('#toHsl', function() {
        it('returns the color as HSL', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toHsl();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'hsl(240deg 66.67% 94.12%)');
        });
    });

    describe('#toHwb', function() {
        it('returns the color as HWB', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toHwb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'hwb(240deg 90.2% 1.96%)');
        });
    });

    describe('#toLab', function() {
        it('returns the color as Lab', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toLab();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'lab(91.74% 2.78 -9.72)');
        });
    });

    describe('#toLch', function() {
        it('returns the color as LCH', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toLch();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'lch(91.74% 10.11 285.93deg)');
        });
    });

    describe('#toOkLab', function() {
        it('returns the color as OKLab', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toOkLab();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'oklab(0.93 0.01 -0.03)');
        });
    });

    describe('#toOkLch', function() {
        it('returns the color as OKLCH', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toOkLch();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'oklch(0.93 0.03 285.86deg)');
        });
    });

    describe('#toProPhotoRgb', function() {
        it('returns the color as ProPhoto RGB', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toProPhotoRgb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(prophoto-rgb 0.89 0.88 0.96)');
        });
    });

    describe('#toRec2020', function() {
        it('returns the color as Rec. 2020', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toRec2020();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(rec2020 0.91 0.91 0.97)');
        });
    });

    describe('#toRgb', function() {
        it('returns the color as RGB', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toRgb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'rgb(230 230 250)');
        });
    });

    describe('#toSrgb', function() {
        it('returns the color as sRGB', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toSrgb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(srgb 0.9 0.9 0.98)');
        });
    });

    describe('#toSrgbLinear', function() {
        it('returns the color as linear sRGB', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toSrgbLinear();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(srgb-linear 0.79 0.79 0.96)');
        });
    });

    describe('#toXyzD50', function() {
        it('returns the color as XYZ D50', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toXyzD50();

            assert.strictEqual(color2, color1);
        });
    });

    describe('#toXyzD65', function() {
        it('returns the color as XYZ D65', function() {
            const color1 = XyzD50.fromString('lavender');
            const color2 = color1.toXyzD65();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(xyz-d65 0.78 0.8 1.02)');
        });
    });

    describe('#toObject', function() {
        it('returns the color channels', function() {
            const color = XyzD50.fromString('lavender');

            assertObjectClose(color.toObject(),
                {
                    x: 0.7866066805175997,
                    y: 0.8012805325415433,
                    z: 0.7704981789726744,
                    alpha: 1.0,
                },
            );
        });
    });

    describe('#toString', function() {
        it('returns the CSS color string', function() {
            const color = XyzD50.fromString('lavender');

            assert.strictEqual(color.toString(), 'color(xyz-d50 0.79 0.8 0.77)');
        });

        it('includes alpha when needed', function() {
            const color = XyzD50.fromString('rgb(230 230 250 / 50%)');

            assert.strictEqual(color.toString(), 'color(xyz-d50 0.79 0.8 0.77 / 0.5)');
        });
    });

    describe('#withX', function() {
        it('returns a copy with a different x channel', function() {
            const color = XyzD50.fromString('lavender').withX(0.5);

            assert.strictEqual(color.toString(), 'color(xyz-d50 0.5 0.8 0.77)');
        });
    });

    describe('#withY', function() {
        it('returns a copy with a different y channel', function() {
            const color = XyzD50.fromString('lavender').withY(0.5);

            assert.strictEqual(color.toString(), 'color(xyz-d50 0.79 0.5 0.77)');
        });
    });

    describe('#withZ', function() {
        it('returns a copy with a different z channel', function() {
            const color = XyzD50.fromString('lavender').withZ(0.5);

            assert.strictEqual(color.toString(), 'color(xyz-d50 0.79 0.8 0.5)');
        });
    });
});
