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
        files: [
            'src/**/*.js',
            'test/**/*.js',
        ],
        rules: {
            '@stylistic/indent': [
                'error',
                4,
                {
                    ignoredNodes: ['LogicalExpression > *'],
                    MemberExpression: 'off',
                    SwitchCase: 1,
                },
            ],
            '@stylistic/new-parens': 'error',
            '@stylistic/no-extra-semi': 'error',
            '@stylistic/space-infix-ops': 'error',
            'eqeqeq': ['error', 'always', { null: 'ignore' }],
            'object-shorthand': 'error',
            'prefer-arrow-callback': 'error',
        },
    },
    {
        ...nodeConfig,
        files: [
            '*.config.js',
            'test/**/*.js',
        ],
    },
];
