import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_EXAMINE_APPROVAL_SUCCESS,
  SHOP_GET_EXAMINE_DETAIL,
  SHOP_RESET_EXAMINE_INFO
} from 'constants/actionTypes/shop'

export default function shopDetailReducer (state = {}, action) {
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
    case SHOP_GET_EXAMINE_DETAIL:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          shopInfo: action.payload
        })
      }
      break
    case SHOP_RESET_EXAMINE_INFO:
      return {}
  }
  return state
}
