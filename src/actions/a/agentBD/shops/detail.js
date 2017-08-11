import {
  wrapAction
} from 'utils/fetch'
import {
  AGENTBD_SHOP_GET_DETAIL,
  AGENTBD_SHOP_CLEAN_DETAIL
} from 'constants/actionTypes/a/agentBD/shops/detail/'

export function fetchShopGetById (params) {
  return wrapAction({
    type: AGENTBD_SHOP_GET_DETAIL,
    endpoint: '/leo/1.0/h5/bdagent/shop/get',
    body: params,
    method: 'get'
  })
}

export function cleanShopDetail () {
  return {
    type: AGENTBD_SHOP_CLEAN_DETAIL,
    payload: null
  }
}

