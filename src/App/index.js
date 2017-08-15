import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from '../containers/editor';
import '../App.css';

const UnAuthApp = () => {
  return (
    <div>
      Unauth
    </div>
  );
};


class App extends Component {
  render() {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return (
        <Editor />
      );
    } else {
      return (<UnAuthApp />);
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    isAuthenticated: false, //state.AuthReducer.isAuthenticated,
  });
};

App = connect(mapStateToProps, null, null, { pure:false })(App);
export default App;
