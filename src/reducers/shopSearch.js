import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_GET_SEARCH_LIST
} from 'constants/actionTypes/shop'

export default function shopListReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_GET_SEARCH_LIST:
      if (action.status === STATUS_REQUEST) {
        if (action.requestData.offset === 0) {
          return assign({}, state, {list: null, role: 'agentSeller'})
        }
        return state
      } else if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {role: action.payload.role, list: action.requestData.offset === 0 ? action.payload.list : state.list.concat(action.payload.list)})
      }
      return state
  }
  return state
}
