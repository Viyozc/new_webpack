import assign from 'object-assign'
import ActionTypes from 'constants/actionTypes/channel/'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

function IndexPage (state = null, action) {
  switch (action.type) {
    case ActionTypes.CHANNEL_GET_HOME_DATA:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {homeData: action.payload})
      }
      return state
    case ActionTypes.CHANNEL_GET_MONTH_DATA:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {monthData: action.payload})
      }
      return state
  }
  return state
}

export default {
  IndexPage
}
