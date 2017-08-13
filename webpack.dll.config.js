const path = require('path')
const webpack = require('webpack')
const os = require('os')
const UglifyJsParallelPlugin = require('webpack-uglify-parallel')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router']
  },
  output: {
    path: path.join(__dirname, '/static'),
    filename: '[name].dll.js',
    /**
     * output.library
     * 将会定义为window.${output.library}
     * 在这次的例子中，将会定义为window.vendor_library
     */
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * 定义 mainfest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(__dirname, '/static', '[name]-mainfest.json'),
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library一样即可
       */
      name: '[name]_library'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      mangle: true,
      compressor: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      }
    })
  ]
}
