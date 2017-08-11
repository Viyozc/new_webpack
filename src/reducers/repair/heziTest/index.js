import {
  STATUS_SUCCESS,
  STATUS_REQUEST
} from 'redux-fetch-elegant'
import ActionTypes from 'constants/actionTypes/repair/heziTest'
import assign from 'lodash/assign'
export default function heziTest (state = null, action) {
  switch (action.type) {
    //获取插槽列表
    case ActionTypes.FETCH_HEZI_TEST_LIST:
      if (action.status === STATUS_SUCCESS) {
        // let list = []
        // if(action.payload.length > 0) {
        //   for (let i = 0; i < action.payload.length; i++) {
        //     let obj = {}
        //     obj.powerBankNo = '1212121212'
        //     obj.slot = i + 1
        //     if (obj.slot === 2) {
        //       obj.status = 2
        //     } else {
        //       obj.status = 1
        //     }
        //     list.push(obj)
        //   }
        // }
        // return assign({}, state, {list})
        return assign({}, state, {list: action.payload})
      }
      break
    case ActionTypes.RESET_HEZI_TEST_LIST:
      //清除列表
      return assign({}, state, {list: null})
    case ActionTypes.HEZI_TEST_UNLOCK:
      //提交解锁
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          lockStatus: 'request'
        })
      } else if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          lockStatus: 'success'
        })
      } else {
        state = assign({}, state, {
          lockStatus: 'failure'
        })
      }
  }
  return state
}
