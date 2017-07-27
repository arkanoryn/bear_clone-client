import { combineReducers } from 'redux'
import _ from 'lodash'

const initialState = {
  notes: [],
  note: {id: -1, title: "", body: ""}
}

let NoteApp = (state = initialState, action) => {
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
      let noteId = _.findIndex(state.notes, (x) => { return x.id === action.id;})
      return Object.assign({},
                           state,
                           {note: state.notes[noteId]}
      )

    default:
      return state
  }
}

NoteApp = combineReducers({NoteApp})

export default NoteApp
