import {
  wrapAction
} from 'utils/fetch'
import {
  FETCH_DATA_SELLER_SHOP_DEVICE_TOTALLIST
} from 'constants/actionTypes/shop/device/totalList'

export function fetchDataSellerAllDevice (params) {
  return wrapAction({
    type: FETCH_DATA_SELLER_SHOP_DEVICE_TOTALLIST,
    endpoint: '/leo/1.0/h5/data/seller/deviceListInstalled',
    body: params,
    method: 'get'
  })
}
