import {
  wrapAction
} from 'utils/fetch'
import {
  SHOP_GET_LIST,
  SHOP_CLEAN_LIST
} from 'constants/actionTypes/a/agentBD/shops/list/'

export function fetchShopGets (params) {
  return wrapAction({
    type: SHOP_GET_LIST,
    endpoint: '/leo/1.0/h5/bdagent/shop/gets',
    body: params,
    method: 'get'
  })
}

export function cleanShopList () {
  return {
    type: SHOP_CLEAN_LIST,
    payload: null
  }
}

