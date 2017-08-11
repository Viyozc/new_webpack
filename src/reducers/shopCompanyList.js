import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_GET_COMPANY_LIST,
  SHOP_CLEAN_COMPANYLIST
} from 'constants/actionTypes/shop'

export default function resultOptions (state = {}, action) {
  switch (action.type) {
    case SHOP_CLEAN_COMPANYLIST:
      return {}
    case SHOP_GET_COMPANY_LIST:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          companyList: action.payload
        })
      }
  }
  return state
}
