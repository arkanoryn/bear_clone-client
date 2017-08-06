import React, { Component }                    from 'react';
import PropTypes                               from 'prop-types';
import { connect }                             from 'react-redux';
import { Layout, Spin, message, notification } from 'antd';
import _                                       from 'lodash';
import { selectNote, newNote }                 from '../NotesList/Actions';
import { updateStatus }                        from '../Note/Actions';
import { GENERAL, TRASH }                      from '../Note/Types';
import NotesList                               from '../NotesList';
import Header                                  from './Header';

const { Sider }  = Layout;

const Props = {
  allNotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,

  onNoteClick:        PropTypes.func.isRequired,
  onNewNoteClick:     PropTypes.func.isRequired,
  onTrashNoteClick:   PropTypes.func.isRequired,
  onPutBackNoteClick: PropTypes.func.isRequired,
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
    const {match,
           allNotes,
           isFetching,
           onNoteClick,
           onNewNoteClick,
           onTrashNoteClick,
           onPutBackNoteClick} = this.props;
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
          <NotesList notes={notes} isTrash={isTrash} onNoteClick={onNoteClick} action={action} />
        </Spin>
      </Sider>
    );
  }
}

SubMenu.propTypes = Props;

const mapStateToProps = function mapStateToProps(state) {
  return ({
    errors:     state.NotesListReducer.errors,
    allNotes:   state.NotesListReducer.notes,
    isFetching: state.NotesListReducer.isFetching,
  });
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return ({
    onNewNoteClick:     ()   => {dispatch(newNote())},
    onNoteClick:        (id) => {dispatch(selectNote(Number(id)))},
    onTrashNoteClick:   (id) => {dispatch(updateStatus(id, TRASH))},
    onPutBackNoteClick: (id) => {dispatch(updateStatus(id, GENERAL))},
  });
};

SubMenu = connect(mapStateToProps, mapDispatchToProps)(SubMenu);
export default SubMenu;
