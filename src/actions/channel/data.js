import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/channel/data'

let fetchTodayNewInstallDeviceList = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_DATA_GET_TODAY_NEW_INSTALL_DEVICE_LIST,
    endpoint: '/leo/1.0/h5/data/seller/deviceListInstalled',
    body: params,
    method: 'GET'
  })
}

let triggerTodayNewInstallDeviceChangeOpenStatus = (index) => {
  return {
    type: ActionTypes.CHANNEL_DATA_TRIGGER_TODAY_NEW_INSTALL_DEVICE_CHANGE_OPEN_STATUS,
    payload: index
  }
}

let fetchTodayOfflineDeviceList = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_DATA_GET_TODAY_OFFLINE_DEVICE_LIST,
    endpoint: '/leo/1.0/h5/data/seller/deviceListOffline',
    body: params,
    method: 'GET'
  })
}

let triggerTodayOfflineDeviceChangeOpenStatus = (index) => {
  return {
    type: ActionTypes.CHANNEL_DATA_TRIGGER_TODAY_OFFLINE_DEVICE_CHANGE_OPEN_STATUS,
    payload: index
  }
}

let fetchTodaySuccessOrderList = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_DATA_GET_TODAY_SUCCESS_ORDER_LIST,
    endpoint: '/leo/1.0/h5/data/seller/deviceListToday',
    body: params,
    method: 'GET'
  })
}

let triggerTodaySuccessOrderChangeOpenStatus = (index) => {
  return {
    type: ActionTypes.CHANNEL_DATA_TRIGGER_TODAY_SUCCESS_ORDER_CHANGE_OPEN_STATUS,
    payload: index
  }
}

let fetchTotalInstallShopList = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_DATA_GET_TOTAL_INSTALL_SHOP_LIST,
    endpoint: '/leo/1.0/h5/data/seller/total/deviceListToday',
    body: params,
    method: 'GET'
  })
}

let triggerTotalInstallShopChangeOpenStatus = (index) => {
  return {
    type: ActionTypes.CHANNEL_DATA_TRIGGER_TOTAL_INSTALL_SHOP_CHANGE_OPEN_STATUS,
    payload: index
  }
}

export {
  fetchTodayNewInstallDeviceList,
  triggerTodayNewInstallDeviceChangeOpenStatus,
  fetchTotalInstallShopList,
  triggerTotalInstallShopChangeOpenStatus,
  fetchTodayOfflineDeviceList,
  triggerTodayOfflineDeviceChangeOpenStatus,
  fetchTodaySuccessOrderList,
  triggerTodaySuccessOrderChangeOpenStatus
}
