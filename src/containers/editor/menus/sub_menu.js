import React, { Component }                    from 'react';
import { connect }                             from 'react-redux';
import { Layout, Spin, message, notification } from 'antd';
import { Button, Col, Input, Row } from 'antd';
import _                                       from 'lodash';
import {
  overInNote,
  overOutNote,
  newNote,
  selectNote,
}                 from '../../../modules/noteslist/actions';
import { updateStatus }                        from '../../../modules/note/actions';
import { GENERAL, TRASH }                      from '../../../modules/note/types';
import NotesList                               from '../../../modules/noteslist/note_menu';

const { Sider }  = Layout;
const { Search } = Input;

const Header = function Header({onNewNoteClick}) {
  return (
    <div style={{ padding: 16 }}>
      <Row>
        <Col span={20}>
          <Search placeholder="Search" onSearch={value => console.log(value)} disabled />
        </Col>

        <Col span={2} offset={1}>
          <Button type="primary" shape="circle" icon="plus" onClick={onNewNoteClick} />
        </Col>
      </Row>
    </div>
  );
};

class SubMenu extends Component {
  componentDidMount() {
    const { isFetching } = this.props;

    if (isFetching) {
      message.loading('Fetching notes...', 0);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { errors, isFetching } = this.props;

    if (errors.length !== 0) {
      notification['error']({
        message: 'Something went wrong!',
        description: errors.message,
        duration: 0,
      });
    }

    if (isFetching !== prevProps.isFetching) {
      if (isFetching) {
        message.loading('Fetching notes...', 0);
      } else {
        message.destroy();
        if (errors.length === 0 && prevProps.isFetching) {
          message.success('Notes successfully loaded! ;)');
        }
      }
    }
  }

  render () {
    const {
      allNotes,
      currentNoteId,
      over,
      match,
      isFetching,
      onMouseEnterNote,
      onMouseExitNote,
      onNewNoteClick,
      onNoteClick,
      onTrashNoteClick,
      onPutBackNoteClick
    } = this.props;
    console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>${match.path}`)
    const isTrash   = match.path === '/trash';
    let notes;
    let action;

    if (isTrash) {
      notes = _.filter(allNotes, {status: TRASH});
      action = onPutBackNoteClick;
    } else {
      notes = _.filter(allNotes, {status:GENERAL});
      action = onTrashNoteClick;
    }

    return (
      <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 120, backgroundColor: '#fff' }}>
        <Header onNewNoteClick={onNewNoteClick} />

        <Spin spinning={isFetching} delay={2000} style={{ marginTop: '30px' }}>
          <NotesList
            notes={notes}
            currentNoteId={currentNoteId}
            over={over}
            isTrash={isTrash}
            onMouseEnterNote={onMouseEnterNote}
            onMouseExitNote={onMouseExitNote}
            onNoteClick={onNoteClick}
            action={action}
          />
        </Spin>
      </Sider>
    );
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return ({
    errors:     state.NotesListReducer.errors,
    allNotes:   state.NotesListReducer.notes,
    isFetching: state.NotesListReducer.isFetching,
    currentNoteId: state.NotesListReducer.noteId,
    over:          state.NotesListReducer.over,
  });
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return ({
    onNewNoteClick:     ()   => { dispatch(newNote()); },
    onNoteClick:        (id) => { dispatch(selectNote(Number(id))); },
    onTrashNoteClick:   (id) => { dispatch(updateStatus(id, TRASH)); },
    onPutBackNoteClick: (id) => { dispatch(updateStatus(id, GENERAL)); },
    onMouseEnterNote:   (id) => { dispatch(overInNote(id)); },
    onMouseExitNote:    (id) => { dispatch(overOutNote(id)); },
  });
};

SubMenu = connect(mapStateToProps, mapDispatchToProps)(SubMenu);
export default SubMenu;
