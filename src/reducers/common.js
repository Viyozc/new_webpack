import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import ActionTypes from 'constants/actionTypes/common'
import assign from 'lodash/assign'

function common (state = null, action) {
  switch (action.type) {
    case ActionTypes.COMMON_GET_BD_MEMBERS_IN_CITY:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {bdMembersInCity: null})
        case STATUS_SUCCESS:
          let bdMembersInCity = {}
          if (action.payload && action.payload.length > 0) {
            bdMembersInCity = {cities: [], members: {}}
            action.payload.map((item, i) => {
              bdMembersInCity.cities.push({key: item.cityName, value: item.cityCode})
              bdMembersInCity.members[item.cityCode] = item.member.map((o, i) => {
                return {key: o.nickName, value: o.id}
              })
            })
          }
          return assign({}, state, {bdMembersInCity: bdMembersInCity, bdMembers: action.payload})
      }
      return state
    // 获取城市三级类目
    case ActionTypes.COMMON_GET_ALL_MEMBERS_IN_CITY:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {cityLevel3List: null})
        case STATUS_SUCCESS:
          let cityLevel3List = [
            {id: 0, name: '所有城市', num: 0, cityList: [{id: 0, name: '所有城市', members: [{id: 0, name: '所有员工'}]}]},
            {id: 1, name: '直营城市', num: 0, cityList: [{id: 0, name: '所有城市', members: [{id: 0, name: '所有员工'}]}]},
            {id: 2, name: '代理城市', num: 0, cityList: [{id: 0, name: '所有城市', members: [{id: 0, name: '所有代理'}]}]}
          ]
          if (action.payload) {
            let allMembers = []
            // 直营城市
            action.payload.direct && action.payload.direct.map((item1, n) => {
                let membersList = []
                item1.member.map((mem, k) => {

                  // 获取直营城市所有员工并重组为id,name
                  if(n !== 0 && mem.id !== 0){
                    cityLevel3List[1].cityList[0].members.push({id: mem.id, name: mem.nickName})
                  }

                  // 获取直营对应城市的所有员工并重组为id,name
                  if(mem.id !== 0 && n !== 0){
                    membersList.push({id: mem.id, name: mem.nickName})
                  }else {
                    membersList.push({id: 0, name: '所有员工'})
                  }

                  // 获取直营&代理的所有员工并重组为id,name
                  if (mem.id === 0 && k === 0 && n===0) {
                    allMembers.push({id: mem.id, name: '所有员工'})
                  } else {
                    if (mem.id !== 0) {
                      allMembers.push({id: mem.id, name: mem.nickName})
                    }
                  }
                })

                // 重组直营城市变成id,name
                if(n !== 0){
                  let cityItem = {
                    id: item1.cityCode,
                    name: item1.cityName,
                    members: []
                  }
                  cityItem.members = membersList
                  // 所有城市添加对应城市
                  cityLevel3List[0].cityList.push(cityItem)
                  // 直营城市添加自己的城市
                  cityLevel3List[1].cityList.push(cityItem)
                }
              })

            // 代理城市
            action.payload.agent && action.payload.agent.map((item, i) => {
                let members = []
                item.member.map((member, j) => {

                  // 获取代理城市所有员工并重组为id,name
                  if(i !== 0 && member.id !== 0){
                    cityLevel3List[2].cityList[0].members.push({id: member.id, name: member.nickName})
                  }

                  // 获取代理对应城市的所有员工并重组为id,name
                  if(member.id !== 0 && i !== 0){
                    members.push({id: member.id, name: member.nickName})
                  }else {
                    members.push({id: 0, name: '所有代理'})
                  }

                  // 获取直营&代理的所有员工并重组为id,name
                  if(member.id !== 0 && j !== 0 && i !== 0){
                    let isHaveMember = false
                    allMembers.map((m, q) => {
                      if(parseInt(member.id) === parseInt(m.id)) {
                        isHaveMember = true
                      }
                    })
                    if(!isHaveMember && member.id !== 0) {
                      allMembers.push({id: member.id, name: member.nickName})
                    }
                  }
                })

                if(i !== 0){
                  let citys = {
                    id: item.cityCode,
                    name: item.cityName,
                    members
                  }

                  // 所有城市数据去重
                  let isHaveCitys = false
                  cityLevel3List[0].cityList.map((item2, x) => {
                    if(parseInt(citys.id) === parseInt(item2.id)) {
                      isHaveCitys = true
                      // members.map((w, l) => {
                      //   if(w.id !== 0 ){
                      //     cityLevel3List[0].cityList[x].members.push(w)
                      //   }
                      // })
                    }
                  })
                  if(!isHaveCitys) {
                    cityLevel3List[0].cityList.push(citys)
                  }
                  cityLevel3List[2].cityList.push(citys)
                }
              })
            // 所有城市所有员工添加完毕后负值
            cityLevel3List[0].cityList[0].members = allMembers

          }
          return assign({}, state, {cityLevel3List})
      }
      return state
    case ActionTypes.COMMON_GET_MONTHLIST:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {monthList: action.payload})
      }
      return state
    case ActionTypes.COMMON_GET_OFFLINE_REASON:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {reasons: action.payload})
      }
      return state
    case ActionTypes.COMMON_GET_CITY:
      switch (action.status) {
        case STATUS_SUCCESS:
          let provincesAndCities = {}
          if (action.payload && action.payload.length > 0) {
            provincesAndCities = {provinces: [], cities: {}}
            action.payload.map((item, i) => {
              provincesAndCities.provinces.push({cityName: item.cityName, cityCode: item.cityCode})
              provincesAndCities.cities[item.cityCode] = item.cities
            })
          }
          return assign({}, state, {provincesAndCities})
      }
      return state
    case ActionTypes.COMMON_GET_AGENT_LEVEL:
      switch (action.status) {
        case STATUS_SUCCESS:
          let agentLevels = action.payload && action.payload.map((item, i) => {
              return {value: parseInt(item.levelKey), key: item.levelValue}
            })
          return assign({}, state, {agentLevels})
      }
      return state
    case ActionTypes.COMMON_GET_AREA:
      switch (action.status) {
        case STATUS_SUCCESS:
          let areaList = []
          for (let i = 0; i < action.payload.length; i++) {
            areaList.push({key: action.payload[i].districtName, value: action.payload[i].districtCode})
          }
          return assign({}, state, {areaList})
      }
      return state
    case ActionTypes.COMMON_GET_SHOP_TYPE:
      switch (action.status) {
        case STATUS_SUCCESS:
          let typeAndSubType = {}
          if (action.payload && action.payload.length > 0) {
            typeAndSubType = {type: [], subType: {}}
            action.payload.map((item, i) => {
              typeAndSubType.type.push(item)
              typeAndSubType.subType[item.id] = item.sub.map((o, i) => {
                return o
              })
            })
          }
          return assign({}, state, {typeAndSubType})
      }
      return state
    case ActionTypes.COMMON_GET_DISTRIC:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {district: action.payload})
      }
      return state
  }
  return state
}

export default {
  common
}
