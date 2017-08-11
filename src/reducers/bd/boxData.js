import assign from 'object-assign'
import ActionTypes from 'constants/actionTypes/bd/boxData'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE
} from 'redux-fetch-elegant'

export default (state = null, action) => {
  switch (action.type) {
    // 清除盒子数据详情页数据
    case ActionTypes.BD_CLEAR_BOX_ALL_DATA:
      return assign({}, state, {
        isGotDevice: false,
        deviceList: null,
        summaryData: null,
        list: null
      })
      break
    case ActionTypes.BD_CLEAR_DEVICE_DATA:
      return assign({}, state, {
        isGotDevice: false,
        deviceList: null
      })
      break

    // 盒子数据详情页 列表 合计 列表 列表设备信息
    case ActionTypes.BD_BOX_DATA_DETIAL:
      if (action.status === STATUS_REQUEST) {
        return assign({}, state, {
          isGotDevice: false,
          paging: true
        })
      }
      if (action.status === STATUS_FAILURE) {
        return assign({}, state, {
          isGotDevice: false,
          deviceList: null,
          summaryData: null,
          list: null,
          paging: false
        })
      }
      if (action.status === STATUS_SUCCESS) {
        if (action.requestData.secLocations === 'DETAILS_TOTAL_COUNT') { // 合计
          return assign({}, state, {
            summaryData: action.payload
          })
        }
        if (action.requestData.secLocations === 'DETAILS_SHOP_COUNT') { // 列表
          if (action.requestData.pageNum === 1 || !action.requestData.pageNum) {
            return assign({}, state, {
              complete: action.payload.length === 0,
              paging: false,
              list: action.payload
            })
          } else {
            return assign({}, state, {
              complete: action.payload.length === 0,
              paging: false,
              list: state.list.concat(action.payload)
            })
          }
        }
        if (action.requestData.secLocations === 'DETAILS_BOX_COUNT') { // device列表
          if (action.requestData.pageNum === 1 || !action.requestData.pageNum) {
            return assign({}, state, {
              complete: action.payload.length === 0,
              paging: false,
              isGotDevice: true,
              deviceList: action.payload
            })
          } else {
            return assign({}, state, {
              isGotDevice: true,
              complete: action.payload.length === 0,
              paging: false,
              deviceList: state.deviceList.concat(action.payload)
            })
          }
        }
      }

  }
  return state
}
