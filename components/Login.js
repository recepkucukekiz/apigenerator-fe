import { Form, Input, Button, Checkbox, Row, Col, Card } from 'antd';
import Link from 'next/link';

const Login = () => {
  const onFinish = async (values) => {
    try {
      console.log('Received values:', values);

      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message);
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
  
        window.location.href = '/project';
      }
    } catch (error) {
      // Kimlik doğrulama başarısız olduğunda hata mesajını kullanıcıya gösterebilirsiniz.
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={8}>
        <Card title="Login" style={{ width: '100%' }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="default" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Link href="/auth/register">
                Don't have an account? Register here
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
