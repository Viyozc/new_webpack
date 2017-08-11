import {
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE
} from 'redux-fetch-elegant'
import {
  PC_LOGIN,
  RESET_PC_LOGIN
} from 'constants/actionTypes/pcLogin'
import assign from 'lodash/assign'

export default function pcLoginReducer (state = null, action) {
  switch (action.type) {
    case PC_LOGIN:
      if (action.status === STATUS_REQUEST) {
        return assign({}, state, {fetch: 'request'})
      }
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {fetch: 'success', info: action.payload})
      }
      if (action.status === STATUS_FAILURE) {
        return assign({}, state, {fetch: 'failure'})
      }
      break
    case RESET_PC_LOGIN:
      return null
  }
  return state
}
