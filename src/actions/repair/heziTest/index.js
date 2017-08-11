import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/repair/heziTest'

//获取插槽列表
export function fetchHeziTestList (params) {
  return wrapAction({
    type: ActionTypes.FETCH_HEZI_TEST_LIST,
    endpoint: '/leo/1.0/box/hezi/status',
    body: params,
    method: 'GET'
  })
}

//解锁
export function unlock (params) {
  return wrapAction({
    type: ActionTypes.HEZI_TEST_UNLOCK,
    endpoint: '/leo/1.0/box/hezi/open',
    body: params,
    method: 'GET'
  })
}

//清除列表信息
export function resetHeziTestList () {
  return {
    type: ActionTypes.RESET_HEZI_TEST_LIST
  }
}
