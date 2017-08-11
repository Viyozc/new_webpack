import assign from 'lodash/assign'
import {
  STATUS_SUCCESS,
  STATUS_REQUEST
} from 'redux-fetch-elegant'
import {
  AGENTBD_TEAM_INDEX_GETLIST,
  AGENTBD_TEAM_ADDTEAM
} from 'constants/actionTypes/a/agentBD/team/'

export default function agentBDTeam (state = {}, action) {
  switch (action.type) {
    case AGENTBD_TEAM_INDEX_GETLIST:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {teamList: action.payload})
      }
      break
    case AGENTBD_TEAM_ADDTEAM:
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          submitStatus: 'request'
        })
      } else if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          submitStatus: 'success'
        })
      } else {
        state = assign({}, state, {
          submitStatus: 'failure'
        })
      }
      break
  }
  return state
}
