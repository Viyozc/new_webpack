import ActionTypes from 'constants/actionTypes/a/purchase'

import {
  wrapAction
} from 'utils/fetch'

let fetchProducts = (params) => {
  return wrapAction({
    type: ActionTypes.A_PURCHASE_APPLY_GET_PRODUCTS,
    endpoint: '/leo/1.0/h5/agent/boss/purchase/getProducts',
    body: params,
    method: 'GET'
  })
}

let updateCount = (value, index) => {
  return {
    type: ActionTypes.A_PURCHASE_APPLY_TRIGGER_UPDATE_COUNT,
    payload: {value, index}
  }
}

export {
  fetchProducts,
  updateCount
}
