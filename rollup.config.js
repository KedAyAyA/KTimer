import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import uglify from 'rollup-plugin-uglify'

console.log(process.env.NODE_ENV)

const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/ktimer.js',
    format: 'umd',
    name: 'KTimer'
  },
  plugins: [
    json(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

if (process.env.NODE_ENV === 'minify') {
  config.output.file = 'dist/ktimer.min.js'
  config.plugins.push(uglify())
}

export default config