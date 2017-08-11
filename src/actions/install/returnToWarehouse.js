import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/install/returnToWarehouse'

function getList (status, offset, pageSize) {
  return wrapAction({
    type: ActionTypes.RETURN_LIST_GET,
    endpoint: '/leo/1.0/deviceBack/gets',
    body: {status, offset, pageSize},
    method: 'get'
  })
}

function fetchCount () {
  return wrapAction({
    type: ActionTypes.RETURN_LIST_GET_COUNT,
    endpoint: '/leo/1.0/deviceBack/count',
    body: {},
    method: 'GET'
  })
}

function toBack (params) {
  return wrapAction({
    type: ActionTypes.RETURN_TO_BACK,
    endpoint: '/leo/1.0/deviceBack/toBack',
    body: params,
    method: 'GET'
  })
}

function resetList () {
  return {
    type: ActionTypes.WORKORDER_RESET_LIST
  }
}

export {
  getList,
  fetchCount,
  toBack,
  resetList
}
