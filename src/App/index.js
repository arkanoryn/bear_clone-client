import React from 'react';
import '../App.css';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import RootMenu from '../RootMenu'
import SubMenu from '../SubMenu'
import Note from '../Note'

const rootMenuItems = [
  { id: 1, title: "General", icon: "apple", path: "/" },
  { id: 2, title: "Trash", icon: "delete", path: "/trash" }
]

const tags = ["#Learning", "#React", "#Elixir", "#Win"]

const App = () => {
  return (
    <Layout>
      <RootMenu items={rootMenuItems} tags={tags} />

      <Route path="/trash" component={SubMenu} />
      <Route exact path="/" component={SubMenu} />

      <Layout style={{ marginLeft: 320 }}>
        <Note />
      </Layout>
    </Layout>
  );
}

export default App;
