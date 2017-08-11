import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  DC_GET_DATA,
  DC_GET_CITY_LIST,
  DC_GET_SHOP_LIST,
  DC_GET_ORDER_LIST,
  DC_GET_USER_LIST,
  DC_GET_DEVICE_LIST,
  DC_GET_DEVICE_USE_RATE_LIST,
  DC_CLEAN_LIST
} from 'constants/actionTypes/dc'

export default function dcReducer (state = {}, action) {
  switch (action.type) {
    case DC_GET_DATA:
      if (action.status === STATUS_REQUEST) {
        state.data = null
        return assign({}, state)
      } else if (action.status === STATUS_SUCCESS) {
        state.data = action.payload
        return assign({}, state)
      }
      break
    case DC_GET_CITY_LIST:
      if (action.status === STATUS_SUCCESS) {
        let city = action.payload.map((item, i) => {
          return {key: item.cityName, value: item.cityCode}
        })
        city.unshift({key: '全部城市', value: NaN})
        state.city = city
        return assign({}, state)
      }
      break
    case DC_GET_SHOP_LIST:
    case DC_GET_ORDER_LIST:
    case DC_GET_USER_LIST:
    case DC_GET_DEVICE_LIST:
    case DC_GET_DEVICE_USE_RATE_LIST:
      if (action.status === STATUS_REQUEST && action.requestData.offset === 0) {
        state.list = null
        return assign({}, state)
      }
      if (action.status === STATUS_SUCCESS) return assign({}, state, {list: action.requestData.offset === 0 ? action.payload : state.list.concat(action.payload)})
      break
    case DC_CLEAN_LIST:
      return assign({}, state, {list: null})
  }
  return state
}
