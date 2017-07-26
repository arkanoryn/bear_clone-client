import React from 'react'
import { connect } from 'react-redux'
import { addNote } from '../../actions'

let AddNote = ({ dispatch }) => {
  let title
  let body

  return (
    <div>
      <form
        onSubmit={e => {
            e.preventDefault()
            if (!title.value.trim()) {
              return
            }
            dispatch(addNote(title.value, ""))
            title.value = ''
        }}
      >
        <input
          ref={node => {
              title = node
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
