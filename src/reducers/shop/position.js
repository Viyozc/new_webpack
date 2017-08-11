import assign from 'lodash/assign'
import { POI_LOCATED, POI_CHANGE, FETCH_SHOP_POSITION_CITIES, FETCH_SHOP_POSITION_WAIT_INSTALL_SHOPS } from 'constants/actionTypes/shop/position'
import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'

export default function fetchDataSellerShopListReducer (state = {}, action) {
  switch (action.type) {
    case POI_CHANGE:
      return assign({}, state, {poi: assign({}, state.poi, action.payload)})
    case POI_LOCATED:
      return assign({}, state, {currentPoi: action.payload, poi: action.payload})
    case FETCH_SHOP_POSITION_WAIT_INSTALL_SHOPS:
      if (action.status === STATUS_SUCCESS) {
        return assign({}, state, {markers: action.payload})
      }
      break
    case FETCH_SHOP_POSITION_CITIES:
      if (action.status === STATUS_SUCCESS) {
        let cities = []
        for (let cityCode in action.payload) {
          cities.push({key: action.payload[cityCode], value: cityCode})
        }
        return assign({}, state, {cities})
      }
      break
  }
  return state
}
