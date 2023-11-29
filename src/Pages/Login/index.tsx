import { useRef, useState, useEffect } from "react";
import PublicHead from "@/Components/PublicHead";
import Logo from "@/Assets/images/logo.png";
import CloseImg from "@/Assets/images/close.png";
import { Form, Input, Button, Toast } from "antd-mobile";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { HeadConfig } from "@/Assets/config/head";
import { GetAccessKey, LoginI } from "@/Api";
import {
  encryptByDES,
  getSession,
  mergeClassName,
  setSession,
} from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const Login = () => {
  let [stop] = useStopPropagation();
  let [contentH, setContentH] = useState(0);
  let [validatePwd, setValidatePwd] = useState(false);
  let [formVal, setFormVal] = useState({
    username: "",
    password: "",
    code: "",
  });
  let JHeader: any = useRef();
  let headData = Object.assign(HeadConfig, {
    title: "auPay用户登录",
    back: "",
    className: "p-[.32rem_.3rem] h-auto",
  });
  const navigate = useNavigate();
  const formRef: any = useRef(null);
  const closePassword = () => {
    setFormVal({ ...formVal, password: "" });
    formRef?.current?.setFieldValue("password", "");
  };

  const onFinish = (obj: any) => {
    GetAccessKey()
      .then((res) => {
        return LoginI({
          username: formVal.username,
          password: encryptByDES(obj.password, res.value),
          code: formVal.code,
        });
      })
      .then((finallyRes) => {
        if (!finallyRes.status) {
          Toast.show({
            content: finallyRes.message,
          });
          return;
        }
        setSession("token", finallyRes.value);
        navigate("/home");
      })
      .catch((err) => {
        console.error("err: ", err);
      });
  };
  const forget = (e: any) => {
    stop(e, () => {
      navigate("/reset/user");
    });
  };
  function validateFaileCb({ values }: any) {
    console.log("values: ", values);
    if (values.password) {
      setValidatePwd(false);
    }
    if (!values.password) {
      setValidatePwd(true);
    }
  }
  useEffect(() => {
    let Hh = JHeader.current?.getBoundingClientRect()?.height ?? 0;
    setContentH(Hh);
    if (getSession("token")) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="_login_wrap">
      <PublicHead ref={JHeader} {...headData} />
      <div
        style={{
          maxHeight: `calc(100% - ${contentH}px)`,
        }}
        className="overflow-y-auto"
      >
        <img
          className="w-[3rem] h-[.95rem] mt-[.7rem] mb-[.4rem] m-[0_auto]"
          src={Logo}
          alt=""
        />
        <Form
          initialValues={formVal}
          onFinish={onFinish}
          onFinishFailed={validateFaileCb}
          layout="horizontal"
          ref={formRef}
          footer={
            <div className="px-[.4rem]">
              <Button
                className="bg-[#1C63FF]  text-[.34rem] h-[.92rem]"
                block
                type="submit"
                color="primary"
              >
                登录
              </Button>
            </div>
          }
        >
          <Form.Item
            label={<FormLabel title="用户名" />}
            name="username"
            rules={[{ required: true, message: "用户名不能为空" }]}
          >
            <Input
              onChange={(val) => setFormVal({ ...formVal, username: val })}
              placeholder="请输入姓名"
            />
          </Form.Item>

          <Form.Item
            label={<FormLabel title="登陆密码" />}
            name="password"
            rules={[{ required: true, message: "登陆密码不能为空" }]}
          >
            <div className="flex items-center justify-between">
              <Input
                type="password"
                value={formVal.password}
                onChange={(val) => setFormVal({ ...formVal, password: val })}
                className="flex-1 mr-[.16rem]"
                placeholder="请输入登陆密码"
              />
              <img
                onClick={closePassword}
                className="w-[.33rem] h-[.33rem]"
                src={CloseImg}
                alt=""
              />
            </div>
          </Form.Item>
          {validatePwd ? (
            <p className="text-[#ff3141] text-[14px] pl-[.4rem] mt-[.04rem]">
              登陆密码不能为空
            </p>
          ) : (
            <></>
          )}

          {/* <Form.Item>
            <p className="login_form_label">邮箱验证码</p>
            <Form.Item
              noStyle
              name="code"
              rules={[{ required: false, message: "邮箱验证码不能为空" }]}
            >
              <Input
                onChange={(val) => setFormVal({ ...formVal, code: val })}
                className="login_form_input"
                placeholder="请输入邮箱验证码"
              />
            </Form.Item>

            <GetCodeBtn  btnName='获取验证码' username={formVal.username} module='login' />
          </Form.Item> */}

          <div
            onClick={forget}
            className="flex justify-end mt-[.2rem] pr-[.4rem]"
          >
            <p className="text-[#999] text-[.3rem]">忘记密码</p>
          </div>
        </Form>
        <p className="foo_tips">
          还没账号, <Link to="/register" className="!text-[#1C63FF]">去注册</Link>
        </p>
      </div>
    </div>
  );
};

const FormLabel = ({ title, className = "" }: any) => {
  return (
    <p
      className={mergeClassName(
        "text-[#333] text-[.32rem] font-normal",
        className
      )}
    >
      {title}
    </p>
  );
};
export default Login;
