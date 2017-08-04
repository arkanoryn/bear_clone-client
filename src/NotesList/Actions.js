import { SELECT_NOTE } from './Types';

export const selectNote = function selectNote(id) {
  return ({
    type: SELECT_NOTE,
    id
  });
}
