import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  AGENTBD_CANCEL_SIGN
} from 'constants/actionTypes/a/agentBD/shops/cancel/'

export default function agentBDCancelSignReducer (state = {}, action) {
  switch (action.type) {
    case AGENTBD_CANCEL_SIGN:
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          submitStatus: 'request'
        })
      } else if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          submitStatus: 'success'
        })
      } else {
        state = assign({}, state, {
          submitStatus: 'failure'
        })
      }
      break
  }
  return state
}
