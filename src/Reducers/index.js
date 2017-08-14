import { combineReducers } from 'redux';
/* import NoteReducer         from '../Note/Reducer';*/
import NotesListReducer    from '../modules/noteslist/reducer';
/* import SessionReducer      from '../Session/Reducer';
 * import AuthReducer         from '../Login/Reducer'*/

let NoteApp = combineReducers({
  NotesListReducer,
});

export default NoteApp;
