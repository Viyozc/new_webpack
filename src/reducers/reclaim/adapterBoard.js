import ActionTypes from 'constants/actionTypes/install/reclaim'

export default function reducer (state = {adapterNum: 0, boardNum: 0}, action) {
  switch (action.type) {
    case ActionTypes.RECLAIM_UPDATE_DEVICE_NUM:
      state = {adapterNum: action.payload.adapterNum, boardNum: action.payload.boardNum}
  }
  return state
}
