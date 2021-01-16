module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactMap',
      externals: {
        react: 'React'
      }
    }
  }
}
