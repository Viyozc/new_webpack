import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/warehouse'

export function fetchDemoCount () {
  return wrapAction({
    type: ActionTypes.REPAIR_GET_COUNT,
    endpoint: '/leo/1.0/stock/spareApply/count',
    body: {},
    method: 'GET'
  })
}

export function fetchCount () {
  return wrapAction({
    type: ActionTypes.REPAIR_GET_COUNT,
    endpoint: '/leo/1.0/stock/spareReplace/count',
    body: {},
    method: 'GET'
  })
}

export function fetchDemoList (queryType, offset, pageSize) {
  return wrapAction({
    type: ActionTypes.WAREHOUSE_DISTRIBUTION_LIST,
    endpoint: '/leo/1.0/stock/spareApply/gets',
    body: {queryType, offset, pageSize},
    method: 'get'
  })
}

export function fetchList (queryType, offset, pageSize) {
  return wrapAction({
    type: ActionTypes.WAREHOUSE_DISTRIBUTION_LIST,
    endpoint: '/leo/1.0/stock/spareReplace/gets',
    body: {queryType, offset, pageSize},
    method: 'get'
  })
}

export function repairDetail (params) {
  return wrapAction({
    type: ActionTypes.WAREHOUSE_REPAIR_DETAIL,
    endpoint: '/leo/1.0/stock/spareApply/get',
    body: params,
    method: 'GET'
  })
}

export function claimDemoTask (params) {
  return wrapAction({
    type: ActionTypes.WAREHOUSE_REPAIR_CLAIM_TASK,
    endpoint: '/leo/1.0/stock/spareApply/toAllocate',
    body: params,
    method: 'POST'
  })
}

export function claimTask (params) {
  return wrapAction({
    type: ActionTypes.WAREHOUSE_REPAIR_CLAIM_TASK,
    endpoint: '/leo/1.0/stock/spareReplace/toAllocate',
    body: params,
    method: 'POST'
  })
}

export function resetClaim () {
  return {
    type: ActionTypes.WAREHOUSE_REPAIR_RESET_CLAIM
  }
}

export function allocate (params) {
  return wrapAction({
    type: ActionTypes.WAREHOUSE_DISTRIBUTE,
    endpoint: '/leo/1.0/stock/spareApply/allocate',
    body: params,
    method: 'get'
  })
}
