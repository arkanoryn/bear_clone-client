import { combineReducers } from 'redux';
import _ from 'lodash';
import {
  CREATE_NOTE,
  TOGGLE_NOTE,
  UPDATE_TITLE,
  UPDATE_BODY,
  REQUEST_NOTES,
  RECEIVE_NOTES
} from './types';

const initialState = {
  isFetching: false,
  notes: [],
  note: { id: -1, title: '', body: '' }
};

let initialNote = id => {
  return {
    id: id,
    title: '',
    body: ''
  };
};

let NoteApp = (state = initialState, action) => {
  let noteId = _.findIndex(state.notes, x => {
    return x.id === action.id;
  });
  let id = state.note.id;

  switch (action.type) {
    case CREATE_NOTE:
      return Object.assign({}, state, {
        notes: [...state.notes, initialNote(action.id)],
        note: initialNote(action.id)
      });

    case TOGGLE_NOTE:
      return Object.assign({}, state, { note: state.notes[noteId] });

    case UPDATE_TITLE:
      return Object.assign({}, state, {
        notes: state.notes.map(
          note => (note.id === id ? { ...note, title: action.title } : note)
        ),
        note: { ...state.note, title: action.title }
      });

    case UPDATE_BODY:
      return Object.assign({}, state, {
        notes: state.notes.map(
          note => (note.id === id ? { ...note, body: action.body } : note)
        ),
        note: { ...state.note, body: action.body }
      });

    case REQUEST_NOTES:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_NOTES:
      return Object.assign({}, state, {
        isFetching: false,
        notes: action.notes
      });

    default:
      return state;
  }
};

NoteApp = combineReducers({ NoteApp });

export default NoteApp;
