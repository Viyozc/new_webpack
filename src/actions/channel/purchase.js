import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/channel/purchase'

let fetchList = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_PURCHASE_GET_LIST,
    endpoint: '/leo/1.0/agent/channel/purchaseCheckList',
    body: params,
    method: 'GET'
  })
}

let fetchApproval = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_PURCHASE_POST_APPROVAL,
    endpoint: '/leo/1.0/agent/channel/purchaseCheck',
    body: params,
    method: 'POST'
  })
}

let fetchSaveExpress = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_PURCHASE_POST_SAVE_EXPRESS,
    endpoint: '/leo/1.0/agent/channel/addExpressInfo',
    body: params,
    method: 'POST'
  })
}

export {
  fetchList,
  fetchApproval,
  fetchSaveExpress
}
