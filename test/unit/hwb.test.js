import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import { Hwb } from '../../src/index.js';
import { assertClose, assertObjectClose } from '../support/assertions.js';

describe('Hwb', function() {
    describe('#constructor', function() {
        it('preserves extended channels and clamps alpha', function() {
            const color = new Hwb(...[
                390,
                -100,
                300,
                1.5,
            ],
            );

            assert.strictEqual(color.toString(), 'hwb(30deg -100% 300%)');
        });
    });

    describe('#contrast', function() {
        it('calculates the contrast ratio', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = Hwb.fromString('black');

            assertClose(color1.contrast(color2), 17.063750102904258);
            assertClose(color2.contrast(color1), 17.063750102904258);
        });
    });

    describe('#getBlackness', function() {
        it('returns the blackness channel', function() {
            const color = Hwb.fromString('lavender');

            assertClose(color.getBlackness(), 1.9607843137254943);
        });
    });

    describe('#getHue', function() {
        it('returns the hue channel', function() {
            const color = Hwb.fromString('lavender');

            assertClose(color.getHue(), 240.0);
        });
    });

    describe('#getWhiteness', function() {
        it('returns the whiteness channel', function() {
            const color = Hwb.fromString('lavender');

            assertClose(color.getWhiteness(), 90.19607843137256);
        });
    });

    describe('#label', function() {
        it('returns the closest CSS color name', function() {
            const color = Hwb.fromString('lavender').withWhiteness(50);

            assert.strictEqual(color.label(), 'mediumslateblue');
        });
    });

    describe('#luma', function() {
        it('returns the relative luminance', function() {
            const color = Hwb.fromString('lavender');

            assertClose(color.luma(), 0.8031875051452129);
        });
    });

    describe('#space', function() {
        it('returns the color space', function() {
            const color = new Hwb();

            assert.strictEqual(color.space(), 'hwb');
        });
    });

    describe('#toA98Rgb', function() {
        it('returns the color as A98 RGB', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toA98Rgb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(a98-rgb 0.9 0.9 0.98)');
        });
    });

    describe('#toDisplayP3', function() {
        it('returns the color as Display P3', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toDisplayP3();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(display-p3 0.9 0.9 0.97)');
        });
    });

    describe('#toDisplayP3Linear', function() {
        it('returns the color as linear Display P3', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toDisplayP3Linear();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(display-p3-linear 0.79 0.79 0.94)');
        });
    });

    describe('#toHex', function() {
        it('returns the color as hexadecimal', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toHex();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), '#e6e6fa');
        });
    });

    describe('#toHsl', function() {
        it('returns the color as HSL', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toHsl();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'hsl(240deg 66.67% 94.12%)');
        });
    });

    describe('#toHwb', function() {
        it('returns the color as HWB', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toHwb();

            assert.strictEqual(color2, color1);
        });
    });

    describe('#toLab', function() {
        it('returns the color as Lab', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toLab();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'lab(91.74% 2.78 -9.72)');
        });
    });

    describe('#toLch', function() {
        it('returns the color as LCH', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toLch();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'lch(91.74% 10.11 285.93deg)');
        });
    });

    describe('#toOkLab', function() {
        it('returns the color as OKLab', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toOkLab();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'oklab(0.93 0.01 -0.03)');
        });
    });

    describe('#toOkLch', function() {
        it('returns the color as OKLCH', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toOkLch();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'oklch(0.93 0.03 285.86deg)');
        });
    });

    describe('#toProPhotoRgb', function() {
        it('returns the color as ProPhoto RGB', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toProPhotoRgb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(prophoto-rgb 0.89 0.88 0.96)');
        });
    });

    describe('#toRec2020', function() {
        it('returns the color as Rec. 2020', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toRec2020();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(rec2020 0.91 0.91 0.97)');
        });
    });

    describe('#toRgb', function() {
        it('returns the color as RGB', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toRgb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'rgb(230 230 250)');
        });
    });

    describe('#toSrgb', function() {
        it('returns the color as sRGB', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toSrgb();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(srgb 0.9 0.9 0.98)');
        });
    });

    describe('#toSrgbLinear', function() {
        it('returns the color as linear sRGB', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toSrgbLinear();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(srgb-linear 0.79 0.79 0.96)');
        });
    });

    describe('#toXyzD50', function() {
        it('returns the color as XYZ D50', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toXyzD50();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(xyz-d50 0.79 0.8 0.77)');
        });
    });

    describe('#toXyzD65', function() {
        it('returns the color as XYZ D65', function() {
            const color1 = Hwb.fromString('lavender');
            const color2 = color1.toXyzD65();

            assert.notStrictEqual(color2, color1);
            assert.strictEqual(color2.toString(), 'color(xyz-d65 0.78 0.8 1.02)');
        });
    });

    describe('#toObject', function() {
        it('returns the color channels', function() {
            const color = Hwb.fromString('lavender');

            assertObjectClose(color.toObject(),
                {
                    hue: 240.0,
                    whiteness: 90.19607843137256,
                    blackness: 1.9607843137254943,
                    alpha: 1.0,
                },
            );
        });
    });

    describe('#toString', function() {
        it('returns the CSS color string', function() {
            const color = Hwb.fromString('lavender');

            assert.strictEqual(color.toString(), 'hwb(240deg 90.2% 1.96%)');
        });

        it('includes alpha when needed', function() {
            const color = Hwb.fromString('rgb(230 230 250 / 50%)');

            assert.strictEqual(color.toString(), 'hwb(240deg 90.2% 1.96% / 50%)');
        });
    });

    describe('#withBlackness', function() {
        it('returns a copy with a different blackness channel', function() {
            const color = Hwb.fromString('lavender').withBlackness(50);

            assert.strictEqual(color.toString(), 'hwb(240deg 90.2% 50%)');
        });
    });

    describe('#withHue', function() {
        it('returns a copy with a different hue channel', function() {
            const color = Hwb.fromString('lavender').withHue(100);

            assert.strictEqual(color.toString(), 'hwb(100deg 90.2% 1.96%)');
        });
    });

    describe('#withWhiteness', function() {
        it('returns a copy with a different whiteness channel', function() {
            const color = Hwb.fromString('lavender').withWhiteness(50);

            assert.strictEqual(color.toString(), 'hwb(240deg 50% 1.96%)');
        });
    });
});
