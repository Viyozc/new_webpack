import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  DEVICE_GET
} from 'constants/actionTypes/device'
import RepairActionTypes from 'constants/actionTypes/repair/workOrder'
import assign from 'lodash/assign'

export default function deviceReducer (state = null, action) {
  switch (action.type) {
    case DEVICE_GET:
      if (action.status === STATUS_SUCCESS) return action.payload
      break
    case RepairActionTypes.WORKORDER_REPAIR_COMPLETE:
      if (action.status === STATUS_SUCCESS) return assign({}, state, {complete: true})
  }
  return state
}
