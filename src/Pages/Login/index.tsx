import { useRef, useState, useEffect } from "react";
import PublicHead from "@/Components/PublicHead";
import Logo from "@/Assets/images/logo.png";
import CloseImg from "@/Assets/images/close.png";
import { Form, Input, Button, Toast } from "antd-mobile";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { HeadConfig } from "@/Assets/config/head";
import { GetAccessKey, GetCode, LoginI } from "@/Api";
import PublicToast from "@/Components/PublicToast";
import { encryptByDES, setSession } from "@/utils/base";
import { useCountDown } from "@/Hooks/Countdown";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const Login = () => {
  let [codeMessage, setCodeMessage] = useState("获取验证码");
  let [stop] = useStopPropagation();
  let { start, count: timeDown } = useCountDown(
    59,
    () => {
      setCodeMessage(`${timeDown}s`);
    },
    () => {
      setCodeMessage("获取验证码");
    }
  );
  let [contentH, setContentH] = useState(0);
  let [formVal, setFormVal] = useState({
    username: "",
    password: "",
    code: "",
  });
  let JHeader: any = useRef();
  let headData = Object.assign(HeadConfig, {
    title: "auPay用户登录",
    back: "/",
    className:'p-[.32rem_.3rem] h-auto'
  });                 
  const navigate = useNavigate();
  const formRef: any = useRef(null);
  const closePassword = () => {
    formRef?.current?.setFieldValue("password", "");
  };
  const getEmailCode = (e: any) => {
    stop(e, () => {
      if (codeMessage !== "获取验证码") return;
      if (!formVal.username) {
        PublicToast({ message: "请输入用户名！" });
        return;
      }
      start();
      GetCode(formVal.username).then((res) => {
        PublicToast({
          message: res.message,
        });
      });
    });
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
        console.log(finallyRes);
        if (!finallyRes.status) {
          Toast.show({
            content: finallyRes.message,
          });
          return;
        }
        setSession("token", finallyRes.value);
        navigate("/home");
      });
  };
  const forget = () => {
    navigate("/reset/user");
  };
  useEffect(() => {
    let Hh = JHeader.current?.getBoundingClientRect()?.height ?? 0;
    setContentH(Hh);
  }, []);
  return (
    <div className="_login_wrap">
      <PublicHead ref={JHeader} {...headData} />
      <div
        style={{
          maxHeight: `calc(100vh - ${contentH}px)`,
        }}
        className="overflow-y-auto"
      >
        <img
          className="w-[3rem] h-[.95rem] mt-[.7rem] mb-[.9rem] m-[0_auto]"
          src={Logo}
          alt=""
        />
        <Form
          className="login_form p-[0_.4rem]"
          initialValues={formVal}
          onFinish={onFinish}
          ref={formRef}
          footer={
            <Button
              className="login_form_btn"
              block
              type="submit"
              color="primary"
            >
              登录
            </Button>
          }
        >
          <Form.Item>
            <p className="login_form_label">用户名</p>
            <Form.Item
              noStyle
              name="username"
              rules={[{ required: true, message: "用户名不能为空" }]}
            >
              <Input
                className="login_form_input"
                onChange={(val) => setFormVal({ ...formVal, username: val })}
                placeholder="请输入姓名"
              />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <p className="login_form_label">登陆密码</p>
            <Form.Item
              noStyle
              name="password"
              rules={[{ required: true, message: "登陆密码不能为空" }]}
            >
              <Input
                type="password"
                onChange={(val) => setFormVal({ ...formVal, password: val })}
                className="login_form_input"
                placeholder="请输入登陆密码"
              />
            </Form.Item>
            <img
              onClick={closePassword}
              className="login_form_close"
              src={CloseImg}
              alt=""
            />
          </Form.Item>

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

            <p onClick={(e) => getEmailCode(e)} className="login_form_get_code whitespace-nowrap">
              {codeMessage}
            </p>
          </Form.Item> */}

          <div onClick={forget} className="login_form_forget">
            <p>忘记密码</p>
          </div>
        </Form>
        <p className="foo_tips">
          还没账号, <Link to="/register">去注册</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
