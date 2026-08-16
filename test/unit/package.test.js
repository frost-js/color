import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import Color from '@fr0st/color';
import { describe, it } from 'mocha';

describe('Package Artifacts', function() {
    describe('Package Exports', function() {
        it('exports only the public package entry', async function() {
            assert.strictEqual(Color.fromString('#f00').to('xyz-d65').space(), 'xyz-d65');

            for (const specifier of [
                '@fr0st/color/dist/frost-color.js',
                '@fr0st/color/package.json',
                '@fr0st/color/src/index.js',
            ]) {
                await assert.rejects(
                    import(specifier),
                    (error) => error?.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED',
                );
            }
        });
    });

    describe('Browser Bundles', function() {
        for (const path of ['dist/frost-color.js', 'dist/frost-color.min.js']) {
            it(`runs the ${path} UMD bundle`, function() {
                const context = {};

                context.globalThis = context;
                vm.runInNewContext(fs.readFileSync(path, 'utf8'), context, { filename: path });

                assert.strictEqual(
                    context.Color.fromString('rgb(255 0 0 / 50%)').toString(),
                    'rgb(255 0 0 / 50%)',
                );
                assert.strictEqual(context.Color.fromHsl(359, 100, 50).label(), 'crimson');
            });
        }
    });

    describe('Source Maps', function() {
        it('links both generated source maps', function() {
            const bundle = fs.readFileSync('dist/frost-color.js', 'utf8');
            const minifiedBundle = fs.readFileSync('dist/frost-color.min.js', 'utf8');
            const map = JSON.parse(fs.readFileSync('dist/frost-color.js.map', 'utf8'));
            const minifiedMap = JSON.parse(fs.readFileSync('dist/frost-color.min.js.map', 'utf8'));

            assert.match(bundle, /sourceMappingURL=frost-color\.js\.map/);
            assert.match(minifiedBundle, /sourceMappingURL=frost-color\.min\.js\.map/);
            assert.strictEqual(map.file, 'frost-color.js');
            assert.strictEqual(Object.hasOwn(minifiedMap, 'file'), false);
            assert.strictEqual(map.sources.length, map.sourcesContent.length);
            assert.strictEqual(minifiedMap.sources.length, minifiedMap.sourcesContent.length);
        });
    });
});
