import {
  FETCH_USER
} from 'constants/actionTypes/user'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function user (state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      if (action.status === STATUS_SUCCESS) return action.payload
  }
  return state
}
