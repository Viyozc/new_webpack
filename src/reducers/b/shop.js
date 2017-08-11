import assign from 'object-assign'
import {
  STATUS_SUCCESS,
  STATUS_REQUEST
} from 'redux-fetch-elegant'
import ActionTypes from 'constants/actionTypes/b'

function bShopReducer (state = null, action) {
  switch (action.type) {
    case ActionTypes.B_SHOP_GET:
      if (action.status === STATUS_SUCCESS) {
        return action.payload
      }
      break
    case ActionTypes.B_SHOP_RESET:
      return null
  }
  return state
}

function bShopEditComment (state = null, action) {
  switch (action.type) {
    case ActionTypes.B_SHOP_EDIT_COMMENT:
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

function unbind (state = null, action) {
  switch (action.type) {
    case ActionTypes.B_SHOP_UNBIND:
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          isUnBind: 'request'
        })
      } else if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          isUnBind: 'success'
        })
      } else {
        state = assign({}, state, {
          isUnBind: 'failure'
        })
      }
      break
  }
  return state
}

export default {
  bShopReducer,
  bShopEditComment,
  unbind
}
