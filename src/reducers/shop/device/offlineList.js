import assign from 'lodash/assign'
import {
  FETCH_DATA_SELLER_SHOPOFFLINELIST
} from 'constants/actionTypes/shop/device/offlineList'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function fetchDataSellerShopOfflineListReducer (state = {}, action) {
  switch (action.type) {
    case FETCH_DATA_SELLER_SHOPOFFLINELIST:
      if (action.status === STATUS_REQUEST && action.requestData.offset === 0) {
        state.list = null
        state.deviceCount = null
        state.shopCount = null
        state.successOrder = null
        return assign({}, state)
      }
      if (action.status === STATUS_SUCCESS) {
        state.list = action.requestData.offset === 0 ? action.payload.list : state.list.concat(action.payload.list)
        state.deviceCount = action.payload.deviceCount
        state.shopCount = action.payload.shopCount
        state.successOrder = action.payload.successOrder
        return assign({}, state)
      }
  }
  return state
}
