import assign from 'lodash/assign'
import {
  FETCH_DATA_SELLER_SHOPDEVICE,
  FETCH_DATA_SELLER_SHOPORDERLIST,
} from 'constants/actionTypes/shop'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function fetchDataSellerShopOrderListReducer (state = {}, action) {
  switch (action.type) {
    case FETCH_DATA_SELLER_SHOPDEVICE:
      if (action.status === STATUS_REQUEST && action.requestData.offset === 0) {
        state.shopList = null
        state.deviceCount = null
        state.shopCount = null
        state.successOrder = null
        return assign({}, state)
      }
      if (action.status === STATUS_SUCCESS) {
        state.shopList = action.requestData.offset === 0 ? action.payload.data : state.shopList.concat(action.payload.data)
        state.deviceCount = action.payload.deviceCount
        state.shopCount = action.payload.shopCount
        state.successOrder = action.payload.successOrder
        return assign({}, state)
      }
      break
    case FETCH_DATA_SELLER_SHOPORDERLIST:
      if (action.status === STATUS_REQUEST && action.requestData.offset === 0) {
        state.orderList = null
        return assign({}, state)
      }
      if (action.status === STATUS_SUCCESS) {
        state.orderList = action.requestData.offset === 0 ? action.payload.data : state.orderList.concat(action.payload.data)
        state.deviceCount = action.payload.deviceCount
        state.shopCount = action.payload.shopCount
        state.successOrder = action.payload.successOrder
        return assign({}, state)
      }
      break
  }
  return state
}
