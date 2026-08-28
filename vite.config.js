import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
    const isUmd = mode === 'umd';

    return {
        build: {
            emptyOutDir: !isUmd,
            lib: {
                entry: isUmd ? 'src/browser.js' : 'src/index.js',
                name: 'Color',
            },
            minify: false,
            outDir: 'dist',
            rolldownOptions: {
                output: isUmd ? [
                    {
                        entryFileNames: 'frost-color.js',
                        format: 'umd',
                        minify: false,
                        name: 'Color',
                    },
                    {
                        entryFileNames: 'frost-color.min.js',
                        format: 'umd',
                        minify: true,
                        name: 'Color',
                    },
                ] : [
                    {
                        entryFileNames: 'frost-color.esm.js',
                        format: 'es',
                        minify: false,
                    },
                    {
                        entryFileNames: 'frost-color.esm.min.js',
                        format: 'es',
                        minify: true,
                    },
                ],
            },
            sourcemap: true,
            target: 'baseline-widely-available',
        },
        test: {
            allowOnly: false,
            pool: 'threads',
            coverage: {
                include: ['src/**/*.js'],
                reporter: ['text', 'lcov'],
            },
        },
    };
});
