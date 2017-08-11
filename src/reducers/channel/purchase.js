import assign from 'object-assign'
import ActionTypes from 'constants/actionTypes/channel/purchase'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE
} from 'redux-fetch-elegant'

let ApprovalPage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHANNEL_PURCHASE_GET_LIST:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {list: action.requestData.offset === 0 ? null : state.list})
        case STATUS_SUCCESS:
          return assign({}, state, {list: action.requestData.offset === 0 ? action.payload.list : state.list.concat(action.payload.list)})
      }
      return state
    case ActionTypes.CHANNEL_PURCHASE_POST_APPROVAL:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: 'success'})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
  }
  return state
}

let CreateExpressPage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHANNEL_PURCHASE_POST_SAVE_EXPRESS:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: 'success'})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
  }
  return state
}

export default {
  ApprovalPage,
  CreateExpressPage
}
