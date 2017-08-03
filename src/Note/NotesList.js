import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu, Button, Input, Row, Col } from 'antd';
import { selectNote } from './Actions';

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
  onNoteClick: PropTypes.func.isRequired,
};

const Header = function Header() {
  return (
    <div style={{ padding: 16 }}>
      <Row>
        <Col span={20}>
          <Search placeholder="Search" onSearch={value => console.log(value)} />
        </Col>

        <Col span={2} offset={1}>
          <Button type="primary" shape="circle" icon="plus" />
        </Col>
      </Row>
    </div>
  );
};

const RenderNotesList = function NotesList({ notes, onNoteClick }) {
  return (
    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 120, backgroundColor: '#fff' }}>
      <Header />

      <Menu theme="light" mode="inline" onClick={({item, key, path}) => onNoteClick(key)}>
        {
          notes.map((note) =>
            <Menu.Item key={note.id}>
              <h3 className="nav-text">{note.title}</h3>
            </Menu.Item>
          )}
      </Menu>
    </Sider>
  );
};

RenderNotesList.propTypes = Props;

const mapStateToProps = function mapStateToProps(state) {
  return ({
    notes: state.NotesReducer.notes
  });
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return ({
    onNoteClick: (id) => {
      console.log(`clicked: ${id}`)
      dispatch(selectNote(Number(id)))
    }
  });
};

const NotesList = connect(mapStateToProps, mapDispatchToProps)(RenderNotesList);
export default NotesList;
