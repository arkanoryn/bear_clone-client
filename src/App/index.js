import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from '../containers/editor';
import Login from '../containers/login';
import '../App.css';

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <Editor />
      );
    } else {
      return (<Login />);
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    isAuthenticated: state.AuthenticationReducer.isAuthenticated,
  });
};

App = connect(mapStateToProps, null, null, { pure:false })(App);
export default App;
