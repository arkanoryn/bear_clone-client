import React      from 'react';
import { Route }  from 'react-router-dom';
import { Layout } from 'antd';
import RootMenu   from './menus/root_menu';
import SubMenu    from './menus/sub_menu';

const rootMenuItems = [
  { id: 1, title: "General", icon: "apple", path: "/" },
  { id: 2, title: "Trash", icon: "delete", path: "/trash" },
]

const tags = ["#Learning", "#React", "#Elixir", "#Win"]

const Editor = () => {
  return (
    <Layout>
      <RootMenu items={rootMenuItems} tags={tags} />

      <Route path="/trash" component={SubMenu} />
      <Route exact path="/" component={SubMenu} />


      <Layout style={{ marginLeft: 320 }}>
      </Layout>
    </Layout>
  );
};

export default Editor;
