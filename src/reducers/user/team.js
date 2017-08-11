import assign from 'lodash/assign'
import {
  FETCH_DATA_SELLER_MYTEAM
} from 'constants/actionTypes/user/team'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function fetchDataSellerMyTeamReducer (state = {}, action) {
  switch (action.type) {
    case FETCH_DATA_SELLER_MYTEAM:
      if (action.status === STATUS_SUCCESS) {
        state.list = action.payload
        return assign({}, state)
      }
  }
  return state
}
