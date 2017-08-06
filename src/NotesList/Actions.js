import { OVER_IN_NOTE, OVER_OUT_NOTE, NEW_NOTE, RECEIVE_NOTES, REQUEST_NOTES, REQUEST_NOTES_FAILURE, SELECT_NOTE } from './Types';
import API from '../API';

export const fetchNotes = () => {
  return function(dispatch) {
    dispatch(requestNotes());

    return API.fetch('/notes')
              .then((response) => {
                dispatch(receiveNotes(response));
              })
              .catch((e) => {
                dispatch(requestNotesFailure(e));
              });
  };
};

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

export const requestNotes = () => {
  return {
    type: REQUEST_NOTES
  };
};

export const requestNotesFailure = (errors) => {
  return {
    type: REQUEST_NOTES_FAILURE,
    errors
  };
}

export const receiveNotes = (json) => {
  return {
    type: RECEIVE_NOTES,
    notes: json.data
  };
};

export const selectNote = function selectNote(id) {
  return ({
    type: SELECT_NOTE,
    id
  });
}

export const newNote = function newNote() {
  return ({type: NEW_NOTE});
}
