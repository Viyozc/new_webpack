import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_GET_BD_INSTALL_DETAIL,
  SHOP_CLEAN_BD_INSTALL_DETAIL
} from 'constants/actionTypes/shop'

export default function shopDetailReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_GET_BD_INSTALL_DETAIL:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          shopInfo: action.payload
        })
      }
      break
    case SHOP_CLEAN_BD_INSTALL_DETAIL:
      return {}
  }
  return state
}
