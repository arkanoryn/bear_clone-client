import _           from 'lodash';
import {
  OVER_IN_NOTE,
  OVER_OUT_NOTE,
  NEW_NOTE,
  REQUEST_NOTES,
  REQUEST_NOTES_FAILURE,
  RECEIVE_NOTES,
  SELECT_NOTE,
}                  from './types';
import { GENERAL } from '../note/types';

const initialState = {
  errors: [],
  isFetching: false,
  noteId: -1,
  notes: [],
  lobbyChannel: null,
};

let NotesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case OVER_IN_NOTE:
      return ({
        ...state,
        over: action.id,
      });

    case OVER_OUT_NOTE:
      let overId;
      if (action.id === state.over) {
        overId = -1;
      } else {
        overId = action.id;
      }

      return ({
        ...state,
        over: overId,
      });

    case NEW_NOTE:
      let newNote = {
        id: -1,
        title: '',
        body: '',
        status: GENERAL,
      };

      return ({
        ...state,
        notes: [...state.notes, newNote],
        noteId: newNote.id,
      });

    case REQUEST_NOTES_FAILURE:
        return ({
          ...state,
          isFetching: false,
          notes: [],
          errors: action.errors,
        });

    case 'NOTES_LIST_UPDATED':
    case 'NOTE_UPDATED':
      return ({
        ...state,
        notes: state.notes.map((note) => note.id === action.note.note.id ? action.note.note : note),
      });

    case 'CONNECTED_TO_LOBBY':
      return ({
        ...state,
        lobbyChannel: action.channel,
      });

    case REQUEST_NOTES:
      return ({
        ...state,
        isFetching: true,
      });

    case RECEIVE_NOTES:
      return ({
        ...state,
        isFetching: false,
        notes: _.sortBy(action.notes, ['id']),
        });

    case SELECT_NOTE:
      return ({
        ...state,
        noteId: action.id,
      });

    default:
      return state;
  }
};

export default NotesListReducer;
