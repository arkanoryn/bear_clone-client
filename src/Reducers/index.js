import { combineReducers }   from 'redux';
/* import NoteReducer        from '../Note/Reducer';*/
import NotesListReducer      from '../modules/noteslist/reducer';
import AuthenticationReducer from '../modules/authentication/reducer';

let NoteApp = combineReducers({
  NotesListReducer,
  AuthenticationReducer,
});

export default NoteApp;
