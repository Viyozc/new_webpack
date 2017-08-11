import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_GET_EXAMINE_LIST,
  SHOP_CLEAN_EXAMINE_LIST,
  SHOP_EXAMINE_APPROVAL_SUCCESS
} from 'constants/actionTypes/shop'

export default function shopListReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_EXAMINE_APPROVAL_SUCCESS:
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
    case SHOP_GET_EXAMINE_LIST:
      if (action.status === STATUS_REQUEST) {
        if (action.requestData.offset === 0) {
          return assign({}, state, {examineList: null, count: null})
        }
        return state
      } else if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          examineList: action.requestData.offset === 0 ? action.payload.list : state.examineList.concat(action.payload.list),
          count: action.payload.count
        })
      }
      break
    case SHOP_CLEAN_EXAMINE_LIST:
      return assign({}, state, {examineList: null, count: null})
  }
  return state
}
