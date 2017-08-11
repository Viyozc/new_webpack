import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/channel/agentBD'

let fetchList = (params) => {
  params.cityCode = params.cityCode || '0'
  return wrapAction({
    type: ActionTypes.CHANNEL_AGENT_BD_GET_LIST,
    endpoint: '/leo/1.0/bdagent/getBDAgentList',
    body: params,
    method: 'GET'
  })
}

let fetchSearchList = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_AGENT_BD_GET_SEARCH_LIST,
    endpoint: '/leo/1.0/bdagent/searchAgentByName',
    body: params,
    method: 'GET'
  })
}

let fetchAgentInfo = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_AGENT_BD_GET_AGENT_INFO,
    endpoint: '/leo/1.0/bdagent/getBDAgentInfo',
    body: params,
    method: 'GET'
  })
}

let fetchSaveAgent = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_AGENT_BD_POST_SAVE_AGENT,
    endpoint: '/leo/1.0/bdagent/addBDAgentInfo',
    body: params,
    method: 'POST'
  })
}

let fetchUpdateAgent = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_AGENT_BD_POST_UPDATE_AGENT,
    endpoint: '/leo/1.0/bdagent/editBDAgentInfo',
    body: params,
    method: 'POST'
  })
}
let updateAgentInfo = (value, key) => {
  return {
    type: ActionTypes.CHANNEL_AGENT_BD_TRIGGER_UPDATE_AGENT_INFO,
    payload: {key, value}
  }
}
let cleanEditInfo = (value, key) => {
  return {
    type: ActionTypes.CHANNEL_AGENT_BD_TRIGGER_CLEAN_EDIT_INFO
  }
}

export {
  fetchList,
  fetchSearchList,
  fetchSaveAgent,
  fetchUpdateAgent,
  fetchAgentInfo,
  updateAgentInfo,
  cleanEditInfo
}
