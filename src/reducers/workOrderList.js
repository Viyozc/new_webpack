import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import WarehouseActionTypes from 'constants/actionTypes/warehouse'
import RepairActionTypes from 'constants/actionTypes/repair/workOrder'
import RecyleActionTypes from 'constants/actionTypes/recyle/workOrder'
import ReturnActionTypes from 'constants/actionTypes/install/returnToWarehouse'
import ReclaimActionTypes from 'constants/actionTypes/install/reclaim'

export default function workOrderListReducer (state = {}, action) {
  switch (action.type) {
    case WarehouseActionTypes.WAREHOUSE_DISTRIBUTION_LIST:
    case RepairActionTypes.WORKORDER_REPAIR_GET_LIST:
    case RecyleActionTypes.WORKORDER_RECYLE_GET_LIST:
    case ReturnActionTypes.RETURN_LIST_GET:
    case ReclaimActionTypes.RECLAIM_LIST_GET:
      if (action.status === STATUS_REQUEST) {
        if (action.requestData.offset === 0) {
          return assign({}, state, {list: null, claimed: false, confirmed: false, canceled: false, revoked: false, backed: false})
        }
        return state
      } else if (action.status === STATUS_SUCCESS) {
        return action.requestData.offset === 0 ? assign({}, state, action.payload) : assign({}, state, {list: state.list.concat(action.payload.list)})
      }
      break
    case RecyleActionTypes.WORKORDER_RECYLE_CLAIM:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {claimed: true})
      }
      break
    case RecyleActionTypes.WORKORDER_RECYLE_CONFIRM:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {confirmed: true})
      }
      break
    case RecyleActionTypes.WORKORDER_RECYLE_CANCEL:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {canceled: true})
      }
      break
    case ReclaimActionTypes.RECLAIM_REVOKE:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {revoked: true})
      }
      break
    case ReturnActionTypes.RETURN_TO_BACK:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {backed: true})
      }
      break
    case RepairActionTypes.WORKORDER_RESET_LIST:
      return {}
  }
  return state
}
