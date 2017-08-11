import {
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  DEVICE_GET_LIST
} from 'constants/actionTypes/device'

export default function deviceListReducer (state = null, action) {
  switch (action.type) {
    case DEVICE_GET_LIST:
      if (action.status === STATUS_SUCCESS) {
        if (!action.payload.device) return state
        const list = action.payload.device.map((item, i) => {
          return [
            item.deviceNo,
            item.status,
            item.orderNum,
            item.deviceId
          ]
        })
        state = {
          labels: ['设备编号', '状态', '今日订单数'],
          list: list
        }
      }
      break
  }
  return state
}
