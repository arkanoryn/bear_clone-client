import React                       from 'react';
import PropTypes                   from 'prop-types';
import { connect }                 from 'react-redux';
import { Button, Col, Menu }       from 'antd';
import _                           from 'lodash';
import { overInNote, overOutNote } from './Actions';


const Props = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id:    PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body:  PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  currentNoteId:    PropTypes.number.isRequired,
  isTrash: PropTypes.bool.isRequired,
  over:             PropTypes.number,

  action:           PropTypes.func.isRequired,
  onMouseEnterNote: PropTypes.func.isRequired,
  onMouseExitNote:  PropTypes.func.isRequired,
};

const NoteActionButton = function NoteActionButton({isTrash, action, noteId}) {
  console.log(isTrash)
  if (isTrash) {
    return (<Button
              type="primary"
              size="small"
              icon="file-add"
              onClick={() => action(noteId)}
    />);
  } else {
    return (<Button
              type="danger"
              size="small"
              icon="delete"
              onClick={() => action(noteId)}
    />);
  }
};

const RenderNotesList = function RenderNotesList({notes,
                                                  currentNoteId,
                                                  isTrash,
                                                  over,
                                                  onMouseEnterNote,
                                                  onMouseExitNote,
                                                  onNoteClick,
                                                  action,
}) {
  let noteIndex = _.findIndex(notes, (x) => {return (x.id === currentNoteId)});

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={noteIndex !== -1 ? [noteIndex.toString()] : []}
    >
    {
      notes.map(note =>
        <Menu.Item key={note.id} onMouseEnter={() => onMouseEnterNote(note.id)} onMouseLeave={() => onMouseExitNote(note.id)}>
        <Col span={20} onClick={() => onNoteClick(note.id)}>
        <span className="nav-text">
        {note.title}
              </span>
          </Col>

          <Col span={2} offset={1}>
            { note.id === over ?
              <NoteActionButton
              isTrash={isTrash}
              action={action}
              noteId={note.id}
              />
                  : ""
            }
          </Col>
        </Menu.Item>
      )}
    </Menu>
  );
};

RenderNotesList.propTypes = Props;

const mapStateToProps = function mapStateToProps(state) {
  return ({
    currentNoteId: state.NotesListReducer.noteId,
    over:          state.NotesListReducer.over,
  });
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return ({
    onMouseEnterNote: (id) => {dispatch(overInNote(id))},
    onMouseExitNote:  (id) => {dispatch(overOutNote(id))},
  });
};

const NotesList = connect(mapStateToProps, mapDispatchToProps)(RenderNotesList);
export default NotesList;
