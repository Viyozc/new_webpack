import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_GET_EXCEPTION_REASONS,
  SHOP_EXCEPTION_APPROVAL_PROCESS,
  SHOP_CLEAN_EXCEPTION_REASON
} from 'constants/actionTypes/shop'

export default function shopDetailReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_GET_EXCEPTION_REASONS:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          reasons: action.payload && action.payload.map((item, i) => {
            return {value: item.id, key: item.value}
          })
        })
      }
      break
    case SHOP_EXCEPTION_APPROVAL_PROCESS:
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
    case SHOP_CLEAN_EXCEPTION_REASON:
      return {}
  }
  return state
}
