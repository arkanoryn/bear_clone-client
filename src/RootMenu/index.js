import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Sider }   = Layout;
const { Divider } = Menu;

const RootMenu = function RootMenu({items, tags}) {
  return (
    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, width: 120 }}>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
    { items.map((item) =>
      <Menu.Item key={item.id}>
        <Link to={item.path}>
          <Icon type={item.icon} />
          <span className="nav-text">{item.title}</span>
        </Link>
      </Menu.Item>
    )}
    <Divider />
    </Menu>


    <div style={{marginTop: 10}} >
    <h3 style={{ color: '#fff', paddingLeft: 25 }} >
    <Icon type="tags-o" />
    Tags
    </h3>
    </div>
    <Menu theme="dark" mode="inline">
    { tags.map((tag, i) =>
      <Menu.Item key={i} style={{ color: '#fff' }} >
        <Icon type="" />
        <span className="nav-text">{tag}</span>
      </Menu.Item>
    )}
    </Menu>
  </Sider>
  );
}


export default RootMenu;
