import assign from 'lodash/assign'
import isArray from 'lodash/isArray'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_GET_TYPES,
  SHOP_SELECT_TOP_TYPE,
  SHOP_SELECT_SUB_TYPE
} from 'constants/actionTypes/shop'

export default function shopTypesReducer (state = {}, action) {
  switch (action.type) {
    case SHOP_GET_TYPES:
      if (action.status === STATUS_SUCCESS) {
        if (isArray(action.payload)) {
          let selectedTopType = action.payload[0]
          let selectedSubType = null
          if (action.requestData.typeId) {
            for (let i = 0; i < action.payload.length; i++) {
              let subType = action.payload[i].sub
              for (let j = 0; j < subType.length; j++) {
                if (parseInt(action.requestData.typeId) === subType[j].id) {
                  selectedTopType = action.payload[i]
                  selectedSubType = subType[j]
                  break
                }
              }
            }
          }
          state = {
            list: action.payload,
            selectTopType: selectedTopType,
            selectSubType: selectedSubType
          }
        }
      }
      break
    case SHOP_SELECT_TOP_TYPE:
      state = assign({}, state, {
        selectTopType: action.payload
      })
      break
    case SHOP_SELECT_SUB_TYPE:
      state = assign({}, state, {
        selectSubType: action.payload
      })
      break
  }
  return state
}
