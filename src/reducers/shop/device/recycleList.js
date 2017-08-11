import assign from 'lodash/assign'
import {
  FETCH_DATA_SELLER_SHOP_DEVICE_RECYCLELIST
} from 'constants/actionTypes/shop/device/recycleList'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function reducer (state = {}, action) {
  switch (action.type) {
    case FETCH_DATA_SELLER_SHOP_DEVICE_RECYCLELIST:
      if (action.status === STATUS_REQUEST && action.requestData.offset === 0) {
        state.list = null
        state.shopCount = null
        state.recycleDeviceCount = null
        return assign({}, state)
      }
      if (action.status === STATUS_SUCCESS) {
        state.list = action.requestData.offset === 0 ? action.payload.list : state.list.concat(action.payload.list)
        state.shopCount = action.payload.shopCount
        state.recycleDeviceCount = action.payload.recycleDeviceCount
        return assign({}, state)
      }
  }
  return state
}
