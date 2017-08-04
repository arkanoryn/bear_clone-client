import { UPDATE_BODY, UPDATE_TITLE } from './Types';

export const updateBody = function updateBody(id, body) {
  return ({
    type: UPDATE_BODY,
    id,
    body
  });
}

export const updateTitle = function updateTitle(id, title) {
  return ({
    type: UPDATE_TITLE,
   id,
    title
  });
}
