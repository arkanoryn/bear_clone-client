import { OVER_NOTE, NEW_NOTE, SELECT_NOTE } from './Types';

export const overNote = function overNote(id) {
  return ({
    type: OVER_NOTE,
    id
  });
}

export const selectNote = function selectNote(id) {
  return ({
    type: SELECT_NOTE,
    id
  });
}

export const newNote = function newNote() {
  return ({type: NEW_NOTE});
}
