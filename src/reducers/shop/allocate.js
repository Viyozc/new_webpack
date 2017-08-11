import assign from 'object-assign'
import ActionTypes from 'constants/actionTypes/shop/allocate'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE
} from 'redux-fetch-elegant'

function IndexPage (state = null, action) {
  switch (action.type) {
    case ActionTypes.SHOP_ALLOCATE_INDEX_GET_LIST:
    case ActionTypes.SHOP_ALLOCATE_INDEX_GET_ALLOTLIST:
      switch (action.status) {
        case STATUS_REQUEST:
          if (action.requestData.offset === 0) {
            return assign({}, state, {list: null})
          } else {
            return state
          }
        case STATUS_SUCCESS:
          return assign({}, state, {list: action.requestData.offset === 0 ? action.payload.list || [] : state.list.concat(action.payload.list || [])})
      }
      return state
    case ActionTypes.SHOP_ALLOCATE_INDEX_GET_TAB_OPTION:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {districts: null, sellerStatus: null})
        case STATUS_SUCCESS:
          return assign({}, state, action.payload)
      }
      return state
  }
  return state
}

function ChosePage (state = null, action) {
  switch (action.type) {
    case ActionTypes.SHOP_ALLOCATE_CHOSE_GET_LIST:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, action.payload)
      }
      return state
    case ActionTypes.SHOP_ALLOCATE_CHOSE_GET_SAVE_BD:
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
  IndexPage,
  ChosePage
}
