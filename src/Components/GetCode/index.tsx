import {
  GetCode,
  GetRegionCode,
  SendEmailCode,
  SendResetPasswordEmailCode,
} from "@/Api";
import { useCountDown } from "@/Hooks/Countdown";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useState } from "react";

const GetCodeBtn = (props: any) => {
  console.log("props: ", props);
  let { operationId, btnName, module, email, username, onClick } = props;
  // 获取邮箱验证码
  function getEmailCodeI(id: number) {
    if (!id) return;
    SendEmailCode(id).then((res) => onClick(res));
  }
  // 获取注册验证码
  function getRegisterCodeI(emailUrl: any) {
    console.log("emailUrl: ", emailUrl);
    if (!emailUrl) return;
    GetRegionCode(emailUrl).then((res) => onClick(res));
  }
  // 登陆验证码
  function getLoginCodeI(username: any) {
    if (!username) return;
    GetCode(username).then((res) => onClick(res));
  }
  function getResetCodeI(username: any) {
    if (!username) return;
    SendResetPasswordEmailCode(username).then((res) => onClick(res));
  }
  let moduleMap = new Map([
    ["email", getEmailCodeI],
    ["register", getRegisterCodeI],
    ["login", getLoginCodeI],
    ["resetpwd", getResetCodeI],
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
      let params =
        module === "email"
          ? operationId
          : ["login", "resetpwd"].includes(module)
          ? username
          : email;
      if (!params) return;
      start(() => {
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
  module: "email", // login register Email resetpwd
  email: "",
  username: "",
  onClick: () => {},
};
export default GetCodeBtn;
