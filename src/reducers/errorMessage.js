import { RESET_ERROR_MESSAGE } from 'constants/actionTypes/errorMessage'
import {
  STATUS_FAILURE
} from 'redux-fetch-elegant'

export default function errorMessage (state = null, action) {
  if (action.type === RESET_ERROR_MESSAGE) return null
  if (action.status === STATUS_FAILURE && action.error) {
    if (action.error instanceof TypeError) {
      return state
    }
    return action.error
  }
  return state
}

