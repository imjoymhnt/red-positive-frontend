import React, { useState, useEffect } from "react";
import { Table, Radio, Divider, Button, Modal, Form, Input } from "antd";
import axios from "axios";
import AddUser from "./AddUser";

const contentStyle = {
  minHeight: 280,
  padding: 24,
  background: "#ebebeb",
};

const UserTable = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Hobbbies",
      dataIndex: "hobbies",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text) => (
        <div>
          <Button
            onClick={showModal}
            style={{ marginRight: 5, marginBottom: 5 }}
            primary
          >
            Update
          </Button>
          <Button onClick={handleDelete} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/user`
      );
      setUsers(data);
    };
    fetchData();
  }, []);

  console.log(users);

  const tableData = [];

  users.map((user) => {
    tableData.push({
      key: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      hobbies: user.hobbies,
    });
  });

  console.log(tableData);

  const [seleted, setSelected] = useState("");
  const [seletedRows, setSelectedRows] = useState("");

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRowKeys);
      setSelectedRows(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",

      name: record.name,
    }),
  };
  const handleDelete = async (e) => {
    const { data } = await axios
      .delete(`${process.env.REACT_APP_API}/api/v1/user/${seleted[0]}`)
      .then(window.location.reload());
  };

  const [selectionType, setSelectionType] = useState("checkbox");

  // Update User
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
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/user/${seleted[0]}`,
      values
    );
    setIsModalVisible(false);
    window.location.reload();
  };

  // Send Email Function
  const sendEmail = () => {
    const items = seletedRows
      .map(function (element) {
        return `
        ID ${element.id}
        Name ${element.name}
        Phone: $${element.phone}
        Email: ${element.email}
        Hobbies: ${element.hobbies}
        `;
      })
      .join("\n");

    const body = `${items}`;

    window.location.href =
      "mailto:info@redpositive.in?subject=User Details&body=" +
      encodeURIComponent(body);
  };

  return (
    <div style={contentStyle}>
      <span>
        <AddUser />
        <br />
        {seletedRows ? (
          <Button
            style={{ marginLeft: "86%", marginTop: 5 }}
            type="primary"
            onClick={sendEmail}
          >
            Send To Email
          </Button>
        ) : (
          <Button style={{ marginLeft: "86%", marginTop: 5 }} disabled>
            Send To Email
          </Button>
        )}
      </span>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={tableData ? tableData : []}
        onRow={(r) => ({
          onClick: () => console.log(r),
        })}
      />

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
            value={seletedRows.length !== 0 && seletedRows[0].name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            value={seletedRows.length !== 0 && seletedRows[0].phone}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            value={seletedRows.length !== 0 && seletedRows[0].email}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hobbies"
            name="hobbies"
            value={seletedRows.length !== 0 && seletedRows[0].hobbies}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserTable;
