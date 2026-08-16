import frostConfig, { browserConfig } from '@fr0st/eslint-config';

export default [
    frostConfig,
    browserConfig,
    {
        ignores: [
            'dist/**',
        ],
    },
];
