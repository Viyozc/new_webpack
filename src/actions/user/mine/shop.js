import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/user/mine/shop'

export function fetchMyShopList (params) {
  return wrapAction({
    type: ActionTypes.FETCH_GET_MY_SHOP_LIST,
    endpoint: '/leo/1.0/h5/shop/myShop',
    body: params,
    method: 'get'
  })
}

export function fetchMyShopDeviceList (params) {
  return wrapAction({
    type: ActionTypes.FETCH_GET_MY_SHOP_DEVICE_LIST,
    endpoint: '/leo/1.0/data/directDayStatistics/getShopDeviceInfo',
    body: params,
    method: 'get'
  })
}

export function fetchMyShopDeviceOrderList (params) {
  return wrapAction({
    type: ActionTypes.FETCH_GET_MY_SHOP_DEVICE_ORDER_LIST,
    endpoint: '/leo/1.0/data/directDayStatistics/getOrderByShopId',
    body: params,
    method: 'get'
  })
}
export function cleanMyShopDeviceList () {
  return {
    payload: null,
    type: ActionTypes.CLEAN_GET_MY_SHOP_DEVICE_LIST
  }
}

export function fetchGetPwobankList (params) {
  return wrapAction({
    type: ActionTypes.FETCH_GET_MY_SHOP_DEVICE_POWERBANK_LIST,
    endpoint: '/leo/1.0/h5/data/directDayStatistics/getPowerBankInfo',
    body: params,
    method: 'get'
  })
}
