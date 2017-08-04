import { OVER_NOTE, NEW_NOTE, SELECT_NOTE, TRASH_NOTE } from './Types';

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

export const trashNote = function trashNote(id) {
  return ({
    type: TRASH_NOTE,
    id
  });
}
