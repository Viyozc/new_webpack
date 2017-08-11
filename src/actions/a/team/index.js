import {
  wrapAction
} from 'utils/fetch'
import {
  A_TEAM_INDEX_GETLIST,
  A_TEAM_DETAIL_GETDETAIL,
  A_TEAM_ADDTEAM,
  A_TEAM_CHANGE_WORK_STATE,
  A_TEAM_GET_DIMISSION_BDLIST
} from 'constants/actionTypes/a/team/'

export function getList (param) {
  return wrapAction({
    type: A_TEAM_INDEX_GETLIST,
    endpoint: '/leo/1.0/h5/agent/boss/myTeam',
    body: param,
    method: 'get'
  })
}

export function getDetail (param) {
  return wrapAction({
    type: A_TEAM_DETAIL_GETDETAIL,
    endpoint: '/leo/1.0/h5/agent/boss/teamMember',
    body: param,
    method: 'get'
  })
}

export function addTeam (param) {
  return wrapAction({
    type: A_TEAM_ADDTEAM,
    endpoint: '/leo/1.0/h5/agent/boss/memberAdd',
    body: param,
    method: 'get'
  })
}

export function changeWorkState (param) {
  return wrapAction({
    type: A_TEAM_CHANGE_WORK_STATE,
    endpoint: '/leo/1.0/agent/boss/changeWorkState',
    body: param,
    method: 'get'
  }) 
}

export function getDimissionBDList (param) {
  return wrapAction({
    type: A_TEAM_GET_DIMISSION_BDLIST,
    endpoint: '/leo/1.0/agent/boss/getDimissionBDList',
    body: param,
    method: 'get'
  }) 
}