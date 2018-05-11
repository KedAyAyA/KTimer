import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/ktimer.js',
    format: 'umd',
    name: 'KTimer'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}