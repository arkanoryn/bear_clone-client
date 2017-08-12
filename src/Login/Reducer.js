import { AUTH_USER_REQUEST, AUTH_USER_SUCCESS, AUTH_USER_FAILURE } from './Action';

const initialUser = {
  id: -1,
  username: '',
  token: '',
};

const initialState = {
  isAuthenticated:  false,
  willAuthenticate: false,
  currentUser:      initialUser,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_REQUEST:
      return ({
        ...state,
        willAuthenticate: true,
      });

    case AUTH_USER_SUCCESS:
      return ({
        ...state,
        willAuthenticate: false,
        isAuthenticated: true,
        currentUser: { id: action.user.id, username: action.user.username, token: action.token },
      });

    case AUTH_USER_FAILURE:
      return ({
        ...state,
        willAuthenticate: false,
      });

    default:
      return state;
  }
};

export default AuthReducer;
