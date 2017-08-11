import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_CONTRACT_ADD,
  SHOP_CONTRACT_ADD_DEVICE_NUMBER,
  SHOP_CONTRACT_ADD_DEVICE_WITH_BATTERY_NUMBER,
  SHOP_CONTRACT_ADD_BRAND_NUMBER,
  SHOP_CONTRACT_ADD_BATTERY_NUMBER,
  SHOP_CONTRACT_ADD_INSTALL_DATE,
  SHOP_CONTRACT_ADD_INSTALL_TIME,
  SHOP_CLEAR_SIGN_FORM,
  SHOP_CONTRACT_ADD_ADAPTER_NUMBER,
  SHOP_GET_STANDARD,
  SHOP_CHOSE_STANDARD_OPTION,
  SHOP_GET_SIGN_INFO,
  SHOP_GET_INSTALL_TIME,
  SHOP_GET_CHECK_MERCHANT,
  SHOP_INSTALL_CHANGE_DEVICE_POSITION,
  SHOP_UPDATE_INSTALL_COMMENT,
  SHOP_UPDATE_REAPPLY_COMMENT
} from 'constants/actionTypes/shop'

export default function shopSignReducer (state = {standardInfo: null, devicePosition: [], deviceNum: 0, deviceWithBatteryNum: 0, brandNum: 0, batteryNum: 0, adapterNum: 0, installDate: null, installTime: '06:00-08:00'}, action) {
  let devicePosition
  let totalBrand
  switch (action.type) {
    case SHOP_GET_SIGN_INFO:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, action.payload)
        state.installDate = state.installStartTime.split(' ')[0]
        state.installTime = state.installStartTime.split(' ')[1] + '-' + state.installEndTime.split(' ')[1]
      }
      break
    case SHOP_GET_STANDARD:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          standardInfo: action.payload.price,
          priceType: action.payload.price && action.payload.price[0].value
        })
      }
      break
    case SHOP_GET_CHECK_MERCHANT:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          canSign: true
        })
      }
      break
    case SHOP_GET_INSTALL_TIME:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          installDateList: action.payload.list
        })
      }
      break
    case SHOP_CONTRACT_ADD:
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
    case SHOP_INSTALL_CHANGE_DEVICE_POSITION:
      let updateDevicePosition = state.devicePosition[action.payload.index]
      updateDevicePosition.position = action.payload.position
      state = assign({}, state, {
        devicePosition: []
        .concat(state.devicePosition.slice(0, action.payload.index))
        .concat(updateDevicePosition)
        .concat(state.devicePosition.slice(action.payload.index + 1, state.devicePosition.length))
      })
      break
    case SHOP_CONTRACT_ADD_DEVICE_WITH_BATTERY_NUMBER:
      let deviceWithBatteryNum = 0
      if (action.payload && action.payload !== '0') {
        deviceWithBatteryNum = action.payload.replace(/\b(0+)/gi, '')
      }
      devicePosition = [].concat(state.devicePosition)
      if (parseInt(deviceWithBatteryNum) + parseInt(state.deviceNum) > state.devicePosition.length) {
        for (let i = 0; i < (parseInt(deviceWithBatteryNum) + parseInt(state.deviceNum) - state.devicePosition.length); i++) {
          devicePosition.push({device: devicePosition.length + 1, position: ''})
        }
      }
      if (parseInt(deviceWithBatteryNum) + parseInt(state.deviceNum) < state.devicePosition.length) {
        for (let i = 0; i < (state.devicePosition.length - parseInt(deviceWithBatteryNum) - parseInt(state.deviceNum)); i++) {
          devicePosition.pop()
        }
      }
      totalBrand = parseInt(deviceWithBatteryNum) + parseInt(state.deviceNum)
      if (!state.booBrand) {
        state.brandNum = totalBrand
      }
      if (!state.booAdapter) {
        state.adapterNum = totalBrand
      }
      state = assign({}, state, {
        devicePosition: devicePosition,
        deviceWithBatteryNum: deviceWithBatteryNum
      })
      break
    case SHOP_CONTRACT_ADD_DEVICE_NUMBER:
      let deviceNum = 0
      if (action.payload && action.payload !== '0') {
        deviceNum = action.payload.replace(/\b(0+)/gi, '')
      }
      devicePosition = [].concat(state.devicePosition)
      if (parseInt(deviceNum) + parseInt(state.deviceWithBatteryNum) > state.devicePosition.length) {
        for (let i = 0; i < (parseInt(deviceNum) + parseInt(state.deviceWithBatteryNum) - state.devicePosition.length); i++) {
          devicePosition.push({device: devicePosition.length + 1, position: ''})
        }
      }
      if (parseInt(deviceNum) < state.devicePosition.length) {
        for (let i = 0; i < (state.devicePosition.length - parseInt(deviceNum) - parseInt(state.deviceWithBatteryNum)); i++) {
          devicePosition.pop()
        }
      }
      totalBrand = parseInt(deviceNum) + parseInt(state.deviceWithBatteryNum)
      if (!state.booBrand) {
        state.brandNum = totalBrand
      }
      if (!state.booAdapter) {
        state.adapterNum = totalBrand
      }
      state = assign({}, state, {
        devicePosition: devicePosition,
        deviceNum: deviceNum
      })
      break
    case SHOP_CONTRACT_ADD_BRAND_NUMBER:
      let brandNum = 0
      if (action.payload && action.payload !== '0') {
        brandNum = action.payload.replace(/\b(0+)/gi, '')
      }
      state = assign({}, state, {
        booBrand: true,
        brandNum: brandNum
      })
      break
    case SHOP_CONTRACT_ADD_BATTERY_NUMBER:
      let batteryNum = 0
      if (action.payload && action.payload !== '0') {
        batteryNum = action.payload.replace(/\b(0+)/gi, '')
      }
      state = assign({}, state, {
        booBattery: true,
        batteryNum: batteryNum
      })
      break
    case SHOP_CONTRACT_ADD_ADAPTER_NUMBER:
      let adapterNum = 0
      if (action.payload && action.payload !== '0') {
        adapterNum = action.payload.replace(/\b(0+)/gi, '')
      }
      state = assign({}, state, {
        booAdapter: true,
        adapterNum: adapterNum
      })
      break
    case SHOP_CONTRACT_ADD_INSTALL_DATE:
      state = assign({}, state, {
        installDate: action.payload
      })
      break
    case SHOP_CONTRACT_ADD_INSTALL_TIME:
      state = assign({}, state, {
        installTime: action.payload
      })
      break
    case SHOP_UPDATE_INSTALL_COMMENT:
      state = assign({}, state, {
        comment: action.payload
      })
      break
    case SHOP_UPDATE_REAPPLY_COMMENT:
      state = assign({}, state, {
        reapplyComment: action.payload
      })
      break
    case SHOP_CLEAR_SIGN_FORM:
      state = {booBrand: false, booAdapter: false, booBattery: false, canSign: null, devicePosition: [], deviceNum: 0, brandNum: 0, deviceWithBatteryNum: 0, batteryNum: 0, adapterNum: 0, installDate: null, installTime: '06:00-08:00'}
      break
    case SHOP_CHOSE_STANDARD_OPTION:
      state = assign({}, state, {
        priceType: action.payload
      })
      break
  }
  return state
}
