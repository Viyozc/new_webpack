import {
  wrapAction
} from 'utils/fetch'
import {
  GET_OPTIONS
} from 'constants/actionTypes/types'

export function getOptions (type) {
  return wrapAction({
    type: GET_OPTIONS,
    endpoint: '/leo/1.0/option/gets',
    body: {
      type
    },
    method: 'get'
  })
}
