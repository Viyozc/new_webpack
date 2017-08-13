// const Koa = require('koa')
// const webpack = require('webpack')
// const convert = require('koa-convert')
// const koaWebpackMiddleware = require('koa-webpack-middleware')
// const webpackDevMiddleware = koaWebpackMiddleware.devMiddleware
// const webpackHotMiddleware = koaWebpackMiddleware.hotMiddleware
// const config = require('./webpack.dev.config')
// const app = new Koa()
// const compiler = webpack(config)
// const PORT = process.env.PORT || 3000
// const wdm = webpackDevMiddleware(compiler, {
//   watchOptions: {
//     aggregateTimeout: 300,
//     poll: true
//   },
//   reload: true,
//   publicPath: config.output.publicPath,
//   stats: {
//     colors: true
//   }
// })
// app.use(convert(wdm))
// app.use(convert(webpackHotMiddleware(compiler)))
// const server = app.listen(PORT, 'localhost', (err) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(`HMR Listening at http://localhost:${PORT}`)
// })
// process.on('SIGTERM', () => {
//   console.log('Stopping dev server')
//   wdm.close()
//   server.close(() => {
//     process.exit(0)
//   })
// })

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.dev.config')
const Koa = require('koa')
var compiler = webpack(config)
const app = new Koa()
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))
// app.listen(3100, 'localhost', (err) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(`HMR Listening at http://localhost:3100`)
// })

// import webpack from 'webpack'
// var webpack = require('webpack')

// const Koa = require('koa')

// import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
// import devConfig from './webpack.dev.config.dev'
// const compile = webpack(devConfig)
// const app = new Koa()
// app.use(devMiddleware(compile, {
//     // display no info to console (only warnings and errors)
//   noInfo: false,

//     // display nothing to the console
//   quiet: false,

//     // switch into lazy mode
//     // that means no watching, but recompilation on every request
//   lazy: true,

//     // watch options (only lazy: false)
//   watchOptions: {
//     aggregateTimeout: 300,
//     poll: true
//   },

//     // public path to bind the middleware to
//     // use the same as in webpack
//   publicPath: devConfig.output.publicPath,

//     // custom headers
//   headers: { 'X-Custom-Header': 'yes' },

//     // options for formating the statistics
//   stats: {
//     colors: true
//   }
// }))
// app.use(hotMiddleware(compile, {
//   // log: console.log,
//   // path: '/__webpack_hmr',
//   // heartbeat: 10 * 1000
// }))
// app.listen(3100, 'localhost', (err) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(`HMR Listening at http://localhost:3100`)
// })
