import {
  wrapAction
} from 'utils/fetch'
import {
  AGENTBD_TEAM_INDEX_GETLIST,
  AGENTBD_TEAM_ADDTEAM
} from 'constants/actionTypes/a/agentBD/team/'

export function getList (param) {
  return wrapAction({
    type: AGENTBD_TEAM_INDEX_GETLIST,
    endpoint: '/leo/1.0/h5/bdagent/boss/myTeam',
    body: param,
    method: 'get'
  })
}

export function addTeam (param) {
  return wrapAction({
    type: AGENTBD_TEAM_ADDTEAM,
    endpoint: '/leo/1.0/h5/bdagent/boss/memberAdd',
    body: param,
    method: 'get'
  })
}
