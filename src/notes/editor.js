import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';
import { connect } from 'react-redux';
import { updateTitle, updateBody } from './actions';

const mapStateToProps = state => {
  return {
    note: state.NoteApp.note
  };
};

const mapDispachToProps = dispatch => {
  return {
    onUpdateTitle: title => {
      dispatch(updateTitle(title));
    },
    onUpdateBody: body => {
      dispatch(updateBody(body));
    }
  };
};

const DisplayEditor = ({ note, onUpdateTitle, onUpdateBody }) =>
  <div>
    <h3>
      {note.title}
    </h3>
    <p>
      {note.body}
    </p>
  </div>;

DisplayEditor.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }),
  onUpdateTitle: PropTypes.func.isRequired,
  onUpdateBody: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispachToProps)(DisplayEditor);
