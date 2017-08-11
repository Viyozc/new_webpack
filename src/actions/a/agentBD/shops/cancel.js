import {
  wrapAction
} from 'utils/fetch'
import {
  AGENTBD_CANCEL_SIGN
} from 'constants/actionTypes/a/agentBD/shops/cancel/'

export function cancelSign (params) {
  return wrapAction({
    type: AGENTBD_CANCEL_SIGN,
    endpoint: '/leo/1.0/h5/bdagent/shop/unableContract',
    body: params,
    method: 'get'
  })
}


















