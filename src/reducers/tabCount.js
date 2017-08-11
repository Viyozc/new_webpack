import WarehouseActionTypes from 'constants/actionTypes/warehouse'
import WareouseOutActionTypes from 'constants/actionTypes/warehouse/out'
import RecyleActionTypes from 'constants/actionTypes/recyle/workOrder'
import ReclaimActionTypes from 'constants/actionTypes/install/reclaim'
import RetureActionTypes from 'constants/actionTypes/install/returnToWarehouse'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function count (state = {}, action) {
  switch (action.type) {
    case RecyleActionTypes.WORKORDER_GET_COUNT:
    case WarehouseActionTypes.REPAIR_GET_COUNT:
      switch (action.status) {
        case STATUS_SUCCESS:
          return action.payload.count
      }
      return state
    case WareouseOutActionTypes.OUT_GET_COUNT:
    case ReclaimActionTypes.RECLAIM_LIST_COUNT:
    case RetureActionTypes.RETURN_LIST_GET_COUNT:
      switch (action.status) {
        case STATUS_SUCCESS:
          return action.payload
      }
  }
  return state
}
