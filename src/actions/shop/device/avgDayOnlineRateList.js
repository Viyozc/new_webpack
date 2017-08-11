import {
  wrapAction
} from 'utils/fetch'
import {
  FETCH_DATA_SELLER_SHOP_DEVICE_AVGDAYONLINERATELIST
} from 'constants/actionTypes/shop/device/avgDayOnlineRateList'

export function fetchDataSellerShopDeviceAvgDayOnlineRateList (params) {
  return wrapAction({
    type: FETCH_DATA_SELLER_SHOP_DEVICE_AVGDAYONLINERATELIST,
    endpoint: '/leo/1.0/data/averageDayOrder/getAverageDayDeviceOnlineList',
    body: params,
    method: 'get'
  })
}
