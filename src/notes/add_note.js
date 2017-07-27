import React from 'react'
import { connect } from 'react-redux'
import { addNote } from './actions'

let AddNote = ({ dispatch }) => {
  let title
  let body

  return (
    <div>
      <form
        onSubmit={e => {
            e.preventDefault()
            if (!title.value.trim() || !body.value.trim()) {
              return
            }
            dispatch(addNote(title.value, body.value))
            title.value = ''
            body.value = ''
        }}
      >
        <input
          ref={node => {
              title = node
          }}
        />
        <input
          ref={node => {
              body = node
          }}
        />
        <button type="submit">
          Add Note
        </button>
      </form>
    </div>
  )
}
AddNote = connect()(AddNote)

export default AddNote
