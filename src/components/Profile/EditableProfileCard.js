import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, message, Typography, Spin } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import CustomButton from "../CustomButton";
import axiosInstance from "@/config/axios";
import CustomInput from "../CustomInput";
import AntdInput from "../AddStartup/AntdInput";

const { Text } = Typography;

const EditableProfileCard = ({ user_details }) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user_details && user_details?.user_id) {
      setUser(user_details);
      form.setFieldsValue({
        first_name: user_details?.first_name,
        last_name: user_details?.last_name,
        mobile_number: user_details?.mobile_number,
        email: user_details?.email,
      });
    }
  }, [user_details, form]);

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    form.setFieldsValue(user);
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      if (!values.email) {
        values.email = null;
      }
      const res = await axiosInstance.put(
        `users/update/${user_details.user_id}/`,
        values
      );
      console.log(res.data, "++++");
      setUser(values);
      setEditing(false);
      message.success("User details updated successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label, name, rules, placeholder, isReadOnly = false) => {
    return editing ? (
      <Form.Item name={name} rules={rules}>
        <AntdInput
          label={label}
          placeholder={placeholder}
          readOnly={isReadOnly}
          disabled={isReadOnly}
        />
      </Form.Item>
    ) : (
      <Form.Item
        label={<span style={{ fontWeight: 600, color: "#000" }}>{label}</span>}
      >
        <Text>{user?.[name] || "--"}</Text>
      </Form.Item>
    );
  };

  return (
    <Card
      title="User Details"
      extra={
        editing ? (
          <>
            {/* <Button
              icon={<SaveOutlined />}
              type="primary"
              onClick={handleSave}
              loading={loading}
              style={{ marginRight: 8 }}
            >
              Save
            </Button> */}
            <CustomButton
              type="primary"
              btnText={loading ? <Spin color="#000" /> : "Update"}
              onClick={handleSave}
              loading={loading}
              style={{ marginRight: 8 }}
            />
            <CustomButton
              type="tertiary"
              btnText={"Cancel"}
              onClick={() => !loading && handleCancel()}
            />
          </>
        ) : (
          <CustomButton type="primary" btnText={"Edit"} onClick={handleEdit} />
        )
      }
      style={{ maxWidth: 500 }}
    >
      {user ? (
        <Form form={form} layout="vertical">
          {renderField("First Name", "first_name", [
            { required: true, message: "First name is required" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve(); // allow empty
                if (value.trim() === "") {
                  return Promise.reject(
                    new Error("First Name cannot be only spaces")
                  );
                }
                return Promise.resolve();
              },
            },
          ])}

          {renderField("Last Name", "last_name", [
            { required: true, message: "Last name is required" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve(); // allow empty
                if (value.trim() === "") {
                  return Promise.reject(
                    new Error("Last Name cannot be only spaces")
                  );
                }
                return Promise.resolve();
              },
            },
          ])}

          {renderField(
            "Mobile Number",
            "mobile_number",
            [
              { required: true, message: "Mobile number is required" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Mobile number must be 10 digits",
              },
            ],
            "",
            true
          )}

          {renderField("Email", "email", [
            { type: "email", message: "Enter a valid email" },
          ])}
        </Form>
      ) : (
        "Loading..."
      )}
    </Card>
  );
};

export default EditableProfileCard;
