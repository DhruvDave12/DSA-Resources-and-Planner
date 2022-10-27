import React from "react";
import { Button, Form, Input } from "antd";
import "./signup.styles.css";

const Signup = ({ onFinishSignup, onFinishFailedSignup }) => {
  return (
    <div className="signup__page">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinishSignup}
        onFinishFailed={onFinishFailedSignup}
        autoComplete="off"
        style={{ width: "100%" }}   
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username"/>
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email"/>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password"/>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
