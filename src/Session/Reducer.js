import { SOCKET_CONNECTED } from './Types';

const initialState = {
  socket: null,
};

let SessionReducer = function SessionReducer(state = initialState, action) {
  switch (action.type) {
    case SOCKET_CONNECTED:
      return (Object.assign(
        {},
        state,
        {
          ...state,
          socket: action.socket,
        }
      ));

    default:
      return state;
  }
}

export default SessionReducer;
