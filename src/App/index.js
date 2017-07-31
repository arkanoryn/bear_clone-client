import React, { Component } from 'react';
/* import { BrowserRouter, Miss } from 'react-router';*/
import NotesList from '../notes/note_list.js';
import Editor from '../notes/editor';
import '../index.css';
import { Layout, Menu, Icon } from 'antd';
const { Content, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">nav 1</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <NotesList />
          <Layout style={{ marginLeft: 320 }}>
            <Content style={{ overflow: 'initial', margin: 30, padding: 16 }}>
              <Editor />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
