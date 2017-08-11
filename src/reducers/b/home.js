import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import ActionTypes from 'constants/actionTypes/b'

export default function bHomeReducer (state = null, action) {
  switch (action.type) {
    case ActionTypes.B_HOME_GET:
      if (action.status === STATUS_SUCCESS) {
        return action.payload || null
      }
      break
  }
  return state
}
