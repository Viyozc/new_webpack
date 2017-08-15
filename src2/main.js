import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import configureStore from 'configStore'
import AppContainer from 'App.js'
import createHistory from 'history/createBrowserHistory'
import Test from './test/app'
require('es6-promise').polyfill()
require('isomorphic-fetch')
const router = createHistory()

// 给增强后的store传入reducer
const store = configureStore()

  // export store to window
window.Store = store

const render = (Component) => {
  ReactDom.render(
    <Provider store={store}>
      <Router history={router}>
        <Component />
      </Router>
    </Provider>,
      document.getElementById('container'),
      () => {}
    )
}
render(AppContainer)

// import React from 'react'
// import ReactDOM from 'react-dom'
// import { Router } from 'react-router-dom'
// import { syncHistoryWithStore } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory'
// import { Provider } from 'react-redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import thunk from 'redux-thunk'
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
// import { AppContainer } from 'react-hot-loader'
// import App from './App'
// import rootReducer from './reducers/index'
// import configStore from './configStore'
// import {router} from './utils'
// import reducers from 'reducers'
// import routes from './routes'
// var FastClick = require('fastclick')

// const routers = createHistory()
// let store = configStore()
// // 按模块导入lodash，可以有效减小vendor.js的大小
// import isEmpty from 'lodash/isEmpty'
// import isEqual from 'lodash/isEqual'
// import debounce from 'lodash/debounce'
// import isArray from 'lodash/isArray'

// window.isEmpty = isEmpty
// window.isEqual = isEqual
// window.debounce = debounce
// window.isArray = isArray
// window.store = store

// // 解决移动端300毫秒延迟
// FastClick.attach(document.body)

// // let history = syncHistoryWithStore(router, store)
// const render = Component =>
//     ReactDOM.render(
//     //   <AppContainer>
//       <Provider store={store}>
//         <Router history={routers}>
//           <Component />
//         </Router>
//       </Provider>,
//       /* </AppContainer>, */
//     document.getElementById('container')
// )

// render(App)

// if (module.hot) {
//   module.hot.accept('./App', () => { render(App) })
// }
