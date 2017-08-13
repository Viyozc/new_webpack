const Koa = require('koa')
const path = require('path')
const koaBody = require('koa-body')
const views = require('koa-views')
const serve = require('koa-static')
const favicon = require('koa-favicon')
const compress = require('koa-compress')
const config = require('./config')
const routes = require('./server/router')

const app = new Koa()

const webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config2 = require('./webpack.dev.config')
var compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config2.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error('Error:', ctx.request)
    ctx.status = err.status || 500
    ctx.body = {message: err.message}
    ctx.app.emit('error', err, ctx)
  }
})

app.use(compress({
  filter: (contentType) => {
    return /text/i.test(contentType)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(koaBody())
app.use(favicon((path.join(__dirname, 'public/favicon.ico'))))
app.use(views(path.resolve(__dirname), {
  // map: {
  //   html: 'ejs',
  //   js: 'ejs'
  // }
}))
app.use(serve('./public'))

routes(app)

app.on('error', (err) => {
  console.error('Server error:', err, err.stack)
})

app.listen(config.port, () => {
  console.info('XDM running at:', config.port)
})
