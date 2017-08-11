import {
  wrapAction
} from 'utils/fetch'
import {
  CHANNEL_SHOP_AUDITING
} from 'constants/actionTypes/channel/auditing'

export function channelShopAuditing (params) {
  return wrapAction({
    type: CHANNEL_SHOP_AUDITING,
    endpoint: '/leo/1.0/agent/channel/checkShopStatus',
    body: params,
    method: 'get'
  })
}

