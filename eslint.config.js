import frostConfig, { browserConfig, nodeConfig } from '@fr0st/eslint-config';

export default [
    {
        ignores: [
            '.tmp/**',
            'coverage/**',
            'dist/**',
        ],
    },
    frostConfig,
    browserConfig,
    {
        ...nodeConfig,
        files: [
            '*.config.js',
            'test/**/*.js',
        ],
    },
];
