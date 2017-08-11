import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import WarehouseActionTypes from 'constants/actionTypes/warehouse'
import RecyleActionTypes from 'constants/actionTypes/recyle/workOrder'
import RepairActionTypes from 'constants/actionTypes/repair/workOrder'
import ReclaimActionTypes from 'constants/actionTypes/install/reclaim'
import assign from 'lodash/assign'

export default function workOrderReducer (state = null, action) {
  switch (action.type) {
    case WarehouseActionTypes.WAREHOUSE_DISTRIBUTE:
      if (action.status === STATUS_SUCCESS) return assign({}, state, {allocated: true})
      break
    case RepairActionTypes.WORKORDER_REPAIR_GET:
      if (action.status === STATUS_SUCCESS) return action.payload
      break
    case RecyleActionTypes.WORKORDER_RECYLE_SUBMIT:
    case RepairActionTypes.WORKORDER_REPAIR_COMPLETE:
      if (action.status === STATUS_SUCCESS) return assign({}, state, {complete: true})
      break
    case RepairActionTypes.WORKORDER_REPAIR_FINISH:
      if (action.status === STATUS_SUCCESS) return assign({}, state, {finished: true})
      break
    case RepairActionTypes.WORKORDER_REPAIR_CONFIG:
      if (action.status === STATUS_SUCCESS) return action.payload
      break
    case ReclaimActionTypes.RECLAIM_DETAIL_GET:
      if (action.status === STATUS_SUCCESS) return action.payload
      break
    case ReclaimActionTypes.RECLAIM_REFUSE:
      if (action.status === STATUS_SUCCESS) return assign({}, state, {refused: true})
      break
    case ReclaimActionTypes.RECLAIM_TO_RECYCLE:
      if (action.status === STATUS_SUCCESS) return assign({}, state, {recycled: true})
      break
    case RepairActionTypes.WORKORDER_RESET:
      return null
  }
  return state
}
