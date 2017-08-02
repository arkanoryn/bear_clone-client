import React from 'react';
import { Layout, Menu, Button, Input, Row, Col } from 'antd';

const { Sider } = Layout;
const { Search } = Input;

const Header = () => (
  <div style={{ padding: 16 }}>
    <Row>
      <Col span={21}>
        <Search placeholder="Search" onSearch={value => console.log(value)} />
      </Col>

      <Col span={2} offset={1}>
        <Button type="primary" shape="circle" icon="plus" />
      </Col>
    </Row>
  </div>
);

const NotesList = ({ notes }) => {
  return (
    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 120, backgroundColor: '#fff' }}>
      <Header />

      <Menu theme="light" mode="inline" defaultSelectedKeys={['2']}>
        { notes.map((note) =>
          <Menu.Item key={note.id}>
            <h3 className="nav-text">{note.title}</h3>
          </Menu.Item>
        )
        }
      </Menu>
    </Sider>
  );
};

export default NotesList;
