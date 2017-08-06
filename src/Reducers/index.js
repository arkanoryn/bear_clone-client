import { combineReducers } from 'redux';
import NoteReducer from '../Note/Reducer';
import NotesListReducer from '../NotesList/Reducer';
import SessionReducer from '../Session/Reducer';

let NoteApp = combineReducers({
  SessionReducer,
  NoteReducer,
  NotesListReducer,
});

export default NoteApp;
