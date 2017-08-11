import ActionTypes from 'constants/actionTypes/bd/device'

import {
  wrapAction
} from 'utils/fetch'
// CM 遗失申请列表
let fetchLostDeviceList = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_LOST_LIST,
    endpoint: '/leo/1.0/deviceManager/lost/list',
    body: params,
    method: 'GET'
  })
}
// CM 遗失申请详情
let fetchDeviceLostDetail = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_LOST_DETAIL,
    endpoint: '/leo/1.0/deviceManager/lost/detail',
    body: params,
    method: 'GET'
  })
}
// 获取拒绝申请理由
let fetchRefuseReasons = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_REFUSE_REASONS,
    endpoint: '/leo/1.0/h5/option/gets',
    body: params,
    method: 'GET'
  })
}
// 拒绝遗失申请
let fetchLostDeviceReject = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_LOST_REJECT,
    endpoint: '/leo/1.0/deviceManager/lost/refuse',
    body: params,
    method: 'GET'
  })
}
// 同意遗失申请
let fetchLostDeviceAgree = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_LOST_AGREE,
    endpoint: '/leo/1.0/deviceManager/lost/accept',
    body: params,
    method: 'GET'
  })
}

let clearLostDevicePage = (params) => {
  return {
    type: ActionTypes.BD_DEVICE_LOST_CLEAR,
    payload: params
  }
}

let fetchRejectBorrow = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_REJECT_BORROW,
    endpoint: '/leo/1.0/deviceManager/borrow/revoke',
    body: params,
    method: 'GET'
  })
}

let fetchAgreeBorrow = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_AGREE_BORROW,
    endpoint: '/leo/1.0/deviceManager/borrow/accept',
    body: params,
    method: 'GET'
  })
}

let fetchExchangeApply = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_EXCHANGE_APPLY,
    endpoint: '/leo/1.0/deviceManager/borrow/add',
    body: params,
    method: 'GET'
  })
}

let fetchGetBds = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_BDS,
    endpoint: '/leo/1.0/admin/employee/getByBorrow',
    body: params,
    method: 'GET'
  })
}

let fetchProductIcons = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_PRODECTSICONS,
    endpoint: '/leo/1.0/stock/product/getProductIcons',
    body: params,
    method: 'GET'
  })
}

let fetchDeviceList = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_LIST,
    endpoint: '/leo/1.0/deviceManager/gets',
    body: params,
    method: 'GET'
  })
}
// 已遗失tab页
let fetchDeviceListLost = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_LIST,
    endpoint: ' /leo/1.0/deviceManager/lost/list',
    body: params,
    method: 'GET'
  })
}

let fetchDeviceRecycle = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_RECYCLE,
    endpoint: '/leo/1.0/deviceManager/deviceBack/add',
    body: params,
    method: 'GET'
  })
}

let fetchMaxCount = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_MAX_COUNT,
    endpoint: '/leo/1.0/deviceManager/deviceGet/maxGet',
    body: params,
    method: 'GET'
  })
}

let fetchDeviceApply = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_APPLY,
    endpoint: '/leo/1.0/deviceManager/deviceGet/add',
    body: params,
    method: 'GET'
  })
}

let fetchDeviceLost = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_LOST,
    endpoint: '/leo/2.0/deviceManager/lost/add',
    body: params,
    method: 'GET'
  })
}
let fetchCancelGet = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_CANCEL_GET,
    endpoint: '/leo/1.0/deviceManager/deviceGet/revoke',
    body: params,
    method: 'GET'
  })
}
let fetchCancelBack = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_CANCEL_BACK,
    endpoint: '/leo/1.0/deviceManager/deviceBack/revoke',
    body: params,
    method: 'GET'
  })
}

let fetchChangeValue = (params) => {
  return {
    type: ActionTypes.BD_DEVICE_GET_CHANGEVALUE,
    payload: params
  }
}

let fetchUploadApply = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_UPLOAD_APPLY,
    endpoint: '/leo/1.0/deviceManager/deviceGet/add',
    body: params,
    method: 'GET'
  })
}

let fetchUploadRecycle = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_UPLOAD_RECYCLE,
    endpoint: '/leo/1.0/deviceManager/deviceBack/add',
    body: params,
    method: 'GET'
  })
}
// 取消遗失申请
let fetchCancelLost = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_LOST_CANCEL,
    endpoint: ' /leo/1.0/h5/deviceManager/lost/cancel',
    body: params,
    method: 'GET'
  })
}
// 已找回提交
let fetchFindLost = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DEVICE_GET_FIND_LOST,
    endpoint: '/leo/1.0/h5/deviceManager/lost/findBack',
    body: params,
    method: 'GET'
  })
}

let scanBoxInfo = (params) => {
  return wrapAction({
    type: ActionTypes.DEVICE_SUPPLY_GET,
    endpoint: '/leo/1.0/deviceManager/addPowerbank/scanCode',
    body: params,
    method: 'GET'
  })
}

let getBoxInfo = (params) => {
  return wrapAction({
    type: ActionTypes.DEVICE_SUPPLY_GET,
    endpoint: '/leo/1.0/box/hezi/slotInfo',
    body: params,
    method: 'GET'
  })
}

let startSupply = (params) => {
  return wrapAction({
    type: ActionTypes.DEVICE_SUPPLY_START,
    endpoint: '/leo/1.0/deviceManager/addPowerbank/start',
    body: params,
    method: 'GET'
  })
}

let endSupply = (params) => {
  return wrapAction({
    type: ActionTypes.DEVICE_SUPPLY_END,
    endpoint: '/leo/1.0/deviceManager/addPowerbank/end',
    body: params,
    method: 'GET'
  })
}

let clearData = () => {
  return {
    type: ActionTypes.CLEAR_DEVICE_DATA
  }
}
// bd备件遗失
// let bdLostOwnDevice = (params) => {
//   return wrapAction({
//     type: ActionTypes.BD_DEVICE_LOST_OWN,
//     endpoint: '/leo/2.0/deviceManager/lost/add',
//     body: params,
//     method: 'GET'
//   })
// }

let fetchAllBds = (params) => {
  return wrapAction({
    type: ActionTypes.GET_ALL_BD,
    endpoint: '/leo/1.0/shop/allocate/getSellers',
    body: params,
    method: 'GET'
  })
}

export {
  fetchRejectBorrow,
  fetchAgreeBorrow,
  fetchGetBds,
  fetchDeviceList,
  fetchDeviceRecycle,
  fetchMaxCount,
  fetchDeviceApply,
  fetchDeviceLost,
  fetchCancelGet,
  fetchCancelBack,
  fetchProductIcons,
  fetchChangeValue,
  fetchUploadApply,
  fetchUploadRecycle,
  fetchLostDeviceList,
  fetchDeviceLostDetail,
  fetchLostDeviceReject,
  fetchLostDeviceAgree,
  fetchRefuseReasons,
  clearLostDevicePage,
  fetchCancelLost,
  fetchFindLost,
  fetchDeviceListLost,
  fetchExchangeApply,
  getBoxInfo,
  scanBoxInfo,
  clearData,
  startSupply,
  endSupply,
  fetchAllBds
}
