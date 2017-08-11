import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  CHANNEL_SHOP_AUDITING
} from 'constants/actionTypes/channel/auditing'

export default function channelAuditing (state = {}, action) {
  switch (action.type) {
    case CHANNEL_SHOP_AUDITING:
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
