import {
  wrapAction
} from 'utils/fetch'

import ActionTypes from 'constants/actionTypes/warehouse/out'

let fetchOutList = (params) => {
  return wrapAction({
    type: ActionTypes.OUT_GET_LIST,
    endpoint: '/leo/1.0/stock/outgoing/query',
    body: params,
    method: 'GET'
  })
}
let fetchProcess = (params) => {
  return wrapAction({
    type: ActionTypes.OUT_GET_PROCESS,
    endpoint: '/leo/1.0/stock/outgoing/allocate',
    body: params,
    method: 'GET'
  })
}
let fetchApplyDetail = (params) => {
  return wrapAction({
    type: ActionTypes.OUT_GET_APPLY_DETAIL,
    endpoint: '/leo/1.0/stock/outgoing/applyDetail',
    body: params,
    method: 'GET'
  })
}
let fetchCount = (params) => {
  return wrapAction({
    type: ActionTypes.OUT_GET_COUNT,
    endpoint: '/leo/1.0/stock/outgoing/newCount',
    body: params,
    method: 'GET'
  })
}

export {
    fetchOutList,
    fetchProcess,
    fetchApplyDetail,
    fetchCount
}
