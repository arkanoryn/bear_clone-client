import React       from 'react';
import { connect } from 'react-redux';
import Editor from '../containers/editor';
import '../App.css';
import { Route }  from 'react-router-dom';
import SubMenu    from '../containers/editor/menus/sub_menu';

const UnAuthApp = () => {
  return (
    {/* <Login /> */}
  );
};

const RenderApp = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return (
      <div>


      <Route path="/trash" component={SubMenu} />
      <Route exact path="/" component={SubMenu} />

      <Editor />
      </div>
    );
  } else {
    return (<UnAuthApp />);
  }
};

const mapStateToProps = (state) => {
  return ({
    isAuthenticated: false, //state.AuthReducer.isAuthenticated,
  });
};

const App = connect(mapStateToProps)(RenderApp);
export default App;
