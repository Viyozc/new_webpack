import {
  wrapAction
} from 'utils/fetch'
import {
  A_COUNT_GETCOUNT,
  A_COUNT_GETRECORD,
  A_COUNT_GETRECORD_DETAIL,
  A_COUNT_GETRECORD_LIST,
  A_COUNT_GETCASHRECORD_LIST,
  A_COUNT_CASH,
  A_COUNT_CASH_CHARGE,
  A_COUNT_CASH_MANAGE_DETAIL,
  A_COUNT_CASH_MANAGE_LIST,
  A_COUNT_GET_PAY_TYPE
} from 'constants/actionTypes/a/count/'
// 我的账户余额
export function getCount (param) {
  return wrapAction({
    type: A_COUNT_GETCOUNT,
    endpoint: '/leo/1.0/h5/agent/boss/account/balance',
    body: param,
    method: 'get'
  })
}
// 收支明细
export function getRecord (param) {
  return wrapAction({
    type: A_COUNT_GETRECORD,
    endpoint: '/leo/1.0/h5/agent/boss/account/cashRecord',
    body: param,
    method: 'get'
  })
}
// 账单详情
export function getRecordDetail (param) {
  return wrapAction({
    type: A_COUNT_GETRECORD_DETAIL,
    endpoint: '/leo/1.0/h5/agent/boss/account/profit',
    body: param,
    method: 'get'
  })
}
export function getRecordDetailList (param) {
  return wrapAction({
    type: A_COUNT_GETRECORD_LIST,
    endpoint: '/leo/1.0/h5/agent/boss/account/profit/orders',
    body: param,
    method: 'get'
  })
}
// 提现记录
export function getCashRecordList (param) {
  return wrapAction({
    type: A_COUNT_GETCASHRECORD_LIST,
    endpoint: '/leo/1.0/h5/agent/boss/account/withdrawRecord',
    body: param,
    method: 'get'
  })
}
// 提现
export function cash (param) {
  return wrapAction({
    type: A_COUNT_CASH,
    endpoint: '/leo/1.0/h5/agent/boss/account/withdraw',
    body: param,
    method: 'get'
  })
}
// 账户类型 支付宝/银行卡
export function getPayType (param) {
  return wrapAction({
    type: A_COUNT_GET_PAY_TYPE,
    endpoint: '/leo/1.0/h5/agent/boss/account/accounts',
    body: param,
    method: 'get'
  })
}
// 代理费充值
export function cashCharge (param) {
  return wrapAction({
    type: A_COUNT_CASH_CHARGE,
    endpoint: '/leo/1.0/h5/agent/boss/account/agencyFeeCharge',
    body: param,
    method: 'get'
  })
}
// 代理费管理
export function cashManageDetail (param) {
  return wrapAction({
    type: A_COUNT_CASH_MANAGE_DETAIL,
    endpoint: '/leo/1.0/h5/agent/boss/account/agencyFee',
    body: param,
    method: 'get'
  })
}
export function cashManageList (param) {
  return wrapAction({
    type: A_COUNT_CASH_MANAGE_LIST,
    endpoint: '/leo/1.0/h5/agent/boss/account/agencyFeeRecord',
    body: param,
    method: 'get'
  })
}
