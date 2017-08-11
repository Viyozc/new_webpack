import * as ActionTypes from 'constants/actionTypes/shop/chooseBD'
import {
  wrapAction
} from 'utils/fetch'

export const getSellerList = (params) => {
  return wrapAction({
    type: ActionTypes.SHOP_ALLOCATE_GET_SELLERS,
    endpoint: '/leo/1.0/shop/allocate/getSellers',
    body: params,
    method: 'GET'
  })
}
export const setShopAllocate = (params) => {
  return wrapAction({
    type: ActionTypes.SHOP_ALLOCATE_REPLACE_BD,
    endpoint: '/leo/1.0/shop/allocate/allocate',
    body: params,
    method: 'GET'
  })
}