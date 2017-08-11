import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/channel/agent'

let fetchList = (params) => {
  params.cityCode = params.cityCode || '0'
  return wrapAction({
    type: ActionTypes.CHANNEL_AGENT_GET_LIST,
    endpoint: '/leo/1.0/agent/channel/agentAccountList',
    body: params,
    method: 'GET'
  })
}

let fetchSearchList = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_AGENT_GET_SEARCH_LIST,
    endpoint: '/leo/1.0/agent/channel/searchAgentByName',
    body: params,
    method: 'GET'
  })
}

let fetchAgentInfo = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_AGENT_GET_AGENT_INFO,
    endpoint: '/leo/1.0/agent/channel/getAgentInfo',
    body: params,
    method: 'GET'
  })
}

let fetchSaveAgent = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_AGENT_POST_SAVE_AGENT,
    endpoint: '/leo/1.0/agent/channel/addAgentAccount',
    body: params,
    method: 'POST'
  })
}

let fetchUpdateAgent = (params) => {
  return wrapAction({
    type: ActionTypes.CHANNEL_AGENT_POST_UPDATE_AGENT,
    endpoint: '/leo/1.0/agent/channel/editAgentAccount',
    body: params,
    method: 'POST'
  })
}
let updateAgentInfo = (value, key) => {
  return {
    type: ActionTypes.CHANNEL_AGENT_TRIGGER_UPDATE_AGENT_INFO,
    payload: {key, value}
  }
}
let cleanEditInfo = (value, key) => {
  return {
    type: ActionTypes.CHANNEL_AGENT_TRIGGER_CLEAN_EDIT_INFO
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
