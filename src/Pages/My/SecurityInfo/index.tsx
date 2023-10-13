import PublicHead from "@/Components/PublicHead";
import PublicList from "@/Components/PublicList";
import { useNavigate } from "react-router-dom";
import { InfoSecurity } from "../../Enum";
import { HeadConfig } from "@/Assets/config/head";
import { getSession } from "@/utils/base";

const SecurityInfo = () => {
  const HeadData = Object.assign(HeadConfig, {
    title: "安全信息",
    back: "goBack",
    className:
      "p-[.32rem_.3rem] h-[auto] border-b-[1px] border-b-[rgba(197,202,208,1)]",
  });
  const userInfo = getSession("userInfo");
  let listInfo = [
    {
      id: "1",
      title: "登陆密码",
      flag: 1, // 0 设置 1 修改
      subTitle: "修改", // "去设置",
      type: InfoSecurity["updateSiginPwd"], //InfoSecurity["siginPwd"],
      subTitleClassName: "text-[#666] mr-[.1rem]",
      showArrow: true,
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
        marginRight: ".3rem",
        "--padding-left": 0,
        "--padding-right": 0,
        "--margin-left": ".3rem",
      },
      iconStyle: {
        fontSize: ".4rem",
        marginLeft: ".3rem",
      },
    },
    {
      id: "2",
      showArrow: true,
      title: "资金密码",
      flag: 1, // 0 设置 1 修改
      subTitle: "修改", // "去设置",
      type: InfoSecurity["updateSecurityPwd"], //InfoSecurity["securityPwd"],
      subTitleClassName: "text-[#666] mr-[.1rem]",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
        marginRight: ".3rem",
        "--padding-left": 0,
        "--padding-right": 0,
        "--margin-left": ".3rem",
      },
      iconStyle: {
        fontSize: ".4rem",
        marginLeft: ".3rem",
      },
    },
    {
      id: "3",
      showArrow: true,
      title: "Google验证器",
      flag: +userInfo["bindGoogleAuth"], // 0 设置 1 修改
      type: userInfo["bindGoogleAuth"]
        ? InfoSecurity["updateGoogleValidator"]
        : InfoSecurity["googleValidator"],
      subTitle: userInfo["bindGoogleAuth"] ? "重置" : "绑定", // "绑定", 重置
      subTitleClassName: "text-[#666] mr-[.1rem]",
      path: "security-info",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
        marginRight: ".3rem",
        "--padding-left": 0,
        "--padding-right": 0,
        "--margin-left": ".3rem",
        "--border-b-w": "1px",
        "--border-b-style": "solid",
        "--border-b-color": "#eee",
      },
      itemClass: "flex justify-between]",
      iconStyle: {
        fontSize: ".4rem",
        marginLeft: ".3rem",
      },
    },
  ];
  const Navigator = useNavigate();
  let itemClick = (crt: any) => {
    if (crt.flag === 1 && crt.type == InfoSecurity["updateGoogleValidator"]) {
      Navigator("/resetpwd", {
        state: { crt, headTitle: "重置Google验证器" },
      });
      return;
    }
    Navigator("/my/editorInfo", { state: crt });
  };

  return (
    <>
      <PublicHead {...HeadData} />
      <PublicList
        arrowStyle={{ fontSize: ".2rem" }}
        arrowComp={<i className="iconfont icon-icon-arrow-right2"></i>}
        list={listInfo}
        click={(crt: any) => itemClick(crt)}
      />
    </>
  );
};
export default SecurityInfo;
