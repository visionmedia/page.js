import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

const plugins = [
  nodeResolve({
    jsnext: true,
    main: true,
  }),
  commonjs({
    include: ['node_modules/**', '**'],
  }),
];

export default [
  {
    input: 'index.js',
    output: {
      file: 'page.js',
      format: 'umd',
      name: 'page',
    },
    plugins,
  },
  {
    input: 'index.js',
    output: {
      file: 'page.mjs',
      format: 'es',
      name: 'page',
    },
    plugins,
  },
];