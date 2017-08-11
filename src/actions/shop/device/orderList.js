import {
  wrapAction
} from 'utils/fetch'
import {
  FETCH_DATA_SELLER_SHOPORDER
} from 'constants/actionTypes/shop/device/orderList'

export function fetchDataSellerShopOrder (params) {
  return wrapAction({
    type: FETCH_DATA_SELLER_SHOPORDER,
    endpoint: '/leo/1.0/h5/data/seller/shopOrder',
    body: params,
    method: 'get'
  })
}
