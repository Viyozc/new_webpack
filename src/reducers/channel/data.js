import assign from 'object-assign'
import ActionTypes from 'constants/actionTypes/channel/data'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

let TodayNewInstallDevicePage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHANNEL_DATA_GET_TODAY_NEW_INSTALL_DEVICE_LIST:
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
    case ActionTypes.CHANNEL_DATA_TRIGGER_TODAY_NEW_INSTALL_DEVICE_CHANGE_OPEN_STATUS:
      let list = [].concat(state.list)
      list[action.payload].open = !list[action.payload].open
      return assign({}, state, {list})
  }
  return state
}

let TodayOfflineDevicePage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHANNEL_DATA_GET_TODAY_OFFLINE_DEVICE_LIST:
      switch (action.status) {
        case STATUS_REQUEST:
          state = state || {}
          state.paging = true
          if (action.requestData.offset === 0) {
            state.list = null
            state.deviceCount = null
            state.shopCount = null
            state.successOrder = null
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
          state.refundOrder = action.payload.refundOrder
          state.scanNum = action.payload.scanNum
          return assign({}, state)
      }
      return state
    case ActionTypes.CHANNEL_DATA_TRIGGER_TODAY_OFFLINE_DEVICE_CHANGE_OPEN_STATUS:
      let list = [].concat(state.list)
      list[action.payload].open = !list[action.payload].open
      return assign({}, state, {list})
  }
  return state
}

let TotalInstallShopPage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHANNEL_DATA_GET_TOTAL_INSTALL_SHOP_LIST:
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
    case ActionTypes.CHANNEL_DATA_TRIGGER_TOTAL_INSTALL_SHOP_CHANGE_OPEN_STATUS:
      let list = [].concat(state.list)
      list[action.payload].open = !list[action.payload].open
      return assign({}, state, {list})
  }
  return state
}

let TodaySuccessOrderPage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHANNEL_DATA_GET_TODAY_SUCCESS_ORDER_LIST:
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
    case ActionTypes.CHANNEL_DATA_TRIGGER_TODAY_SUCCESS_ORDER_CHANGE_OPEN_STATUS:
      let list = [].concat(state.list)
      list[action.payload].open = !list[action.payload].open
      return assign({}, state, {list})
  }
  return state
}

export default {
  TodayNewInstallDevicePage,
  TotalInstallShopPage,
  TodayOfflineDevicePage,
  TodaySuccessOrderPage
}
