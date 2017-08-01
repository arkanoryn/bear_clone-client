import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'antd';
import { postNote } from './actions';

const { TextArea } = Input;

const mapStateToProps = state => {
  return {
    note: state.NoteApp.note
  };
};

const mapDispachToProps = dispatch => {
  return {
    onUpdateTitle: (note, title) => {
      note = { ...note, title: title };
      dispatch(postNote(note));
    },
    onUpdateBody: (note, body) => {
      note = { ...note, body: body };
      dispatch(postNote(note));
    }
  };
};

const DisplayEditor = ({ note, onUpdateTitle, onUpdateBody }) =>
  <div>
    <Row style={{ marginBottom: 25 }}>
      <Col span={20} offset={2}>
        <h3>
          <TextArea
            autosize={{ minRows: 1 }}
            placeholder="Title"
            value={note.title}
            onChange={({ target: { value: newTitle } }) =>
              onUpdateTitle(note, newTitle)}
          />
        </h3>
      </Col>
    </Row>
    <Row>
      <Col span={20} offset={2}>
        <p>
          <TextArea
            autosize={{ minRows: 6 }}
            placeholder="Note content"
            value={note.body || ''}
            onChange={({ target: { value: newBody } }) =>
              onUpdateBody(note, newBody)}
          />
        </p>
      </Col>
    </Row>
  </div>;

DisplayEditor.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string
  }),
  onUpdateTitle: PropTypes.func.isRequired,
  onUpdateBody: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispachToProps)(DisplayEditor);
