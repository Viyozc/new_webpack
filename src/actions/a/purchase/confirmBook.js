import ActionTypes from 'constants/actionTypes/a/purchase'

import {
  wrapAction
} from 'utils/fetch'

let fetchApply = (params) => {
  return wrapAction({
    type: ActionTypes.A_PURCHASE_CONFIRMBOOK_GET_APPLY,
    endpoint: '/leo/1.0/h5/agent/boss/purchase/add',
    body: params,
    method: 'GET'
  })
}

export {
  fetchApply
}
