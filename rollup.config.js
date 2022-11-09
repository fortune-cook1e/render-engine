import * as path from 'path';

import alias from '@rollup/plugin-alias';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import visualizer from 'rollup-plugin-visualizer';

const packageJson = require('./package.json');

const EXTENSIONS = ['.ts', '.tsx', '.js'];
const ROOT_DIR = path.resolve(__dirname, './src');

export default [
  {
    input: 'src/index.ts',
    output: {
      dist: path.resolve(__dirname, './dist'),
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      commonjs(), // 打包成cjs格式
      babel({
        babelHelpers: 'bundled',
        extensions: EXTENSIONS,
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      }),
      external(), // 阻止打包 peer依赖
      resolve(),
      alias({
        resolve: EXTENSIONS,
        entries: [
          {
            find: '@',
            replacement: ROOT_DIR,
          },
        ],
      }),

      typescript({ useTsconfigDeclarationDir: true }),
      postcss({
        minimize: true,
        modules: true,
        use: {
          sass: null,
          stylus: null,
          less: { javascriptEnabled: true },
        },
        extensions: ['.less'],
        extract: true,
      }),
      terser(), // 压缩bundle
      // visualizer({
      // 	filename: 'bundle-analysis.html',
      // 	open: true
      // })
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
