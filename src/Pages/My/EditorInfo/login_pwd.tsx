import { UpdatePassword } from "@/Api";
import PublicForm from "@/Components/PublicForm";
import PublicInput from "@/Components/PublicInput";
import { clearSession } from "@/utils/base";
import { Button, Toast } from "antd-mobile";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPwd = () => {
  const JFormRef = useRef<any>();
  let navigate = useNavigate();
  // 修改登陆密码
  function submitCb({ values }: any) {
    console.log(values, "submit");
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
  let checkPwd = ({ field }: any, val: any) => {
    if (!val) {
      return Promise.reject(new Error(WarnMessage[field]));
    } else {
      if (field == "newPwd") {
        let reg = /^[a-zA-Z0-9]{6,20}$/g;
        if (!reg.test(val)) {
          return Promise.reject(new Error(WarnMessage[field]));
        } else {
          setFormInitVal((formInitVal) => ({ ...formInitVal, [field]: val }));
          return Promise.resolve();
        }
      } else if (field === "confirmPwd") {
        if (formInitVal.newPwd != val) {
          return Promise.reject(new Error(WarnMessage[field]));
        } else {
          setFormInitVal((formInitVal) => ({
            ...formInitVal,
            confirmPwd: val,
          }));
          return Promise.resolve();
        }
      } else {
        setFormInitVal((formInitVal) => ({ ...formInitVal, oldPwd: val }));
        return Promise.resolve();
      }
    }
    return Promise.resolve();
  };
  return (
    <PublicForm
      ref={JFormRef}
      style={{
        margin: "0 .3rem",
      }}
      finish={submitCb}
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
      <PublicInput
        value={formInitVal.oldPwd}
        rules={[
          {
            required: true,
            message: "",
            validateTrigger: ["onChange"],
          },
          { validator: checkPwd },
        ]}
        name="oldPwd"
        type="password"
        placeholder="请输入原始密码"
        inputBoxStyle={{
          backgroundColor: "#fff",
          paddingRight: 0,
          paddingLeft: 0,
          borderBottom: "1px solid #E6E6E6",
          borderRadius: 0,
        }}
        inputClassName="text-[.3rem] text-[#222]"
      />
      <PublicInput
        value={formInitVal.newPwd}
        rules={[
          {
            required: true,
            message: "",
            min: 6,
            max: 20,
          },
          { validator: checkPwd },
        ]}
        type="password"
        name="newPwd"
        maxLength={20}
        minLength={6}
        placeholder="请输入新密码"
        inputBoxStyle={{
          backgroundColor: "#fff",
          paddingRight: 0,
          paddingLeft: 0,
          borderBottom: "1px solid #E6E6E6",
          borderRadius: 0,
        }}
        inputClassName="text-[.3rem] text-[#222]"
      />
      <PublicInput
        value={formInitVal.oldPwd}
        rules={[
          {
            required: true,
            message: "",
            min: 6,
            max: 20,
          },
          { validator: checkPwd },
        ]}
        name="confirmPwd"
        type="password"
        placeholder="请再次输入新密码"
        inputBoxStyle={{
          backgroundColor: "#fff",
          paddingRight: 0,
          paddingLeft: 0,
          borderBottom: "1px solid #E6E6E6",
          borderRadius: 0,
        }}
        inputClassName="text-[.3rem] text-[#222]"
      />
    </PublicForm>
  );
};
export default LoginPwd;
