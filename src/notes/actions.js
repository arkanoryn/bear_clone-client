import fetch from 'isomorphic-fetch';
import {
  CREATE_NOTE,
  TOGGLE_NOTE,
  UPDATE_TITLE,
  UPDATE_BODY,
  REQUEST_NOTES,
  RECEIVE_NOTES
} from './types';

const API_URL = 'http://192.168.55.55:4000/api';

export const createNote = () => {
  return {
    type: CREATE_NOTE,
    id: -1
  };
};

export const toggleNote = id => {
  return {
    type: TOGGLE_NOTE,
    id
  };
};

export const updateTitle = title => {
  return {
    type: UPDATE_TITLE,
    title
  };
};

export const updateBody = body => {
  return {
    type: UPDATE_BODY,
    body
  };
};

export const fetchNotes = () => {
  return function(dispatch) {
    dispatch(requestNotes());

    return fetch(API_URL + '/notes')
      .then(
        response => response.json(),
        error => console.log('oops, tout casse!', error)
      )
      .then(json => dispatch(receiveNotes(json)));
  };
};

export const requestNotes = () => {
  return {
    type: REQUEST_NOTES
  };
};

export const receiveNotes = json => {
  return {
    type: RECEIVE_NOTES,
    notes: json.data
  };
};
