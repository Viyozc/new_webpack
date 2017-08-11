import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_SELECT_SUB_TYPE,
  SHOP_SELECT_ADDRESS,
  SHOP_UPLOADER_IMAGE,
  SHOP_CREATE,
  SHOP_GET_DETAIL_IN_CREATE_SHOP,
  SHOP_CHANGE_MOBILE,
  SHOP_CHANGE_SECONDARY_CONTACT_NAME,
  SHOP_CHANGE_SECONDARY_CONTACT_MOBILE,
  SHOP_CHANGE_CONTACT_MOBILE,
  SHOP_CHANGE_CONTACT_NAME,
  SHOP_CLEAR_CREATE_FORM,
  SHOP_BIND_LOCATION_TO_CHOSE_TYPE,
  SHOP_CHANGE_SEATNUM,
  SHOP_SAVE_COMPANY_NAME,
  SHOP_OPERATE_OPENINGHOURS,
  SHOP_CHANGE_CHARGE_FREQUENCY,
  FETCH_DATA_SELLER_UNABLEINSTALL,
  FETCH_SHOP_FINISHINSTALL
} from 'constants/actionTypes/shop'
import RepairActionTypes from 'constants/actionTypes/repair/workOrder'

export default function shopCreateReducer (state = {openingHours: [{start: '', end: ''}]}, action) {
  switch (action.type) {
    case SHOP_CLEAR_CREATE_FORM:
      return {
        openingHours: [{start: '', end: ''}]
      }
    case SHOP_GET_DETAIL_IN_CREATE_SHOP:
      if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          contractPicUrl: action.payload.contractPicUrl,
          id: action.payload.id,
          status: action.payload.status,
          subStatus: action.payload.subStatus,
          mobile: action.payload.mobile,
          seatNum: action.payload.seatNum,
          chargeFrequency: action.payload.chargeFrequency,
          contactName: action.payload.contactName,
          contactMobile: action.payload.contactMobile,
          secondaryContactName: action.payload.secondaryContactName,
          secondaryContactMobile: action.payload.secondaryContactMobile,
          openingHours: action.payload.openingHours && action.payload.openingHours.length ? action.payload.openingHours : [{start: '', end: ''}],
          type: {id: action.payload.typeId, name: action.payload.typeName},
          merchantId: action.payload.merchantId,
          merchantName: action.payload.merchantName,
          address: action.payload.address,
          name: action.payload.name,
          longitude: action.payload.longitude,
          latitude: action.payload.latitude,
          picUrl: action.payload.picUrl,
          signed: action.payload.hasContract
        })
      }
      break
    case SHOP_SAVE_COMPANY_NAME:
      state = assign({}, state, {
        merchantId: action.payload.id,
        merchantName: action.payload.merchantName
      })
      break
    case SHOP_SELECT_SUB_TYPE:
      state = assign({}, state, {
        type: action.payload
      })
      break
    case SHOP_BIND_LOCATION_TO_CHOSE_TYPE:
      state = assign({}, state, {
        lastPageIsChoseType: action.payload
      })
      break
    case SHOP_SELECT_ADDRESS:
      state = assign({}, state, action.payload)
      break
    case SHOP_UPLOADER_IMAGE:
      state = assign({}, state, {
        picUrl: action.payload
      })
      break
    case FETCH_DATA_SELLER_UNABLEINSTALL:
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          fetch: 'request',
          type: FETCH_DATA_SELLER_UNABLEINSTALL
        })
      } else if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          fetch: 'success',
          type: FETCH_DATA_SELLER_UNABLEINSTALL
        })
      } else {
        state = assign({}, state, {
          fetch: 'failure',
          type: FETCH_DATA_SELLER_UNABLEINSTALL
        })
      }
      break
    case FETCH_SHOP_FINISHINSTALL:
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          fetch: 'request',
          type: FETCH_SHOP_FINISHINSTALL
        })
      } else if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          fetch: 'success',
          type: FETCH_SHOP_FINISHINSTALL
        })
      } else {
        state = assign({}, state, {
          fetch: 'failure',
          type: FETCH_SHOP_FINISHINSTALL
        })
      }
      break
    case SHOP_CREATE:
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
    case SHOP_CHANGE_MOBILE:
      state = assign({}, state, {
        mobile: action.payload
      })
      break
    case SHOP_CHANGE_SEATNUM:
      state = assign({}, state, {
        seatNum: action.payload
      })
      break
    case SHOP_CHANGE_CHARGE_FREQUENCY:
      state = assign({}, state, {
        chargeFrequency: action.payload
      })
      break
    case SHOP_CHANGE_CONTACT_MOBILE:
      state = assign({}, state, {
        contactMobile: action.payload
      })
      break
    case SHOP_CHANGE_CONTACT_NAME:
      state = assign({}, state, {
        contactName: action.payload
      })
      break
    case SHOP_CHANGE_SECONDARY_CONTACT_MOBILE:
      state = assign({}, state, {
        secondaryContactMobile: action.payload
      })
      break
    case SHOP_CHANGE_SECONDARY_CONTACT_NAME:
      state = assign({}, state, {
        secondaryContactName: action.payload
      })
      break
    case SHOP_OPERATE_OPENINGHOURS:
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
    case RepairActionTypes.WORKORDER_SCANCODE:
      if (action.status === STATUS_REQUEST) return assign({}, state, {fetchRequest: STATUS_REQUEST})
      if (action.status === STATUS_SUCCESS) return assign({}, state, {fetchRequest: STATUS_SUCCESS}, {scanInfo: action.payload, type: RepairActionTypes.WORKORDER_SCANCODE})
      break
    case RepairActionTypes.WORKORDER_CLEAR_SCANINFO:
      return null
  }
  return state
}
