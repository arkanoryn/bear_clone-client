import React from 'react';
import 'material-components-web/dist/material-components-web.min.css';
import {Drawer, DrawerSpacer, Icon, List, ListItem, Navigation} from 'react-mdc-web/lib';
import PropTypes from 'prop-types'
import Note from '../notes/note'
import AddNote from '../notes/add_note'
import { connect } from 'react-redux'
import {toogleNote} from '../notes/actions'

const MainMenu = () => (
      <Drawer permanent>
        <DrawerSpacer>
          Menu
        </DrawerSpacer>
        <Navigation>
          <a href='/home' selected><Icon name='directions_bus'/>Bus</a>
          <a href='/home'><Icon name='directions_railway'/>Railway</a>
          <a href='/home'><Icon name='directions_bike'/>Bike</a>
        </Navigation>
      </Drawer>
);

const DisplayNotesMenu = ({ notes, onNoteClick }) => (
  <Drawer permanent>
    <DrawerSpacer>
      <AddNote></AddNote>
    </DrawerSpacer>
    <List>
      {notes.map((note, i) =>
        <Note key={note.id} {...note} onClick={() => onNoteClick(note.id)} />
      )
      }
    </List>
  </Drawer>
)

DisplayNotesMenu.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onNoteClick: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {notes: state.notes}
}

const mapDispatchToProps = dispatch => {
  return {
    onNoteClick: id => {
      dispatch(toogleNote(id))
    }
  }
}

const NotesMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayNotesMenu)

const Drawers = () => (
  <div>
    <MainMenu />
    <NotesMenu />
  </div>
);

export default Drawers;
