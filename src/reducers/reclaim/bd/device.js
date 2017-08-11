import assign from 'lodash/assign'
import ActionTypes from 'constants/actionTypes/reclaim/'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function reducer (state = null, action) {
  switch (action.type) {
    case ActionTypes.FETCH_GET_RECLAIM_BD_MAX_COUNT:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          max: action.payload
        })
      }
      break
    case ActionTypes.FETCH_GET_RECLAIM_BD_CONTRACT_ADD:
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          fetch: 'request'
        })
      } else if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          fetch: 'success'
        })
      } else {
        state = assign({}, state, {
          fetch: 'failure'
        })
      }
      break
    case ActionTypes.FETCH_GET_RECLAIM_BD_REASONS:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {
          reasons: action.payload.opts
        })
      }
      break
  }
  return state
}
