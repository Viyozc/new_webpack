import {
  wrapAction
} from 'utils/fetch'
import {
  FETCH_DATA_SELLER_SHOP_DEVICE_RECYCLELIST
} from 'constants/actionTypes/shop/device/recycleList'

export function fetchDataSellerShopDeviceRecycleList (params) {
  return wrapAction({
    type: FETCH_DATA_SELLER_SHOP_DEVICE_RECYCLELIST,
    endpoint: '/leo/1.0/data/averageDayOrder/getRecycleList',
    body: params,
    method: 'get'
  })
}
