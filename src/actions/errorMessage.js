import {
  RESET_ERROR_MESSAGE
} from 'constants/actionTypes/errorMessage'

export function clean () {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
