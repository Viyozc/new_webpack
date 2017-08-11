import {
  wrapAction
} from 'utils/fetch'
import {
  FETCH_DATA_SELLER_TEAMMEMBER,
  CLEAN_DATA_SELLER_TEAMMEMBER
} from 'constants/actionTypes/user/teamMember'

export function fetchDataSellerTeamMember (params) {
  return wrapAction({
    type: FETCH_DATA_SELLER_TEAMMEMBER,
    endpoint: '/leo/1.0/data/seller/teamMember',
    body: params,
    method: 'get'
  })
}

export function clearCurrentData () {
  return {
    type: CLEAN_DATA_SELLER_TEAMMEMBER,
    payload: null
  }
}
