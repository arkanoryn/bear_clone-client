import { combineReducers } from 'redux'

const notes = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          body: action.body
        }
      ]
    case 'SELECT_NOTE':
      return state.map(note => (note.id === action.id) ? {...note} : note )

    default:
      return state
  }
}

const NoteApp = combineReducers({notes})

export default NoteApp
