import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import ActionTypes from 'constants/actionTypes/recyle/workOrder'

export default function maxReplaceReducer (state = null, action) {
  switch (action.type) {
    case ActionTypes.WORKORDER_RECYLE_MAX_GET_LIST:
      if (action.status === STATUS_SUCCESS) {
        return action.payload && action.payload.maxReplace
      }
      break
  }
  return state
}
