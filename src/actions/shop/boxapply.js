import ActionTypes from 'constants/actionTypes/shop/boxapply'

import {
  wrapAction
} from 'utils/fetch'

let fetchMaxApplyBox = (params) => {
  return wrapAction({
    type: ActionTypes.SHOP_BOXAPPLY_INDEX_GET_MAXNUM,
    endpoint: '/leo/1.0/contract/getMaxApplyBoxNum',
    body: params,
    method: 'GET'
  })
}

let fetchShopGetById = (params) => {
  return wrapAction({
    type: ActionTypes.SHOP_BOXAPPLY_INDEX_GET_APPLYINFO,
    endpoint: '/leo/1.0/h5/shop/get',
    body: params,
    method: 'GET'
  })
}

let fetchBaseInfo = () => {
  return wrapAction({
    type: ActionTypes.SHOP_BOXAPPLY_INDEX_GET_LOGININFO,
    endpoint: '/leo/1.0/h5/user/home/baseInfo',
    body: {},
    method: 'GET'
  })
}

let fetchSubmitBox = (params) => {
  return wrapAction({
    type: ActionTypes.SHOP_BOXAPPLY_INDEX_GET_SUBMITBOX,
    endpoint: '/leo/1.0/contract/applyZJStoDelivery',
    body: params,
    method: 'GET'
  })
}

export {
  fetchBaseInfo,
  fetchMaxApplyBox,
  fetchShopGetById,
  fetchSubmitBox
}
