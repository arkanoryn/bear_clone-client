import React       from 'react';
import { connect } from 'react-redux';
import { Layout }  from 'antd';
import { Route }   from 'react-router-dom';
import RootMenu    from '../RootMenu';
import SubMenu     from '../SubMenu';
import Note        from '../Note';
import Login       from '../Login';
import '../App.css';

const rootMenuItems = [
  { id: 1, title: 'General', icon: 'apple', path: '/' },
  { id: 2, title: 'Trash', icon: 'delete', path: '/trash' },
];

const tags = ['#Learning', '#React', '#Elixir', '#Win'];

const AuthApp = () => {
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
};

const UnAuthApp = () => {
  return (
    <Login />
  );
};

const RenderApp = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (<AuthApp />);
  } else {
    return (<UnAuthApp />);
  }
};

const mapStateToProps = (state) => {
  return ({
    isAuthenticated: state.AuthReducer.isAuthenticated,
  });
};

const App = connect(mapStateToProps)(RenderApp);
export default App;
