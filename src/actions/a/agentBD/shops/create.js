import {
  wrapAction
} from 'utils/fetch'
import {
  AGENTBD_SHOP_BIND_LOCATION_TO_CHOSE_TYPE,
  AGENTBD_SHOP_CLEAR_CREATE_FORM,
  AGENTBD_SHOP_GET_DETAIL_IN_CREATE_SHOP,
  AGENTBD_SHOP_CLEAN_COMPANYLIST,
  AGENTBD_SHOP_CHANGE_SECONDARY_CONTACT_NAME,
  AGENTBD_SHOP_CHANGE_SECONDARY_CONTACT_MOBILE,
  AGENTBD_SHOP_CHANGE_CONTACT_NAME,
  AGENTBD_SHOP_CHANGE_CONTACT_MOBILE,
  AGENTBD_SHOP_CHANGE_MOBILE,
  AGENTBD_SHOP_CHANGE_SEATNUM,
  AGENTBD_SHOP_CHANGE_CHARGE_FREQUENCY,
  AGENTBD_SHOP_UPLOADER_IMAGE,
  AGENTBD_SHOP_CREATE,
  AGENTBD_SHOP_OPERATE_OPENINGHOURS
} from 'constants/actionTypes/a/agentBD/shops/create/'

export function agentBDBindLocationToChoseType (type) {
  return {
    type: AGENTBD_SHOP_BIND_LOCATION_TO_CHOSE_TYPE,
    payload: type
  }
}

export function agentBDClearCreateForm () {
  return {
    type: AGENTBD_SHOP_CLEAR_CREATE_FORM,
    payload: null
  }
}

export function agentBDFetchShopInitEdit (params) {
  return wrapAction({
    type: AGENTBD_SHOP_GET_DETAIL_IN_CREATE_SHOP,
    endpoint: '/leo/1.0/h5/bdagent/shop/sign',
    body: params,
    method: 'get'
  })
}

export function agentBDCleanCompanyList () {
  return {
    type: AGENTBD_SHOP_CLEAN_COMPANYLIST,
    payload: null
  }
}

export function agentBDChangeSecondaryContactName (contactName) {
  return {
    type: AGENTBD_SHOP_CHANGE_SECONDARY_CONTACT_NAME,
    payload: contactName
  }
}

export function agentBDChangeSecondaryContactMobile (contactMobile) {
  return {
    type: AGENTBD_SHOP_CHANGE_SECONDARY_CONTACT_MOBILE,
    payload: contactMobile
  }
}

export function agentBDChangeContactName (contactName) {
  return {
    type: AGENTBD_SHOP_CHANGE_CONTACT_NAME,
    payload: contactName
  }
}

export function agentBDChangeContactMobile (contactMobile) {
  return {
    type: AGENTBD_SHOP_CHANGE_CONTACT_MOBILE,
    payload: contactMobile
  }
}

export function agentBDChangeMobile (mobile) {
  return {
    type: AGENTBD_SHOP_CHANGE_MOBILE,
    payload: mobile
  }
}

export function agentBDChangeSeatNum (seatNum) {
  return {
    type: AGENTBD_SHOP_CHANGE_SEATNUM,
    payload: seatNum
  }
}

export function agentBDChangeChargeFrequency (value) {
  return {
    type: AGENTBD_SHOP_CHANGE_CHARGE_FREQUENCY,
    payload: value
  }
}

export function agentBDUploadImage (name, image) {
  return {
    type: AGENTBD_SHOP_UPLOADER_IMAGE,
    payload: {name, image}
  }
}

export function agentBDCreate (params) {
  if (!params.cityCode) {
    params.cityCode = '0'
  }
  return wrapAction({
    type: AGENTBD_SHOP_CREATE,
    endpoint: '/leo/1.0/h5/bdagent/shop/save',
    body: params,
    method: 'post'
  })
}

export function agentBDOperateOpeningHours (params) {
  return {
    type: AGENTBD_SHOP_OPERATE_OPENINGHOURS,
    payload: params
  }
}

