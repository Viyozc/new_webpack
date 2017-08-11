import assign from 'object-assign'
import ActionTypes from 'constants/actionTypes/shop/boxapply'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE
} from 'redux-fetch-elegant'

function IndexPage (state = null, action) {
  switch (action.type) {
    case ActionTypes.SHOP_BOXAPPLY_INDEX_GET_MAXNUM:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {maxnumber: action.payload})
      }
      return state
    case ActionTypes.SHOP_BOXAPPLY_INDEX_GET_APPLYINFO:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {applyInfo: action.payload})
      }
      return state
    case ActionTypes.SHOP_BOXAPPLY_INDEX_GET_LOGININFO:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {loginInfo: action.payload})
      }
      return state
    case ActionTypes.SHOP_BOXAPPLY_INDEX_GET_SUBMITBOX:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetchRequest: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetchRequest: 'success', fetchType: action.type})
        case STATUS_FAILURE:
          return assign({}, state, {fetchRequest: 'failure'})
      }
      return state
  }
  return state
}

export default {
  IndexPage
}
