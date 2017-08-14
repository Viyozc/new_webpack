import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { syncHistoryWithStore } from 'react-router-redux'

import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
import App from './App'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers/index'
import configStore from './configStore'
import {router} from './utils'
import reducers from 'reducers'
import routes from './routes'
var FastClick = require('fastclick')

let store = configStore(reducers)
// 按模块导入lodash，可以有效减小vendor.js的大小
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import debounce from 'lodash/debounce'
import isArray from 'lodash/isArray'

window.isEmpty = isEmpty
window.isEqual = isEqual
window.debounce = debounce
window.isArray = isArray
window.store = store

// 解决移动端300毫秒延迟
FastClick.attach(document.body)
let history = syncHistoryWithStore(router, store)
const render = Component =>
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <Router history={history} routes={routes}>
            <Component />
          </Router>
        </Provider>
      </AppContainer>,
    document.getElementById('container')
)

render(App)

// if (module.hot) {
//   module.hot.accept('./App', () => { render(App) })
// }
