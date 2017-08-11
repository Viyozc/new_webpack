import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/install/reclaim'
import WorkOrderActionTypes from 'constants/actionTypes/repair/workOrder'

function getList (status, offset, pageSize) {
  return wrapAction({
    type: ActionTypes.RECLAIM_LIST_GET,
    endpoint: '/leo/1.0/recycle/gets',
    body: {status, offset, pageSize},
    method: 'get'
  })
}

function fetchCount () {
  return wrapAction({
    type: ActionTypes.RECLAIM_LIST_COUNT,
    endpoint: '/leo/1.0/recycle/count',
    body: {},
    method: 'get'
  })
}

function get (params) {
  return wrapAction({
    type: ActionTypes.RECLAIM_DETAIL_GET,
    endpoint: '/leo/1.0/shop/getInstallNum',
    body: params,
    method: 'get'
  })
}

function fetchScanDevice (params) {
  return wrapAction({
    type: ActionTypes.RECLAIM_GET_SCAN_DEVICE,
    endpoint: '/leo/1.0/device/getDeviceStatus',
    body: params,
    method: 'get'
  })
}

function refuse (params) {
  return wrapAction({
    type: ActionTypes.RECLAIM_REFUSE,
    endpoint: '/leo/1.0/recycle/refuse',
    body: params,
    method: 'get'
  })
}

function updateDeviceNum (adapterNum, boardNum) {
  return {
    type: ActionTypes.RECLAIM_UPDATE_DEVICE_NUM,
    payload: {adapterNum, boardNum}
  }
}

function addDevice (reclaimDevices, signDevices) {
  return {
    type: ActionTypes.RECLAIM_ADD_DEVICE,
    payload: {reclaimDevices, signDevices}
  }
}

function clearDevice () {
  return {
    type: ActionTypes.RECLAIM_CLEAR_DEVICE
  }
}

function reduceDevice (reclaimDevice) {
  return {
    type: ActionTypes.RECLAIM_REDUCE_DEVICE,
    payload: reclaimDevice
  }
}

function toRecycle (params) {
  return wrapAction({
    type: ActionTypes.RECLAIM_TO_RECYCLE,
    endpoint: '/leo/1.0/recycle/add',
    body: params,
    method: 'post'
  })
}

function revoke (params) {
  return wrapAction({
    type: ActionTypes.RECLAIM_REVOKE,
    endpoint: '/leo/1.0/recycle/revoke',
    body: params,
    method: 'post'
  })
}

function reset () {
  return {
    type: WorkOrderActionTypes.WORKORDER_RESET
  }
}

function resetList () {
  return {
    type: WorkOrderActionTypes.WORKORDER_RESET_LIST
  }
}

let fetchProductIcons = (params) => {
  return wrapAction({
    type: ActionTypes.RECLAIM_GET_PRODECTSICONS,
    endpoint: '/leo/1.0/stock/product/getProductIcons',
    body: params,
    method: 'GET'
  })
}

let fetchChangeValue = (params) => {
  return {
    type: ActionTypes.RECLAIM_GET_CHANGEVALUE,
    payload: params
  }
}

export {
  getList,
  fetchCount,
  get,
  refuse,
  updateDeviceNum,
  addDevice,
  reduceDevice,
  toRecycle,
  revoke,
  reset,
  resetList,
  fetchScanDevice,
  clearDevice,
  fetchProductIcons,
  fetchChangeValue
}
