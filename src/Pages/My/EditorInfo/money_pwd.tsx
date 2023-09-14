import PublicInput from "@/Components/PublicInput";
import { Button } from "antd-mobile";
import { MouseEvent, forwardRef, useImperativeHandle, useState } from "react";

const MoneyPwd = (props: any, ref: any) => {
  console.log(props);
  let {
    crt: { flag: flagScope },
  } = props ?? {};
  let [showUpdatePwdEl, setShowUpdatePwdEl] = useState(
    flagScope == 1 ? false : true
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
      {!showUpdatePwdEl ? <OldPwdValid onClick={() => nextStep()} /> : null}
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
              className="text-[.3rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
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
          className="text-[.3rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
        >
          下一步
        </Button>
        <Button
          block
          fill="outline"
          color="primary"
          className="text-[.3rem] text-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
        >
          忘记密码
        </Button>
      </div>
    </>
  );
};
export default forwardRef(MoneyPwd);
