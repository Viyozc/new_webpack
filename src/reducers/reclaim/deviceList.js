import ActionTypes from 'constants/actionTypes/install/reclaim'
import assign from 'lodash/assign'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function reducer (state = null, action) {
  switch (action.type) {
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
