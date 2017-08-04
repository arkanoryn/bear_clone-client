import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card, Col, Input, Layout, Row } from 'antd';
import { overNote, newNote, selectNote } from './Actions';

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
  onNewClick: PropTypes.func.isRequired,
  onMouseEnterNote: PropTypes.func.isRequired,
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

const RenderNotesList = function NotesList({ notes, over, onNoteClick, onNewClick, onMouseEnterNote }) {
  return (
    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 120, backgroundColor: '#fff' }}>
      <Header onNewClick={onNewClick} />

    {notes.map((note) =>
      <Row key={note.id}>
        <Card.Grid
        style={{ width: '100%' }}
            onClick={() => onNoteClick(note.id)}
            onMouseEnter={() => onMouseEnterNote(note.id)}
          >
          <Col span={20}>
            {note.title}
          </Col>

          <Col span={2} offset={1}>
            { note.id === over ?
              <Button type="danger" size="small" shape="circle" icon="delete" />
              : ""
            }
          </Col>
        </Card.Grid>
      </Row>
    )}
    </Sider>
  );
};

RenderNotesList.propTypes = Props;

const mapStateToProps = function mapStateToProps(state) {
  return ({
    notes: state.NotesListReducer.notes,
    over: state.NotesListReducer.over,
  });
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return ({
    onNoteClick: (id) => {dispatch(selectNote(Number(id)))},
    onNewClick: () => {dispatch(newNote())},
    onMouseEnterNote: (id) => {dispatch(overNote(id))},
  });
};

const NotesList = connect(mapStateToProps, mapDispatchToProps)(RenderNotesList);
export default NotesList;
