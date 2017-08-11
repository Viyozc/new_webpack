import {
  wrapAction
} from 'utils/fetch'
import {
  SHOP_INSTALL_GET_LIST,
  SHOP_INSTALL_GET,
  SHOP_ADD_RECEIPT,
  SHOP_INSTALL_APPLY,
  SHOP_INSTALL_ALLOCATE,
  SHOP_RESET_INFO,
  SHOP_GET_ADDRESS,
  SHOP_CONFIRM_ADDRESS,
  SHOP_CONFIRM_ADDRESS_RESET
} from 'constants/actionTypes/install/shop'

export function getList (status, offset, pageSize, shopName) {
  return wrapAction({
    type: SHOP_INSTALL_GET_LIST,
    endpoint: '/leo/1.0/h5/install/gets',
    body: {
      status,
      offset,
      pageSize,
      shopName
    },
    method: 'get'
  })
}

export function fetchShopGet (params) {
  return wrapAction({
    type: SHOP_INSTALL_GET,
    endpoint: '/leo/1.0/h5/install/installDetail',
    body: params,
    method: 'get'
  })
}

export function apply (installNo) {
  return wrapAction({
    type: SHOP_INSTALL_APPLY,
    endpoint: '/leo/1.0/h5/install/apply',
    body: {installNo},
    method: 'get'
  })
}

export function allocate (installNo) {
  return wrapAction({
    type: SHOP_INSTALL_ALLOCATE,
    endpoint: '/leo/1.0/h5/install/allocateConfirm',
    body: {installNo},
    method: 'get'
  })
}

export function addReceipt (installNo, receipt) {
  return wrapAction({
    type: SHOP_ADD_RECEIPT,
    endpoint: '/leo/1.0/h5/install/addReceipt',
    body: {installNo, receipt},
    method: 'get'
  })
}

export function getAdress (poiLatitude, poiLongitude) {
  return wrapAction({
    type: SHOP_GET_ADDRESS,
    endpoint: '/leo/1.0/h5/device/getAddress',
    body: {poiLatitude, poiLongitude},
    method: 'get'
  })
}

export function confirmPoi (poiLatitude, poiLongitude, shopId) {
  return wrapAction({
    type: SHOP_CONFIRM_ADDRESS,
    endpoint: '/leo/1.0/h5/device/confirmAddress',
    body: {poiLatitude, poiLongitude, shopId},
    method: 'get'
  })
}

export function resetShopConfirm () {
  return {
    type: SHOP_CONFIRM_ADDRESS_RESET
  }
}

export function resetShopInfo () {
  return {
    type: SHOP_RESET_INFO
  }
}
