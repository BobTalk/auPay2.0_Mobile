import PublicHead from "@/Components/PublicHead";
import PublicInput from "@/Components/PublicInput";
import { Button } from "antd-mobile";
import { useEffect, useState } from "react";
import { InfoType } from "../Enum";
import { useLocation } from "react-router-dom";

const EditorInfo = () => {
  const typeMap = new Map([
    [
      InfoType.phone,
      function (crt: any) {
        if (crt.value) {
          setHeadData({
            ...headInfo,
            title: "修改联系方式",
          });
        } else {
          setHeadData({
            ...headInfo,
            title: "绑定联系方式",
          });
        }
      },
    ],
    [
      InfoType.eMail,
      function (crt: any) {
        console.log(crt);
      },
    ],
    [
      InfoType.headSculpture,
      function (crt: any) {
        console.log(crt);
      },
    ],
    [
      InfoType.nickName,
      function (crt: any) {
        console.log(crt);
      },
    ],
    [
      InfoType.unit,
      function (crt: any) {
        console.log(crt);
      },
    ],
    [
      InfoType.userName,
      function (crt: any) {
        console.log(crt);
      },
    ],
  ]);
  const { state } = useLocation();
  const headInfo = {
    title: "编辑昵称",
    back: "goBack",
    titleStyle: { fontSize: ".34rem", color: "#333" },
    iconStyle: { fontSize: ".34rem", left: ".15rem" },
    style: {
      padding: ".32rem 0",
      borderBottom: "1px solid rgba(197,202,208,1)",
      height: "auto",
    },
  };
  const [headData, setHeadData] = useState(headInfo);
  useEffect(() => {
    if (typeMap.has(state.type)) {
      typeMap.get(state.type)?.(state);
    }
  }, []);
  const InputEvent = (val: any) => {
    setValue(val);
  };
  const [value, setValue] = useState(state.value);
  return (
    <>
      <PublicHead {...headData} />
      <PublicInput
        value={value}
        input={(val: any) => InputEvent(val)}
        maxLength={state.maxLength}
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
      >
        {state.maxLength && (
          <p className="text-[.24rem]">
            <span className="text-[#1c63ff]">{value.length}</span>
            <span className="text-[#666]">/12</span>
          </p>
        )}
      </PublicInput>
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
  );
};
export default EditorInfo;
