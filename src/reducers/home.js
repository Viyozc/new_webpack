import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  FETCH_DATA_PREVIEW,
  FETCH_DATA_MONTHLIST
} from 'constants/actionTypes/home'

export default function fetchDataSellerPreviewReducer (state = {}, action) {
  switch (action.type) {
    case FETCH_DATA_PREVIEW:
      if (action.status === STATUS_SUCCESS) {
        state.data = action.payload
        return assign({}, state)
      }
      break
    case FETCH_DATA_MONTHLIST:
      if (action.status === STATUS_SUCCESS) {
        state.selectDate = action.payload
        return assign({}, state)
      }
  }
  return state
}
