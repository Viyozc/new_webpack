import assign from 'object-assign'
import {
    STATUS_SUCCESS,
    STATUS_FAILURE
} from 'redux-fetch-elegant'
import ActionTypes from 'constants/actionTypes/b/deviceManage'

function getDeviceManager (state = null, action) {
  switch (action.type) {
    case ActionTypes.B_SHOP_GET_MANAGER:
      if (action.status === STATUS_SUCCESS) {
        return assign({
          list: action.payload
        }, state)
      }
      break
    case ActionTypes.B_SHOP_RESET_MANAGER:
      return assign({
        list: null,
        isSave: false,
        isDelete: false
      }, state)
  }
  return state
}

function setDeviceManager (state = null, action) {
  switch (action.type) {
    case ActionTypes.B_SHOP_SET_MANAGER:
      if (action.status === STATUS_SUCCESS) {
        return assign({
          isSave: true
        }, state)
      }
      break
  }
  return state
}

function deleteDeviceManager (state = null, action) {
  switch (action.type) {
    case ActionTypes.B_SHOP_DELETE_MANAGER:
      if (action.status === STATUS_SUCCESS) {
        return assign({
          isDelete: true,
        }, state)
      }
      if (action.status === STATUS_FAILURE) {
        return assign({
          isDelete: false,
        }, state)
      }
  }
  return state
}

export default {
  getDeviceManager,
  setDeviceManager,
  deleteDeviceManager
}
