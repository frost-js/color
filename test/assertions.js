import assert from 'node:assert/strict';

export function assertClose(actual, expected, delta = 1e-12) {
    assert.ok(
        Math.abs(actual - expected) <= delta,
        `Expected ${actual} to be within ${delta} of ${expected}`,
    );
}

export function assertObjectClose(actual, expected, delta = 1e-12) {
    assert.deepStrictEqual(Object.keys(actual), Object.keys(expected));

    for (const key of Object.keys(expected)) {
        assertClose(actual[key], expected[key], delta);
    }
}
