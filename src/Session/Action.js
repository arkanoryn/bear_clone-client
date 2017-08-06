import { Socket } from 'phoenix';
import { SOCKET_CONNECTED } from './Types';

const API_URL = process.env.REACT_APP_API_HOST_URL;
const WEBSOCKET_URL = API_URL.replace(/(https|http)/, 'ws').replace('/api', '');

export const connectToSocket = () => {
  return function(dispatch) {
    const socket = new Socket(`${WEBSOCKET_URL}/socket`, {});
    socket.connect();

    return (dispatch({
      type: SOCKET_CONNECTED,
      socket: socket,
    }));
  }
}
