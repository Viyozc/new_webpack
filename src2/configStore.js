import Redux, { compose, createStore, applyMiddleware } from 'redux'
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
    api += `?t=${+new Date()}`
    return api
  })
  dispatchError((error = { code: -1, message: '未知错误' }) => {
    return false
  })
  let composeArray = [
    applyMiddleware(ReduxThunk),
    applyMiddleware(middleware),
    applyMiddleware(fetchMiddleware)
  ]
  if (DEBUG) {
    composeArray.push(applyMiddleware(ReduxLogger))
  }

  let store = compose.apply(Redux, composeArray)(createStore)(reducer)

  return store
}
