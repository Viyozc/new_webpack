import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  AGENTBD_TEAM_LIST
} from 'constants/actionTypes/a/agentBD/teamList/'

export default function agentBDTeamList (state = {}, action) {
  switch (action.type) {
    case AGENTBD_TEAM_LIST:
      if (action.status === STATUS_SUCCESS) {
        let list = [{key: '代理BD', value: 0}]
        for (let i = 0; i < action.payload.length; i++) {
          let temp = {}
          temp.key = action.payload[i].bdAgentName
          temp.value = action.payload[i].bdAgentId
          list.push(temp)
        }
        state = assign({}, state, {list})
      }
      break
  }
  return state
}
