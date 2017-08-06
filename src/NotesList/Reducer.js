import _                                                                                    from 'lodash';
import { OVER_IN_NOTE, OVER_OUT_NOTE, NEW_NOTE, REQUEST_NOTES, RECEIVE_NOTES, SELECT_NOTE } from './Types';
import { GENERAL, UPDATE_BODY, UPDATE_STATUS, UPDATE_TITLE }                                from '../Note/Types';
import NoteReducer                                                                          from '../Note/Reducer'

const latestAvailableId = function latestAvailableId(notes) {
  let lastNote = _.last(notes) || {id: 0};

  return (lastNote.id + 1);
};

const initialState = {
  isFetching: false,
  noteId: -1,
  notes: [],
  status: GENERAL,
};

let NotesListReducer = (state = initialState, action) => {
  let noteIndex = _.findIndex(state.notes, (x) => {return (x.id === action.id)});
  let updatedNote;

  switch (action.type) {
    case OVER_IN_NOTE:
      return (Object.assign({}, state, {over: action.id}));

    case OVER_OUT_NOTE:
      let overId;
      if (action.id === state.over) {
        overId = -1;
      } else {
        overId = action.id;
      }

      return (Object.assign({}, state, {over: overId}));

    case NEW_NOTE:
      let newNote = {
        id: latestAvailableId(state.notes),
        title: '',
        body: '',
        status: GENERAL
      };

      return (Object.assign(
        {},
        state,
        {
          notes: [...state.notes, newNote],
          noteId: newNote.id,
        }
      ));

    case REQUEST_NOTES:
      return (Object.assign({}, state, {isFetching: true}));

    case RECEIVE_NOTES:
      return (Object.assign(
        {},
        state,
        {
          isFetching: false,
          notes: action.notes,
        }
      ));

    case SELECT_NOTE:
      return (Object.assign({}, state, {...state, noteId: action.id}));

    case UPDATE_BODY:
    case UPDATE_TITLE:
    case UPDATE_STATUS:
      updatedNote = NoteReducer(state.notes[noteIndex], action);

      return (Object.assign(
        {},
        state,
        {...state, notes: state.notes.map((note) => (note.id === action.id) ? updatedNote : note)}
      ));

    default:
      return state;
  }
};

export default NotesListReducer;
