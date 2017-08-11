import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE
} from 'redux-fetch-elegant'
import {
  FETCH_USER_CHECK_ROLE,
  FETCH_USER_CHOSE_ROLE,
  CLEAN_ROLE
} from 'constants/actionTypes/types'

export default function chooseIdentityreducer (state = {}, action) {
  switch (action.type) {
    case FETCH_USER_CHECK_ROLE:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          role: (action.payload && action.payload.role) || 'choseRole'
        })
      }
      break
    case FETCH_USER_CHOSE_ROLE:
      if (action.status === STATUS_REQUEST) {
        return assign({}, state, {
          fetch: 'request'
        })
      } else if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          role: action.requestData.role,
          fetch: 'success'
        })
      } else if (action.status === STATUS_FAILURE) {
        return assign({}, state, {
          fetch: 'failure'
        })
      }
      break
    case CLEAN_ROLE:
      return {}
  }
  return state
}
