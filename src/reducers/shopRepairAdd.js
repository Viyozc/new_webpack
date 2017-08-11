import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_CONTRACT_REPAIR_ADD,
  SHOP_CONTRACT_REPAIR_ADD_DEVICE_NUMBER,
  SHOP_CONTRACT_REPAIR_ADD_DEVICE_WITH_BATTERY_NUMBER,
  SHOP_CONTRACT_REPAIR_ADD_BATTERY_NUMBER,
  SHOP_CONTRACT_REPAIR_ADD_ADAPTER_NUMBER,
  SHOP_CONTRACT_REPAIR_ADD_BRAND_NUMBER,
  SHOP_CLEAR_REPAIR_ADD_FORM,
  SHOP_GET_REPAIR_MAX_COUNT
} from 'constants/actionTypes/shop'

export default function shopSignReducer (state = {deviceNum: 0, deviceWithBatteryNum: 0, brandNum: 0, batteryNum: 0, adapterNum: 0}, action) {
  switch (action.type) {
    case SHOP_GET_REPAIR_MAX_COUNT:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          max: action.payload.maxReplace
        })
      }
      break
    case SHOP_CONTRACT_REPAIR_ADD:
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          fetch: 'request'
        })
      } else if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          fetch: 'success'
        })
      } else {
        state = assign({}, state, {
          fetch: 'failure'
        })
      }
      break
    case SHOP_CONTRACT_REPAIR_ADD_DEVICE_NUMBER:
      let deviceNum = 0
      if (action.payload && action.payload !== '0') {
        deviceNum = action.payload.replace(/\b(0+)/gi, '')
      }
      state = assign({}, state, {
        deviceNum: deviceNum
      })
      break
    case SHOP_CONTRACT_REPAIR_ADD_DEVICE_WITH_BATTERY_NUMBER:
      let deviceWithBatteryNum = 0
      if (action.payload && action.payload !== '0') {
        deviceWithBatteryNum = action.payload.replace(/\b(0+)/gi, '')
      }
      state = assign({}, state, {
        deviceWithBatteryNum: deviceWithBatteryNum
      })
      break
    case SHOP_CONTRACT_REPAIR_ADD_BRAND_NUMBER:
      let brandNum = 0
      if (action.payload && action.payload !== '0') {
        brandNum = action.payload.replace(/\b(0+)/gi, '')
      }
      state = assign({}, state, {
        brandNum: brandNum
      })
      break
    case SHOP_CONTRACT_REPAIR_ADD_BATTERY_NUMBER:
      let batteryNum = 0
      if (action.payload && action.payload !== '0') {
        batteryNum = action.payload.replace(/\b(0+)/gi, '')
      }
      state = assign({}, state, {
        batteryNum: batteryNum
      })
      break
    case SHOP_CONTRACT_REPAIR_ADD_ADAPTER_NUMBER:
      let adapterNum = 0
      if (action.payload && action.payload !== '0') {
        adapterNum = action.payload.replace(/\b(0+)/gi, '')
      }
      state = assign({}, state, {
        adapterNum: adapterNum
      })
      break
    case SHOP_CLEAR_REPAIR_ADD_FORM:
      state = {deviceNum: 0, deviceWithBatteryNum: 0, brandNum: 0, batteryNum: 0, adapterNum: 0}
      break
  }
  return state
}
