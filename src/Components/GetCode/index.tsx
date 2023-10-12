import { GetCode, GetRegionCode, SendEmailCode } from "@/Api";
import { useCountDown } from "@/Hooks/Countdown";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useState } from "react";

const GetCodeBtn = (props: any) => {
  let { operationId, btnName, module, email, username } = props;
  // 获取邮箱验证码
  function getEmailCodeI(id: number) {
    if (!id) return;
    SendEmailCode(id).then();
  }
  // 获取注册验证码
  function getRegisterCodeI(emailUrl: any) {
    if (!emailUrl) return;
    GetRegionCode(emailUrl).then();
  }
  function getLoginCodeI(username: any) {
    if (!username) return;
    GetCode(username).then();
  }
  let moduleMap = new Map([
    ["email", getEmailCodeI],
    ["register", getRegisterCodeI],
    ["login", getLoginCodeI],
  ]);
  let [stop] = useStopPropagation();
  let [codeMessage, setCodeMessage] = useState(btnName);
  let { start, count: timeDown } = useCountDown(
    59,
    () => {
      setCodeMessage(`${timeDown}s`);
    },
    () => {
      setCodeMessage(btnName);
    }
  );
  function getEmailCode(e: any) {
    stop(e, () => {
      start(() => {
        let params =
          module === "email"
            ? operationId
            : module === "login"
            ? username
            : email;
        moduleMap?.get(module)?.(params);
      });
    });
  }
  return (
    <p
      onClick={getEmailCode}
      className="whitespace-nowrap text-[.3rem] text-[#1C63FF] ml-[.3rem]"
      color="primary"
    >
      {codeMessage}
    </p>
  );
};
GetCodeBtn.defaultProps = {
  operationId: undefined,
  btnName: "获取",
  module: "email", // login register Email
  email: "",
  username: "",
};
export default GetCodeBtn;
