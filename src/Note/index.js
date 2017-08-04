import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Col, Input, Layout, Row } from 'antd';
import { updateBody, updateTitle } from './Actions';

const { Content } = Layout;
const { TextArea } = Input;
const Props = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  noteId: PropTypes.number.isRequired,
  onUpdateBody: PropTypes.func.isRequired,
  onUpdateTitle: PropTypes.func.isRequired,
};

let RenderNote = function Note({notes, noteId, onUpdateBody, onUpdateTitle}) {
  let currentNote;

  if (noteId !== -1) {
    let noteIndex = _.findIndex(notes, (note) => {return (note.id === noteId)});

    currentNote = notes[noteIndex]
  } else {
    currentNote = {title: 'No Note selected.', body: ''}
  }

  return (
    <Content style={{ margin: '24px', overflow: 'initial' }}>
      <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
        <Row>
          <Col span={20} offset={2}>
            <h1>
              <TextArea
                autosize={{ minRows: 1 }}
                placeholder="Title"
                value={currentNote.title}
                onChange={({ target: { value: newTitle } }) =>
                  onUpdateTitle(currentNote.id, newTitle)}
              />
            </h1>
          </Col>
        </Row>

        <Row style={{ marginTop: 35, textAlign: "justify" }}>
          <Col span={20} offset={2}>
            <p>
              <TextArea
                autosize={{ minRows: 6 }}
                placeholder="Note content"
                value={currentNote.body || ''}
                onChange={({ target: { value: newBody } }) =>
                  onUpdateBody(currentNote.id, newBody)}
              />
            </p>
          </Col>
        </Row>
      </div>
    </Content>
  );
}

RenderNote.PropTypes = Props;

const mapStateToProps = function mapStateToProps(state) {
  return {
    notes: state.NotesListReducer.notes,
    noteId: state.NotesListReducer.noteId
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return ({
    onUpdateBody: (id, body) => {dispatch(updateBody(id, body))},
    onUpdateTitle: (id, title) => {dispatch(updateTitle(id, title))},
  });
}

const Note = connect(mapStateToProps, mapDispatchToProps)(RenderNote);
export default Note;
