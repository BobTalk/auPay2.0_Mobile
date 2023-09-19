import PublicHead from "@/Components/PublicHead";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd-mobile";
import { HeadConfig } from "@/Assets/config/head";
const User = () => {
  const headData = Object.assign(HeadConfig, { title: "", back: "/login" });
  const navigate = useNavigate();
  const onFinish = (values: Object) => {
    console.log("登陆提交数据" + values);
    navigate("/reset/verify");
  };
  return (
    <div className="login_wrap px-[.3rem]">
      <PublicHead {...headData} />
      <p className="reset_tit">重置登录密码</p>
      <Form className="login_form mx-[.1rem]" layout="horizontal" onFinish={onFinish}>
        <Form.Item>
          <p className="login_form_label">用户名</p>
          <Form.Item
            noStyle
            name="username"
            rules={[{ required: true, message: "用户名不能为空" }]}
          >
            <Input className="login_form_input" placeholder="请输入用户名" />
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
export default User;
