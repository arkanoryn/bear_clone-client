import { UPDATE_BODY, UPDATE_STATUS, UPDATE_TITLE } from './Types';

export const connectToChannel = function connectToChannel(socket, noteId) {
  return (dispatch) => {
    if (!socket) { return false; }
    const channel = socket.channel(`notes:${noteId}`);

    channel.join().receive('ok', (response) => {
      dispatch({ type: 'NOTE_CONNECTED_TO_CHANNEL', response, channel });
    });

    return false;
  };
}

export const leaveChannel = function leaveChannel(channel) {
  return (dispatch) => {
    if (channel) {
      channel.leave();
    }
    dispatch({ type: 'USER_CHANGED_NOTE' });
  };
}

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
