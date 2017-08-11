import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_GET_EXCEPTION_LIST,
  SHOP_CLEAN_EXCEPTION_LIST
} from 'constants/actionTypes/shop'

export default function shopExceptionListReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_GET_EXCEPTION_LIST:
      if (action.status === STATUS_REQUEST) {
        if (action.requestData.offset === 0) {
          return assign({}, state, {exceptionList: null, count: null})
        }
        return state
      } else if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          exceptionList: action.requestData.offset === 0 ? action.payload.list : state.exceptionList.concat(action.payload.list),
          count: action.payload.count
        })
      }
      break
    case SHOP_CLEAN_EXCEPTION_LIST:
      return assign({}, state, {exceptionList: null, count: null})
  }
  return state
}
