const router = require('koa-router')()
const indexController = require('./controller')

const routes = (app) => {
  router.get(/.*/, indexController)
  router.post(/.*/, indexController)
  // router.post('/users',
  //   (ctx) => {
  //     console.log(ctx.request.body)
  //     // => POST body
  //     ctx.body = JSON.stringify(ctx.request.body)
  //   }
  // )
  app.use(router.routes())
}

module.exports = routes
