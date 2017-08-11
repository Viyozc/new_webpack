import assign from 'lodash/assign'
import {
  STATUS_SUCCESS,
  STATUS_REQUEST
} from 'redux-fetch-elegant'
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

export default function agentCount (state = {}, action) {
  switch (action.type) {
    //我的账户
    case A_COUNT_GETCOUNT:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {myCount: action.payload})
      }
      break
    //收支明细
    case A_COUNT_GETRECORD:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {recordList: action.payload})
      }
      break
    //账单详情 detail
    case A_COUNT_GETRECORD_DETAIL:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {detail: action.payload})
      }
      break
    //账单详情 list
    case A_COUNT_GETRECORD_LIST:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {list: action.payload})
      }
      break
    //提现记录
    case A_COUNT_GETCASHRECORD_LIST:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {cashRecordList: action.payload})
      }
      break
    //提现
    case A_COUNT_CASH:
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          submitStatus: 'request'
        })
      } else if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          submitStatus: 'success'
        })
      } else {
        state = assign({}, state, {
          submitStatus: 'failure'
        })
      }
      break
    //账户类型 支付宝/银行卡
    case A_COUNT_GET_PAY_TYPE:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {pay: action.payload})
      }
      break
    //代理费充值
    case A_COUNT_CASH_CHARGE:
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          submitStatus: 'request'
        })
      } else if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          submitStatus: 'success'
        })
      } else {
        state = assign({}, state, {
          submitStatus: 'failure'
        })
      }
      break
    //代理费管理 详情
    case A_COUNT_CASH_MANAGE_DETAIL:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {detail: action.payload})
      }
      break
    //代理费管理 list
    case A_COUNT_CASH_MANAGE_LIST:
      if (action.status === STATUS_SUCCESS) {
        if (action.requestData.offset === 0) {
          state = assign({}, state, {list: action.payload})
        } else {
          state = assign({}, state, {list: state.list.concat(action.payload)})
        }
      }
      break
  }
  return state
}
