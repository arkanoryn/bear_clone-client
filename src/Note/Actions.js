import { UPDATE_BODY, UPDATE_STATUS, UPDATE_TITLE } from './Types';

export const updateBody = function updateBody(id, body) {
  return ({
    type: UPDATE_BODY,
    id,
    body
  });
}

export const updateStatus = function updateStatus(id, status) {
  return ({
    type: UPDATE_STATUS,
    id,
    status
  });
}

export const updateTitle = function updateTitle(id, title) {
  return ({
    type: UPDATE_TITLE,
    id,
    title
  });
}
