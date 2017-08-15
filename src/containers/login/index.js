import React     from 'react';
import {
  Card,
  Col,
  Layout,
  Row,
}                from 'antd';
import LoginForm from '../../modules/authentication/login_form';

const CardTitle   = (<h1>Login</h1>);

const Login = () => {
  return (
    <Layout style={{ marginTop: 50 }}>
      <Row style={{ backgroundColor: '#fff' }}>
        <Col span={8} offset={8} >
          <Card title={CardTitle} style={{ textAlign: 'center' }}>
            <LoginForm />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;
