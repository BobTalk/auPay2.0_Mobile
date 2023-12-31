import PublicHead from "@/Components/PublicHead";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, Toast } from "antd-mobile";
import { HeadConfig } from "@/Assets/config/head";
import "./index.scss";
import { ResetPassword } from "@/Api";
const New = () => {
  let headData = Object.assign(HeadConfig, {
    title: "",
    back: "/login",
    className: "p-[.32rem_.3rem]",
  });
  const navigate = useNavigate();
  let { state: urlParams } = useLocation();
  const onFinish = (values: { newPassword: any }) => {
    ResetPassword({
      username: urlParams.username,
      password: values.newPassword,
      emailCode: urlParams.code,
      googleCode: urlParams.googleCode,
    }).then((res) => {
      Toast.show({
        content: res.message,
      });
      if (res.status) {
        setTimeout(() =>
          navigate(
            { pathname: "/reset/receipt" },
            { state: { type: "success" } }
          )
        );
      }
    });
  };
  return (
    <div className="-login_wrap">
      <PublicHead {...headData} />
      <p className="reset_tit">设置新登录密码</p>
      <Form
        className="login_form px-[.4rem]"
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item>
          <p className="login_form_label login_form_label_max_plus">
            新登陆密码
          </p>
          <Form.Item
            noStyle
            name="password"
            rules={[
              { required: true, message: "登陆密码不能为空" },
              {
                type: "string",
                min: 6,
                max: 20,
                message: "6～20位大/小写字母及数字，不包含特殊字符",
              },
            ]}
          >
            <Input
              type="password"
              className="login_form_input"
              placeholder="请输入新登录密码"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <p className="login_form_label login_form_label_max_plus">
            确认新登陆密码
          </p>
          <Form.Item
            noStyle
            name="newPassword"
            rules={[
              { required: true, message: "登陆密码不能为空" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码输入不一致"));
                },
              }),
            ]}
          >
            <Input
              type="password"
              className="login_form_input"
              placeholder="请再次确认新登录密码"
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
export default New;
