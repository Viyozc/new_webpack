import assign from 'lodash/assign'
import {
  FETCH_DATA_SELLER_SHOP_AVGDAYORDERLIST
} from 'constants/actionTypes/shop/avgDayOrderList'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function reducer (state = {}, action) {
  switch (action.type) {
    case FETCH_DATA_SELLER_SHOP_AVGDAYORDERLIST:
      if (action.status === STATUS_REQUEST) {
        state.list = null
        state.averageDay = null
        return assign({}, state)
      }
      if (action.status === STATUS_SUCCESS) {
        state.list = action.payload.data
        state.averageDay = action.payload.averageDay
        return assign({}, state)
      }
  }
  return state
}
