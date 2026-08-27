import assert from 'node:assert/strict';

/**
 * Asserts that two numbers are within a given tolerance.
 * @param {number} actual The actual value.
 * @param {number} expected The expected value.
 * @param {number} [delta=1e-12] The maximum allowed difference.
 */
export function assertClose(actual, expected, delta = 1e-12) {
    assert.ok(
        Math.abs(actual - expected) <= delta,
        `Expected ${actual} to be within ${delta} of ${expected}`,
    );
}

/**
 * Asserts that two numeric objects have matching keys and approximately equal values.
 * @param {Record<string, number>} actual The actual object.
 * @param {Record<string, number>} expected The expected object.
 * @param {number} [delta=1e-12] The maximum allowed difference.
 */
export function assertObjectClose(actual, expected, delta = 1e-12) {
    assert.deepStrictEqual(Object.keys(actual), Object.keys(expected));

    for (const key of Object.keys(expected)) {
        assertClose(actual[key], expected[key], delta);
    }
}
