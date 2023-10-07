import PublicHead from "@/Components/PublicHead";
import { useLocation, useParams } from "react-router-dom";
import { WhiteListEnum } from "../../Enum";
import PublicInput from "@/Components/PublicInput";
import { Button } from "antd-mobile";
import PublicForm from "@/Components/PublicForm";
import { useState } from "react";
import { getSession, setSession } from "@/utils/base";
import { HeadConfig } from "@/Assets/config/head";
const OpenOrCloseWhiteList = (props: any) => {
  let urlParams: any = useParams();
  let { state: urlInof }: any = useLocation();
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
  function submitCb(val: any) {
    setSession("isOpenWhiteList", Boolean(!getSession("isOpenWhiteList")));
    console.log(val);
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
          <>
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
              inputClassName="text-[.3rem] text-[#222]"
              prefix={<span className="text-[.3rem] text-[#222]">备注</span>}
            />
            <PublicInput
              placeholder="请输入地址"
              name="addr"
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
          </>
        ) : null}
        <PublicInput
          placeholder="请输入资金密码"
          name="assetsPwd"
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
            className="before:bg-transparent text-[.3rem] text-[#1C63FF] ml-[.3rem]"
            color="primary"
          >
            获取
          </p>
        </PublicInput>
        <PublicInput
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
