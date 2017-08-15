import { Socket }     from 'phoenix';
import API            from '../../API';
import { fetchNotes } from '../noteslist/actions';
import {
  SOCKET_CONNECTED,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
}                     from './types';

const API_URL       = process.env.REACT_APP_API_HOST_URL;
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

const generateAuthentication = (username, password) => {
  return ({
    username: username,
    password: password,
  });
};

export const authUserRequest = () => {
  return ({
    type: AUTH_USER_REQUEST
  });
};

export const authUserSuccess = (json) => {
  return ({
    type: AUTH_USER_SUCCESS,
    token: json.meta.token,
    user: json.data,
  });
};

export const authUserFailure = (errors) => {
  return ({
    type: AUTH_USER_FAILURE,
    errors,
  });
};

export const authUser = (username, password) => {
  return (
    (dispatch) => {
      console.log('auth user.');
      dispatch(authUserRequest());

      return (
        API
        .post('/sessions', generateAuthentication(username, password))
        .then((response) => {
          dispatch(authUserSuccess(response));
          dispatch(fetchNotes());
        })
        .catch((errors)  => { dispatch(authUserFailure(errors)); })
      );
    });
};
