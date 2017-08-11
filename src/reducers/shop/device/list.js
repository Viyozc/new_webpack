import assign from 'lodash/assign'
import {
  FETCH_DATA_SELLER_SHOPLIST,
  FETCH_DATA_SELLER_UNABLEINSTALL
} from 'constants/actionTypes/shop/device/list'
import {
  STATUS_FAILURE,
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function fetchDataSellerShopListReducer (state = {}, action) {
  switch (action.type) {
    case FETCH_DATA_SELLER_SHOPLIST:
      if (action.status === STATUS_REQUEST && action.requestData.offset === 0) {
        state.list = null
        // state.deviceCount = null
        // state.shopCount = null
        // state.successOrder = null
        return assign({}, state)
      }
      if (action.status === STATUS_SUCCESS) {
        state.list = action.requestData.offset === 0 ? action.payload : state.list.concat(action.payload)
        // state.deviceCount = action.payload.deviceCount
        // state.shopCount = action.payload.shopCount
        // state.successOrder = action.payload.successOrder
        return assign({}, state)
      }
      return state
    case FETCH_DATA_SELLER_UNABLEINSTALL:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetchRequest: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetchRequest: 'success', fetchType: action.type})
        case STATUS_FAILURE:
          return assign({}, state, {fetchRequest: 'failure'})
      }
      return state
  }
  return state
}
