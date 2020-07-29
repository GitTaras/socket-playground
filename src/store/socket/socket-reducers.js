import * as types from './socket-actions';

const initialState = {
  status: 'offline',
  time: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TIME: {
      return {
        time: action.time,
        status: 'online',
      }
    }

    case types.SET_STATUS: {
      return {
        ...state,
        status: action.status,
      }
    }

    default:
      return state;
  }
}
