import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
const LoginDetails = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="pi_inner">
        <Row gutter={[6, 6]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item
              label="Change Email Address"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Change Email Address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="New Email Address"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your New Email Address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Confirm Email Address"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Confirm Email Address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <div
                className="trofybutton_tc"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  margin: "0",
                }}
              >
                <Button>
                  Update email
                  <ArrowRightOutlined />
                </Button>
              </div>
            </Form.Item>
            <Form.Item
              label="Change Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Change Password",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Confirm Password",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <div
                className="trofybutton_tc"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  margin: "0",
                }}
              >
                <Button>
                  Update Pass
                  <RightOutlined />
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default LoginDetails;
