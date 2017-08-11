import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/repair/workOrder'

export function fetchCount () {
  return wrapAction({
    type: ActionTypes.WORKORDER_GET_COUNT,
    endpoint: '/leo/1.0/work/repair/count',
    body: {},
    method: 'GET'
  })
}

export function getList (status, offset, pageSize) {
  return wrapAction({
    type: ActionTypes.WORKORDER_REPAIR_GET_LIST,
    endpoint: '/leo/1.0/work/repair/gets',
    body: {
      status,
      offset,
      pageSize
    },
    method: 'get'
  })
}

export function get (id) {
  return wrapAction({
    type: ActionTypes.WORKORDER_REPAIR_GET,
    endpoint: '/leo/1.0/work/repair/get',
    body: {
      id
    },
    method: 'get'
  })
}

export function complete (id, option, optionDes) {
  return wrapAction({
    type: ActionTypes.WORKORDER_REPAIR_COMPLETE,
    endpoint: '/leo/1.0/work/repair/updateResult',
    body: {
      id, option, optionDes
    },
    method: 'get'
  })
}

export function normal (id, option, optionDes, deviceNo) {
  return wrapAction({
    type: ActionTypes.WORKORDER_REPAIR_COMPLETE,
    endpoint: '/leo/1.0/work/repair/repairDevice',
    body: {
      id, option, optionDes, deviceNo, repairType: 0
    },
    method: 'get'
  })
}

export function config (option, id, optionDes, deviceNo) {
  return wrapAction({
    type: ActionTypes.WORKORDER_REPAIR_CONFIG,
    endpoint: '/leo/1.0/work/repair/repairDevice',
    body: {
      option, id, optionDes, deviceNo, repairType: 2
    },
    method: 'get'
  })
}

export function configLost (id, optionDes, deviceNo) {
  return wrapAction({
    type: ActionTypes.WORKORDER_REPAIR_CONFIG,
    endpoint: '/leo/1.0/work/repair/repairDevice',
    body: {
      id, optionDes, deviceNo, repairType: 1
    },
    method: 'get'
  })
}

export function getDevices (shopId) {
  return wrapAction({
    type: ActionTypes.WORKORDER_REPAIR_GET_DEVICES,
    endpoint: '/leo/1.0/shop/getDevices',
    body: {
      id: shopId
    },
    method: 'get'
  })
}

// export function getDevices (shopId) {
//   return wrapAction({
//     type: ActionTypes.WORKORDER_REPAIR_GET_DEVICES,
//     endpoint: '/leo/1.0/work/repair/getDevices',
//     body: {
//       shopId
//     },
//     method: 'get'
//   })
// }

// alertRepair 扫码接口

export function scanCode (deviceNo, shopId) {
  return wrapAction({
    type: ActionTypes.WORKORDER_SCANCODE,
    // endpoint: '/leo/1.0/device/scanCode',
    endpoint: '/leo/1.0/device/getDeviceStatus',
    body: {
      deviceNo, shopId
    },
    method: 'get'
  })
}

export function cleanScanInfo () {
  return {
    type: ActionTypes.WORKORDER_CLEAR_SCANINFO
  }
}

export function finish (id) {
  return wrapAction({
    type: ActionTypes.WORKORDER_REPAIR_FINISH,
    endpoint: '/leo/1.0/work/repair/complete',
    body: {
      id
    },
    method: 'get'
  })
}

export function resetDevices () {
  return {
    type: ActionTypes.WORKORDER_REPAIR_RESET_DEVICES
  }
}

export function reset () {
  return {
    type: ActionTypes.WORKORDER_RESET
  }
}

export function resetList () {
  return {
    type: ActionTypes.WORKORDER_RESET_LIST
  }
}
