import assign from 'object-assign'
import ActionTypes from 'constants/actionTypes/edit'
import {
  STATUS_REQUEST,
  STATUS_SUCCESS,
  STATUS_FAILURE
} from 'redux-fetch-elegant'

function IndexPage (state = null, action) {
  switch (action.type) {
    case ActionTypes.SHOP_EDIT_INDEX_GET_EDIT:
      switch (action.status) {
        case STATUS_SUCCESS:
          return assign({}, state, {form: action.payload})
      }
      return state
    case ActionTypes.SHOP_EDIT_INDEX_GET_CHANGENAME:
      let form = assign({}, state.form)
      form.contactName = action.payload
      return assign({}, state, {form})
  }
  return state
}

export default {
  IndexPage
}
