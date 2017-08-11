import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/reclaim/'

function fetchGetReclaimBdMaxCount (params) {
  return wrapAction({
    type: ActionTypes.FETCH_GET_RECLAIM_BD_MAX_COUNT,
    endpoint: '/leo/1.0/h5/recycle/getMaxRecycle',
    body: params,
    method: 'get'
  })
}

// type:1表示bd选择回收
function fetchGetReclaimBdReasons () {
  return wrapAction({
    type: ActionTypes.FETCH_GET_RECLAIM_BD_REASONS,
    endpoint: '/leo/1.0/h5/option/gets',
    body: {type: 1},
    method: 'get'
  })
}

function fetchReclaimBdContractAdd (params) {
  return wrapAction({
    type: ActionTypes.FETCH_GET_RECLAIM_BD_CONTRACT_ADD,
    endpoint: '/leo/1.0/h5/recycle/add',
    body: params,
    method: 'post'
  })
}

export {
  fetchGetReclaimBdMaxCount,
  fetchGetReclaimBdReasons,
  fetchReclaimBdContractAdd
}
