import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import ActionTypes from 'constants/actionTypes/user/mine/shop'

export default function reducer (state = {}, action) {
  switch (action.type) {
    case ActionTypes.FETCH_GET_MY_SHOP_DEVICE_LIST:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          info: action.payload,
          deviceCount: action.payload.deviceCount,
          shopCount: action.payload.shopCount,
          successOrder: action.payload.successOrder,
        })
      }
      return state
    case ActionTypes.CLEAN_GET_MY_SHOP_DEVICE_LIST:
      return {}
    case ActionTypes.FETCH_GET_MY_SHOP_DEVICE_ORDER_LIST:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          orderList: action.payload.data,
          deviceCount: action.payload.deviceCount,
          shopCount: action.payload.shopCount,
          successOrder: action.payload.successOrder,
        })
      }
      return state
    case ActionTypes.FETCH_GET_MY_SHOP_DEVICE_POWERBANK_LIST:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          powerbankList: action.payload
        })
      }
  }
  return state
}
