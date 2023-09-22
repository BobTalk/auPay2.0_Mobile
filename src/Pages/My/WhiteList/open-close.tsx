import PublicHead from "@/Components/PublicHead";
import { useLocation, useParams } from "react-router-dom";
import { WhiteListEnum } from "../../Enum";
import PublicInput from "@/Components/PublicInput";
import { Button } from "antd-mobile";
import PublicForm from "@/Components/PublicForm";
import { useState } from "react";
import { getSession, setSession } from "@/utils/base";
const OpenOrCloseWhiteList = (props: any) => {
  let urlParams: any = useParams();
  let { state: urlInof }: any = useLocation();
  let WhiteListEnum1 = JSON.parse(JSON.stringify(WhiteListEnum));
  const HeadInfo = {
    title: urlInof?.headTitle ?? props.headTitle,
    back: () => {
      console.log(!getSession("isOpenWhiteList"));
      setSession("isOpenWhiteList", Boolean(!getSession("isOpenWhiteList")));
      window.history.back();
    },
    titleStyle: { fontSize: ".34rem", color: "#333" },
    iconStyle: { fontSize: ".34rem", left: ".15rem" },
    style: {
      padding: ".32rem .3rem",
      borderBottom: "1px solid rgba(197,202,208,1)",
      height: "auto",
    },
  };
  const [formInitVal, setFormInitVal] = useState({
    email: "12838923834@qq.com",
  });
  function submitCb(val: any) {
    console.log(val);
  }
  return (
    <>
      <PublicHead {...HeadInfo} />
      {!!WhiteListEnum1[urlInof.crt.type] ? (
        <p className="grid items-center px-[.3rem] h-[.7rem] text-[.24rem] text-[#222] bg-[#E9ECF2]">
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
          <Button
            className="before:bg-transparent text-[.3rem] text-[#1C63FF]"
            color="primary"
            fill="none"
          >
            获取
          </Button>
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
        >
          <Button
            className="before:bg-transparent text-[.3rem] text-[#1C63FF]"
            color="primary"
            fill="none"
          >
            发送
          </Button>
        </PublicInput>
      </PublicForm>
    </>
  );
};
OpenOrCloseWhiteList.defaultProps = {
  headTitle: "",
};
export default OpenOrCloseWhiteList;
