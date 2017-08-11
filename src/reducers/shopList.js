import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_GET_LIST,
  SHOP_GET_COUNTS,
  SHOP_CLEAN_LIST
} from 'constants/actionTypes/shop'
import {
  SHOP_INSTALL_GET_LIST
} from 'constants/actionTypes/install/shop'

export default function shopListReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_GET_LIST:
      if (action.status === STATUS_REQUEST) {
        if (action.requestData.offset === 0) {
          return assign({}, state, {bdList: null, role: ''})
        }
        return state
      } else if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {role: action.payload.role, bdList: action.requestData.offset === 0 ? (action.payload.list || []) : state.bdList.concat(action.payload.list || [])})
      }
      break
    case SHOP_INSTALL_GET_LIST:
      if (action.status === STATUS_REQUEST) {
        if (action.requestData.offset === 0) {
          return assign({}, state, {list: null})
        }
        return state
      } else if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          list: action.requestData.offset === 0 ? action.payload.list : state.list.concat(action.payload.list),
          count: action.payload.count
        })
      }
      break
    case SHOP_GET_COUNTS:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          bdTabsCount: action.payload
        })
      }
      break
    case SHOP_CLEAN_LIST:
      return assign({}, state, {bdList: null, bdTabsCount: null})
  }
  return state
}
