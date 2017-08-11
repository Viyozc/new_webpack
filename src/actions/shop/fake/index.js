import {
  wrapAction
} from 'utils/fetch'
import {
  SHOP_FAKE_BD
} from 'constants/actionTypes/shop/fake/'

export function fakeBD (params) {
  return wrapAction({
    type: SHOP_FAKE_BD,
    endpoint: '/leo/1.0/bdagent/shop/unableInstall',
    body: params,
    method: 'get'
  })
}


















