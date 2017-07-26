import React from 'react';
import {Button, Drawer, DrawerSpacer, List, ListItem, Icon} from 'react-mdc-web/lib';
import { connect } from 'react-redux'
import {toogleNote} from '../../actions'
import NoteList from '../../components/NoteList'

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

const NotesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)

export default NotesList;
