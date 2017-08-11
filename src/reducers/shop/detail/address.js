import {
  SHOP_GET_ADDRESS,
  SHOP_CONFIRM_ADDRESS,
  SHOP_CONFIRM_ADDRESS_RESET
} from 'constants/actionTypes/install/shop'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import assign from 'lodash/assign'

export default function addressReducer (state = null, action) {
  switch (action.type) {
    case SHOP_GET_ADDRESS:
      if (action.status === STATUS_SUCCESS) {
        return {list: [action.payload]}
      }
      break
    case SHOP_CONFIRM_ADDRESS:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {confirmed: true})
      }
      break
    case SHOP_CONFIRM_ADDRESS_RESET:
      return assign({}, state, {confirmed: false})
  }
  return state
}
