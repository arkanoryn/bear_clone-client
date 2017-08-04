import _ from 'lodash';
import { SELECT_NOTE } from './Types';

const mockNotes = [
  {id: 1, title: "This is my first note", body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  Donec hendrerit tempor tellus.  Donec pretium posuere tellus.  Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.  Nulla posuere.  Donec vitae dolor.  Nullam tristique diam non turpis.  Cras placerat accumsan nulla.  Nullam rutrum.  Nam vestibulum accumsan nisl."},
  {id: 2, title: "Lorem", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam."},
  {id: 3, title: "Ipsum", body: "Nullam libero mauris, consequat quis, varius et, dictum id, arcu.\nDonec at pede.\nSed diam."}
]

const initialState = {
  notes: mockNotes,
  note: -1
};

let NotesListReducer = (state = initialState, action) => {
  let noteId = _.findIndex(state.notes, (x) => {return (x.id === action.id)});

  switch (action.type) {
    case SELECT_NOTE:
      return (Object.assign({}, state, {...state, note: noteId}));

    default:
      return state;
  }
};

export default NotesListReducer;
