import PublicInput from "@/Components/PublicInput";
import { Button } from "antd-mobile";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";

const MoneyPwd = (props: any, ref: any) => {
  const Navigator = useNavigate();
  console.log(props);
  let {
    crt: { flag: flagScope },
  } = props ?? {};
  let [showUpdatePwdEl, setShowUpdatePwdEl] = useState(
    flagScope === 1 ? false : true
  );
  // 暴露给父级
  useImperativeHandle(
    ref,
    () => ({
      newPwd: "4444444",
      confirmPwd: "444444",
    }),
    []
  );
  function nextStep() {
    setShowUpdatePwdEl(() => true);
  }

  return (
    <>
      {!showUpdatePwdEl ? (
        <OldPwdValid
          navigator={Navigator}
          crt={props}
          onClick={() => nextStep()}
        />
      ) : null}
      {showUpdatePwdEl ? (
        <>
          <PublicInput
            placeholder="新密码"
            maxLength={6}
            inputBoxStyle={{
              backgroundColor: "#fff",
              margin: "0 .3rem",
              paddingRight: 0,
              paddingLeft: 0,
              borderBottom: "1px solid #E6E6E6",
              borderRadius: 0,
            }}
            clearStyle={{
              fontSize: ".34rem",
              color: "#E6E6E6",
            }}
            clearable={true}
            inputClassName="text-[.3rem] text-[#222]"
          />
          <PublicInput
            placeholder="确认密码"
            maxLength={6}
            inputBoxStyle={{
              backgroundColor: "#fff",
              margin: "0 .3rem",
              paddingRight: 0,
              paddingLeft: 0,
              borderBottom: "1px solid #E6E6E6",
              borderRadius: 0,
            }}
            clearStyle={{
              fontSize: ".34rem",
              color: "#E6E6E6",
            }}
            clearable={true}
            inputClassName="text-[.3rem] text-[#222]"
          />
          <div className="px-[.3rem]">
            <Button
              block
              color="primary"
              className="before:bg-transparent text-[.3rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
            >
              确定
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};
const OldPwdValid = (props: any) => {
  function nextStep(e: any): void {
    e.stopPropagation();
    props.onClick?.();
  }

  function ResetPwd(e: any) {
    e.stopPropagation();
    console.log('>>>>>',props)
    props.navigator?.("/resetpwd", { state: {...props.crt, headTitle:'重置资金密码'} });
  }

  return (
    <>
      <PublicInput
        placeholder="原始密码"
        maxLength={6}
        inputBoxStyle={{
          backgroundColor: "#fff",
          margin: "0 .3rem",
          paddingRight: 0,
          paddingLeft: 0,
          borderBottom: "1px solid #E6E6E6",
          borderRadius: 0,
        }}
        clearStyle={{
          fontSize: ".34rem",
          color: "#E6E6E6",
        }}
        clearable={true}
        inputClassName="text-[.3rem] text-[#222]"
      />
      <div className="px-[.3rem]">
        <Button
          onClick={(e) => nextStep(e)}
          block
          color="primary"
          className="before:bg-transparent text-[.3rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
        >
          下一步
        </Button>
        <Button
          block
          onClick={(e) => ResetPwd(e)}
          fill="outline"
          color="primary"
          className="before:bg-transparent text-[.3rem] text-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
        >
          忘记密码
        </Button>
      </div>
    </>
  );
};
export default forwardRef(MoneyPwd);
