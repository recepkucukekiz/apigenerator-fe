'use client';

import React from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';

const AddProjectPage = () => {
    const onFinish = async (values) => {
        try {
            console.log('Received values:', values);
            console.log(JSON.stringify({
                name: values.name,
                description: values.description,
                database_settings: {
                    dbName: values.dbName,
                    dbUser: values.dbUser,
                    dbPassword: values.dbPassword,
                    dbServer: values.dbServer,
                    dbPort: values.dbPort,
                    dbDialect: values.dbDialect
                }
            }));

            if (values.dbDialect !== 'postgres') {
                throw new Error('Only postgres dialect is supported!');
            } else {
                const response = await fetch('http://localhost:3001/projects', {
                    method: 'POST',
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem('token')}` ,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: values.name,
                        description: values.description,
                        database_settings: {
                            dbName: values.dbName,
                            dbUser: values.dbUser,
                            dbPassword: values.dbPassword,
                            dbServer: values.dbServer,
                            dbPort: values.dbPort,
                            dbDialect: values.dbDialect
                        }
                    }),
                });

                const data = await response.json();
                console.log(data)

                if (!response.ok) {
                    throw new Error(data.message);
                } else {
                    window.location.href = '/project/all';
                }
            }
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={12}>
                <Card title="Create Project" style={{ width: '100%' }}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input project name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input project description!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Database Name"
                            name="dbName"
                            rules={[{ required: true, message: 'Please input project database name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Database Username"
                            name="dbUser"
                            rules={[{ required: true, message: 'Please input project database username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Database Password"
                            name="dbPassword"
                            rules={[{ required: true, message: 'Please input project database password!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Database Server Address"
                            name="dbServer"
                            rules={[{ required: true, message: 'Please input project database address!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Database Port"
                            name="dbPort"
                            rules={[{ required: true, message: 'Please input project database port!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Database Dialect"
                            name="dbDialect"
                            rules={[{ required: true, message: 'Please select project database dialect!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="default" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default AddProjectPage;
