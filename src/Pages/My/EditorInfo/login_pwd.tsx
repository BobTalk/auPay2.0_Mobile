import { UpdatePassword } from "@/Api";
import { clearSession } from "@/utils/base";
import { Button, Form, Input, Toast } from "antd-mobile";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../../Assets/style/form.scss';
const LoginPwd = () => {
  const oldPwd = useRef<any>();
  const newPwd = useRef<any>();
  const confirmPwd = useRef<any>();
  let navigate = useNavigate();
  // 修改登陆密码
  function submitCb({ values }: any) {
    UpdatePassword({
      oldPassword: values.oldPwd,
      newPassword: values.confirmPwd,
    })
      .then((result) => {
        if (result.status) {
          Toast.show({
            content: result.message,
          });

          setTimeout(() => {
            clearSession();
            navigate("/login", { replace: true });
          }, 3000);
        }
      })
      .catch((err) => {});
  }
  const [formInitVal, setFormInitVal] = useState({
    oldPwd: "",
    newPwd: "",
    confirmPwd: "",
  });
  const WarnMessage: any = {
    oldPwd: "原始密码不能为空",
    newPwd: "6～20位大/小写字母及数字",
    confirmPwd: "两次密码输入不一致",
  };
  let checkPwd = (obj: any, val: any) => {
    let { field } = obj;
    if (field == "newPwd") {
      let reg = /^[a-zA-Z0-9]{6,20}$/g;
      if (!reg.test(val)) {
        return Promise.reject(new Error(WarnMessage[field]));
      } else {
        setFormInitVal((formInitVal) => ({ ...formInitVal, [field]: val }));
        return Promise.resolve();
      }
    } else if (field === "confirmPwd") {
      if (!!val && formInitVal.newPwd == val) {
        setFormInitVal((formInitVal) => ({
          ...formInitVal,
          confirmPwd: val,
        }));
        return Promise.resolve();
      } else {
        return Promise.reject(new Error(WarnMessage[field]));
      }
    } else if (field == "oldPwd") {
      if (!val) {
        return Promise.reject(new Error(WarnMessage[field]));
      } else {
        setFormInitVal((formInitVal) => ({ ...formInitVal, oldPwd: val }));
        return Promise.resolve();
      }
    }
  };
  return (
    <Form
      style={{
        margin: "0 .3rem",
      }}
      onFinish={submitCb}
      initialValues={formInitVal}
      footer={
        <Button
          type="submit"
          block
          color="primary"
          className="before:bg-transparent text-[.3rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
        >
          确认
        </Button>
      }
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: "",
          },
          { validator: checkPwd },
        ]}
        name="oldPwd"
      >
        <Input type="password" placeholder="请输入原始密码" />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            min: 6,
            max: 20,
            message: "",
          },
          { validator: checkPwd },
        ]}
        name="newPwd"
      >
        <Input
          maxLength={20}
          minLength={6}
          type="password"
          placeholder="请输入新密码"
        />
      </Form.Item>

      <Form.Item
        rules={[
          {
            message: "",
            required: true,
            min: 6,
            max: 20,
          },
          { validator: checkPwd },
        ]}
        name="confirmPwd"
      >
        <Input
          maxLength={20}
          minLength={6}
          type="password"
          placeholder="请输入新密码"
        />
      </Form.Item>
    </Form>
  );
};
export default LoginPwd;
