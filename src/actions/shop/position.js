import { POI_LOCATED, POI_CHANGE, FETCH_SHOP_POSITION_CITIES, FETCH_SHOP_POSITION_WAIT_INSTALL_SHOPS } from 'constants/actionTypes/shop/position'
import { QQ_MAP_KEY } from 'constants'
import {
  wrapAction
} from 'utils/fetch'

export function getPoi () {
  return function (dispatch, getState) {
    if (window.qq && window.qq.maps && window.qq.maps.Geolocation) {
      let geo = new window.qq.maps.Geolocation(QQ_MAP_KEY, 'dian')
      geo.getLocation((position) => {
        if (position) {
          dispatch({
            type: POI_LOCATED,
            payload: {
              adcode: position.adcode,
              latitude: position.lat,
              longitude: position.lng
            }
          })
        }
      })
    }
  }
}

export function changePoi (latitude, longitude) {
  return {
    type: POI_CHANGE,
    payload: {latitude, longitude}
  }
}

export function fetchWaitInstallShops (cityCode) {
  return wrapAction({
    type: FETCH_SHOP_POSITION_WAIT_INSTALL_SHOPS,
    endpoint: '/leo/1.0/h5/address/getToInstallShop',
    body: {cityCode},
    method: 'post'
  })
}

export function fetchCities () {
  return wrapAction({
    type: FETCH_SHOP_POSITION_CITIES,
    endpoint: '/leo/1.0/h5/address/getShopCity',
    body: {},
    method: 'get'
  })
}

