import PublicHead from "@/Components/PublicHead";

const ResetPwd = (props: any) => {
  const HeadInfo = {
    title: props.headTitle,
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
      <PublicHead {...HeadInfo}/>
      重置密码
    </>
  );
};
ResetPwd.defaultProps = {
  headTitle: "重置密码",
};
export default ResetPwd;
