import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/bd/data'

let fetchTodaySuccessOrderOrderList = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DATA_GET_TODAY_SUCCESS_ORDER_ORDER_LIST,
    endpoint: '/leo/1.0/data/directDayStatistics/getOrderInfo',
    body: params,
    method: 'GET'
  })
}

let fetchTodaySuccessOrderList = (params) => {
  if (params && params.timeString) {
    params.hourTimes = params.timeString.split(',')
  }
  return wrapAction({
    type: ActionTypes.BD_DATA_GET_TODAY_SUCCESS_ORDER_LIST,
    endpoint: '/leo/1.0/h5/data/seller/deviceListToday',
    body: params,
    method: 'GET'
  })
}

let triggerTodaySuccessOrderChangeOpenStatus = (index) => {
  return {
    type: ActionTypes.BD_DATA_TRIGGER_TODAY_SUCCESS_ORDER_CHANGE_OPEN_STATUS,
    payload: index
  }
}

// 累计数据 累计回收设备数统计页面（ceo/bdmanager/bd）
let fetchSummaryRecoveryList = (params) => {
  return wrapAction({
    type: ActionTypes.BD_DATA_GET_SUMMARY_RECOVERY_LIST,
    endpoint: '/leo/1.0/data/seller/total/recycleDeviceList',
    body: params,
    method: 'GET'
  })
}

// 当月数据 当月新安装设备数（ceo/bdmanager/bd）
let fetchMonthData = (params) => {
  // return {
  //   type: ActionTypes.BD_DATA_GET_MONTH_LIST
  // }
  return wrapAction({
    type: ActionTypes.BD_DATA_GET_MONTH_LIST,
    endpoint: '/leo/1.0/data/perf/detail',
    body: params,
    method: 'GET'
  })
}
let clearMonthData = (params) => {
  return {
    type: ActionTypes.BD_DATA_CLEAR_MONTH_LIST
  }
}

export {
  fetchTodaySuccessOrderList,
  fetchTodaySuccessOrderOrderList,
  triggerTodaySuccessOrderChangeOpenStatus,
  fetchSummaryRecoveryList,
  fetchMonthData,
  clearMonthData
}
