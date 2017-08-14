var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var argv = require('yargs').argv

const HappyPack = require('happypack')
const os = require('os')
const ip = require('ip').address()
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

// 判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'

console.log('当前运行环境：', isPro ? 'production' : 'development')

module.exports = {
  context: path.resolve(__dirname, 'src2'),
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3100',
    'webpack/hot/only-dev-server',
    './main'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
    publicPath: '/build/',
    chunkFilename: '[name].js'
  },
    // BASE_URL是全局的api接口访问地址
  plugins: [
    // new ExtractTextPlugin('styles.css'),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   /**
    //    * 在这里引入 manifest 文件
    //    */
    //   manifest: require(path.join(__dirname, '/static', 'vendor-mainfest.json'))
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module) {
    //         // 该配置假定你引入的 vendor 存在于 node_modules 目录中
    //     return module.context && module.context.indexOf('node_modules') !== -1
    //   }
    // }),
    new webpack.DefinePlugin({
        // 定义全局变量
      'process.env': {
        'NODE_ENV': JSON.stringify(nodeEnv)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      minChunks: 5
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
         // test: /\.xxx$/, // may apply this only for some modules
    }),
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    new HappyPack({
      id: 'lessbabel',
      loaders: ['style-loader/useable', 'css-loader', 'less-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    })
    //  new HappyPack({
    //   id: 'happybabel',
    //   loaders: [{
    //     loader: 'babel-loader?cacheDirectory=true',
    //     options: {
    //       presets: ['react', 'env'],
    //       plugins: [
    //         ['transform-object-rest-spread'],
    //         ['transform-runtime', {
    //           polyfill: false,
    //           regenerator: true
    //         }]
    //       ]
    //     }
    //   }],
    //   threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
    //   verbose: true
    // }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.join(__dirname, './src2')
    ],
    alias: {
      'actions': path.resolve(__dirname, 'src2/actions'),
      'components': path.resolve(__dirname, 'src2/components'),
      'containers': path.resolve(__dirname, 'src2/containers'),
      'reducers': path.resolve(__dirname, 'src2/reducers'),
      'utils': path.resolve(__dirname, 'src2/utils')
    }
  },

  module: {
    rules: [
      {
        test: /.*\/containers\/.*\.js$/,
        include: path.resolve(__dirname, 'src2'),
        exclude: /containers\/app.js$/,
        use: ['bundle-loader?lazy']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['happypack/loader?id=happybabel']
      },
      {
        test: /\.(css)$/,
        use: [
          {loader: 'style-loader/useable'},
          {loader: 'css-loader'},
          {loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer'),
                  require('postcss-short'),
                  require('precss'),
                  require('postcss-import')
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        // use: ['style-loader/useable','css-loader', 'less-loader']
        use: ['happypack/loader?id=lessbabel']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: ['url-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
      }
    ]
  },
  devServer: {
    hot: true,
    compress: true,
    port: 3100,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname),
    publicPath: '/build/',
    stats: {
      modules: false,
      chunks: false
    }
  }
}
