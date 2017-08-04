import { NEW_NOTE, SELECT_NOTE } from './Types';

export const selectNote = function selectNote(id) {
  return ({
    type: SELECT_NOTE,
    id
  });
}

export const newNote = function newNote() {
  return ({type: NEW_NOTE});
}
