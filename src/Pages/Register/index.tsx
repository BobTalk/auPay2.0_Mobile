import { useRef, useState } from "react";
import PublicHead from "@/Components/PublicHead";
import Logo from "@/Assets/images/logo.png";
import CloseImg from "@/Assets/images/close.png";
import { Form, Input, Button, Checkbox } from "antd-mobile";
import { Link } from "react-router-dom";
import { HeadConfig } from "@/Assets/config/head";
import { GetRegionCode, RegisterI } from "@/Api";
import PublicToast from "@/Components/PublicToast";
const Register = () => {
  let headData = Object.assign(HeadConfig, {
    title: "auPay用户注册",
    back: "/",
  });
  let [timeDown, setTimeDown] = useState(60);
  let [formObj, setFormObj] = useState({
    code: "",
    email: "",
    newPassword: "",
    password: "",
    username: "",
  });
  const formRef: any = useRef(null);
  const closePassword = (key: String) => {
    if (!key) return;
    formRef && formRef.current && formRef.current.setFieldValue(key, "");
  };
  // 倒计时
  const Timeout = (delay: number) => {
    let timer: number;
    const stime = +new Date();
    const loop = () => {
      const etime = +new Date();
      if (stime + delay <= etime) {
        if (timeDown > -1) {
          setTimeDown(--timeDown);
          Timeout(1000);
          return;
        }
        cancelAnimationFrame(timer);
        setTimeDown(60)
        return;
      }
      timer = requestAnimationFrame(loop);
    };
    timer = requestAnimationFrame(loop);
  };
  const getEmailCode = (e: any) => {
    e.stopPropagation();
    if (!formObj.email) {
      PublicToast({
        message: "请输入邮箱！",
      });
      return;
    }
    Timeout(1000);
    GetRegionCode(formObj.email).then((res: any) => {
      PublicToast({
        message: res.message,
      });
    });
  };
  const onFinish = (obj: any) => {
    RegisterI(obj).then((res) => {
      PublicToast({
        message: res.message,
      });
    });
  };
  return (
    <div className="login_wrap px-[.3rem]">
      <PublicHead {...headData} />
      <img className="logo" src={Logo} alt="" />
      <Form
        className="login_form register_form mx-[.1rem]"
        onFinish={onFinish}
        initialValues={formObj}
        ref={formRef}
      >
        <Form.Item>
          <p className="login_form_label">用户名</p>
          <Form.Item
            noStyle
            name="username"
            rules={[
              { required: true, message: "用户名不能为空" },
              {
                pattern: /^[^0-9]\w{5,9}$/,
                message: "6-10位字母加数字组合，且首位不为数字",
              },
            ]}
          >
            <Input
              onChange={(val) => setFormObj({ ...formObj, username: val })}
              className="login_form_input"
              placeholder="6-10位字母加数字组合，且首位不为数字"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <p className="login_form_label">设置登陆密码</p>
          <div className="register_form_flex">
            <Form.Item
              noStyle
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
            >
              <Input
                type="password"
                onChange={(val) => setFormObj({ ...formObj, password: val })}
                className="login_form_input"
                placeholder="密码长度在6-20个字符之间"
              />
            </Form.Item>
            <img
              onClick={() => closePassword("password")}
              className="login_form_close"
              src={CloseImg}
              alt=""
            />
          </div>
        </Form.Item>

        <Form.Item>
          <p className="login_form_label">确认登陆密码</p>
          <div className="register_form_flex">
            <Form.Item
              noStyle
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
              <Input
                type="password"
                onChange={(val) => setFormObj({ ...formObj, newPassword: val })}
                className="login_form_input"
                placeholder="重复输入登录密码"
              />
            </Form.Item>
            <img
              onClick={() => closePassword("newPassword")}
              className="login_form_close"
              src={CloseImg}
              alt=""
            />
          </div>
        </Form.Item>

        <Form.Item>
          <p className="login_form_label">邮箱</p>
          <div className="register_form_flex">
            <Form.Item
              noStyle
              name="email"
              rules={[
                { required: true, message: "邮箱不能为空" },
                { type: "email", message: "请正确输入邮箱" },
              ]}
            >
              <Input
                className="login_form_input"
                onChange={(val) => setFormObj({ ...formObj, email: val })}
                placeholder="请输入邮箱地址"
              />
            </Form.Item>
            <img
              onClick={() => closePassword("email")}
              className="login_form_close"
              src={CloseImg}
              alt=""
            />
          </div>
        </Form.Item>

        <Form.Item>
          <p className="login_form_label">邮箱验证码</p>
          <div className="register_form_flex">
            <Form.Item
              noStyle
              name="code"
              rules={[{ required: true, message: "邮箱验证码不能为空" }]}
            >
              <Input
                onChange={(val) => setFormObj({ ...formObj, code: val })}
                className="login_form_input"
                placeholder="请输入邮箱验证码"
              />
            </Form.Item>
            {0 <= timeDown && timeDown < 60 ? (
              <p className="login_form_get_code">{timeDown} s</p>
            ) : (
              <p
                onClick={(e) => getEmailCode(e)}
                className="login_form_get_code"
              >
                获取验证码
              </p>
            )}
          </div>
        </Form.Item>

        <Form.Item
          className="login_form_item"
          name="checkbox"
          rules={[{ required: true, message: "请选择同意《auPay用户协议》" }]}
        >
          <Checkbox>我同意《auPay用户协议》</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            className="before:bg-transparent login_form_btn"
            block
            type="submit"
            color="primary"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
      <p className="foo_tips">
        已有账号, <Link to="/login">去登录</Link>
      </p>
    </div>
  );
};

export default Register;
