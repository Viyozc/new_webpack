import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/channel/'

let fetchHomeData = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_GET_HOME_DATA,
    endpoint: '/leo/1.0/h5/agent/home',
    body: params,
    method: 'GET'
  })
}

let fetchMonthData = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_GET_MONTH_DATA,
    endpoint: '/leo/1.0/h5/agent/monthHome',
    body: params,
    method: 'GET'
  })
}

export {
  fetchHomeData,
  fetchMonthData
}
