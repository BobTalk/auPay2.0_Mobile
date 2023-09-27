import PublicHead from "@/Components/PublicHead";
import { useLocation } from "react-router-dom";
import { InfoSecurityTip, InfoSecurity } from "../../Enum";
import PublicInput from "@/Components/PublicInput";
import { Button, Toast } from "antd-mobile";
import PublicForm from "@/Components/PublicForm";
import { useState } from "react";
import { HeadConfig } from "@/Assets/config/head";
import { getSession } from "@/utils/base";
import { SendEmailCode } from "@/Api";
const ResetPwd = (props: any) => {
  let { state: urlParams } = useLocation();
  let InfoSecurityTip1 = JSON.parse(JSON.stringify(InfoSecurityTip));
  let InfoSecurity1 = JSON.parse(JSON.stringify(InfoSecurity));
  let [emailBtn, setEmailBtn] = useState(false);
  const HeadInfo = Object.assign(HeadConfig, {
    title: urlParams.headTitle ?? props.headTitle,
    back: "goBack",
    style: {},
    className:
      "p-[.32rem_.3rem] h-[auto] border-b-[1px] border-b-[rgba(197,202,208,1)]",
  });
  let userInfo = getSession("userInfo");
  let [formInitVal, setFormInitVal] = useState({
    email: userInfo.email,
    emailCode: "",
    GoogleCode: "",
  });
  function submitCb(val: any) {
    console.log(val);
  }
  function getEMailCode() {
    console.log(formInitVal)
    setEmailBtn(true);
    SendEmailCode(47)
      .then((res) => {
        Toast.show({
          content: res.message,
        });
      })
      .finally(() => {
        setTimeout(() => setEmailBtn(false), 3000);
      });
  }
  return (
    <>
      <PublicHead {...HeadInfo} />
      {!!InfoSecurityTip1[urlParams.crt.type] ? (
        <p className="grid items-center px-[.3rem] h-[.7rem] text-[.24rem] text-[#222] bg-[#E9ECF2]">
          {InfoSecurityTip1[urlParams.crt.type]}
        </p>
      ) : null}
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
            {urlParams.crt.type !== InfoSecurity1["unbind"] ? "验证" : "确认"}
          </Button>
        }
      >
        <PublicInput
          disabled={true}
          value={formInitVal.email}
          rules={[{ required: true, message: "邮箱不能为空" }]}
          name="email"
          inputStyle={{
            "--text-align": "right",
          }}
          inputBoxStyle={{
            backgroundColor: "#fff",
            paddingRight: 0,
            paddingLeft: 0,
            borderBottom: "1px solid #E6E6E6",
            borderRadius: 0,
          }}
          inputClassName="text-[.3rem] text-[#222]"
          prefix={<span className="text-[.3rem] text-[#222]">邮箱</span>}
        />
        <PublicInput
          key="emailCode"
          name="emailCode"
          placeholder="请输入邮箱验证码"
          inputStyle={{
            "--text-align": "right",
          }}
          inputBoxStyle={{
            backgroundColor: "#fff",
            paddingRight: 0,
            paddingLeft: 0,
            borderBottom: "1px solid #E6E6E6",
            borderRadius: 0,
          }}
          rules={[{ required: true, message: "邮箱验证码不能为空" }]}
          inputClassName="text-[.3rem] text-[#222]"
          prefix={<span className="text-[.3rem] text-[#222]">邮箱验证码</span>}
        >
          <Button
            onClick={getEMailCode}
            disabled={emailBtn}
            className="before:bg-transparent text-[.3rem] text-[#1C63FF]"
            color="primary"
            fill="none"
          >
            获取
          </Button>
        </PublicInput>
        {urlParams.crt.type == InfoSecurity1["updateGoogleValidator"] ? (
          <>
            <PublicInput
              placeholder="请输入资金密码"
              inputStyle={{
                "--text-align": "right",
              }}
              inputBoxStyle={{
                backgroundColor: "#fff",
                paddingRight: 0,
                paddingLeft: 0,
                borderBottom: "1px solid #E6E6E6",
                borderRadius: 0,
              }}
              inputClassName="text-[.3rem] text-[#222]"
              prefix={
                <span className="text-[.3rem] text-[#222]">资金密码</span>
              }
            ></PublicInput>
          </>
        ) : (
          <PublicInput
            key="GoogleCode"
            name="GoogleCode"
            value={formInitVal.GoogleCode}
            rules={[{ required: true, message: "Google验证码不能为空" }]}
            placeholder="请输入Google验证码"
            inputStyle={{
              "--text-align": "right",
            }}
            inputBoxStyle={{
              backgroundColor: "#fff",
              paddingRight: 0,
              paddingLeft: 0,
              borderBottom: "1px solid #E6E6E6",
              borderRadius: 0,
            }}
            input={(value: string) =>
              setFormInitVal((init) => ({ ...init, GoogleCode: value }))
            }
            inputClassName="text-[.3rem] text-[#222]"
            prefix={
              <span className="text-[.3rem] text-[#222]">Google验证码</span>
            }
          >
            {/* <Button
              className="before:bg-transparent text-[.3rem] text-[#1C63FF]"
              color="primary"
              fill="none"
            >
              发送
            </Button> */}
          </PublicInput>
        )}
      </PublicForm>
    </>
  );
};
ResetPwd.defaultProps = {
  headTitle: "重置密码",
};
export default ResetPwd;
