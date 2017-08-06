import { OVER_IN_NOTE, OVER_OUT_NOTE, NEW_NOTE, SELECT_NOTE } from './Types';

export const overInNote = function overInNote(id) {
  return ({
    type: OVER_IN_NOTE,
    id
  });
}

export const overOutNote = function overOutNote(id) {
  return ({
    type: OVER_OUT_NOTE,
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
