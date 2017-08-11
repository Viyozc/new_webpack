import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE
} from 'redux-fetch-elegant'
import {
  DEVICE_CLEAN_BIND_INFO,
  DEVICE_CLEAN_BIND_SHOP,
  DEVICE_GET_BIND_INFO,
  DEVICE_BIND_TO_SHOP_INFO,
  DEVICE_HEZI_BIND_TO_SHOP_INFO,
  DEVICE_TURN_ON,
  DEVICE_TURN_OFF,
  DEVICE_TURN_ON_2G,
  DEVICE_TURN_OFF_2G
} from 'constants/actionTypes/device'

export default function deviceBindReducer (state = {}, action) {
  switch (action.type) {
    case DEVICE_CLEAN_BIND_INFO:
      state = {}
      break
    case DEVICE_CLEAN_BIND_SHOP:
      delete state.binded
      break
    case DEVICE_GET_BIND_INFO:
      if (action.status === STATUS_SUCCESS) {
        state = {
          shopName: action.payload.shop.name,
          deviceNo: action.payload.device.deviceNo
        }
      }
      break
    case DEVICE_BIND_TO_SHOP_INFO:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          binded: 'success'
        })
      }
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          binded: 'request'
        })
      }
      if (action.status === STATUS_FAILURE) {
        state = assign({}, state, {
          binded: 'fail'
        })
      }
      break
    case DEVICE_HEZI_BIND_TO_SHOP_INFO:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          heziBinded: 'success'
        })
      }
      if (action.status === STATUS_FAILURE) {
        state = assign({}, state, {
          heziBinded: 'fail'
        })
      }
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          heziBinded: 'request'
        })
      }
      break
    case DEVICE_TURN_ON:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          turn: true
        })
      }
      break
    case DEVICE_TURN_OFF:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          turn: false
        })
      }
      break
    case DEVICE_TURN_ON_2G:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          turn2G: true
        })
      }
      break
    case DEVICE_TURN_OFF_2G:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          turn2G: false
        })
      }
      break
  }

  return state
}
