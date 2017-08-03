import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  note: PropTypes.number.isRequired,
};

let RenderNote = function Note({notes, note}) {
  let currentNote;

  if (note !== -1) {
    currentNote = notes[note]
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
    note: state.NotesReducer.note
  };
};

const Note = connect(mapStateToProps)(RenderNote);
export default Note;
