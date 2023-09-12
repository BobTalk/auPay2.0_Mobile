import PublicHead from "@/Components/PublicHead";
import PublicInput from "@/Components/PublicInput";

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
  return (
    <>
      <PublicHead {...headData} />
      编辑用户名
      <PublicInput
        value="西尾猫的世界"
        inputBoxStyle={{
          backgroundColor: "#fff",
        }}
        clearStyle={{
          width: ".33rem",
          height: ".33rem",
        }}
        clearable={true}
        inputClassName="text-[.3rem] text-[#222]"
      />
    </>
  );
};
export default EditorInfo;
