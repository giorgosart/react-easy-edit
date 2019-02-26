import {uglify} from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/lib/Editable.jsx',
  external: ['react', 'prop-types'],
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    postcss({
      plugins: []
    }),
    uglify()
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
