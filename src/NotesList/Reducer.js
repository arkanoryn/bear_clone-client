import _ from 'lodash';
import { OVER_NOTE, NEW_NOTE, SELECT_NOTE, TRASH_NOTE } from './Types';
import { UPDATE_BODY, UPDATE_TITLE } from '../Note/Types';
import NoteReducer from '../Note/Reducer'

const GENERAL = 'GENERAL';
const TRASH = 'TRASH';

const mockNotes = [
  {id: 1, title: "This is my first note", body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  Donec hendrerit tempor tellus.  Donec pretium posuere tellus.  Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.  Nulla posuere.  Donec vitae dolor.  Nullam tristique diam non turpis.  Cras placerat accumsan nulla.  Nullam rutrum.  Nam vestibulum accumsan nisl.", status: GENERAL},
  {id: 2, title: "Lorem", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam.", status: GENERAL},
  {id: 3, title: "Ipsum", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam.", status: GENERAL},
  {id: 4, title: "Ipsum", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam.", status: GENERAL},
  {id: 5, title: "Ipsum", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam.", status: GENERAL},
  {id: 6, title: "Ipsum", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam.", status: GENERAL},
  {id: 7, title: "Ipsum", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam.", status: GENERAL},
];

const latestAvailableId = function latestAvailableId(notes) {
  let lastNote = _.last(notes);

  return (lastNote.id + 1);
};

const initialState = {
  noteId: -1,
  notes: mockNotes,
  trash: [],
};

let NotesListReducer = (state = initialState, action) => {
  let noteIndex = _.findIndex(state.notes, (x) => {return (x.id === action.id)});
  let updatedNote;

  switch (action.type) {
    case OVER_NOTE:
      return (Object.assign({}, state, {over: action.id}));

    case NEW_NOTE:
      let newNote = {
        id: latestAvailableId(state.notes),
        title: '',
        body: '',
      };

      return (Object.assign(
        {},
        state,
        {
          notes: [...state.notes, newNote],
          noteId: newNote.id,
        }
      ));

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

    case TRASH_NOTE:
      const trashedNote = {...state.notes[noteIndex], status: TRASH}
      const newNotes = _.remove(state.notes, (note) => {return note.id !== action.id})

      return (Object.assign(
        {},
        state,
        {...state,
         notes: newNotes,
         trash: [...state.trash, trashedNote]
        }
      ));

    default:
      return state;
  }
};

export default NotesListReducer;
