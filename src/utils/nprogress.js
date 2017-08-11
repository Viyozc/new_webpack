var NProgress = require('nprogress')
var NProgressStyle = require('./nprogress.css')

NProgressStyle.use()
NProgress.configure({
  template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div><div id="nprogress-mask" class="mask"></div>'
})

var start = NProgress.start
var done = NProgress.done

NProgress.start = function () {
  start.call(NProgress)
  var mask = document.getElementById('nprogress-mask')
  if (mask) {
    mask.onclick = function (e) {
      if (e && e.stopPropagation) {
        e.stopPropagation()
      }
    }
  }
}
NProgress.done = function () {
  done.call(NProgress)
  var mask = document.getElementById('nprogress-mask')
  if (mask) {
    mask.onclick = null
  }
}

module.exports = NProgress
