import {
  wrapAction
} from 'utils/fetch'
import {
  FETCH_DATA_SELLER_SHOPOFFLINELIST
} from 'constants/actionTypes/shop/device/offlineList'

export function fetchDataSellerShopOfflineList (params) {
  return wrapAction({
    type: FETCH_DATA_SELLER_SHOPOFFLINELIST,
    endpoint: '/leo/1.0/h5/data/seller/deviceListOffline',
    body: params,
    method: 'get'
  })
}
