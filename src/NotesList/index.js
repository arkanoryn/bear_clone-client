import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Col, Input, Layout, Menu, Row } from 'antd';
import { overNote, selectNote, newNote, trashNote } from './Actions';

const { Sider }  = Layout;
const { Search } = Input;

const Props = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  currentNoteId: PropTypes.number.isRequired,
  over: PropTypes.number.isRequired,
  onNoteClick: PropTypes.func.isRequired,
  onNewClick: PropTypes.func.isRequired,
  onMouseEnterNote: PropTypes.func.isRequired,
  onTrashNoteClick: PropTypes.func.isRequired,
};

const Header = function Header({onNewClick}) {
  return (
    <div style={{ padding: 16 }}>
      <Row>
        <Col span={20}>
          <Search placeholder="Search" onSearch={value => console.log(value)} />
        </Col>

        <Col span={2} offset={1}>
          <Button type="primary" shape="circle" icon="plus" onClick={onNewClick} />
        </Col>
      </Row>
    </div>
  );
};

const RenderNotesList = function NotesList({ notes, currentNoteId, over, onNewClick, onNoteClick, onMouseEnterNote, onTrashNoteClick }) {
  return (
    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 120, backgroundColor: '#fff' }}>
      <Header onNewClick={onNewClick} />

    <Menu
    theme="light"
    mode="inline"
    >
    {
      notes.map(note =>
        <Menu.Item key={note.id}
        onMouseEnter={() => onMouseEnterNote(note.id)}
        >
        <Col span={20} onClick={() => onNoteClick(note.id)}>
        <span className="nav-text">
        {note.title}
              </span>
        </Col>

        <Col span={2} offset={1}>
          { note.id === over ?
            <Button
              type="danger"
              size="small"
              icon="delete"
              onClick={() => onTrashNoteClick(note.id)}
              disabled={note.id === currentNoteId}
            />
            : ""
          }
        </Col>
          </Menu.Item>
      )}
    </Menu>
    </Sider>
  );
};

RenderNotesList.propTypes = Props;

const mapStateToProps = function mapStateToProps(state) {
  return ({
    currentNoteId: state.NotesListReducer.noteId,
    notes: state.NotesListReducer.notes,
    over: state.NotesListReducer.over,
  });
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return ({
    onNoteClick: (id) => {dispatch(selectNote(Number(id)))},
    onNewClick: () => {dispatch(newNote())},
    onMouseEnterNote: (id) => {dispatch(overNote(id))},
    onTrashNoteClick: (id) => {dispatch(trashNote(id))},
  });
};

const NotesList = connect(mapStateToProps, mapDispatchToProps)(RenderNotesList);
export default NotesList;
