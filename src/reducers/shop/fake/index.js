import assign from 'lodash/assign'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS
} from 'redux-fetch-elegant'
import {
  SHOP_FAKE_BD
} from 'constants/actionTypes/shop/fake/'

export default function shopFakeBD (state = {}, action) {
  switch (action.type) {
    case SHOP_FAKE_BD:
      if (action.status === STATUS_REQUEST) {
        state = assign({}, state, {
          submitStatus: 'request'
        })
      } else if (action.status === STATUS_SUCCESS) {
        state = assign({}, state, {
          submitStatus: 'success'
        })
      } else {
        state = assign({}, state, {
          submitStatus: 'failure'
        })
      }
      break
  }
  return state
}
