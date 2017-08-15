import React        from 'react';
import { connect }  from 'react-redux';
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Input,
  Spin,
}                   from 'antd';
import { authUser } from './actions';
import '../../App.css';

const { Item } = Form;

const handleLogin = (dispatch, form, e) => {
  e.preventDefault();

  form.validateFields((err, values) => {
    if (!err) {
      dispatch(authUser(values.username, values.password));
    }
  });
};

const Login = ({ onLogin, form, willAuthenticate }) => {
  const { getFieldDecorator } = form;

  return (
    <Form
      onSubmit={(e) => { onLogin(form, e); }}
      className="login-form"
      layout="vertical"
      style={{ textAlign: 'left' }}
    >
      <Spin spinning={willAuthenticate}>
        <Item>
          {
            getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="Username"
              />,
            )}
        </Item>
        <Item>
          {
            getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="Password"
              />,
            )}
        </Item>
      </Spin>
      <Item>
        {
          getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue:  true,
          })(
            <Checkbox>Remember me</Checkbox>,
          )}
        <a className="login-form-forgot" href="/forgot">Forgot password</a>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={willAuthenticate}>
          Log in
        </Button>
        <span style={{ textAlign: 'center' }}>
          Or <a href="/register">register now!</a>
        </span>
      </Item>
    </Form>

  );
};

const mapStateToProps = (state) => {
  return ({
    willAuthenticate: state.AuthenticationReducer.willAuthenticate,
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    onLogin: (form, e) => { handleLogin(dispatch, form, e); },
  });
};

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
export default LoginForm;
