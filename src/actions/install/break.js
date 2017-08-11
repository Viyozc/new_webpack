import {
  wrapAction
} from 'utils/fetch'
import ActionTypes from 'constants/actionTypes/install/break'

function breakInstall (params) {
  return wrapAction({
    type: ActionTypes.BREAK_INSTALL,
    endpoint: '/leo/1.0/install/interrupt',
    body: params,
    method: 'get'
  })
}

export {
  breakInstall
}
