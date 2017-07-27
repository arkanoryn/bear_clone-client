let nextNoteId = 0

export const addNote = (title, body) => {
  return {
    type: 'NEW_NOTE',
    id: nextNoteId++,
    title,
    body
  }
}

export const toggleNote = (id) => {
  return {
    type: 'TOGGLE_NOTE',
    id
  }
}

export const updateTitle = (title) => {
  return {
    type: 'UPDATE_TITLE',
    title
  }
}

export const updateBody = (body) => {
  return {
    type: 'UPDATE_BODY',
    body
  }
}
