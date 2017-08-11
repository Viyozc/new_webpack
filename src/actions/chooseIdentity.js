import {
  wrapAction
} from 'utils/fetch'
import {
  FETCH_USER_CHECK_ROLE,
  FETCH_USER_CHOSE_ROLE,
  CLEAN_ROLE
} from 'constants/actionTypes/types'

export function fetchUserCheckRole (roles) {
  return wrapAction({
    type: FETCH_USER_CHECK_ROLE,
    endpoint: '/leo/1.0/h5/user/checkRole',
    body: {roles},
    method: 'get'
  })
}
export function fetchUsereChoseRole (params) {
  return wrapAction({
    type: FETCH_USER_CHOSE_ROLE,
    endpoint: '/leo/1.0/h5/user/choseRole',
    body: params,
    method: 'get'
  })
}
export function cleanRole () {
  return {
    type: CLEAN_ROLE
  }
}
