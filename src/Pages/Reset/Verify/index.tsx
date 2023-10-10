import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PublicHead from "@/Components/PublicHead";
import { Form, Input, Button } from "antd-mobile";
import { HeadConfig } from "@/Assets/config/head";
import './index.scss'
import { useCountDown } from "@/Hooks/Countdown";
import PublicToast from "@/Components/PublicToast";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const Verify = () => {
  let headData = Object.assign(HeadConfig, { title: "", back: "/reset/user",className:'p-[.32rem_.3rem]' });
  const navigate = useNavigate();
  let codeTimer: any = null;
  let [stop] = useStopPropagation();
  let [codeMessage, setCodeMessage] = useState("获取验证码");
  let { start, count: timeDown } = useCountDown(
    59,
    () => {
      setCodeMessage(`${timeDown}s`);
    },
    () => {
      setCodeMessage("获取验证码");
    }
  );

  useEffect(() => {
    return () => {
      closeCodeTime();
    };
  }, []);
  const closeCodeTime = () => {
    clearInterval(codeTimer);

  };
  const onFinish = (values: Object) => {
    console.log("登陆提交数据" + values);
    navigate("/reset/new");
  };
  function getEmailCode(event:any): void {
    stop(event, () => {
      if (codeMessage !== "获取验证码") return;
      start();
    });
  }

  return (
    <div className="-login_wrap ">
      <PublicHead {...headData} />
      <p className="reset_tit">安全验证</p>
      <Form
        className="login_form reset_form px-[.4rem]"
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item>
          <p className="login_form_label login_form_label_max whitespace-nowrap">
            js****@yeah.net
          </p>
        </Form.Item>
        <Form.Item>
          <p className="login_form_label">邮箱验证码</p>
          <Form.Item
            noStyle
            name="code"
            rules={[{ required: true, message: "邮箱验证码不能为空" }]}
          >
            <Input
              className="login_form_input"
              placeholder="请输入邮箱验证码"
            />
          </Form.Item>
            <p onClick={getEmailCode} className="login_form_get_code">
              {codeMessage}
            </p>
        </Form.Item>
        <Form.Item>
          <p className="login_form_label">Google验证</p>
          <Form.Item
            noStyle
            name="username"
            rules={[{ required: true, message: "Google验证码不能为空" }]}
          >
            <Input
              className="login_form_input"
              placeholder="请输入Google验证码"
            />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            className="before:bg-transparent login_form_btn"
            block
            type="submit"
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Verify;
