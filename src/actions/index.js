let nextNoteId = 0

export const addNote = (title, body) => {
  return {
    type: 'NEW_NOTE',
    id: nextNoteId++,
    title,
    body
  }
}

export const toogleNote = (id) => {
  return {
    type: 'SELECT_NOTE',
    id
  }
}
