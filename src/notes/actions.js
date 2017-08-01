import fetch from 'isomorphic-fetch';
import {
  CREATE_NOTE,
  TOGGLE_NOTE,
  UPDATE_TITLE,
  UPDATE_BODY,
  REQUEST_NOTES,
  RECEIVE_NOTES,
  RECEIVE_NOTE
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

export const receiveNote = json => {
  return {
    type: RECEIVE_NOTE,
    note: json.data
  };
};

export const postNote = note => {
  return function(dispatch) {
    let url;
    let body = JSON.stringify({
      note: { id: note.id, body: note.body, title: note.title }
    });
    let request;

    if (note.id === -1) {
      url = `${API_URL}/notes`;
      request = {
        method: 'POST',
        headers: headers(),
        body
      };
    } else {
      url = `${API_URL}/notes/${note.id}`;
      request = {
        method: 'PUT',
        headers: headers(),
        body
      };
    }

    return fetch(url, request)
      .then(
        response => response.json(),
        error => console.log('oops, tout casse!', error)
      )
      .then(json => dispatch(receiveNote(json)));
  };
};

const headers = () => {
  return {
    'Content-Type': 'application/json'
  };
};
