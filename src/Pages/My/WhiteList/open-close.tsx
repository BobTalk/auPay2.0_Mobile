import PublicHead from "@/Components/PublicHead";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { OperationIdEnum, WhiteListEnum } from "../../Enum";
import PublicInput from "@/Components/PublicInput";
import { Button, Toast } from "antd-mobile";
import PublicForm from "@/Components/PublicForm";
import { useEffect, useRef, useState } from "react";
import { dataType, getSession, setSession } from "@/utils/base";
import { HeadConfig } from "@/Assets/config/head";
import {
  AddWithdrawAddress,
  SendEmailCode,
  SwitchWhiteAddress,
  VerifyAssetsPassword,
  VerifyEmail,
  VerifyGoogle,
} from "@/Api";
import { useCountDown } from "@/Hooks/Countdown";
import GetCodeBtn from "@/Components/GetCode";
const OpenOrCloseWhiteList = (props: any) => {
  let urlParams: any = useParams();
  let { state: urlInof }: any = useLocation();
  let navigate = useNavigate();
  let formRef = useRef();
  let WhiteListEnum1 = JSON.parse(JSON.stringify(WhiteListEnum));
  const HeadInfo = Object.assign(HeadConfig, {
    title: urlInof?.headTitle ?? props.headTitle,
    back: "goBack",
    className:
      "p-[.32rem_.3rem] h-[auto] border-b-[1px] border-b-[rgba(197,202,208,1)]",
  });
  let userInfo = getSession("userInfo");
  const [formInitVal, setFormInitVal] = useState(() => {
    let obj: any = {
      email: userInfo.email,
      assetsPwd: "",
      emailCode: "",
      googleCode: "",
    };
    if (urlParams.flag == "add") {
      obj = Object.assign(obj, {
        notes: "",
        addr: "",
      });
    }
    return obj;
  });

  // 提交
  async function submitCb({ values }: any) {
    if (urlParams.flag == "add") {
      let googleToken: any = await VerifyGoogle(
        values.googleCode,
        OperationIdEnum["whiteListAdd"]
      );
      let assetsToken: any = await VerifyAssetsPassword({
        assetsPwd: values.assetsPwd,
        operationId: OperationIdEnum["whiteListAdd"],
      });
      let emailToken: any = await VerifyEmail(
        values.emailCode,
        OperationIdEnum["whiteListAdd"]
      );
      let res = await AddWithdrawAddress(
        {
          currencyId: urlInof.crt.currencyId,
          currencyChain: urlInof.crt.currencyChain,
          address: values.addr,
          note: values.notes,
        },
        {
          "Assets-Password-Token": assetsToken["value"],
          "Google-Auth-Token": googleToken["value"],
          "Email-Token": emailToken["value"],
        }
      );

      Toast.show({
        content: res.message,
      });
      if (res.status) {
        setTimeout(() => {
          navigate("/my/white-list", { state: urlInof.crt?.parentInfo });
        }, 3000);
      }

      return;
    }
    Promise.all([
      VerifyGoogle(values.googleCode, OperationIdEnum["whiteListOpenOrColse"]),
      VerifyAssetsPassword({
        assetsPwd: values.assetsPwd,
        operationId: OperationIdEnum["whiteListOpenOrColse"],
      }),
      VerifyEmail(values.emailCode, OperationIdEnum["whiteListOpenOrColse"]),
    ]).then((res) => {
      if (res[0].status && res[1].status && res[2].status) {
        SwitchWhiteAddress().then(() => {
          setSession(
            "isOpenWhiteList",
            Boolean(!getSession("isOpenWhiteList"))
          );
          Toast.show({
            content:
              urlInof.crt.type === "openTip" ? "开启成功！" : " 关闭成功！",
          });
          setTimeout(() => {
            window.history.back();
          }, 3000);
        });
      }
    });
  }

  return (
    <>
      <PublicHead {...HeadInfo} />
      {!!WhiteListEnum1[urlInof.crt.type] ? (
        <p className="grid items-center p-[.1rem_.3rem] min-h-[.7rem] text-[.24rem] text-[#222] bg-[#E9ECF2]">
          {WhiteListEnum1[urlInof.crt.type]}
        </p>
      ) : null}
      <PublicForm
        ref={formRef}
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
        {urlParams.flag == "add" ? (
          <PublicInput
            placeholder="备注信息"
            name="notes"
            delay={0}
            formRef={formRef}
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
            prefix={<span className="text-[.3rem] text-[#222]">备注</span>}
          />
        ) : null}
        {urlParams.flag == "add" ? (
          <PublicInput
            placeholder="请输入地址"
            name="addr"
            delay={0}
            formRef={formRef}
            rules={[{ required: true, message: "地址不能为空" }]}
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
            prefix={<span className="text-[.3rem] text-[#222]">地址</span>}
          />
        ) : null}
        <PublicInput
          formRef={formRef}
          delay={0}
          rules={[{ required: true, message: "资金密码不能为空" }]}
          placeholder="请输入资金密码"
          name="assetsPwd"
          inputStyle={{
            "--text-align": "right",
          }}
          type="password"
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
          placeholder="请输入邮箱验证码"
          name="emailCode"
          delay={0}
          formRef={formRef}
          rules={[{ required: true, message: "邮箱验证码不能为空" }]}
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
          prefix={<span className="text-[.3rem] text-[#222]">邮箱验证码</span>}
        >
          <GetEmailCode urlParams={urlParams} />
        </PublicInput>
        <PublicInput
          formRef={formRef}
          delay={0}
          rules={[{ required: true, message: "Google验证码不能为空" }]}
          placeholder="请输入Google验证码"
          name="googleCode"
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
            <span className="text-[.3rem] text-[#222]">Google验证码</span>
          }
        ></PublicInput>
      </PublicForm>
    </>
  );
};
// 获取邮箱验证码
const GetEmailCode = (props: any) => {
  let { urlParams } = props;
  let id =
    urlParams?.flag == "add"
      ? OperationIdEnum["whiteListAdd"]
      : OperationIdEnum["whiteListOpenOrColse"];
  return <GetCodeBtn operationId={id} />;
};
OpenOrCloseWhiteList.defaultProps = {
  headTitle: "",
};
export default OpenOrCloseWhiteList;
