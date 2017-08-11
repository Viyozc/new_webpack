import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  FETCH_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID,
  CLEAN_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID,
  FETCH_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID_CLOUDID,
  CLEAN_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID_CLOUDID
} from 'constants/actionTypes/shop'

export default function shopDetailReducer (state = null, action) {
  switch (action.type) {
    case CLEAN_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID:
      return null
    case FETCH_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID:
      if (action.status === STATUS_SUCCESS) {
        return action.payload || {}
      }
      return state
    case CLEAN_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID_CLOUDID:
      return null
    case FETCH_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID_CLOUDID:
      if (action.status === STATUS_SUCCESS) {
        return action.payload || {}
      }
      return state
  }
  return state
}
