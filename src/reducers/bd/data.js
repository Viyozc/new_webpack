import assign from 'object-assign'
import ActionTypes from 'constants/actionTypes/bd/data'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

let TodaySuccessOrderPage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.BD_DATA_GET_TODAY_SUCCESS_ORDER_ORDER_LIST:
      switch (action.status) {
        case STATUS_REQUEST:
          state = state || {}
          state.orderPaging = true
          if (action.requestData.offset === 0) {
            state.orderList = null
            state.orderDeviceCount = null
            state.orderSuccessOrder = null
            state.orderShopCount = null
          }
          return assign({}, state)
        case STATUS_SUCCESS:
          state.orderList = action.requestData.offset === 0 ? action.payload.data : state.orderList.concat(action.payload.data)
          state.orderComplete = action.payload && action.payload.data.length === 0
          state.orderPaging = false
          state.orderDeviceCount = action.payload.deviceCount
          state.orderSuccessOrder = action.payload.successOrder
          state.orderShopCount = action.payload.shopCount
          return assign({}, state)
      }
      return state
    case ActionTypes.BD_DATA_GET_TODAY_SUCCESS_ORDER_LIST:
      switch (action.status) {
        case STATUS_REQUEST:
          state = state || {}
          state.paging = true
          if (action.requestData.offset === 0) {
            state.list = null
            state.deviceCount = null
            state.shopCount = null
            state.successOrder = null
            state.createOrder = null
            state.refundOrder = null
            state.scanNum = null
          }
          return assign({}, state)
        case STATUS_SUCCESS:
          state.list = action.requestData.offset === 0 ? action.payload.list : state.list.concat(action.payload.list)
          state.complete = action.payload && action.payload.list.length === 0
          state.paging = false
          state.deviceCount = action.payload.deviceCount
          state.shopCount = action.payload.shopCount
          state.successOrder = action.payload.successOrder
          state.createOrder = action.payload.createOrder
          state.refundOrder = action.payload.refundOrder
          state.scanNum = action.payload.scanNum
          return assign({}, state)
      }
      return state
    case ActionTypes.BD_DATA_TRIGGER_TODAY_SUCCESS_ORDER_CHANGE_OPEN_STATUS:
      let list = [].concat(state.list)
      list[action.payload].open = !list[action.payload].open
      return assign({}, state, {list})
  }
  return state
}

let SummaryDataRecovery = (state = null, action) => {
  switch (action.type) {
    // 座充累计数据 累计回收设备数页面 list
    case ActionTypes.BD_DATA_GET_SUMMARY_RECOVERY_LIST:
      if (action.status === STATUS_REQUEST) {
        return assign({}, state, {
          paging: true,
          recoveryList: action.requestData.offset === 0 ? null : state.recoveryList.concat([]),
          summaryData: {
            shopNo: null, // 店铺总数
            deviceNo: null, // 设备数总数
            successOrderNo: null, // 成功订单总数
            refundOrderNo: null // 退款订单数
          }
        })
      }
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          complete: action.payload && action.payload.list.length === 0,
          paging: false,
          recoveryList: action.requestData.offset === 0 ? action.payload.list : state.recoveryList.concat(action.payload.list),
          summaryData: {
            shopNo: action.payload.shopCount, // 店铺总数
            deviceNo: action.payload.deviceCount, // 设备数总数
            successOrderNo: action.payload.successOrder, // 成功订单总数
            refundOrderNo: action.payload.refundOrder // 退款订单数
          }
        })
      }
  }
  return state
}

let MonthData = (state = null, action) => {
  switch (action.type) {
    // 座充月度数据 当月新安装门店数 list
    case ActionTypes.BD_DATA_GET_MONTH_LIST:
      if (action.status === STATUS_REQUEST) {
        return assign({}, state, {
          list: null,
          summaryData: null
        })
      }
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          list: action.payload.perfDataDOList ? action.payload.perfDataDOList : [],
          summaryData: action.payload.perfBaseDataDO ? action.payload.perfBaseDataDO : {}
        })
      }
      break
    case ActionTypes.BD_DATA_CLEAR_MONTH_LIST:
      return assign({}, state, {
        list: null,
        summaryData: null
      })
      break
  }
  return state
}

export default {
  TodaySuccessOrderPage,
  SummaryDataRecovery,
  MonthData
}
