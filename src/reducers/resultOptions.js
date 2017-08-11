import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import ActionTypes from 'constants/actionTypes/repair/workOrder'
import {
  GET_OPTIONS
} from 'constants/actionTypes/types'

export default function resultOptions (state = null, action) {
  switch (action.type) {
    case GET_OPTIONS:
    case ActionTypes.WORKORDER_REPAIR_OPTION:
      if (action.status === STATUS_SUCCESS) return action.payload
  }
  return state
}
