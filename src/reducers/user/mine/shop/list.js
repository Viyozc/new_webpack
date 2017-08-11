import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import ActionTypes from 'constants/actionTypes/user/mine/shop'

export default function reducer (state = {}, action) {
  switch (action.type) {
    case ActionTypes.FETCH_GET_MY_SHOP_LIST:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {list: action.requestData.offset === 0 ? action.payload : state.list.concat(action.payload)})
      }
      return state
  }
  return state
}
