const urlencode = require('urlencode')
const ip = require('ip').address()
const config = require('../config')
const DEVELOPMENT = 'development'
let env = process.env.NODE_ENV || DEVELOPMENT
let IS_ONLINE = process.env.NODE_ENV === 'production'

const index = async (ctx) => {
  let cdn = config.cdn
  // let isWechatWebView = (/MicroMessenger/i).test(ctx.request.header['user-agent'])
  // let isAlipayWebView = (/AlipayClient/i).test(ctx.request.header['user-agent'])
  // let isXiaodianWebView = (/XiaoDian/i).test(ctx.request.header['user-agent'])
  // let isIOS = (/iPad|iPhone|iPod/).test(ctx.request.header['user-agent'])
  // let path = ctx.request.path
  // let loginResponse, loginResponseBody
  // if (isWechatWebView && ctx.request.path !== '/') {
  //   return ctx.redirect(`/?__path__=${urlencode(ctx.request.url || '')}`)
  // }
  // 先检查登陆状态

  ctx.set({
    'Transfer-Encoding': 'chunked'
  })
  if (env === DEVELOPMENT) {
    cdn = cdn.replace('IP', ip)
  }

  await ctx.render('index', {
    cdn,
    version: config.version,
    isOnline: IS_ONLINE,
    // isWechatWebView,
    // isAlipayWebView,
    // isXiaodianWebView
  })
}

module.exports = index
