import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Col, Layout, Row } from 'antd';

const { Content } = Layout;
const Props = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  noteId: PropTypes.number.isRequired,
};

let RenderNote = function Note({notes, noteId}) {
  let currentNote;

  if (noteId !== -1) {
    let noteIndex = _.findIndex(notes, (x) => {return (x.id === noteId)})

    currentNote = notes[noteIndex];
  } else {
    currentNote = {title: 'No Note selected.', body: ''}
  }

  return (
    <Content style={{ margin: '24px', overflow: 'initial' }}>
      <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
        <Row>
          <Col span={20} offset={2}>
            <h1>
              {currentNote.title}
            </h1>
          </Col>
        </Row>

        <Row style={{ marginTop: 35, textAlign: "justify" }}>
          <Col span={20} offset={2}>
            <p>
              {currentNote.body}
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
    notes: state.NotesReducer.notes,
    noteId: state.NotesReducer.note
  };
};

const Note = connect(mapStateToProps)(RenderNote);
export default Note;
