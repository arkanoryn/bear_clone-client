import API            from '../API';
import { fetchNotes } from '../NotesList/Actions';

export const AUTH_USER         = 'AUTH_USER';
export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE';

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
