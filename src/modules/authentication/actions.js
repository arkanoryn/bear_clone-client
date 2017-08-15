import { Socket }         from 'phoenix';
import API                from '../../API';
import { fetchNotes }     from '../noteslist/actions';
import { connectToLobby } from '../note/actions';
import {
  SOCKET_CONNECTED,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
}                         from './types';

const API_URL       = process.env.REACT_APP_API_HOST_URL;
const WEBSOCKET_URL = API_URL.replace(/(https|http)/, 'ws').replace('/api', '');

export const connectToSocket = () => {
  return ((dispatch) => {
    const socket = new Socket(`${WEBSOCKET_URL}/socket`, {});
    socket.connect();

    dispatch(connectToLobby(socket));
    return (dispatch({
      type: SOCKET_CONNECTED,
      socket,
    }));
  });
};

export const authUserRequest = () => {
  return ({
    type: AUTH_USER_REQUEST,
  });
};

export const authUserSuccess = (json) => {
  return ({
    type:  AUTH_USER_SUCCESS,
    token: json.meta.token,
    user:  json.data,
  });
};

export const authUserFailure = (errors) => {
  return ({
    type: AUTH_USER_FAILURE,
    errors,
  });
};

const logInUser = (dispatch, response) => {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  dispatch(authUserSuccess(response));
  dispatch(fetchNotes());
  dispatch(connectToSocket());
};


export const authUser = (username, password) => {
  return (
    (dispatch) => {
      dispatch(authUserRequest());

      return (
        API
          .post('/sessions', { username, password })
          .then((response) => { logInUser(dispatch, response); })
          .catch((errors) => { dispatch(authUserFailure(errors)); })
      );
    });
};

export function authenticate() {
  return (dispatch) => {
    dispatch({ type: AUTH_USER_REQUEST });

    return (
      API
        .post('/sessions/refresh')
        .then((response) => { logInUser(dispatch, response); })
        .catch(() => { localStorage.removeItem('token'); })
    );
  };
}
