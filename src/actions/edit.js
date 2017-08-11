import ActionTypes from 'constants/actionTypes/edit'

import {
  wrapAction
} from 'utils/fetch'

let fetchShopIniIndex = (params) => {
  return wrapAction({
    type: ActionTypes.SHOP_EDIT_INDEX_GET_EDIT,
    endpoint: '/leo/1.0/h5/shop/initEdit',
    body: params,
    method: 'get'
  })
}
let editContactName = (params) => {
  return {
    type: ActionTypes.SHOP_EDIT_INDEX_GET_CHANGENAME,
    payload: params
  }
}

let editContactMobile = (params) => {
  return {
    type: ActionTypes.SHOP_EDIT_INDEX_GET_CHANGEMOBILE,
    payload: params
  }
}

export {
  editContactName,
  editContactMobile,
  fetchShopIniIndex
}
