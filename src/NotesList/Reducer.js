import _ from 'lodash';
import { SELECT_NOTE } from './Types';
import { UPDATE_BODY, UPDATE_TITLE } from '../Note/Types';
import NoteReducer from '../Note/Reducer'

const mockNotes = [
  {id: 1, title: "This is my first note", body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  Donec hendrerit tempor tellus.  Donec pretium posuere tellus.  Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.  Nulla posuere.  Donec vitae dolor.  Nullam tristique diam non turpis.  Cras placerat accumsan nulla.  Nullam rutrum.  Nam vestibulum accumsan nisl."},
  {id: 2, title: "Lorem", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam."},
  {id: 3, title: "Ipsum", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam."}
]

const initialState = {
  notes: mockNotes,
  noteId: -1
};

let NotesListReducer = (state = initialState, action) => {
  let noteIndex = _.findIndex(state.notes, (x) => {return (x.id === action.id)});
  let updatedNote;

  switch (action.type) {
    case SELECT_NOTE:
      return (Object.assign({}, state, {...state, noteId: action.id}));

    case UPDATE_BODY:
    case UPDATE_TITLE:
      updatedNote = NoteReducer(state.notes[noteIndex], action);

      return (Object.assign(
        {},
        state,
        {...state, notes: state.notes.map((note) => (note.id === state.noteId) ? updatedNote : note)}
      ));

    default:
      return state;
  }
};

export default NotesListReducer;
