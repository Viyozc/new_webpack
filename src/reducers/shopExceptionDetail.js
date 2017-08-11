import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_GET_EXCEPTION_DETAIL,
  SHOP_RESET_EXCEPTION_INFO
} from 'constants/actionTypes/shop'

export default function shopDetailReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_GET_EXCEPTION_DETAIL:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          shopInfo: action.payload
        })
      }
      break
    case SHOP_RESET_EXCEPTION_INFO:
      return {}
  }
  return state
}
