import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_GET_REPAIR_LIST,
  SHOP_CLEAN_REPAIR_LIST,
  SHOP_SAVE_REPAIR_RECEIVE
} from 'constants/actionTypes/shop'

export default function shopListReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_SAVE_REPAIR_RECEIVE:
      if (action.status === STATUS_REQUEST) {
        return assign({}, state, {
          fetch: 'request'
        })
      } else if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          fetch: 'success'
        })
      } else {
        return assign({}, state, {
          fetch: 'failure'
        })
      }
    case SHOP_GET_REPAIR_LIST:
      if (action.status === STATUS_REQUEST) {
        if (action.requestData.offset === 0) {
          return assign({}, state, {repairList: null, count: null})
        }
        return state
      } else if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          repairList: action.requestData.offset === 0 ? action.payload.list : state.repairList.concat(action.payload.list),
          count: action.payload.count
        })
      }
      break
    case SHOP_CLEAN_REPAIR_LIST:
      return assign({}, state, {repairList: null, count: null})
  }
  return state
}
