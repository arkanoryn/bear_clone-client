import { combineReducers } from 'redux'
import _ from 'lodash'

const initialState = {
  notes: [],
  note: {id: -1, title: "", body: ""}
}

let NoteApp = (state = initialState, action) => {
  let noteId = _.findIndex(state.notes, (x) => { return x.id === action.id;})
  let id = state.note.id

  switch (action.type) {
    case 'NEW_NOTE':
      return Object.assign({},
                           state,
                           { notes: [
                             ...state.notes,
                             {
                               id: action.id,
                               title: action.title,
                               body: action.body
                             }
                           ]}
      )

    case 'TOGGLE_NOTE':
      return Object.assign({},
                           state,
                           {note: state.notes[noteId]}
      )
    case 'UPDATE_TITLE':
      return Object.assign({},
                           state,
                           { notes: state.notes.map(note => (note.id === id) ? {...note, title: action.title} : note),
                             note: {...state.note, title: action.title}
                           }
      )

    case 'UPDATE_BODY':
      return Object.assign({},
                           state,
                           { notes: state.notes.map(note => (note.id === id) ? {...note, body: action.body} : note),
                             note: {...state.note, body: action.body}
                           }
      )

    default:
      return state
  }
}

NoteApp = combineReducers({NoteApp})

export default NoteApp
