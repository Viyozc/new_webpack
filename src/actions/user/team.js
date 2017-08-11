import {
  wrapAction
} from 'utils/fetch'
import {
  FETCH_DATA_SELLER_MYTEAM
} from 'constants/actionTypes/user/team'

export function fetchDataSellerMyTeam (params) {
  return wrapAction({
    type: FETCH_DATA_SELLER_MYTEAM,
    endpoint: '/leo/1.0/data/seller/myTeam',
    body: params,
    method: 'get'
  })
}
