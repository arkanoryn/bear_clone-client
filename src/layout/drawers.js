import React from 'react';
import 'material-components-web/dist/material-components-web.min.css';
import {
  Drawer,
  DrawerSpacer,
  Icon,
  List,
  Navigation,
  Fab,
  Textfield,
  Body1,
  ListDivider
} from 'react-mdc-web/lib';
import PropTypes from 'prop-types';
import Note from '../notes/note';
import { connect } from 'react-redux';
import { toggleNote, createNote } from '../notes/actions';

const MainMenu = () =>
  <Drawer permanent>
    <DrawerSpacer>Menu</DrawerSpacer>
    <Navigation>
      <a href="/home" selected>
        <Icon name="directions_bus" />Bus
      </a>
      <a href="/home">
        <Icon name="directions_railway" />Railway
      </a>
      <a href="/home">
        <Icon name="directions_bike" />Bike
      </a>
    </Navigation>
  </Drawer>;

const DisplayNotesMenu = ({ notes, onNoteClick, onNewNoteClick }) =>
  <Drawer permanent>
    <Body1 style={{ 'padding-left': '15px' }}>
      <Textfield floatingLabel="Search" />
      <Fab mini onClick={() => onNewNoteClick()}>
        <Icon name="create" />
      </Fab>
    </Body1>
    <ListDivider />
    <List>
      {notes.map((note, i) =>
        <Note key={note.id} {...note} onClick={() => onNoteClick(note.id)} />
      )}
    </List>
  </Drawer>;

DisplayNotesMenu.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onNoteClick: PropTypes.func.isRequired,
  onNewNoteClick: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { notes: state.NoteApp.notes };
};

const mapDispatchToProps = dispatch => {
  return {
    onNoteClick: id => {
      dispatch(toggleNote(id));
    },
    onNewNoteClick: () => {
      dispatch(createNote());
    }
  };
};

const NotesMenu = connect(mapStateToProps, mapDispatchToProps)(
  DisplayNotesMenu
);

const Drawers = () =>
  <div>
    <MainMenu />
    <NotesMenu />
  </div>;

export default Drawers;
