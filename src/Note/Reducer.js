import { GENERAL, UPDATE_BODY, UPDATE_TITLE, UPDATE_STATUS } from './Types';

const initialState = {
  id: -1,
  title: '',
  body: '',
  status: GENERAL,
}

let NoteReducer = function NoteReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BODY:
      return (Object.assign(
        {},
        state,
        {body: action.body}
      ));

    case UPDATE_STATUS:
      return (Object.assign(
        {},
        state,
        {status: action.status}
      ));

    case UPDATE_TITLE:
      return (Object.assign(
        {},
        state,
        {title: action.title}
      ));

    default:
      return state;
  }
};

export default NoteReducer;
