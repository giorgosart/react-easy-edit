import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/lib/EasyEdit.jsx',
  external: ['react', 'prop-types'],
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    postcss({
      plugins: [],
      minimize: true
    }),
    terser()
  ],
  output: {
    format: 'umd',
    name: 'react-easy-edit',
    globals: {
      react: "React",
      "prop-types": "PropTypes"
    }
  }
};
