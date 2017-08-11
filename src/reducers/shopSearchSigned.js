import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  FETCH_SIGNED_SHOP_LIST
} from 'constants/actionTypes/shop'

export default function shopListReducer (state = {}, action) {
  switch (action.type) {
    case FETCH_SIGNED_SHOP_LIST:
      if (action.status === STATUS_REQUEST) {
        if (action.requestData.offset === 0) {
          return assign({}, state, {list: null})
        }
        return state
      } else if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {list: action.requestData.offset === 0 ? action.payload : state.list.concat(action.payload)})
      }
      return state
  }
  return state
}
