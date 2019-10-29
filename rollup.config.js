import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'index.js',
  output: {
    file: 'page.js',
    format: 'umd',
    name: 'page'
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: ['node_modules/**', '**']
    })
  ]
};
