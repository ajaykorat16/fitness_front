import React from "react";
import { Select, Form, Input, Button, Checkbox } from "antd";

import { Link } from "react-router-dom";

const Privacy = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Option } = Select;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div className="select-privacy-sp">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Profile Page"
          name="profilepage"
          rules={[
            { required: true, message: "Please input your profile page!" },
          ]}
        >
          <Select defaultValue="Club members" onChange={handleChange}>
            <Option value="jack">Club members</Option>
            <Option value="lucy">Lucy</Option>

            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Activities"
          name="Activities"
          rules={[{ required: true, message: "Please input your Activities!" }]}
        >
          <Select defaultValue="Activities" onChange={handleChange}>
            <Option value="Activities">Activities</Option>
            <Option value="lucy">Lucy</Option>

            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Privacy;
