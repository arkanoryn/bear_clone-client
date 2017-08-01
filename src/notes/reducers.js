import { combineReducers } from 'redux';
import _ from 'lodash';
import {
  CREATE_NOTE,
  TOGGLE_NOTE,
  UPDATE_TITLE,
  UPDATE_BODY,
  REQUEST_NOTES,
  RECEIVE_NOTES,
  RECEIVE_NOTE
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
      let newNoteTitle = { ...state.note, title: action.title };

      return Object.assign({}, state, {
        notes: state.notes.map(
          note => (note.id === id ? { ...note, title: action.title } : note)
        ),
        note: newNoteTitle
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
        notes: _.sortBy(action.notes, ['id'])
      });

    case RECEIVE_NOTE:
      let newNote = action.note;
      let notes;

      notes = _.filter(state.notes, note => note.id >= 0);
      if (
        _.findIndex(state.notes, note => {
          return note.id === newNote.id;
        }) > 0
      ) {
        notes = notes.map(note => (note.id === newNote.id ? newNote : note));
      } else {
        notes = [...notes, newNote];
      }
      return Object.assign({}, state, {
        notes: notes,
        note: newNote
      });

    default:
      return state;
  }
};

NoteApp = combineReducers({ NoteApp });

export default NoteApp;
