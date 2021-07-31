import React, { useState } from "react";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import axios from "axios";

const AddUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/user`,
      values
    );
    setIsModalVisible(false);
    window.location.reload();
  };

  return (
    <>
      <Button style={{ marginLeft: "88%" }} type="primary" onClick={showModal}>
        Add User
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hobbies"
            name="hobbies"
            rules={[
              {
                required: true,
                message: "Please input your Hobbies!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUser;
