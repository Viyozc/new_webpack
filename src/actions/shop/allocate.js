import ActionTypes from 'constants/actionTypes/shop/allocate'

import {
  wrapAction
} from 'utils/fetch'

let fetchIndexList = (params) => {
  return wrapAction({
    type: ActionTypes.SHOP_ALLOCATE_INDEX_GET_LIST,
    endpoint: '/leo/1.0/shop/allocate/gets',
    body: params,
    method: 'GET'
  })
}

let fetchAllotList = (params) => {
  return wrapAction({
    type: ActionTypes.SHOP_ALLOCATE_INDEX_GET_ALLOTLIST,
    endpoint: '/leo/1.0/shop/allocate/bdAgent/gets',
    body: params,
    method: 'GET'
  })
}

let fetchIndexTabOption = (params) => {
  return wrapAction({
    type: ActionTypes.SHOP_ALLOCATE_INDEX_GET_TAB_OPTION,
    endpoint: '/leo/1.0/shop/allocate/getCondition',
    body: params,
    method: 'GET'
  })
}

let fetchChoseList = (params) => {
  return wrapAction({
    type: ActionTypes.SHOP_ALLOCATE_CHOSE_GET_LIST,
    endpoint: '/leo/1.0/shop/allocate/getSellers',
    body: params,
    method: 'GET'
  })
}

let fetchChoseSaveBd = (params) => {
  return wrapAction({
    type: ActionTypes.SHOP_ALLOCATE_CHOSE_GET_SAVE_BD,
    endpoint: '/leo/1.0/shop/allocate/allocate',
    body: params,
    method: 'GET'
  })
}

export {
  fetchAllotList,
  fetchIndexList,
  fetchIndexTabOption,
  fetchChoseList,
  fetchChoseSaveBd
}
