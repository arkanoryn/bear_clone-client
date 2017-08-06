import { UPDATE_BODY, UPDATE_STATUS, UPDATE_TITLE } from './Types';

export const connectToLobby = function connectToLobby(socket) {
  return (dispatch) => {
    if (!socket) { return false; }
    const channel = socket.channel(`notes:lobby`);

    channel.on('note_updated', (note) => {
      dispatch({type: 'NOTES_LIST_UPDATED', note});
    })

    channel.join().receive('ok', () => {
      dispatch({ type: 'CONNECTED_TO_LOBBY', channel });
    });

    return false;
  };
}

export const connectToChannel = function connectToChannel(socket, noteId) {
  return (dispatch) => {
    if (!socket) { return false; }
    const channel = socket.channel(`notes:${noteId}`);

    channel.on('note_updated', (note) => {
      dispatch({type: 'NOTE_UPDATED', note});
    })

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

export const updateNote = function updateNote(channel, data) {
  return (dispatch) => new Promise((resolve, reject) => {
    channel.push('update_note', data)
           .receive('ok', () => console.log('msg updated.'))
           .receive('error', () => reject());
  });
}
