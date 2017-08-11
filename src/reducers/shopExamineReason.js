import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_EXAMINE_APPROVAL_REFUSE,
  SHOP_GET_EXAMINE_REASONS,
  SHOP_CLEAN_EXAMINE_REASON
} from 'constants/actionTypes/shop'

export default function shopDetailReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_GET_EXAMINE_REASONS:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          reasons: action.payload
        })
      }
      break
    case SHOP_EXAMINE_APPROVAL_REFUSE:
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
    case SHOP_CLEAN_EXAMINE_REASON:
      return {}
  }
  return state
}
