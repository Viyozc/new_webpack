import {
  wrapAction
} from 'utils/fetch'
import {
  AGENT_BD_HOME_FETCH_DATA_PREVIEW,
  AGENT_BD_HOME_FETCH_DATA_MONTHLIST
} from 'constants/actionTypes/a/agentBD/home/'

export function fetchHomeData (params) {
  return wrapAction({
    type: AGENT_BD_HOME_FETCH_DATA_PREVIEW,
    endpoint: '/leo/1.0/h5/agent/home',
    body: params,
    method: 'GET'
  })
}

export function fetchMonthData (params) {
  return wrapAction({
    type: AGENT_BD_HOME_FETCH_DATA_MONTHLIST,
    endpoint: '/leo/1.0/h5/agent/monthHome',
    body: params,
    method: 'GET'
  })
}
