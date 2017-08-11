import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_GET_LIST,
  SHOP_CLEAN_LIST
} from 'constants/actionTypes/a/agentBD/shops/list/'

export default function shopListReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_GET_LIST:
      if (action.status === STATUS_REQUEST) {
        if (action.requestData.offset === 0) {
          return assign({}, state, {bdList: null, info: null})
        }
        return state
      } else if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          info: {
            role: action.payload.role,
            shopNum: action.payload.shopNum,
            deviceNum: action.payload.deviceNum
          },
          bdList: action.requestData.offset == 0 ? (action.payload.list || []) : state.bdList.concat(action.payload.list || [])
        })
      }
      break
    case SHOP_CLEAN_LIST:
      return assign({}, state, {bdList: null, info: null})
  }
  return state
}
