import assign from 'object-assign'
import ActionTypes from 'constants/actionTypes/channel/agentBD'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE
} from 'redux-fetch-elegant'

let IndexPage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHANNEL_AGENT_BD_GET_LIST:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {list: action.requestData.offset === 0 ? null : state.list})
        case STATUS_SUCCESS:
          return assign({}, state, {list: action.requestData.offset === 0 ? action.payload.list : state.list.concat(action.payload.list)})
      }
      return state
  }
  return state
}

let SearchPage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.CHANNEL_AGENT_BD_GET_SEARCH_LIST:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {list: action.requestData.offset === 0 ? null : state.list})
        case STATUS_SUCCESS:
          return assign({}, state, {list: action.requestData.offset === 0 ? action.payload.list : state.list.concat(action.payload.list)})
      }
      return state
  }
  return state
}

let CreatePage = (state = {editInfo: {}}, action) => {
  switch (action.type) {
    case ActionTypes.CHANNEL_AGENT_BD_TRIGGER_UPDATE_AGENT_INFO:
      state.editInfo[action.payload.key] = action.payload.value
      return assign({}, state, {editInfo: assign({}, state.editInfo)})
    case ActionTypes.CHANNEL_AGENT_BD_TRIGGER_CLEAN_EDIT_INFO:
      return assign({}, state, {editInfo: {}})
    case ActionTypes.CHANNEL_AGENT_BD_GET_AGENT_INFO:
      switch (action.status) {
        case STATUS_SUCCESS:
          action.payload.agentStartTime = action.payload.agentStartTime
          action.payload.agentEndTime = action.payload.agentEndTime
          // action.payload.agent = {
          //   key: action.payload.level && action.payload.level.levelValue,
          //   value: action.payload.level && action.payload.level.levelKey
          // }
          return assign({}, state, {editInfo: action.payload})
      }
      return state
    case ActionTypes.CHANNEL_AGENT_BD_POST_SAVE_AGENT:
    case ActionTypes.CHANNEL_AGENT_BD_POST_UPDATE_AGENT:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: 'success'})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
  }
  return state
}

export default {
  IndexPage,
  SearchPage,
  CreatePage
}
