import ActionTypes from 'constants/actionTypes/warehouse'
import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

let repairDetail = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.WAREHOUSE_REPAIR_DETAIL:
      if (action.status === STATUS_SUCCESS) {
        return action.payload
      }
      break
    case ActionTypes.WAREHOUSE_REPAIR_CLAIM_TASK:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {claimed: true})
      }
      break
    case ActionTypes.WAREHOUSE_REPAIR_RESET_CLAIM:
      return null
  }
  return state
}

export {
  repairDetail
}
