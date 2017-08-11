import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  AGENTBD_SHOP_GET_DETAIL,
  AGENTBD_SHOP_CLEAN_DETAIL
} from 'constants/actionTypes/a/agentBD/shops/detail/'
export default function shopDetailReducer (state = {}, action) {
  switch (action.type) {
    case AGENTBD_SHOP_GET_DETAIL:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          shopInfo: action.payload
        })
      }
      break
    case AGENTBD_SHOP_CLEAN_DETAIL:
      return {}
  }
  return state
}
