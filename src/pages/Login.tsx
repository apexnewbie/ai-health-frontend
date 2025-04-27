import React, { useState } from 'react';
import { Form, Input, Button, Tabs, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import { login, register } from '../services/loginAPI';

const { TabPane } = Tabs;

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  
  const onFinishLogin = async (values: any) => {
    try {
      const response = await login(values);

      if (response.code === 200) {
        message.success('Login successful!');
        console.log('Login response:', response);

        localStorage.setItem('token', response.data.token);

        navigate('/dashboard/home');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };
  
  const onFinishRegister = async (values: any) => {
    try {
      const response = await register(values);
      message.success('Registration successful! Please login.');
      console.log('Register response:', response);

      setActiveTab('login');
    } catch (error) {
      message.error('Registration failed. Please try again.');
    }
  };
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'var(--gray-light)'
    }}>
      <Card 
        style={{
          width: 400,
          boxShadow: 'var(--shadow)'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24
        }}>
          <UserOutlined style={{ fontSize: 32, color: 'var(--primary-color)' }} />
          <h1 style={{ color: 'var(--primary-color)', marginLeft: 10, fontSize: 24 }}>Health Management System</h1>
        </div>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Login" key="login">
            <Form
              name="login_form"
              initialValues={{ remember: true }}
              onFinish={onFinishLogin}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please enter your username!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  style={{ width: '100%' }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Register" key="register">
            <Form
              name="register_form"
              onFinish={onFinishRegister}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please enter your username!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'Please enter a valid email address!' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  style={{ width: '100%' }}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;