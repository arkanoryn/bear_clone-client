import React, { Component }        from 'react';
import { connect }                 from 'react-redux';
import PropTypes                   from 'prop-types';
import { Col, Input, Layout, Row } from 'antd';
import {
  connectToChannel,
  leaveChannel,
  updateBody,
  updateTitle,
  updateNote,
}                                  from './Actions';

const { Content }  = Layout;
const { TextArea } = Input;
const Props        = {
  noteId:             PropTypes.number.isRequired,
  onUpdateBody:       PropTypes.func.isRequired,
  onUpdateTitle:      PropTypes.func.isRequired,
  onConnectToChannel: PropTypes.func.isRequired,
  onNoteUpdate:       PropTypes.func.isRequired,
};

class Note extends Component {
  componentDidMount() {
    const {socket, noteId, onConnectToChannel} = this.props;

    if (noteId !== -1) {
      onConnectToChannel(socket, noteId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {currentNote, socket, noteId, channel, onConnectToChannel, onLeaveChannel, onNoteUpdate} = this.props;

    if (nextProps.noteId !== noteId) {
      onLeaveChannel(channel);
      onConnectToChannel(nextProps.socket, nextProps.noteId);
    }
    if (!socket && nextProps.socket) {
      onConnectToChannel(nextProps.socket, nextProps.noteId);
    }

    if (channel && currentNote.id !== -1 && nextProps.currentNote.id !== -1 && (currentNote.title !== nextProps.currentNote.title || currentNote.body !== nextProps.currentNote.body)) {
      onNoteUpdate(channel, nextProps.currentNote);
    }
  }

  componentWillUnmount() {
    const {channel, onLeaveChannel} = this.props;

    if (channel) {
      onLeaveChannel(channel);
    }
  }

  render () {
    const {noteId, onUpdateBody, onUpdateTitle} = this.props;
    let currentNote;

    if (noteId !== -1) {
      currentNote = this.props.currentNote;
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
                  disabled={noteId === -1 ? true : false}
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
                  disabled={noteId === -1 ? true : false}
                />
              </p>
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

Note.PropTypes = Props;

const mapStateToProps = function mapStateToProps(state) {
  return {
    socket:      state.SessionReducer.socket,
    noteId:      state.NotesListReducer.noteId,
    channel:     state.NoteReducer.channel,
    currentNote: state.NoteReducer.currentNote,
  };
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return ({
    onUpdateBody:       (id, body)      => {dispatch(updateBody(id, body))},
    onUpdateTitle:      (id, title)     => {dispatch(updateTitle(id, title))},
    onConnectToChannel: (socket, id)    => {dispatch(connectToChannel(socket, id))},
    onLeaveChannel:     (channel)       => {dispatch(leaveChannel(channel))},
    onNoteUpdate:       (channel, note) => {dispatch(updateNote(channel, note))},
  });
}

Note = connect(mapStateToProps, mapDispatchToProps)(Note);
export default Note;
