import assign from 'lodash/assign'
import {
  FETCH_DATA_SELLER_TEAMMEMBER,
  CLEAN_DATA_SELLER_TEAMMEMBER
} from 'constants/actionTypes/user/teamMember'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function fetchDataSellerTeamMemberReducer (state = {}, action) {
  switch (action.type) {
    case FETCH_DATA_SELLER_TEAMMEMBER:
      if (action.status === STATUS_SUCCESS) {
        state.info = action.payload
        return assign({}, state)
      }
      return state
    case CLEAN_DATA_SELLER_TEAMMEMBER:
      return {}
  }
  return state
}
