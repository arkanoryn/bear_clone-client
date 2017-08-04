import { combineReducers } from 'redux';
import _ from 'lodash';
import { OVER_NOTE, SELECT_NOTE, TRASH_NOTE } from './Types';

const mockNotes = [
  {id: 1, title: "This is my first note", body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  Donec hendrerit tempor tellus.  Donec pretium posuere tellus.  Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.  Nulla posuere.  Donec vitae dolor.  Nullam tristique diam non turpis.  Cras placerat accumsan nulla.  Nullam rutrum.  Nam vestibulum accumsan nisl.", status: 'GENERAL'},
  {id: 2, title: "Lorem", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam.", status: 'GENERAL'},
  {id: 3, title: "Ipsum", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam.", status: 'GENERAL'}
]

const initialState = {
  notes: mockNotes,
  note: -1,
  over: -1
};

let NotesReducer = (state = initialState, action) => {
  let noteIndex = _.findIndex(state.notes, (x) => {return (x.id === action.id)});

  switch (action.type) {
    case SELECT_NOTE:
      return (Object.assign({}, state, {...state, note: noteIndex}));

    case OVER_NOTE:
      return(Object.assign({}, state, {...state, over: action.id}));

    case TRASH_NOTE:
      return(Object.assign({}, state,
                           {
                             notes: state.notes.map(
                               note => (note.id === action.id ? { ...note, status: 'TRASH' } : note)
                             ),
                           }));

    default:
      return state;
  }
};

let NoteApp = combineReducers({NotesReducer});

export default NoteApp;
