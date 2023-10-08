import PublicHead from "@/Components/PublicHead";
import { useLocation, useNavigate } from "react-router-dom";
import { InfoSecurityTip, InfoSecurity } from "../../Enum";
import PublicInput from "@/Components/PublicInput";
import { Button, Input, Toast } from "antd-mobile";
import PublicForm from "@/Components/PublicForm";
import { useState } from "react";
import { HeadConfig } from "@/Assets/config/head";
import { getSession } from "@/utils/base";
import {
  ResetAssetsPassword,
  ResetGoogleAuth,
  SendEmailCode,
  VerifyAssetsPassword,
  VerifyEmail,
  VerifyGoogle,
} from "@/Api";
const ResetPwd = (props: any) => {
  let { state: urlParams } = useLocation();
  let navigate = useNavigate();
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
  let [formInitVal, setFormInitVal] = useState<{
    email?: string;
    emailCode?: string;
    GoogleCode?: string;
    assetsPwd?: string | undefined;
  }>({
    email: userInfo.email,
    emailCode: "",
    GoogleCode: "",
    assetsPwd: "",
  });
  // 提交
  async function submitCb(obj: any) {
    console.log(obj);
    if (obj.outOfDate === false) return;
    let { emailCode, GoogleCode, assetsPwd } = obj.values;
    if (urlParams.crt.type === "updateGoogleValidator") {
      let emailToken = await VerifyEmail(emailCode, 48);
      let assetsPwdToken = await VerifyAssetsPassword({
        assetsPwd,
        operationId: 48,
      });
      if (!emailToken.status || !assetsPwdToken.status) {
        Toast.show({
          content: "邮箱验证码校验失败",
        });
        return;
      }

      ResetGoogleAuth({
        AssetsToken: assetsPwdToken.value,
        emailToken: emailToken.value,
      }).then((res) => {
        if (res.status) {
          navigate("/my/security-info");
        } else {
          Toast.show({
            content: "失败",
          });
        }
      });
      return;
    }
    let emailToken = await VerifyEmail(emailCode, 47);
    let googleToken = await VerifyGoogle(GoogleCode, 47);
    ResetAssetsPassword({
      googleToken: googleToken.value,
      emailToken: emailToken.value,
    }).then((res) => {
      if (res.status) {
        Toast.show({
          content: res.message,
        });
        setTimeout(() => {
          window.history.back();
        }, 3000);
      } else {
        Toast.show({
          content: "验证失败",
        });
      }
    });
  }
  function getEMailCode(e: any) {
    e.stopPropagation();
    if (emailBtn) return;
    setEmailBtn(true);
    SendEmailCode(urlParams.crt.type === "updateGoogleValidator" ? 48 : 47)
      .then()
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
          value={formInitVal.emailCode}
          placeholder="请输入邮箱验证码"
          onChange={(value: string) =>
            setFormInitVal((init: {}) => ({ ...init, emailCode: value }))
          }
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
          <p
            onClick={getEMailCode}
            className="before:bg-transparent text-[.3rem] text-[#1C63FF] ml-[.3rem]"
            color="primary"
          >
            获取
          </p>
        </PublicInput>
        {urlParams.crt.type == InfoSecurity1["updateGoogleValidator"] ? (
          <PublicInput
            key="assetsPwd"
            name="assetsPwd"
            type="password"
            value={formInitVal.assetsPwd}
            rules={[{ required: true, message: "资金密码不能为空" }]}
            onChange={(value: string) =>
              setFormInitVal((init: {}) => ({ ...init, assetsPwd: value }))
            }
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
            prefix={<span className="text-[.3rem] text-[#222]">资金密码</span>}
          />
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
            onChange={(value: string) =>
              setFormInitVal((init: {}) => ({ ...init, GoogleCode: value }))
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
