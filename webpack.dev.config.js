var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var argv = require('yargs').argv

const HappyPack = require('happypack')
const os = require('os')
const ip = require('ip').address()
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

// 判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'

console.log('当前运行环境：', isPro ? 'production' : 'development')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3100',
    'webpack/hot/only-dev-server',
    './entry'
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
     new HappyPack({
      id: 'happybabel',
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
        options: {
          presets: ['react', 'env'],
          plugins: [
            ['transform-object-rest-spread'],
            ['transform-runtime', {
              polyfill: false,
              regenerator: true
            }]
          ]
        }
      }],
      threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
      verbose: true
    }),
  ],
    // alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.join(__dirname, './src')
    ],
    alias: {
      'actions': path.resolve(__dirname, 'src/actions'),
      'components': path.resolve(__dirname, 'src/components'),
      'containers': path.resolve(__dirname, 'src/containers'),
      'reducers': path.resolve(__dirname, 'src/reducers'),
      'utils': path.resolve(__dirname, 'src/utils')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        // use: {
        //   loader: 'babel-loader?cacheDirectory=true'
        // }
         use: ['happypack/loader?id=happybabel']
      },
      // {
      //   test: /\.(less|css)$/,
      //   use: ExtractTextPlugin.extract({
      //     use: ['css-loader', 'less-loader', 'postcss-loader']
      //   })
      // },
      {
        test: /\.css$/,
        use: ['style-loader/useable', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader/useable', 'css-loader', 'less-loader']
      },
      // { test: /\.css$/, loader: 'css-loader!postcss-loader' },
      // { test: /\.less$/, loader: 'css-loader!less-loader' },
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
