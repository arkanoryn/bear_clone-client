import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Display1, Body2} from 'react-mdc-web/lib';

const Editor = ({note}) => (
  <div>
    <Display1>{note.title}</Display1>
    <Body2>{note.body}</Body2>
  </div>
);

Editor.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  })
}

const mapStateToProps = state => {
  return {
    note: state.NoteApp.note
  }
}

export default connect(
  mapStateToProps
)(Editor);
