import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Editor               from '../containers/editor';
import Login                from '../containers/login';
import { authenticate }     from '../modules/authentication/actions';
import '../App.css';

class AppClass extends Component {
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
    }
    return (<Login />);
  }
}

const mapStateToProps = (state) => {
  return ({
    isAuthenticated: state.AuthenticationReducer.isAuthenticated,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    onAuthenticate: () => { dispatch(authenticate()); },
  });
};


const App = connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(AppClass);
export default App;
