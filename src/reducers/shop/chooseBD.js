import assign from 'object-assign'
import * as ActionTypes from 'constants/actionTypes/shop/chooseBD'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE
} from 'redux-fetch-elegant'

export default function chooseBD (state = {}, action) {
  switch (action.type) {
  case ActionTypes.SHOP_ALLOCATE_GET_SELLERS:
    if(action.status != STATUS_SUCCESS){
      return state
    }
    return assign({}, state, {
      list: action.payload.list
    })
  case ActionTypes.SHOP_ALLOCATE_REPLACE_BD:
    return assign({}, state, {
      success: action.status
    }) 
  }
  return state
}