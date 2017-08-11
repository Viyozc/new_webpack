import assign from 'lodash/assign'
import * as types from 'constants/actionTypes/a/replaceBD/'

export function replaceBDChose (state = {}, action) {
  switch (action.type) {
  case types.REPLACE_BD_SHOP_ALLOCATE:
    if(!action.payload) return state
    const {list} = action.payload
    return assign({}, state, {list})
  case types.REPLACE_BD_REPLACE_BD:
    return assign({}, state, {success: action.status})
  }
  return state
}