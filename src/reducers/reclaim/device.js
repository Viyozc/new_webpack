import ActionTypes from 'constants/actionTypes/install/reclaim'
import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function reducer (state = null, action) {
  switch (action.type) {
    case ActionTypes.RECLAIM_GET_SCAN_DEVICE:
      switch (action.status) {
        case STATUS_SUCCESS:
          let reclaimDevices = [].concat(state && state.reclaimDevices || [])
          let flag = false
          for (let i = 0; i < reclaimDevices.length; i++) {
            if (action.payload.deviceNo && reclaimDevices[i].deviceNo === action.payload.deviceNo) {
              flag = true
              break
            }
          }
          action.payload.deviceNo && !flag && reclaimDevices.push(action.payload)
          return assign({}, state, {reclaimDevices})
      }
      return state
    case ActionTypes.RECLAIM_CLEAR_DEVICE:
      return null
    case ActionTypes.RECLAIM_ADD_DEVICE:
      return assign({}, state, action.payload)
    case ActionTypes.RECLAIM_REDUCE_DEVICE:
      let reclaimDevices = [].concat(state.reclaimDevices)
      for (let i = 0; i < reclaimDevices.length; i++) {
        if (reclaimDevices[i].deviceNo === action.payload.deviceNo) {
          reclaimDevices.splice(i, 1)
          break
        }
      }
      return assign({}, state, {reclaimDevices})
    case ActionTypes.RECLAIM_GET_PRODECTSICONS:
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
    case ActionTypes.RECLAIM_GET_CHANGEVALUE:
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
  }
  return state
}
