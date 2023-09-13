import PublicHead from "@/Components/PublicHead";
import PublicList from "@/Components/PublicList";

const SecurityInfo = () => {
  const HeadData = {
    title: "安全信息",
    back: "goBack",
    titleStyle: { fontSize: ".34rem", color: "#333" },
    iconStyle: { fontSize: ".34rem", left: ".15rem" },
    style: {
      padding: ".32rem 0",
      borderBottom: "1px solid rgba(197,202,208,1)",
      height: "auto",
    },
  };
  let listInfo = [
    {
      id: "1",
      title: "登陆密码",
      subTitle: "去设置",
      subTitleClassName: "text-[#666] mr-[.1rem]",
      showArrow: true,
      type: "bussion",
      style: {},
      path: "",
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
        marginRight: ".3rem",
        "--padding-left": 0,
        "--padding-right": 0,
        "--margin-left": ".3rem",
      },
      itemClass: "",
      iconStyle: {
        fontSize: ".4rem",
        marginLeft: ".3rem",
      },
    },
    {
      id: "2",
      showArrow: true,
      path: "accountInfor",
      title: "资金密码",
      subTitle: "去设置",
      subTitleClassName: "text-[#666] mr-[.1rem]",
      type: "account",
      style: {},
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
        marginRight: ".3rem",
        "--padding-left": 0,
        "--padding-right": 0,
        "--margin-left": ".3rem",
      },
      itemClass: "",
      iconStyle: {
        fontSize: ".4rem",
        marginLeft: ".3rem",
      },
    },
    {
      id: "3",
      showArrow: true,
      title: "Google验证器",
      subTitle: "绑定",
      subTitleClassName: "text-[#666] mr-[.1rem]",
      path: "security-info",
      type: "secure",
      style: {},
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
        marginRight: ".3rem",
        "--padding-left": 0,
        "--padding-right": 0,
        "--margin-left": ".3rem",
        "--border-b-w": '1px',
        "--border-b-style":'solid',
        '--border-b-color':'#eee'
      },
      itemClass: "flex justify-between]",
      iconStyle: {
        fontSize: ".4rem",
        marginLeft: ".3rem",
      },
    },
  ];
  return (
    <>
      <PublicHead {...HeadData} />
      <PublicList
        arrowStyle={{ fontSize: ".2rem" }}
        arrowComp={<i className="iconfont icon-icon-arrow-right2"></i>}
        list={listInfo}
      />
    </>
  );
};
export default SecurityInfo;
