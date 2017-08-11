import ActionTypes from 'constants/actionTypes/a/purchase'

import {
  wrapAction
} from 'utils/fetch'

let fetchList = (params) => {
  return wrapAction({
    type: ActionTypes.A_PURCHASE_GET_LIST,
    endpoint: '/leo/1.0/h5/agent/boss/purchase/list',
    body: params,
    method: 'GET'
  })
}

export {
  fetchList
}
