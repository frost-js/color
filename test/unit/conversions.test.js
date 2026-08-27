import { describe, it } from 'mocha';
import {
    a98RgbToXyzD65,
    displayP3LinearToDisplayP3,
    displayP3LinearToXyzD65,
    displayP3ToDisplayP3Linear,
    labToXyzD50,
    okLabToXyzD65,
    prophotoRgbToXyzD50,
    rec2020ToXyzD65,
    srgbLinearToSrgb,
    srgbLinearToXyzD65,
    srgbToSrgbLinear,
    xyzD50ToLab,
    xyzD50ToProPhotoRgb,
    xyzD50ToXyzD65,
    xyzD65ToA98Rgb,
    xyzD65ToDisplayP3Linear,
    xyzD65ToOkLab,
    xyzD65ToRec2020,
    xyzD65ToSrgbLinear,
    xyzD65ToXyzD50,
} from '../../src/conversions.js';
import { assertClose } from '../support/assertions.js';

const assertArrayClose = (actual, expected) => {
    for (const [index, value] of expected.entries()) {
        assertClose(actual[index], value);
    }
};

describe('Conversions', function() {
    describe('#a98RgbToXyzD65', function() {
        it('converts A98 RGB to XYZ D65', function() {
            assertArrayClose(
                a98RgbToXyzD65(0.25, 0.5, 0.75),
                [0.16773166428519598, 0.19070368921307673, 0.5432420115093654],
            );
        });
    });

    describe('#displayP3LinearToDisplayP3', function() {
        it('converts linear Display P3 to Display P3', function() {
            assertArrayClose(
                displayP3LinearToDisplayP3(-0.21404114048223255, 0.0015479876160990713, 0.21404114048223255),
                [-0.5, 0.02, 0.5],
            );
        });
    });

    describe('#displayP3LinearToXyzD65', function() {
        it('converts linear Display P3 to XYZ D65', function() {
            assertArrayClose(
                displayP3LinearToXyzD65(0.25, 0.5, 0.75),
                [0.4031395476723724, 0.46257808750599905, 0.8055149676051832],
            );
        });
    });

    describe('#displayP3ToDisplayP3Linear', function() {
        it('converts Display P3 to linear Display P3', function() {
            assertArrayClose(
                displayP3ToDisplayP3Linear(-0.5, 0.02, 0.5),
                [-0.21404114048223255, 0.0015479876160990713, 0.21404114048223255],
            );
        });
    });

    describe('#labToXyzD50', function() {
        it('converts Lab to XYZ D50', function() {
            assertArrayClose(
                labToXyzD50(60, 30, -40),
                [0.35273006792414424, 0.2812333429004879, 0.5160241871850108],
            );
        });
    });

    describe('#okLabToXyzD65', function() {
        it('converts OKLab to XYZ D65', function() {
            assertArrayClose(
                okLabToXyzD65(0.7, 0.1, -0.15),
                [0.4384240326511916, 0.3158934720492758, 0.9281550660709309],
            );
        });
    });

    describe('#prophotoRgbToXyzD50', function() {
        it('converts ProPhoto RGB to XYZ D50', function() {
            assertArrayClose(
                prophotoRgbToXyzD50(-0.2, 0.4, 0.8),
                [0.0029292330170698558, 0.12096200204602699, 0.5521676847424244],
            );
        });
    });

    describe('#rec2020ToXyzD65', function() {
        it('converts Rec. 2020 to XYZ D65', function() {
            assertArrayClose(
                rec2020ToXyzD65(-0.2, 0.4, 0.8),
                [0.10150912714954471, 0.10438451082015363, 0.6241614492327773],
            );
        });
    });

    describe('#srgbLinearToSrgb', function() {
        it('converts linear sRGB to sRGB', function() {
            assertArrayClose(
                srgbLinearToSrgb(-0.21404114048223255, 0.0015479876160990713, 0.21404114048223255),
                [-0.5, 0.02, 0.5],
            );
        });
    });

    describe('#srgbLinearToXyzD65', function() {
        it('converts linear sRGB to XYZ D65', function() {
            assertArrayClose(
                srgbLinearToXyzD65(0.25, 0.5, 0.75),
                [0.4172504608098046, 0.46488832737230584, 0.7773292087634563],
            );
        });
    });

    describe('#srgbToSrgbLinear', function() {
        it('converts sRGB to linear sRGB', function() {
            assertArrayClose(
                srgbToSrgbLinear(-0.5, 0.02, 0.5),
                [-0.21404114048223255, 0.0015479876160990713, 0.21404114048223255],
            );
        });
    });

    describe('#xyzD50ToLab', function() {
        it('converts XYZ D50 to Lab', function() {
            assertArrayClose(
                xyzD50ToLab(0.3, 0.4, 0.2),
                [69.46953076845696, -29.605530973801365, 22.660148493094923],
            );
        });
    });

    describe('#xyzD50ToProPhotoRgb', function() {
        it('converts XYZ D50 to ProPhoto RGB', function() {
            assertArrayClose(
                xyzD50ToProPhotoRgb(0.1, 0.5, 0.2),
                [-0.04271290611735369, 0.8226934389233042, 0.4550584827304945],
            );
        });
    });

    describe('#xyzD50ToXyzD65', function() {
        it('converts XYZ D50 to XYZ D65', function() {
            assertArrayClose(
                xyzD50ToXyzD65(0.25, 0.5, 0.75),
                [0.2747635602980644, 0.513686352601124, 0.990599123748264],
            );
        });
    });

    describe('#xyzD65ToA98Rgb', function() {
        it('converts XYZ D65 to A98 RGB', function() {
            assertArrayClose(
                xyzD65ToA98Rgb(0.25, 0.5, 0.75),
                [-0.20502264048390156, 0.8649580330178266, 0.8533509021783342],
            );
        });
    });

    describe('#xyzD65ToDisplayP3Linear', function() {
        it('converts XYZ D65 to linear Display P3', function() {
            assertArrayClose(
                xyzD65ToDisplayP3Linear(0.25, 0.5, 0.75),
                [-0.14435066931224327, 0.6916783021502373, 0.6885386559326907],
            );
        });
    });

    describe('#xyzD65ToOkLab', function() {
        it('converts XYZ D65 to OKLab', function() {
            assertArrayClose(
                xyzD65ToOkLab(0.25, 0.5, 0.75),
                [0.7655731400826722, -0.2356574530804355, -0.05089608189802286],
            );
        });
    });

    describe('#xyzD65ToRec2020', function() {
        it('converts XYZ D65 to Rec. 2020', function() {
            assertArrayClose(
                xyzD65ToRec2020(0.1, 0.5, 0.2),
                [-0.3027729678685117, 0.8844335097729922, 0.47650899606819697],
            );
        });
    });

    describe('#xyzD65ToSrgbLinear', function() {
        it('converts XYZ D65 to linear sRGB', function() {
            assertArrayClose(
                xyzD65ToSrgbLinear(0.25, 0.5, 0.75),
                [-0.3324071735286689, 0.7268391347390221, 0.7046476761619191],
            );
        });
    });

    describe('#xyzD65ToXyzD50', function() {
        it('converts XYZ D65 to XYZ D50', function() {
            assertArrayClose(
                xyzD65ToXyzD50(0.25, 0.5, 0.75),
                [0.23581168372015016, 0.4898188162718899, 0.5691225466547007],
            );
        });
    });
});
