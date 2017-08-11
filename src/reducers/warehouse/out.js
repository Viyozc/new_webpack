import assign from 'lodash/assign'
import ActionTypes from 'constants/actionTypes/warehouse/out'
import WarehouseActionTypes from 'constants/actionTypes/warehouse'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

let outList = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.OUT_GET_LIST:
      if (action.status === STATUS_REQUEST) {
        if (action.requestData.pageNum === 1) {
          return assign({}, state, {list: null, claimed: false, confirmed: false, canceled: false})
        }
        return state
      } else if (action.status === STATUS_SUCCESS) {
        return action.requestData.pageNum === 1 ? assign({}, state, action.payload) : assign({}, state, {list: state.list.concat(action.payload.list)})
      }
  }
  return state
}
let outApplyDetail = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.OUT_GET_APPLY_DETAIL:
      switch (action.status) {
        case STATUS_SUCCESS:
          return action.payload
      }
      return state
    case WarehouseActionTypes.WAREHOUSE_REPAIR_RESET_CLAIM:
      return null
    case ActionTypes.OUT_GET_PROCESS:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {claimed: true})
      }
      return state
  }
  return state
}
let outCount = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.OUT_GET_COUNT:
      switch (action.status) {
        case STATUS_SUCCESS:
          state = action.payload
          return assign({}, state)
      }
      return state
  }
  return state
}

export default {
  outList,
  outApplyDetail,
  outCount
}
