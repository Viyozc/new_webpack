import {
  wrapAction
} from 'utils/fetch'
import {
  DC_GET_DATA,
  DC_GET_CITY_LIST,
  DC_GET_SHOP_LIST,
  DC_GET_ORDER_LIST,
  DC_GET_USER_LIST,
  DC_GET_DEVICE_LIST,
  DC_GET_DEVICE_USE_RATE_LIST,
  DC_CLEAN_LIST
} from 'constants/actionTypes/dc'

export function fetchData (params) {
  return wrapAction({
    type: DC_GET_DATA,
    endpoint: '/leo/1.0/data/total',
    body: params,
    method: 'get'
  })
}

export function fetchCity (params) {
  return wrapAction({
    type: DC_GET_CITY_LIST,
    endpoint: '/leo/1.0/data/assist/cityList',
    body: params,
    method: 'get'
  })
}

export function fetchDcShopList (params) {
  return wrapAction({
    type: DC_GET_SHOP_LIST,
    endpoint: '/leo/1.0/data/shop/detail',
    body: params,
    method: 'get'
  })
}

export function fetchDcOrderList (params) {
  return wrapAction({
    type: DC_GET_ORDER_LIST,
    endpoint: '/leo/1.0/data/order/detail',
    body: params,
    method: 'get'
  })
}

export function fetchDcUserList (params) {
  return wrapAction({
    type: DC_GET_USER_LIST,
    endpoint: '/leo/1.0/data/user/detail',
    body: params,
    method: 'get'
  })
}

export function fetchDcDeviceUseRateList (params) {
  return wrapAction({
    type: DC_GET_DEVICE_USE_RATE_LIST,
    endpoint: '/leo/1.0/data/usage/detail',
    body: params,
    method: 'get'
  })
}

export function fetchDcDeviceList (params) {
  return wrapAction({
    type: DC_GET_DEVICE_LIST,
    endpoint: '/leo/1.0/data/shop/detail',
    body: params,
    method: 'get'
  })
}

export function cleanList () {
  return {
    type: DC_CLEAN_LIST
  }
}
