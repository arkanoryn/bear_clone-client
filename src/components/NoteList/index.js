import React from 'react'
import 'material-components-web/dist/material-components-web.min.css';
import {Drawer, DrawerSpacer, List} from 'react-mdc-web/lib';
import PropTypes from 'prop-types'
import Note from '../Note'
import AddNote from '../AddNote'

const NoteList = ({ notes, onNoteClick }) => (
  <Drawer permanent>
    <DrawerSpacer>
      <AddNote />
    </DrawerSpacer>
    <List>
      {notes.map((note, i) =>
        <Note key={note.id} {...note} onClick={() => onNoteClick(note.id)} />
      )
      }
    </List>
  </Drawer>
)

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onNoteClick: PropTypes.func.isRequired
}

  export default NoteList
