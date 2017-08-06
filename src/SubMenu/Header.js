import React from 'react';
import { Button, Col, Input, Row } from 'antd';

const { Search } = Input;

const Header = function Header({onNewNoteClick}) {
  return (
    <div style={{ padding: 16 }}>
      <Row>
        <Col span={20}>
          <Search placeholder="Search" onSearch={value => console.log(value)} />
        </Col>

        <Col span={2} offset={1}>
          <Button type="primary" shape="circle" icon="plus" onClick={onNewNoteClick} />
        </Col>
      </Row>
    </div>
  );
};

export default Header;
