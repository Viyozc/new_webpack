import {
  wrapAction
} from 'utils/fetch'
import {
  AGENTBD_TEAM_LIST
} from 'constants/actionTypes/a/agentBD/teamList/'

export function getAgentBDList (param) {
  return wrapAction({
    type: AGENTBD_TEAM_LIST,
    endpoint: '/leo/1.0/bdagent/shop/getBDListByLeaderId',
    body: param,
    method: 'get'
  })
}
