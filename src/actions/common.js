import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/common'

// 获取城市 小二二级数据
let fetchBdMembersInCity = () => {
  return wrapAction({
    type: ActionTypes.COMMON_GET_BD_MEMBERS_IN_CITY,
    endpoint: '/leo/1.0/h5/data/leader/member',
    body: {},
    method: 'get'
  })
}

// 获取城市三级数据
let fetchAllMembersInCity = () => {
  return wrapAction({
    type: ActionTypes.COMMON_GET_ALL_MEMBERS_IN_CITY,
    endpoint: '/leo/1.0/h5/data/leader/member/ext',
    body: {},
    method: 'get'
  })
}

let fetchMonthList = () => {
  return wrapAction({
    type: ActionTypes.COMMON_GET_MONTHLIST,
    endpoint: '/leo/1.0/h5/data/seller/monthList',
    body: {},
    method: 'get'
  })
}

let fetchAgentLevel = () => {
  return wrapAction({
    type: ActionTypes.COMMON_GET_AGENT_LEVEL,
    endpoint: '/leo/1.0/agent/channel/agentLevel',
    body: null,
    method: 'get'
  })
}

let fetchCity = () => {
  return wrapAction({
    type: ActionTypes.COMMON_GET_CITY,
    endpoint: '/leo/1.0/h5/address/allCity',
    body: null,
    method: 'get'
  })
}

let fetchArea = (params) => {
  return wrapAction({
    type: ActionTypes.COMMON_GET_AREA,
    endpoint: '/leo/1.0/h5/address/getDistrict',
    body: params,
    method: 'get'
  })
}

// {cityCode: 310100} 不传的话取当前用户所在城市的区域
let fetchDistrict = (params) => {
  return wrapAction({
    type: ActionTypes.COMMON_GET_DISTRIC,
    endpoint: '/leo/1.0/address/getDistrict',
    body: params,
    method: 'get'
  })
}

let fetchShopType = () => {
  return wrapAction({
    type: ActionTypes.COMMON_GET_SHOP_TYPE,
    endpoint: '/leo/1.0/h5/shop/getType',
    body: null,
    method: 'get'
  })
}

let fetchOfflineReason = () => {
  return wrapAction({
    type: ActionTypes.COMMON_GET_OFFLINE_REASON,
    endpoint: '',
    body: null,
    method: 'get'
  })
}

export {
  fetchBdMembersInCity,
  fetchMonthList,
  fetchAgentLevel,
  fetchCity,
  fetchArea,
  fetchDistrict,
  fetchShopType,
  fetchOfflineReason,
  fetchAllMembersInCity
}
