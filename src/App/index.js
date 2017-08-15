import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Editor               from '../containers/editor';
import Login                from '../containers/login';
import { authenticate }     from '../modules/authentication/actions';
import '../App.css';

class App extends Component {
  componentDidMount() {
    const { onAuthenticate } = this.props;
    const token = localStorage.getItem('token');

    if (token) {
      onAuthenticate();
    }
  }

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

const mapDispatchToProps = (dispatch) => {
  return ({
    onAuthenticate: () => {dispatch(authenticate())},
  });
};


App = connect(mapStateToProps, mapDispatchToProps, null, { pure:false })(App);
export default App;
