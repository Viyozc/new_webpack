import assign from 'lodash/assign'
import {
  FETCH_DATA_SELLER_SHOPREFUNDORDERLIST
} from 'constants/actionTypes/shop/device/refundOrderList'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function fetchDataSellerShopRefundOrderListReducer (state = {}, action) {
  switch (action.type) {
    case FETCH_DATA_SELLER_SHOPREFUNDORDERLIST:
      if (action.status === STATUS_REQUEST && action.requestData.offset === 0) {
        state.list = null
        return assign({}, state)
      }
      if (action.status === STATUS_SUCCESS) {
        state.list = action.requestData.offset === 0 ? action.payload : state.list.concat(action.payload)
        return assign({}, state)
      }
  }
  return state
}
