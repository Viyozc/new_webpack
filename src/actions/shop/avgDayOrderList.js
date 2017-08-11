import {
  wrapAction
} from 'utils/fetch'
import {
  FETCH_DATA_SELLER_SHOP_AVGDAYORDERLIST
} from 'constants/actionTypes/shop/avgDayOrderList'

export function fetchDataSellerShopAvgDayOrderList (params) {
  return wrapAction({
    type: FETCH_DATA_SELLER_SHOP_AVGDAYORDERLIST,
    endpoint: '/leo/1.0/data/averageDayOrder/getAverageDayOrderList',
    body: params,
    method: 'get'
  })
}
