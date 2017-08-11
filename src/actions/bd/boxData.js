import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/bd/boxData'

let fetchBoxData = (params) => {
  return wrapAction({
    type: ActionTypes.BD_BOX_DATA_DETIAL,
    endpoint: '/Einstein/data/box/detail',
    // endpoint: '/leo/1.0/data/perf/base',
    body: params,
    method: 'POST'
  })
}

let clearDeviceData = () => {
  return {
    type: ActionTypes.BD_CLEAR_DEVICE_DATA
  }
}

let clearBoxDataAll = () => {
  return {
    type: ActionTypes.BD_CLEAR_BOX_ALL_DATA
  }
}

export {
  fetchBoxData,
  clearDeviceData,
  clearBoxDataAll
}
