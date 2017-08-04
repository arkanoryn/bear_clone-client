import React                                     from 'react';
import PropTypes                                 from 'prop-types';
import { connect }                               from 'react-redux';
import { Button, Col, Input, Layout, Menu, Row } from 'antd';
import _                                         from 'lodash';
import { overNote, selectNote, newNote }         from './Actions';
import { updateStatus }                          from '../Note/Actions';
import { GENERAL, TRASH }                        from '../Note/Types';

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
  over: PropTypes.number,
  onNoteClick: PropTypes.func.isRequired,
  onNewClick: PropTypes.func.isRequired,
  onMouseEnterNote: PropTypes.func.isRequired,
  onTrashNoteClick: PropTypes.func.isRequired,
  onAddNoteClick: PropTypes.func.isRequired,
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

const NoteButtons = ({isTrash, note, currentNoteId, onTrashNoteClick, onAddNoteClick}) => {
  if (isTrash) {
    return (<Button
              type="primary"
              size="small"
              icon="file-add"
              onClick={() => onAddNoteClick(note.id)}
              disabled={note.id === currentNoteId}
    />);
  } else {
    return (<Button
              type="danger"
              size="small"
              icon="delete"
              onClick={() => onTrashNoteClick(note.id)}
              disabled={note.id === currentNoteId}
    />);
  }
}

const RenderNotesList = function RenderNotesList({match, notes, currentNoteId, over, onNewClick, onNoteClick, onMouseEnterNote, onTrashNoteClick, onAddNoteClick}) {
  const isTrash   = match.path === '/trash';
  let noteIndex = _.findIndex(notes, (x) => {return (x.id === currentNoteId)});
  let list;

  if (isTrash) {     list = _.filter(notes, {status: TRASH});
  } else {
    list = _.filter(notes, {status:GENERAL});
  }

  return (
    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 120, backgroundColor: '#fff' }}>
    <Header onNewClick={onNewClick} />
    {console.log(`>>>>>>>>>>>>>>> ${noteIndex}`)}

    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={noteIndex !== -1 ? [noteIndex.toString()] : []}
    >
    {
      list.map(note =>
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
          <NoteButtons
            isTrash={isTrash}
            note={note}
            {...currentNoteId}
            onTrashNoteClick={onTrashNoteClick}
            onAddNoteClick={onAddNoteClick}
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
    onNoteClick:      (id) => {dispatch(selectNote(Number(id)))},
    onNewClick:       ()   => {dispatch(newNote())},
    onMouseEnterNote: (id) => {dispatch(overNote(id))},
    onTrashNoteClick: (id) => {dispatch(updateStatus(id, TRASH))},
    onAddNoteClick:   (id) => {dispatch(updateStatus(id, GENERAL))},
  });
};

const NotesList = connect(mapStateToProps, mapDispatchToProps)(RenderNotesList);
export default NotesList;
