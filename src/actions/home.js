import {
  wrapAction
} from 'utils/fetch'
import {
  FETCH_DATA_PREVIEW,
  FETCH_DATA_MONTHLIST
} from 'constants/actionTypes/home'

export function fetchDataPreview (params) {
  return wrapAction({
    type: FETCH_DATA_PREVIEW,
    endpoint: '/leo/1.0/h5/user/home',
    body: params,
    method: 'get'
  })
}

export function fetchDataMonthList () {
  return wrapAction({
    type: FETCH_DATA_MONTHLIST,
    endpoint: '/leo/1.0/h5/data/seller/monthList',
    body: {},
    method: 'get'
  })
}
