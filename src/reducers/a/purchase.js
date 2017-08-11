import assign from 'object-assign'
import ActionTypes from 'constants/actionTypes/a/purchase'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE
} from 'redux-fetch-elegant'

function IndexPage (state = null, action) {
  switch (action.type) {
    case ActionTypes.A_PURCHASE_GET_LIST:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {list: action.requestData.offset === 0 ? null : action.payload})
        case STATUS_SUCCESS:
          return assign({}, state, {list: action.requestData.offset === 0 ? action.payload : state.list.concat(action.payload)})
      }
      return state
  }
  return state
}
function ApplyPage (state = null, action) {
  switch (action.type) {
    case ActionTypes.A_PURCHASE_APPLY_GET_PRODUCTS:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {products: action.payload})
      }
      return state
    case ActionTypes.A_PURCHASE_APPLY_TRIGGER_UPDATE_COUNT:
      let products = [].concat(state.products)
      products[action.payload.index].count = Number(action.payload.value || 0)
      return assign({}, state, {products: products})
  }
  return state
}

function ConfirmBookPage (state = null, action) {
  switch (action.type) {
    case ActionTypes.A_PURCHASE_CONFIRMBOOK_GET_APPLY:
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
  IndexPage,
  ApplyPage,
  ConfirmBookPage
}
