import {
  wrapAction
} from 'utils/fetch'
import {
  FETCH_DATA_SELLER_SHOPLIST
} from 'constants/actionTypes/shop/device/list'

export function fetchDataSellerShopList (params) {
  return wrapAction({
    type: FETCH_DATA_SELLER_SHOPLIST,
    endpoint: '/leo/1.0/h5/data/seller/shopList',
    body: params,
    method: 'get'
  })
}
