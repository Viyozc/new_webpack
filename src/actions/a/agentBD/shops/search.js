import {
  wrapAction
} from 'utils/fetch'
import {
  AGENTBD_SHOP_GET_SEARCH_LIST
} from 'constants/actionTypes/a/agentBD/shops/search/'

export function fetchShopSearchList (params) {
  return wrapAction({
    type: AGENTBD_SHOP_GET_SEARCH_LIST,
    endpoint: '/leo/1.0/h5/bdagent/shop/searchByName',
    body: params,
    method: 'get'
  })
}

