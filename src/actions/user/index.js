import {
  wrapAction
} from 'utils/fetch'
import {
  FETCH_USER
} from 'constants/actionTypes/user'

export function fetchUser () {
  return wrapAction({
    type: FETCH_USER,
    endpoint: '/leo/1.0/h5/user/home/baseInfo',
    body: null,
    method: 'get'
  })
}
