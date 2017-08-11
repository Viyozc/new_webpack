import {
  wrapAction
} from 'utils/fetch'
import {
  SHOP_CREATE,
  SHOP_GET_LIST,
  SHOP_GET_DETAIL,
  SHOP_GET_BD_INSTALL_DETAIL,
  SHOP_GET_DETAIL_IN_CREATE_SHOP,
  SHOP_GET_COUNTS,
  SHOP_GET_TYPES,
  SHOP_SELECT_TOP_TYPE,
  SHOP_SELECT_SUB_TYPE,
  SHOP_SELECT_ADDRESS,
  SHOP_UPLOADER_IMAGE,
  SHOP_CHANGE_MOBILE,
  SHOP_CHANGE_SECONDARY_CONTACT_MOBILE,
  SHOP_CHANGE_SECONDARY_CONTACT_NAME,
  SHOP_CHANGE_CONTACT_MOBILE,
  SHOP_CHANGE_CONTACT_NAME,
  SHOP_CHANGE_CHARGE_FREQUENCY,
  SHOP_CONTRACT_ADD,
  SHOP_CONTRACT_ADD_DEVICE_NUMBER,
  SHOP_CONTRACT_ADD_DEVICE_WITH_BATTERY_NUMBER,
  SHOP_CONTRACT_ADD_BRAND_NUMBER,
  SHOP_CONTRACT_ADD_BATTERY_NUMBER,
  SHOP_CONTRACT_ADD_INSTALL_DATE,
  SHOP_CONTRACT_ADD_INSTALL_TIME,
  SHOP_CLEAR_CREATE_FORM,
  SHOP_CLEAR_SIGN_FORM,
  SHOP_BIND_LOCATION_TO_CHOSE_TYPE,
  SHOP_CLEAN_LIST,
  SHOP_CHANGE_SEATNUM,
  SHOP_GET_COMPANY_LIST,
  SHOP_SAVE_COMPANY_NAME,
  SHOP_OPERATE_OPENINGHOURS,
  SHOP_CONTRACT_ADD_ADAPTER_NUMBER,
  SHOP_GET_STANDARD,
  SHOP_CHOSE_STANDARD_OPTION,
  SHOP_CLEAN_COMPANYLIST,
  SHOP_GET_REPAIR_LIST,
  SHOP_CLEAN_REPAIR_LIST,
  SHOP_CONTRACT_REPAIR_ADD,
  SHOP_CONTRACT_REPAIR_ADD_DEVICE_NUMBER,
  SHOP_CONTRACT_REPAIR_ADD_DEVICE_WITH_BATTERY_NUMBER,
  SHOP_CONTRACT_REPAIR_ADD_BRAND_NUMBER,
  SHOP_CONTRACT_REPAIR_ADD_BATTERY_NUMBER,
  SHOP_CONTRACT_REPAIR_ADD_ADAPTER_NUMBER,
  SHOP_CLEAR_REPAIR_ADD_FORM,
  SHOP_GET_EXAMINE_LIST,
  SHOP_CLEAN_EXAMINE_LIST,
  SHOP_EXAMINE_APPROVAL_SUCCESS,
  SHOP_EXAMINE_APPROVAL_REFUSE,
  SHOP_GET_EXAMINE_DETAIL,
  SHOP_RESET_EXAMINE_INFO,
  SHOP_GET_EXAMINE_REASONS,
  SHOP_CLEAN_EXAMINE_REASON,
  SHOP_GET_EXCEPTION_LIST,
  SHOP_CLEAN_EXCEPTION_LIST,
  SHOP_GET_EXCEPTION_DETAIL,
  SHOP_RESET_EXCEPTION_INFO,
  SHOP_GET_EXCEPTION_REASONS,
  SHOP_EXCEPTION_APPROVAL_PROCESS,
  SHOP_CLEAN_EXCEPTION_REASON,
  SHOP_CLEAN_DETAIL,
  SHOP_GET_SIGN_INFO,
  SHOP_SAVE_REPAIR_RECEIVE,
  SHOP_GET_REPAIR_MAX_COUNT,
  SHOP_GET_INSTALL_TIME,
  SHOP_GET_CHECK_MERCHANT,
  SHOP_INSTALL_CHANGE_DEVICE_POSITION,
  SHOP_GET_SEARCH_LIST,
  SHOP_CLEAN_BD_INSTALL_DETAIL,
  SHOP_UPDATE_INSTALL_COMMENT,
  SHOP_UPDATE_REAPPLY_COMMENT,
  FETCH_SIGNED_SHOP_LIST,
  FETCH_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID,
  CLEAN_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID,
  FETCH_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID_CLOUDID,
  CLEAN_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID_CLOUDID,
  FETCH_DATA_SELLER_SHOPDEVICE,
  FETCH_DATA_SELLER_SHOPORDERLIST,
  FETCH_DATA_SELLER_UNABLEINSTALL,
  FETCH_SHOP_FINISHINSTALL
} from 'constants/actionTypes/shop'

export function fetchFinishInstall (params) {
  return wrapAction({
    type: FETCH_SHOP_FINISHINSTALL,
    endpoint: '/leo/1.0/contract/checkFinishDelivery',
    body: params,
    method: 'post'
  })
}

export function fetchShamStore (params) {
  return wrapAction({
    type: FETCH_DATA_SELLER_UNABLEINSTALL,
    endpoint: '/leo/1.0/bdagent/shop/unableInstall',
    body: params,
    method: 'get'
  })
}
export function create (params) {
  if (!params.cityCode) {
    params.cityCode = '0'
  }
  return wrapAction({
    type: SHOP_CREATE,
    endpoint: '/leo/1.0/h5/shop/save',
    body: params,
    method: 'post'
  })
}
export function contractAdd (params) {
  return wrapAction({
    type: SHOP_CONTRACT_ADD,
    endpoint: '/leo/1.0/h5/contract/add',
    body: params,
    method: 'post'
  })
}

export function fetchShopGets (status, offset, pageSize, memberId, cityCode) {
  return wrapAction({
    type: SHOP_GET_LIST,
    endpoint: '/leo/2.0/h5/shop/gets',
    body: {
      status,
      offset,
      pageSize,
      memberId,
      cityCode
    },
    method: 'get'
  })
}

export function fetchShopGetById (params) {
  return wrapAction({
    type: SHOP_GET_DETAIL,
    endpoint: '/leo/1.0/h5/shop/get',
    body: params,
    method: 'get'
  })
}

export function fetchShopGetByContractId (params) {
  return wrapAction({
    type: SHOP_GET_BD_INSTALL_DETAIL,
    endpoint: '/leo/1.0/h5/contract/detail',
    body: params,
    method: 'get'
  })
}
export function fetchShopInitEdit (params) {
  return wrapAction({
    type: SHOP_GET_DETAIL_IN_CREATE_SHOP,
    endpoint: '/leo/1.0/h5/shop/initEdit',
    body: params,
    method: 'get'
  })
}

export function fetchShopGetCounts (memberId, cityCode) {
  return wrapAction({
    type: SHOP_GET_COUNTS,
    endpoint: '/leo/2.0/h5/shop/getCounts',
    body: {memberId, cityCode},
    method: 'get'
  })
}

export function getTypes (params) {
  return wrapAction({
    type: SHOP_GET_TYPES,
    endpoint: '/leo/1.0/h5/shop/getType',
    body: params,
    method: 'get'
  })
}

export function fetchFindCompanyList (params) {
  return wrapAction({
    type: SHOP_GET_COMPANY_LIST,
    endpoint: '/leo/1.0/h5/shop/findMerchant',
    body: params,
    method: 'get'
  })
}

export function fetchGetStandard (params) {
  return wrapAction({
    type: SHOP_GET_STANDARD,
    endpoint: '/leo/1.0/h5/shop/priceList',
    body: params,
    method: 'get'
  })
}

export function clearCreateForm () {
  return {
    type: SHOP_CLEAR_CREATE_FORM,
    payload: null
  }
}
export function clearSignForm () {
  return {
    type: SHOP_CLEAR_SIGN_FORM,
    payload: null
  }
}
export function selectTopType (type) {
  return {
    type: SHOP_SELECT_TOP_TYPE,
    payload: type
  }
}

export function selectSubType (type) {
  return {
    type: SHOP_SELECT_SUB_TYPE,
    payload: type
  }
}

export function saveCompany (company) {
  return {
    type: SHOP_SAVE_COMPANY_NAME,
    payload: company
  }
}

export function bindLocationToChoseType (type) {
  return {
    type: SHOP_BIND_LOCATION_TO_CHOSE_TYPE,
    payload: type
  }
}

export function selectAddress (address) {
  return {
    type: SHOP_SELECT_ADDRESS,
    payload: address
  }
}

export function uploadImage (image) {
  return {
    type: SHOP_UPLOADER_IMAGE,
    payload: image
  }
}

export function changeSecondaryContactName (contactName) {
  return {
    type: SHOP_CHANGE_SECONDARY_CONTACT_NAME,
    payload: contactName
  }
}

export function changeSecondaryContactMobile (contactMobile) {
  return {
    type: SHOP_CHANGE_SECONDARY_CONTACT_MOBILE,
    payload: contactMobile
  }
}

export function changeContactName (contactName) {
  return {
    type: SHOP_CHANGE_CONTACT_NAME,
    payload: contactName
  }
}

export function changeContactMobile (contactMobile) {
  return {
    type: SHOP_CHANGE_CONTACT_MOBILE,
    payload: contactMobile
  }
}

export function changeMobile (mobile) {
  return {
    type: SHOP_CHANGE_MOBILE,
    payload: mobile
  }
}

export function changeSeatNum (seatNum) {
  return {
    type: SHOP_CHANGE_SEATNUM,
    payload: seatNum
  }
}

export function changeChargeFrequency (value) {
  return {
    type: SHOP_CHANGE_CHARGE_FREQUENCY,
    payload: value
  }
}
export function updateInstallComment (value) {
  return {
    type: SHOP_UPDATE_INSTALL_COMMENT,
    payload: value
  }
}
export function updateReapplyComment (value) {
  return {
    type: SHOP_UPDATE_REAPPLY_COMMENT,
    payload: value
  }
}

export function changeDeviceNumber (num) {
  return {
    type: SHOP_CONTRACT_ADD_DEVICE_NUMBER,
    payload: num
  }
}
export function changeDeviceWithBatteryNumber (num) {
  return {
    type: SHOP_CONTRACT_ADD_DEVICE_WITH_BATTERY_NUMBER,
    payload: num
  }
}

export function changeBrandNumber (num) {
  return {
    type: SHOP_CONTRACT_ADD_BRAND_NUMBER,
    payload: num
  }
}

export function changeBatteryNumber (num) {
  return {
    type: SHOP_CONTRACT_ADD_BATTERY_NUMBER,
    payload: num
  }
}

export function changeAdapterNumber (num) {
  return {
    type: SHOP_CONTRACT_ADD_ADAPTER_NUMBER,
    payload: num
  }
}

export function changeInstallDate (date) {
  return {
    type: SHOP_CONTRACT_ADD_INSTALL_DATE,
    payload: date
  }
}

export function changeInstallTime (time) {
  return {
    type: SHOP_CONTRACT_ADD_INSTALL_TIME,
    payload: time
  }
}
export function cleanShopList () {
  return {
    type: SHOP_CLEAN_LIST,
    payload: null
  }
}
export function operateOpeningHours (params) {
  return {
    type: SHOP_OPERATE_OPENINGHOURS,
    payload: params
  }
}
export function choseStandardOption (value) {
  return {
    type: SHOP_CHOSE_STANDARD_OPTION,
    payload: value
  }
}
export function cleanCompanyList () {
  return {
    type: SHOP_CLEAN_COMPANYLIST,
    payload: null
  }
}

export function fetchShopRepairGets (status, offset, pageSize) {
  return wrapAction({
    type: SHOP_GET_REPAIR_LIST,
    endpoint: '/leo/1.0/h5/spare/addSpare/gets',
    body: {
      status,
      offset,
      pageSize
    },
    method: 'get'
  })
}
export function fetchShopRepairReceive (params) {
  return wrapAction({
    type: SHOP_SAVE_REPAIR_RECEIVE,
    endpoint: '/leo/1.0/h5/spare/confirm',
    body: params,
    method: 'get'
  })
}

export function cleanShopRepairList () {
  return {
    type: SHOP_CLEAN_REPAIR_LIST,
    payload: null
  }
}

export function contractRepairAdd (params) {
  return wrapAction({
    type: SHOP_CONTRACT_REPAIR_ADD,
    endpoint: '/leo/1.0/h5/spare/addSpare/submit',
    body: params,
    method: 'post'
  })
}

export function changeRepairDeviceNumber (num) {
  return {
    type: SHOP_CONTRACT_REPAIR_ADD_DEVICE_NUMBER,
    payload: num
  }
}
export function changeRepairDeviceWithBatteryNumber (num) {
  return {
    type: SHOP_CONTRACT_REPAIR_ADD_DEVICE_WITH_BATTERY_NUMBER,
    payload: num
  }
}
export function changeRepairBrandNumber (num) {
  return {
    type: SHOP_CONTRACT_REPAIR_ADD_BRAND_NUMBER,
    payload: num
  }
}

export function changeRepairBatteryNumber (num) {
  return {
    type: SHOP_CONTRACT_REPAIR_ADD_BATTERY_NUMBER,
    payload: num
  }
}

export function changeRepairAdapterNumber (num) {
  return {
    type: SHOP_CONTRACT_REPAIR_ADD_ADAPTER_NUMBER,
    payload: num
  }
}

export function clearRepairAddForm () {
  return {
    type: SHOP_CLEAR_REPAIR_ADD_FORM,
    payload: null
  }
}

export function fetchShopExamineGets (status, offset, pageSize) {
  return wrapAction({
    type: SHOP_GET_EXAMINE_LIST,
    endpoint: '/leo/1.0/h5/install/approval/gets',
    body: {
      status,
      offset,
      pageSize
    },
    method: 'get'
  })
}

export function cleanShopExamineList () {
  return {
    type: SHOP_CLEAN_EXAMINE_LIST,
    payload: null
  }
}

export function fetchShopExamineApprovalSuccess (params) {
  return wrapAction({
    type: SHOP_EXAMINE_APPROVAL_SUCCESS,
    endpoint: '/leo/1.0/h5/install/approval/success',
    body: params,
    method: 'post'
  })
}

export function fetchShopExamineGetById (params) {
  return wrapAction({
    type: SHOP_GET_EXAMINE_DETAIL,
    endpoint: '/leo/1.0/h5/install/approval/detail',
    body: params,
    method: 'get'
  })
}

export function cleanShopExamineDetail () {
  return {
    type: SHOP_RESET_EXAMINE_INFO,
    payload: null
  }
}

export function fetchGetShopExamineReasons () {
  return wrapAction({
    type: SHOP_GET_EXAMINE_REASONS,
    endpoint: '/leo/1.0/h5/install/approval/processWay',
    body: null,
    method: 'get'
  })
}

export function fetchShopExamineApprovalRefuse (params) {
  return wrapAction({
    type: SHOP_EXAMINE_APPROVAL_REFUSE,
    endpoint: '/leo/1.0/h5/install/approval/refuse',
    body: params,
    method: 'post'
  })
}

export function cleanShopExamineReason () {
  return {
    type: SHOP_CLEAN_EXAMINE_REASON,
    payload: null
  }
}

export function fetchShopExceptionGets (status, offset, pageSize) {
  return wrapAction({
    type: SHOP_GET_EXCEPTION_LIST,
    endpoint: '/leo/1.0/h5/exception/list',
    body: {
      status,
      offset,
      pageSize
    },
    method: 'get'
  })
}

export function cleanShopExceptionList () {
  return {
    type: SHOP_CLEAN_EXCEPTION_LIST,
    payload: null
  }
}

export function fetchShopExceptionGetById (params) {
  return wrapAction({
    type: SHOP_GET_EXCEPTION_DETAIL,
    endpoint: '/leo/1.0/h5/exception/detail',
    body: params,
    method: 'get'
  })
}

export function cleanShopExceptionDetail () {
  return {
    type: SHOP_RESET_EXCEPTION_INFO,
    payload: null
  }
}

export function fetchGetShopExceptionReasons () {
  return wrapAction({
    type: SHOP_GET_EXCEPTION_REASONS,
    endpoint: '/leo/1.0/h5/exception/processWay',
    body: null,
    method: 'get'
  })
}

export function fetchShopExceptionProcess (params) {
  return wrapAction({
    type: SHOP_EXCEPTION_APPROVAL_PROCESS,
    endpoint: '/leo/1.0/h5/exception/process',
    body: params,
    method: 'get'
  })
}

export function cleanShopExceptionReason () {
  return {
    type: SHOP_CLEAN_EXCEPTION_REASON,
    payload: null
  }
}

export function cleanShopDetail () {
  return {
    type: SHOP_CLEAN_DETAIL,
    payload: null
  }
}
export function cleanShopBdInstallDetail () {
  return {
    type: SHOP_CLEAN_BD_INSTALL_DETAIL,
    payload: null
  }
}

export function fetchGetSignInfo (params) {
  return wrapAction({
    type: SHOP_GET_SIGN_INFO,
    endpoint: '/leo/1.0/h5/contract/get',
    body: params,
    method: 'get'
  })
}
export function fetchGetRepairMaxCount (params) {
  return wrapAction({
    type: SHOP_GET_REPAIR_MAX_COUNT,
    endpoint: '/leo/1.0/h5/spare/maxReplace',
    body: params,
    method: 'get'
  })
}
export function fetchGetInstallTime (params) {
  return wrapAction({
    type: SHOP_GET_INSTALL_TIME,
    endpoint: '/leo/1.0/h5/contract/installTime',
    body: params,
    method: 'get'
  })
}
export function fetchCheckMerchant (params) {
  return wrapAction({
    type: SHOP_GET_CHECK_MERCHANT,
    endpoint: '/leo/1.0/h5/shop/checkMerchant',
    body: params,
    method: 'get'
  })
}

export function changeDevicePosition (params) {
  return {
    type: SHOP_INSTALL_CHANGE_DEVICE_POSITION,
    payload: params
  }
}

export function fetchShopSearchList (params) {
  return wrapAction({
    type: SHOP_GET_SEARCH_LIST,
    endpoint: '/leo/1.0/h5/shop/searchByName',
    body: params,
    method: 'get'
  })
}

export function fetchDataSellerShopDetail (params) {
  return wrapAction({
    type: FETCH_DATA_SELLER_SHOPDEVICE,
    endpoint: '/leo/1.0/data/directDayStatistics/getShopCollect',
    body: params,
    method: 'get'
  })
}

export function fetchDataSellerOrderList (params) {
  return wrapAction({
    type: FETCH_DATA_SELLER_SHOPORDERLIST,
    endpoint: '/leo/1.0/data/directDayStatistics/getOrderInfo',
    body: params,
    method: 'get'
  })
}

export function fetchSignedShopList (params) {
  return wrapAction({
    type: FETCH_SIGNED_SHOP_LIST,
    endpoint: '/leo/1.0/search/shop/searchShop',
    body: params,
    method: 'get'
  })
}

export function fetchShopInfoByDeviceNoOrShopId (params) {
  return wrapAction({
    type: FETCH_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID,
    endpoint: '/leo/1.0/device/getShop',
    body: params,
    method: 'get'
  })
}
export function cleanShopInfoByDeviceNoOrShopId () {
  return {
    type: CLEAN_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID
  }
}

export function fetchShopInfoByDeviceNoOrShopIdCloudId (params) {
  return wrapAction({
    type: FETCH_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID_CLOUDID,
    endpoint: '/leo/1.0/device/checkDevice',
    body: params,
    method: 'get'
  })
}
export function cleanShopInfoByDeviceNoOrShopIdCloudId () {
  return {
    type: CLEAN_SIGNED_SHOP_INFO_BY_DEVICENO_OR_SHOPID_CLOUDID
  }
}
