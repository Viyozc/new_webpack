import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/recyle/workOrder'

export function fetchCount () {
  return wrapAction({
    type: ActionTypes.WORKORDER_GET_COUNT,
    endpoint: '/leo/1.0/spare/replace/count',
    body: {},
    method: 'GET'
  })
}

export function getList (queryType, offset, pageSize) {
  return wrapAction({
    type: ActionTypes.WORKORDER_RECYLE_GET_LIST,
    endpoint: '/leo/1.0/spare/replace/gets',
    body: {
      queryType,
      offset,
      pageSize
    },
    method: 'get'
  })
}

export function getMaxReplace (params) {
  return wrapAction({
    type: ActionTypes.WORKORDER_RECYLE_MAX_GET_LIST,
    endpoint: '/leo/1.0/spare/maxReplace',
    body: params,
    method: 'get'
  })
}

export function submit (option, optionDes, quantity) {
  return wrapAction({
    type: ActionTypes.WORKORDER_RECYLE_SUBMIT,
    endpoint: '/leo/1.0/spare/replace/submit',
    body: {option, optionDes, deviceNoBatteryNum: quantity[0], deviceWithBatteryNum: quantity[1], batteryNum: quantity[2], adapterNum: quantity[3], brandNum: quantity[4]},
    method: 'post'
  })
}

export function claim (applyId) {
  return wrapAction({
    type: ActionTypes.WORKORDER_RECYLE_CLAIM,
    endpoint: '/leo/1.0/spare/replace/claim',
    body: {applyId},
    method: 'post'
  })
}

export function confirm (applyId) {
  return wrapAction({
    type: ActionTypes.WORKORDER_RECYLE_CONFIRM,
    endpoint: '/leo/1.0/spare/confirm',
    body: {applyId},
    method: 'post'
  })
}

export function cancel (applyId) {
  return wrapAction({
    type: ActionTypes.WORKORDER_RECYLE_CANCEL,
    endpoint: '/leo/1.0/spare/replace/revoke',
    body: {applyId},
    method: 'post'
  })
}

export function resetList () {
  return {
    type: ActionTypes.WORKORDER_RESET_LIST
  }
}
