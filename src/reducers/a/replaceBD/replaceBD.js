import assign from 'lodash/assign'
import * as types from 'constants/actionTypes/a/replaceBD/'

export function replaceBD (state = {}, action) {
  switch (action.type) {
  case types.REPLACE_BD_GET_CHANGE_SHOP_LIST:
    // console.log(action.payload)
    if(action.payload){
      return assign({}, state, {content: action.payload})
    }
    return state
  case types.REPLACE_BD_GET_CONDITION_BY_AGENT:
    if(action.payload){
      const {districtMapList, sellerMapList} = action.payload;
      return assign({}, state, {districtMapList, sellerMapList})
    }
    return state
  }
  return state
}
