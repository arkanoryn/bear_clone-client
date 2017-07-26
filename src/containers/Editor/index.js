import React from 'react';
import { connect } from 'react-redux'
import { toogleNote } from '../../actions'
import NoteList from '../../components/NoteList'


const mapStateToProps = state => {
  return {
    notes: state.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {onNoteClick: id => dispatch(toogleNote(id))}
}

const Editor = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)


export default Editor;
