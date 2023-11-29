import { useEffect, useRef, useState } from "react";
import PublicHead from "@/Components/PublicHead";
import Logo from "@/Assets/images/logo.png";
import CloseImg from "@/Assets/images/close.png";
import { Form, Input, Button, Checkbox } from "antd-mobile";
import { Link } from "react-router-dom";
import { HeadConfig } from "@/Assets/config/head";
import { RegisterI } from "@/Api";
import PublicToast from "@/Components/PublicToast";
import "./index.scss";
import GetCodeBtn from "@/Components/GetCode";
import PublicScroll from "@/Components/PublicScroll";
import { mergeClassName } from "@/utils/base";
import { CheckOutline } from "antd-mobile-icons";
const Register = () => {
  let headData = Object.assign(HeadConfig, {
    title: "auPay用户注册",
    back: "/",
    className: "text-[#333] p-[.32rem_0.3rem] h-[auto]",
  });
  let JHeader: any = useRef();
  let [contentH, setContentH] = useState(0);
  let [formValitorFaile, setFormValitorFaile] = useState<boolean>(false);
  let [formObj, setFormObj] = useState({
    code: "",
    email: "",
    newPassword: "",
    password: "",
    username: "",
  });
  const formRef: any = useRef(null);
  const closePassword = (e: any, key: string) => {
    e.stopPropagation();
    let obj = { ...formObj, [key]: "" };
    setFormObj(obj);
    formRef.current.setFieldValue(key, "");
  };

  const onFinish = (obj: any) => {
    RegisterI(obj).then((res) => {
      PublicToast({
        message: res.message,
      });
    });
  };
  const finishFailedCb = ({ values }: any) => {
    console.log("values: ", values);
    if (!values?.checkbox) {
      setFormValitorFaile(true);
    }
    if (values?.checkbox) {
      setFormValitorFaile(false);
    }
  };
  useEffect(() => {
    let Hh = JHeader.current?.getBoundingClientRect()?.height ?? 0;
    setContentH(Hh);
  }, []);
  return (
    <PublicScroll>
      <PublicHead {...headData} ref={JHeader} />
      <div
        className="_register overflow-hidden"
        style={{
          height: `calc(${window.innerHeight}px - ${contentH}px )`,
        }}
      >
        <div className="p-[0_.3rem_.3rem] h-full overflow-y-auto">
          <img
            className="mx-[auto] mt-[.7rem] mb-[.9rem] w-[3rem] h-[.96rem]"
            src={Logo}
            alt=""
          />
          <Form
            className="register_form mx-[.1rem]"
            onFinish={onFinish}
            onFinishFailed={finishFailedCb}
            initialValues={formObj}
            ref={formRef}
            footer={
              <Button
                className="bg-[#1C63FF] w-full text-[.34rem] h-[.92rem]"
                type="submit"
                color="primary"
              >
                注册
              </Button>
            }
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "用户名不能为空" },
                {
                  pattern: /^[^0-9]\w{5,9}$/,
                  message: "6-10位字母加数字组合，且首位不为数字",
                },
              ]}
              // noStyle
              label={<FormLabel title="用户名" />}
            >
              <Input
                autoComplete="off"
                onChange={(val) => setFormObj({ ...formObj, username: val })}
                className="h-[.46rem]"
                placeholder="6-10位字母加数字组合，且首位不为数字"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "登陆密码不能为空" },
                {
                  type: "string",
                  min: 6,
                  max: 20,
                  message: "密码长度在6-20个字符之间",
                },
              ]}
              label={<FormLabel className="mt-[.3rem]" title="设置登陆密码" />}
            >
              <div className="flex items-center">
                <Input
                  type="password"
                  value={formObj.password}
                  onChange={(val) => setFormObj({ ...formObj, password: val })}
                  className="flex-1"
                  placeholder="密码长度在6-20个字符之间"
                />
                <img
                  className="w-[.33rem] h-[.33rem]"
                  onClick={(e) => closePassword(e, "password")}
                  src={CloseImg}
                  alt=""
                />
              </div>
            </Form.Item>

            <Form.Item
              label={<FormLabel className="mt-[.3rem]" title="确认登陆密码" />}
              name="newPassword"
              rules={[
                { required: true, message: "请确认您的密码!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("您输入的两次密码不一致!"));
                  },
                }),
              ]}
            >
              <div className="flex items-center">
                <Input
                  type="password"
                  value={formObj.newPassword}
                  onChange={(val) =>
                    setFormObj({ ...formObj, newPassword: val })
                  }
                  className="login_form_input"
                  placeholder="重复输入登录密码"
                />
                <img
                  onClick={(e) => closePassword(e, "newPassword")}
                  className="w-[.33rem] h-[.33rem]"
                  src={CloseImg}
                  alt=""
                />
              </div>
            </Form.Item>

            <Form.Item
              label={<FormLabel className="mt-[.3rem]" title="邮箱" />}
              name="email"
              rules={[
                { required: true, message: "邮箱不能为空" },
                { type: "email", message: "请正确输入邮箱" },
              ]}
            >
              <div className="flex items-center">
                <Input
                  value={formObj.email}
                  className="login_form_input"
                  onChange={(val) => setFormObj({ ...formObj, email: val })}
                  placeholder="请输入邮箱地址"
                />
                <img
                  onClick={(e) => closePassword(e, "email")}
                  className="w-[.33rem] h-[.33rem]"
                  src={CloseImg}
                  alt=""
                />
              </div>
            </Form.Item>

            <Form.Item
              label={<FormLabel className="mt-[.3rem]" title="邮箱验证码" />}
              name="code"
              rules={[{ required: true, message: "邮箱验证码不能为空" }]}
            >
              <div className="flex items-center">
                <Input
                  onChange={(val) => setFormObj({ ...formObj, code: val })}
                  className="login_form_input"
                  placeholder="请输入邮箱验证码"
                />
                <GetCodeBtn
                  module="register"
                  btnName="获取验证码"
                  email={formObj.email}
                />
              </div>
            </Form.Item>

            <Form.Item
              className="mt-[.16rem] last-item"
              name="checkbox"
              rules={[
                { required: true, message: "请选择同意《auPay用户协议》" },
              ]}
            >
              <Checkbox
                style={{
                  "--icon-size": ".3rem",
                }}
                icon={(checked) => (
                  <CustomBox
                    checked={checked}
                    finishFailedCb={finishFailedCb}
                  />
                )}
              >
                <span
                  className={mergeClassName(
                    formValitorFaile ? "text-[#ff3141]" : "text-[#657087]",
                    "text-[.3rem]"
                  )}
                >
                  我同意《auPay用户协议》
                </span>
              </Checkbox>
            </Form.Item>
          </Form>
          <p className="flex items-center justify-center text-[.3rem] text-[#999]">
            已有账号， <Link to="/login" className="!text-[#1C63FF]">去登录</Link>
          </p>
        </div>
      </div>
    </PublicScroll>
  );
};
const FormLabel = ({ title, className = "" }: any) => {
  return (
    <p
      className={mergeClassName(
        "text-[#333] text-[.32rem] font-normal mb-[.16rem]",
        className
      )}
    >
      {title}
    </p>
  );
};

const CustomBox = (props: any) => {
  let { checked, finishFailedCb } = props;
  finishFailedCb?.({ values: { checkbox: checked } });
  return !checked ? (
    <div className="grid place-items-center w-[.3rem] h-[.3rem] p-[.02rem] border border-[#657087]  !rounded-[4px]"></div>
  ) : (
    <div className="grid place-items-center w-[.3rem] h-[.3rem] p-[.02rem] border border-[#1C63FF]  !rounded-[4px]">
      <CheckOutline className="text-[.24rem] text-[#1C63FF]" />
    </div>
  );
};
export default Register;
