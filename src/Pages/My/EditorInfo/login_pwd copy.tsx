import React, { useState, FC } from "react";
import { Form, Input, Button, Picker, Space } from "antd-mobile";
import type { PickerValue } from "antd-mobile/es/components/picker";
import MobileField from "./MobileField";


interface MobileValue {
  preValue: string | number;
  realValue: string;
}

export default () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  const checkMobile = (_: any, value: MobileValue) => {
    console.log()
    if (value.realValue) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("手机号不能为空!"));
  };

  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          mobile: { preValue: "86", realValue: "" },
        }}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Header>自定义表单控件</Form.Header>
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: "姓名不能为空!" }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="mobile"
          rules={[{ required: true }, { validator: checkMobile }]}
        >
          <MobileField />
        </Form.Item>
      </Form>
    </>
  );
};


