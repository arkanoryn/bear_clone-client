import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleNote, createNote } from '../notes/actions';
import { Layout, Menu, Button, Input, Row, Col } from 'antd';

const { Sider } = Layout;
const Search = Input.Search;

const RenderNotesList = ({ notes, onNoteClick, onNewNoteClick }) =>
  <Sider
    style={{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 120,
      background: '#fff'
    }}
  >
    <div style={{ padding: 16 }}>
      <Row>
        <Col span={21}>
          <Search placeholder="Search" onSearch={value => console.log(value)} />
        </Col>

        <Col span={2} offset={1}>
          <Button
            type="primary"
            shape="circle"
            icon="plus"
            onClick={() => onNewNoteClick()}
          />
        </Col>
      </Row>
    </div>
    <Menu
      theme="light"
      mode="inline"
      onClick={({ key, a, b, c }) => onNoteClick(key)}
    >
      {notes.map(note =>
        <Menu.Item key={note.id}>
          <span className="nav-text">
            {note.title}
          </span>
        </Menu.Item>
      )}
    </Menu>
  </Sider>;

RenderNotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onNoteClick: PropTypes.func.isRequired,
  onNewNoteClick: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { notes: state.NoteApp.notes };
};

const mapDispatchToProps = dispatch => {
  return {
    onNoteClick: id => {
      dispatch(toggleNote(Number(id)));
    },
    onNewNoteClick: () => {
      dispatch(createNote());
    }
  };
};

const NotesList = connect(mapStateToProps, mapDispatchToProps)(RenderNotesList);

export default NotesList;
