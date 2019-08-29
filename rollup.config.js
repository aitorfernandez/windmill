export default {
  input: 'index.js',
  output: {
    file: 'dist/main.js',
    format: 'iife',
    name: 'windmill',
    sourcemap: 'inline'
  },
  watch: {
    exclude: ['node_modules/**']
  }
}
