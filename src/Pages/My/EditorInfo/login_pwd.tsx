import PublicForm from "@/Components/PublicForm";
import PublicInput from "@/Components/PublicInput";
import { Button } from "antd-mobile";
import { useState } from "react";

const LoginPwd = () => {
  function submitCb() {}
  const [formInitVal, setFormInitVal] = useState({
    oldPwd: "",
    newPwd: "",
    confirmPwd: "",
  });
  return (
    <PublicForm
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
        rules={[{ required: true, message: "请输入原始密码" }]}
        name="oldPwd"
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
            message: "6～20位大/小写字母及数字，不包含特殊字符",
          },
        ]}
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
        rules={[{ required: true, message: "两次密码输入不一致" }]}
        name="confirmPwd"
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
