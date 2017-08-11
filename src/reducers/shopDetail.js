import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_GET_DETAIL,
  SHOP_UPLOADER_IMAGE,
  SHOP_CLEAN_DETAIL
} from 'constants/actionTypes/shop'
import {
  SHOP_INSTALL_GET,
  SHOP_ADD_RECEIPT,
  SHOP_INSTALL_ALLOCATE,
  SHOP_INSTALL_APPLY,
  SHOP_RESET_INFO
} from 'constants/actionTypes/install/shop'
import BreakActionTypes from 'constants/actionTypes/install/break'

export default function shopDetailReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_GET_DETAIL:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          shopInfo: action.payload
        })
      }
      break
    case SHOP_INSTALL_GET:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          shopInfo: action.payload
        })
      }
      break
    case SHOP_UPLOADER_IMAGE:
      if (!state.shopInfo || state.shopInfo.status !== 1) {
        break
      }
      let shopInfo = assign({}, state.shopInfo)
      shopInfo.picUrl = action.payload
      return assign({}, state, {shopInfo})
    case SHOP_ADD_RECEIPT:
      if (action.status === STATUS_SUCCESS) {
        let _shopInfo = assign({}, state.shopInfo)
        _shopInfo.receiptAdded = true
        return assign({}, state, {shopInfo: _shopInfo})
      }
      break
    case SHOP_INSTALL_APPLY:
      if (action.status === STATUS_SUCCESS) {
        let __shopInfo = assign({}, state.shopInfo)
        __shopInfo.applied = true
        return assign({}, state, {shopInfo: __shopInfo})
      }
      break
    case SHOP_INSTALL_ALLOCATE:
      if (action.status === STATUS_SUCCESS) {
        let ___shopInfo = assign({}, state.shopInfo)
        ___shopInfo.allocated = true
        return assign({}, state, {shopInfo: ___shopInfo})
      }
      break
    case BreakActionTypes.BREAK_INSTALL:
      if (action.status === STATUS_SUCCESS) {
        let ___shopInfo = assign({}, state.shopInfo)
        ___shopInfo.broken = true
        return assign({}, state, {shopInfo: ___shopInfo})
      }
      break
    case SHOP_CLEAN_DETAIL:
    case SHOP_RESET_INFO:
      return {}
  }
  return state
}
