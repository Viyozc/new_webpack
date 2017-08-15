import { compose, createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'
import ReduxLogger from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import reducer from 'reducers/'
import fetchMiddleware, { dispatchError, url } from 'react-sync-fetch'
const history = createHistory()
const middleware = routerMiddleware(history)

export default function configureStore () {
  url((api, requestData) => {
    return api
  })
  dispatchError((error = { code: -1, message: '未知错误' }) => {
    return false
  })
  let middlewares = [
    ReduxThunk,
    fetchMiddleware,
    ReduxLogger,
    middleware
  ]
  // if (DEBUG) {
  //   composeArray.push(applyMiddleware(ReduxLogger))
  // }

  let store = compose(applyMiddleware(...middlewares))(createStore)(reducer)

  return store
}
