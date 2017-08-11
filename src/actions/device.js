import {
  wrapAction
} from 'utils/fetch'

import {
  DEVICE_GET_LIST,
  DEVICE_GET_BIND_INFO,
  DEVICE_BIND_TO_SHOP_INFO,
  DEVICE_HEZI_BIND_TO_SHOP_INFO,
  DEVICE_TURN_OFF,
  DEVICE_TURN_ON,
  DEVICE_TURN_ON_2G,
  DEVICE_TURN_OFF_2G,
  DEVICE_CLEAN_BIND_INFO,
  DEVICE_CLEAN_BIND_SHOP,
  DEVICE_GET
} from 'constants/actionTypes/device'

export function getList (id, offset, pageSize) {
  return wrapAction({
    type: DEVICE_GET_LIST,
    endpoint: '/leo/1.0/h5/shop/getDevices',
    body: {
      id,
      offset,
      pageSize
    },
    method: 'get'
  })
}

export function getBindInfo (deviceNo, shopId) {
  return wrapAction({
    type: DEVICE_GET_BIND_INFO,
    endpoint: '/leo/1.0/h5/device/initBindShop',
    body: {
      deviceNo,
      shopId
    },
    method: 'get'
  })
}

export function bindToShop (params) {
  return wrapAction({
    type: DEVICE_BIND_TO_SHOP_INFO,
    endpoint: '/leo/2.0/h5/device/bindShop',
    body: params,
    method: 'get'
  })
}

export function heziBindToShop (params) {
  return wrapAction({
    type: DEVICE_HEZI_BIND_TO_SHOP_INFO,
    endpoint: '/leo/2.0/box/hezi/bindShopWithBox',
    body: params,
    method: 'get'
  })
}

export function turnOn (params) {
  return wrapAction({
    type: DEVICE_TURN_ON,
    endpoint: '/leo/1.0/h5/device/turnTest',
    body: params,
    method: 'get'
  })
}

export function turnOff (params) {
  return wrapAction({
    type: DEVICE_TURN_OFF,
    endpoint: '/leo/1.0/h5/device/turnTest',
    body: params,
    method: 'get'
  })
}

export function turnOn2G (params) {
  return wrapAction({
    type: DEVICE_TURN_ON_2G,
    endpoint: '/leo/1.0/h5/device/turnTestFor2G',
    body: params,
    method: 'get'
  })
}

export function turnOff2G (params) {
  return wrapAction({
    type: DEVICE_TURN_OFF_2G,
    endpoint: '/leo/1.0/h5/device/turnTestFor2G',
    body: params,
    method: 'get'
  })
}

export function getDevice (deviceNo, shopId) {
  return wrapAction({
    type: DEVICE_GET,
    endpoint: '/leo/1.0/device/getDeviceStatus',
    body: {
      deviceNo, shopId
    },
    method: 'get'
  })
}

export function cleanBindInfo () {
  return {
    type: DEVICE_CLEAN_BIND_INFO
  }
}

export function cleanBindShop () {
  return {
    type: DEVICE_CLEAN_BIND_SHOP
  }
}
