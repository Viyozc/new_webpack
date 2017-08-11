import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  AGENTBD_SHOP_BIND_LOCATION_TO_CHOSE_TYPE,
  AGENTBD_SHOP_CLEAR_CREATE_FORM,
  AGENTBD_SHOP_GET_DETAIL_IN_CREATE_SHOP,
  AGENTBD_SHOP_CHANGE_SECONDARY_CONTACT_NAME,
  AGENTBD_SHOP_CHANGE_SECONDARY_CONTACT_MOBILE,
  AGENTBD_SHOP_CHANGE_CONTACT_NAME,
  AGENTBD_SHOP_CHANGE_CONTACT_MOBILE,
  AGENTBD_SHOP_CHANGE_MOBILE,
  AGENTBD_SHOP_CHANGE_SEATNUM,
  AGENTBD_SHOP_CHANGE_CHARGE_FREQUENCY,
  AGENTBD_SHOP_UPLOADER_IMAGE,
  AGENTBD_SHOP_CREATE,
  AGENTBD_SHOP_OPERATE_OPENINGHOURS,
} from 'constants/actionTypes/a/agentBD/shops/create/'
import {
  SHOP_SAVE_COMPANY_NAME
} from 'constants/actionTypes/shop'

export default function agentBDShopCreateReducer (state = {openingHours: [{start: '', end: ''}]}, action) {
  switch (action.type) {
    case AGENTBD_SHOP_CLEAR_CREATE_FORM:
      return {
        openingHours: [{start: '', end: ''}]
      }
    case AGENTBD_SHOP_GET_DETAIL_IN_CREATE_SHOP:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          id: action.payload.id,
          mobile: action.payload.mobile,
          typeId: action.payload.typeId,
          parentTypeName: action.payload.parentTypeName,
          typeName: action.payload.typeName,
          name: action.payload.shopName,
          poiLongitude: action.payload.poiLongitude,
          poiLatitude: action.payload.poiLatitude,
          address: action.payload.address
        })
      }
      break
    case AGENTBD_SHOP_BIND_LOCATION_TO_CHOSE_TYPE:
      state = assign({}, state, {
        lastPageIsChoseType: action.payload
      })
      break
    case AGENTBD_SHOP_UPLOADER_IMAGE:
      let name = action.payload.name
      let image = action.payload.image
      let pic = {}
      pic[name] = image
      state = assign({}, state, pic)
      break
    case AGENTBD_SHOP_CREATE:
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          fetch: 'request',
          locationWhereIndex: null
        })
      } else if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          fetch: 'success',
          shopId: action.payload.shopId,
          locationWhereIndex: action.requestData.locationWhereIndex
        })
      } else {
        state = assign({}, state, {
          fetch: 'failure'
        })
      }
      break
    case AGENTBD_SHOP_CHANGE_MOBILE:
      state = assign({}, state, {
        mobile: action.payload
      })
      break
    case AGENTBD_SHOP_CHANGE_SEATNUM:
      state = assign({}, state, {
        seatNum: action.payload
      })
      break
    case AGENTBD_SHOP_CHANGE_CHARGE_FREQUENCY:
      state = assign({}, state, {
        chargeFrequency: action.payload
      })
      break
    case AGENTBD_SHOP_CHANGE_CONTACT_MOBILE:
      state = assign({}, state, {
        contactMobile: action.payload
      })
      break
    case AGENTBD_SHOP_CHANGE_CONTACT_NAME:
      state = assign({}, state, {
        contactName: action.payload
      })
      break
    case AGENTBD_SHOP_CHANGE_SECONDARY_CONTACT_MOBILE:
      state = assign({}, state, {
        secondaryContactMobile: action.payload
      })
      break
    case AGENTBD_SHOP_CHANGE_SECONDARY_CONTACT_NAME:
      state = assign({}, state, {
        secondaryContactName: action.payload
      })
      break
    case AGENTBD_SHOP_OPERATE_OPENINGHOURS:
      switch (action.payload.type) {
        case 'plus':
          return assign({}, state, {
            openingHours: [].concat(state.openingHours).concat([{start: '', end: ''}])
          })
        case 'minus':
          return assign({}, state, {
            openingHours: [].concat(state.openingHours.slice(0, action.payload.index)).concat(state.openingHours.slice(action.payload.index + 1))
          })
        case 'start':
          return assign({}, state, {
            openingHours: []
              .concat(state.openingHours.slice(0, action.payload.index))
              .concat([{start: action.payload.time, end: state.openingHours[action.payload.index].end}])
              .concat(state.openingHours.slice(action.payload.index + 1))
          })
        case 'end':
          return assign({}, state, {
            openingHours: []
              .concat(state.openingHours.slice(0, action.payload.index))
              .concat([{start: state.openingHours[action.payload.index].start, end: action.payload.time}])
              .concat(state.openingHours.slice(action.payload.index + 1))
          })
      }
      break
    case SHOP_SAVE_COMPANY_NAME:
      state = assign({}, state, {
        merchantId: action.payload.id,
        merchantName: action.payload.merchantName
      })
      break
  }
  return state
}
