import { combineReducers } from 'redux';
import NotesListReducer from '../NotesList/Reducer';

let NoteApp = combineReducers({NotesListReducer});

export default NoteApp;
