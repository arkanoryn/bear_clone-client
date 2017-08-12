import { combineReducers } from 'redux';
import NoteReducer         from '../Note/Reducer';
import NotesListReducer    from '../NotesList/Reducer';
import SessionReducer      from '../Session/Reducer';
import AuthReducer         from '../Login/Reducer'

let NoteApp = combineReducers({
  SessionReducer,
  NoteReducer,
  NotesListReducer,
  AuthReducer,
});

export default NoteApp;
