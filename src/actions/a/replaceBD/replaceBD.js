import * as ActionTypes from 'constants/actionTypes/a/replaceBD'
import {
  wrapAction
} from 'utils/fetch'

export const getChangeShopList = (params) => {
  return wrapAction({
    type: ActionTypes.REPLACE_BD_GET_CHANGE_SHOP_LIST,
    endpoint: '/leo/1.0/shop/allocate/getChangeShopList',
    body: params,
    method: 'GET'
  })
}

export const getConditionByAgent = (params) => {
  return wrapAction({
    type: ActionTypes.REPLACE_BD_GET_CONDITION_BY_AGENT,
    endpoint: '/leo/1.0/shop/allocate/getConditionByAgent',
    body: params,
    method: 'GET'
  })
}

export const getChoseList = (params) => {
  return wrapAction({
    type: ActionTypes.REPLACE_BD_SHOP_ALLOCATE,
    endpoint: '/leo/1.0/shop/allocate/getSellers',
    body: params,
    method: 'GET'
  })
}

export const setShopAllocate = (params) => {
  return wrapAction({
    type: ActionTypes.REPLACE_BD_REPLACE_BD,
    endpoint: '/leo/1.0/shop/allocate/allocate',
    body: params,
    method: 'GET'
  })
}