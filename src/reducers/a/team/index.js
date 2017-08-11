import assign from 'lodash/assign'
import {
  STATUS_SUCCESS,
  STATUS_REQUEST
} from 'redux-fetch-elegant'
import {
  A_TEAM_INDEX_GETLIST,
  A_TEAM_DETAIL_GETDETAIL,
  A_TEAM_ADDTEAM,
  A_TEAM_CHANGE_WORK_STATE,
  A_TEAM_GET_DIMISSION_BDLIST
} from 'constants/actionTypes/a/team/'

export default function agentTeam (state = {}, action) {
  switch (action.type) {
    case A_TEAM_INDEX_GETLIST:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {teamList: action.payload})
      }
      break
    case A_TEAM_DETAIL_GETDETAIL:
      if (action.status === STATUS_SUCCESS) {
        state = state = assign({}, state, {teamDetail: action.payload})
      }
      break
    case A_TEAM_ADDTEAM:
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
    case A_TEAM_CHANGE_WORK_STATE:
      state = assign({}, state, {
        workState: action.status
      })
      break 
    case A_TEAM_GET_DIMISSION_BDLIST:
      if(action.status === STATUS_SUCCESS){
        state = assign({}, state, {
          dimissionList: action.payload
        })
      }
      break;
  }
  return state
}
