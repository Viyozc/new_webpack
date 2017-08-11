/**
 * Created by fanli on 2017/4/15.
 */
import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/b/deviceManage'

export function getDeviceManager (params) {
  return wrapAction({
    type: ActionTypes.B_SHOP_GET_MANAGER,
    endpoint: '/leo/1.0/h5/merchant/queryDeviceKeeper',
    body: params,
    method: 'get'
  })
}
export function setDeviceManager (params) {
  return wrapAction({
    type: ActionTypes.B_SHOP_SET_MANAGER,
    endpoint: '/leo/1.0/h5/merchant/addDeviceKeeper',
    body: params,
    method: 'post'
  })
}
export function deleteDeviceManager (params) {
  return wrapAction({
    type: ActionTypes.B_SHOP_DELETE_MANAGER,
    endpoint: '/leo/1.0/h5/merchant/deleteDeviceKeeper',
    body: params,
    method: 'post'
  })
}
export function resetDevice () {
  return {
    type: ActionTypes.B_SHOP_RESET_MANAGER
  }
}
