import { GENERAL, UPDATE_BODY, UPDATE_TITLE, UPDATE_STATUS } from './Types';

const initialState = {
  currentNote: {
    id: -1,
    title: '',
    body: '',
    status: GENERAL,
  },
  channel: null,
}

let NoteReducer = function NoteReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BODY:
      return (Object.assign(
        {},
        state,
        {...state, currentNote: {...state.currentNote, body: action.body}}
      ));

    case UPDATE_STATUS:
      return (Object.assign(
        {},
        state,
        {...state, currentNote: {...state.currentNote, status: action.status}}
      ));

    case UPDATE_TITLE:
      return (Object.assign(
        {},
        state,
        {...state, currentNote: {...state.currentNote, title: action.title}}
      ));

    case 'NOTE_UPDATED':
      return (Object.assign(
        {},
        state,
        {...state, currentNote: action.note.note}
      ));


    case 'NOTE_CONNECTED_TO_CHANNEL':
      return {
        ...state,
        channel: action.channel,
        currentNote: action.response.note,
      };

    case 'USER_CHANGED_NOTE':
      return initialState;

    default:
      return state;
  }
};

export default NoteReducer;
