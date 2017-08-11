import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  AGENT_BD_HOME_FETCH_DATA_PREVIEW,
  AGENT_BD_HOME_FETCH_DATA_MONTHLIST
} from 'constants/actionTypes/a/agentBD/home/'

export default function fetchDataSellerPreviewReducer (state = {}, action) {
  switch (action.type) {
    case AGENT_BD_HOME_FETCH_DATA_PREVIEW:
      if (action.status === STATUS_SUCCESS) {
        state.data = action.payload
        return assign({}, state)
      }
      break
    case AGENT_BD_HOME_FETCH_DATA_MONTHLIST:
      if (action.status === STATUS_SUCCESS) {
        state.selectDate = action.payload
        return assign({}, state)
      }
  }
  return state
}
