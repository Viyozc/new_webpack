import assign from 'object-assign'
import ActionTypes from 'constants/actionTypes/bd/device'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE
} from 'redux-fetch-elegant'

let listPage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.BD_DEVICE_GET_LIST:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {
            list: action.requestData.offset === 0 ? action.payload.list : state.list.concat(action.payload.list),
            deviceNoBatteryNum: action.payload.deviceNoBatteryNum,
            deviceWithBatteryNum: action.payload.deviceWithBatteryNum,
            waitBackCount: action.payload.waitBackCount,
            waitGetCount: action.payload.waitGetCount,
            userProducts: action.payload.userProducts
          })
      }
      return state
    case ActionTypes.BD_DEVICE_GET_LOST_CANCEL:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: STATUS_REQUEST})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: STATUS_SUCCESS})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: STATUS_FAILURE})
      }
      return state
    case ActionTypes.BD_DEVICE_GET_LIST_LOST:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {
            list: action.requestData.offset === 0 ? action.payload.list : state.list.concat(action.payload.list),
            deviceNoBatteryNum: action.payload.deviceNoBatteryNum,
            deviceWithBatteryNum: action.payload.deviceWithBatteryNum,
            waitBackCount: action.payload.waitBackCount,
            waitGetCount: action.payload.waitGetCount,
            userProducts: action.payload.userProducts
          })
      }
      return state
    case ActionTypes.BD_DEVICE_GET_CANCEL_GET:
    case ActionTypes.BD_DEVICE_GET_CANCEL_BACK:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: 'success'})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
    case ActionTypes.BD_DEVICE_GET_REJECT_BORROW:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: 'success'})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
    case ActionTypes.BD_DEVICE_GET_AGREE_BORROW:
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

let recyclePage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.BD_DEVICE_GET_RECYCLE:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: 'success'})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
    case ActionTypes.BD_DEVICE_GET_UPLOAD_RECYCLE:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetchRequest: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetchRequest: 'success', fetchType: action.type})
        case STATUS_FAILURE:
          return assign({}, state, {fetchRequest: 'failure'})
      }
  }
  return state
}

let applyPage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.BD_DEVICE_GET_APPLY:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: 'success'})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
    case ActionTypes.BD_DEVICE_GET_MAX_COUNT:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {maxCount: action.payload.deviceNum, maxBoxNum: action.payload.maxBoxNum})
      }
      return state
    case ActionTypes.BD_DEVICE_GET_PRODECTSICONS:
      switch (action.status) {
        case STATUS_SUCCESS:
          let majorProducts = []
          let accessories = []
          action.payload && action.payload.list.map((item, i) => {
            item.isDevice === 1 ? majorProducts.push(item) : accessories.push(item)
          })
          return assign({}, state, {majorProducts: majorProducts, accessories: accessories})
      }
      return state
    case ActionTypes.BD_DEVICE_GET_CHANGEVALUE:
      if (action.payload.type === 'majorProducts') {
        let majorProducts = [].concat(state.majorProducts)
        majorProducts[action.payload.index].normalNum = action.payload.newValue
        return assign({}, state, {majorProducts})
      }
      if (action.payload.type === 'accessories') {
        let accessories = [].concat(state.accessories)
        accessories[action.payload.index].normalNum = action.payload.newValue
        return assign({}, state, {accessories})
      }
      break
    case ActionTypes.BD_DEVICE_GET_UPLOAD_APPLY:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetchRequest: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetchRequest: 'success', fetchType: action.type})
        case STATUS_FAILURE:
          return assign({}, state, {fetchRequest: 'failure'})
      }
      return state
    case ActionTypes.BD_DEVICE_GET_EXCHANGE_APPLY:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetchRequest: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetchRequest: 'success', fetchType: action.type})
        case STATUS_FAILURE:
          return assign({}, state, {fetchRequest: 'failure'})
      }
      return state
  }
  return state
}

let losePage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.BD_DEVICE_GET_LOST:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {
            lostList: action.payload
          }, {fetch: 'success'})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
  }
  return state
}

let lostDevicePage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.BD_DEVICE_GET_LOST_LIST:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {
            fetch: 'request',
            lostList: action.requestData.offset === 0 ? null : state.lostList
          })
        case STATUS_SUCCESS:
          return assign({}, state, {
            lostList: action.requestData.offset === 0 ? action.payload.list
              : state.lostList.concat(action.payload.list)
          }, {fetch: 'success'})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
    case ActionTypes.BD_DEVICE_GET_LOST_DETAIL:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {lostDetail: action.payload}, {fetch: 'success'})
      }
      return state
    case ActionTypes.BD_DEVICE_GET_REFUSE_REASONS:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {reasonList: action.payload.opts}, {fetch: 'success'})
      }
      return state
    case ActionTypes.BD_DEVICE_LOST_REJECT:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: 'success'}, {actionType: ActionTypes.BD_DEVICE_LOST_REJECT})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
    case ActionTypes.BD_DEVICE_LOST_AGREE:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: 'success'}, {actionType: ActionTypes.BD_DEVICE_LOST_AGREE})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
    case ActionTypes.BD_DEVICE_LOST_CLEAR:
      return assign({}, state, {actionType: null})
    case ActionTypes.GET_ALL_BD:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {bdList: action.payload})
      }
      return state
  }
  return state
}

let bdHandleLostPage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.BD_DEVICE_GET_FIND_LOST:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: STATUS_REQUEST})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: STATUS_SUCCESS})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: STATUS_FAILURE})
      }
      return state
  }
  return state
}

let bdExchangePage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.BD_DEVICE_GET_BDS:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {
            bdList: action.requestData.offset === 0 ? action.payload.list : state.bdList.concat(action.payload.list)
          }, {fetch: 'success'})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
    case ActionTypes.BD_DEVICE_GET_BD_DEVICE:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {
            bdList: action.payload
          }, {fetch: 'success'})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
  }
  return state
}

let supplyPage = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.DEVICE_SUPPLY_GET:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {data: action.payload || {}})
      }
      return state
    case ActionTypes.DEVICE_SUPPLY_POST:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: 'success', fetchRequest: 'fetchType'})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
    case ActionTypes.DEVICE_SUPPLY_START:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: 'success', fetchRequest: ActionTypes.DEVICE_SUPPLY_START})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
    case ActionTypes.DEVICE_SUPPLY_END:
      switch (action.status) {
        case STATUS_REQUEST:
          return assign({}, state, {fetch: 'request'})
        case STATUS_SUCCESS:
          return assign({}, state, {fetch: 'success', fetchRequest: ActionTypes.DEVICE_SUPPLY_END})
        case STATUS_FAILURE:
          return assign({}, state, {fetch: 'failure'})
      }
      return state
    case ActionTypes.CLEAR_DEVICE_DATA:
      return null
  }
  return state
}

export default {
  listPage,
  recyclePage,
  applyPage,
  losePage,
  lostDevicePage,
  bdHandleLostPage,
  bdExchangePage,
  supplyPage
}
