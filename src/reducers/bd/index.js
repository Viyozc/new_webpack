import assign from 'object-assign'
import ActionTypes from 'constants/actionTypes/bd/'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

function IndexPage (state = null, action) {
  switch (action.type) {
    case ActionTypes.BD_GET_HOME_DATA:
      switch (action.status) {
        case STATUS_SUCCESS:
          action.payload.role && window.localStorage.setItem('identity', action.payload.role)
          return assign({}, state, {homeData: action.payload})
      }
      return state
    case ActionTypes.BD_GET_HOME_BOX_DATA:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {homeBoxData: {}})
        case STATUS_SUCCESS:
          return assign({}, state, {homeBoxData: action.payload || {}})
      }
      return state
    case ActionTypes.BD_GET_MONTH_DATA:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {monthData: action.payload})
      }
      return state
  }
  return state
}

export default {
  IndexPage
}
