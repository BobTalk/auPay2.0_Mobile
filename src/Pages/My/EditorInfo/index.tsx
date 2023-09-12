import PublicHead from "@/Components/PublicHead";
import PublicInput from "@/Components/PublicInput";
import { Button } from "antd-mobile";
import { useState } from "react";

const EditorInfo = () => {
  const headData = {
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
  const InputEvent = (val: any) => {
    setName(val);
  };
  const [name, setName] = useState("西尾猫的世界");
  return (
    <>
      <PublicHead {...headData} />
      <PublicInput
        value={name}
        input={(val: any) => InputEvent(val)}
        maxLength={12}
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
        <p className="text-[.24rem]">
          <span className="text-[#1c63ff]">{name.length}</span>
          <span className="text-[#666]">/12</span>
        </p>
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
