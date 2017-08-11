import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/b'

export function fetchMerchantHome (params) {
  return wrapAction({
    type: ActionTypes.B_HOME_GET,
    endpoint: '/leo/1.0/h5/merchant/home',
    body: params,
    method: 'get'
  })
}

export function fetchMerchantShop (params) {
  return wrapAction({
    type: ActionTypes.B_SHOP_GET,
    endpoint: '/leo/1.0/h5/merchant/shopInfo',
    body: params,
    method: 'get'
  })
}

export function resetShop () {
  return {
    type: ActionTypes.B_SHOP_RESET
  }
}

export function editComment (params) {
  return wrapAction({
    type: ActionTypes.B_SHOP_EDIT_COMMENT,
    endpoint: '/leo/1.0/h5/merchant/editComment',
    body: params,
    method: 'post'
  })
}

export function unbind (params) {
  return wrapAction({
    type: ActionTypes.B_SHOP_UNBIND,
    endpoint: '/leo/1.0/merchant/unBound',
    body: params,
    method: 'get'
  })
}
