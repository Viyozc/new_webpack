import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/bd/'

let fetchHomeData = (params) => {
  return wrapAction({
    type: ActionTypes.BD_GET_HOME_DATA,
    endpoint: '/leo/1.0/h5/user/home',
    body: params,
    method: 'GET'
  })
}

let fetchHomeBoxData = (params) => {
  return wrapAction({
    type: ActionTypes.BD_GET_HOME_BOX_DATA,
    // endpoint: '/leo/1.0/h5/user/home',
    endpoint: '/Einstein/data/box/home',
    body: params,
    method: 'POST'
  })
}

let fetchMonthData = (params) => {
  return wrapAction({
    type: ActionTypes.BD_GET_MONTH_DATA,
    endpoint: '/leo/1.0/data/perf/base',
    body: params,
    method: 'GET'
  })
}

export {
  fetchHomeData,
  fetchHomeBoxData,
  fetchMonthData
}
