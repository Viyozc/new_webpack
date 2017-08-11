import ActionTypes from 'constants/actionTypes/repair/workOrder'
import {
  DEVICE_GET_LIST
} from 'constants/actionTypes/device'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function deviceListReducer (state = null, action) {
  switch (action.type) {
    case DEVICE_GET_LIST:
    case ActionTypes.WORKORDER_REPAIR_GET_DEVICES:
      if (action.status === STATUS_SUCCESS) return action.payload
      break
    case ActionTypes.WORKORDER_REPAIR_RESET_DEVICES:
      return null
  }
  return state
}
