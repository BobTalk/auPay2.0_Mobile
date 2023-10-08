import PublicHead from "@/Components/PublicHead";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { OperationIdEnum, WhiteListEnum } from "../../Enum";
import PublicInput from "@/Components/PublicInput";
import { Button, Toast } from "antd-mobile";
import PublicForm from "@/Components/PublicForm";
import { useState } from "react";
import { getSession, setSession } from "@/utils/base";
import { HeadConfig } from "@/Assets/config/head";
import {
  AddWithdrawAddress,
  SendEmailCode,
  SwitchWhiteAddress,
  VerifyAssetsPassword,
  VerifyEmail,
  VerifyGoogle,
} from "@/Api";
const OpenOrCloseWhiteList = (props: any) => {
  let urlParams: any = useParams();
  console.log(urlParams);
  let { state: urlInof }: any = useLocation();
  console.log(urlInof);
  let navigate = useNavigate();
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
  function submitCb({ values }: any) {
    if (urlParams.flag == "add") {
      let googleToken: any = VerifyGoogle(
        values.googleCode,
        OperationIdEnum["whiteListAdd"]
      );
      let assetsToken: any = VerifyAssetsPassword({
        assetsPwd: values.assetsPwd,
        operationId: OperationIdEnum["whiteListAdd"],
      });
      let emailToken: any = VerifyEmail(
        values.emailCode,
        OperationIdEnum["whiteListAdd"]
      );
      AddWithdrawAddress(
        {
          currencyId: urlInof.currencyId,
          currencyChain: urlInof.currencyChain,
          address: values.addr,
          note: values.notes,
        },
        {
          "Assets-Password-Token": googleToken["value"],
          "Google-Auth-Token": assetsToken["value"],
          "Email-Token": emailToken["value"],
        }
      ).then((res) => {
        if (res.status) {
          Toast.show({
            content: "添加成功！",
          });
          setTimeout(() => {
            navigate("/my/white-list", { replace: true });
          }, 3000);
        }
      });
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
  function getEmailCode() {
    let id =
      urlParams.flag == "add"
        ? OperationIdEnum["whiteListAdd"]
        : OperationIdEnum["whiteListOpenOrColse"];
    SendEmailCode(id).then(() => {});
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
            value={formInitVal.notes}
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
            onChange={(val: string) => {
              setFormInitVal((initVal: { [key: string]: any }) => ({
                ...initVal,
                notes: val,
              }));
            }}
            inputClassName="text-[.3rem] text-[#222]"
            prefix={<span className="text-[.3rem] text-[#222]">备注</span>}
          />
        ) : null}
        {urlParams.flag == "add" ? (
          <PublicInput
            placeholder="请输入地址"
            name="addr"
            value={formInitVal.addr}
            onChange={(val: string) => {
              setFormInitVal((initVal: { [key: string]: any }) => ({
                ...initVal,
                addr: val,
              }));
            }}
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
          rules={[{ required: true, message: "资金密码不能为空" }]}
          placeholder="请输入资金密码"
          name="assetsPwd"
          value={formInitVal.assetsPwd}
          onChange={(val: string) => {
            setFormInitVal((initVal: { [key: string]: any }) => ({
              ...initVal,
              assetsPwd: val,
            }));
          }}
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
          onChange={(val: string) => {
            setFormInitVal((initVal: { [key: string]: any }) => ({
              ...initVal,
              email: val,
            }));
          }}
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
          value={formInitVal.emailCode}
          onChange={(val: string) => {
            setFormInitVal((initVal: { [key: string]: any }) => ({
              ...initVal,
              emailCode: val,
            }));
          }}
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
          <p
            onClick={getEmailCode}
            className="before:bg-transparent text-[.3rem] text-[#1C63FF] ml-[.3rem]"
            color="primary"
          >
            获取
          </p>
        </PublicInput>
        <PublicInput
          rules={[{ required: true, message: "Google验证码不能为空" }]}
          placeholder="请输入Google验证码"
          name="googleCode"
          value={formInitVal.googleCode}
          onChange={(val: string) => {
            setFormInitVal((initVal: { [key: string]: any }) => ({
              ...initVal,
              googleCode: val,
            }));
          }}
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
OpenOrCloseWhiteList.defaultProps = {
  headTitle: "",
};
export default OpenOrCloseWhiteList;
