import { Avatar, Card, Popup } from "antd-mobile";
import styleScope from "./index.module.scss";
import { mergeClassName } from "@/utils/base";
import whiteImg from "../Assets/images/white-menu.png";
import appmanger from "../Assets/images/app-manger.png";
import PublicList from "@/Components/PublicList";
import PublicFoo from "@/Components/PublicFoo";
import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";
const MyList = () => {
  const navigate = useNavigate();
  const listInfo = [
    {
      id: "1",
      icon: "icon-jilu",
      title: "交易记录",
      type: "bussion",
      style: {},
      path: "",
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
      itemClass: "",
      iconStyle: {
        fontSize: ".4rem",
        marginLeft: ".3rem",
      },
    },
    {
      id: "2",
      icon: "icon-zhanghuxinxi",
      path: "accountInfor",
      title: "账户信息",
      type: "account",
      style: {},
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
      itemClass: "",
      iconStyle: {
        fontSize: ".4rem",
        marginLeft: ".3rem",
      },
    },
    {
      id: "3",
      icon: "icon-anquan",
      title: "安全信息",
      type: "secure",
      style: {},
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
      itemClass: "",
      iconStyle: {
        fontSize: ".4rem",
        marginLeft: ".3rem",
      },
    },
  ];
  const listInfo1 = [
    {
      id: "11",
      icon: require("../Assets/images/pact.png"),
      title: "用户协议",
      style: {},
      type: "agree",
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
      itemClass: "",
      imgStyle: {
        width: ".4rem",
        heigth: ".4rem",
        marginLeft: ".3rem",
      },
    },
    {
      id: "21",
      icon: require("../Assets/images/privacy.png"),
      title: "隐私政策",
      style: {},
      type: "privacy",
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
      itemClass: "",
      imgStyle: {
        width: ".4rem",
        heigth: ".4rem",
        marginLeft: ".3rem",
      },
    },
    {
      id: "31",
      icon: require("../Assets/images/about_us.png"),
      title: "关于我们",
      style: {},
      type: "aboutAs",
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
      itemClass: "",
      imgStyle: {
        width: ".4rem",
        heigth: ".4rem",
        marginLeft: ".3rem",
      },
    },
    {
      id: "41",
      icon: require("../Assets/images/contact.png"),
      title: "联系我们",
      style: {},
      type: "linkAs",
      className: "",
      imgStyle: {
        width: ".4rem",
        heigth: ".4rem",
        marginLeft: ".3rem",
      },
      itemClass: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
    },
    {
      id: "51",
      icon: require("../Assets/images/Ozfund.png"),
      title: "Ozfund",
      style: {},
      type: "Ozfund",
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
      itemClass: "",
      imgStyle: {
        width: ".4rem",
        heigth: ".4rem",
        marginLeft: ".3rem",
      },
    },
  ];
  const listInfo2 = [
    {
      id: "61",
      icon: "icon-tuichudenglu",
      title: "退出登录",
      type: "loginOut",
      style: {},
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
      itemClass: "",
      iconStyle: {
        fontSize: ".4rem",
        marginLeft: ".3rem",
      },
    },
  ];
  const [popupVisible, setPopupVisible] = useState(false);
  //每一项点击事件
  const itemClick = (crt: any) => {
    console.log(crt, "---");
    let path = crt?.path;
    path && navigate(`/my/${path}`);
  };
  const signOut = () => {
    setPopupVisible(!popupVisible);
  };
  return (
    <div
      className={mergeClassName(
        styleScope["list_box"],
        "px-[.3rem] overflow-y-auto"
      )}
    >
      <div className="flex pt-[.7rem] gap-x-[.32rem]">
        <Avatar
          src=""
          style={{
            "--border-radius": "50%",
            "--size": "1.34rem",
            backgroundColor: "#fff",
            marginLeft: ".08rem",
          }}
        />
        <div className="flex flex-col justify-between h-[1.34rem]">
          <p className="text-[.34rem] text-[#333] font-[700]">西尾猫的世界</p>
          <p className="text-[.24rem] text-[#666]">
            <span>上次登录</span>
            <span>2023-06-30 18:17:47</span>
          </p>
          <p className="text-[.24rem] text-[#666]">92.119.178.68 罗马尼亚</p>
        </div>
      </div>
      <div className="flex justify-between gap-x-[.3rem] mt-[.42rem]">
        <Card
          className="flex flex-1 h-[1rem] px-[.38rem]"
          title={<Menu title="白名单管理" imgUrl={whiteImg} />}
        ></Card>
        <Card
          className="flex flex-1 h-[1rem] px-[.38rem]"
          title={<Menu title="应用管理" imgUrl={appmanger} />}
        ></Card>
      </div>
      <PublicList click={itemClick} className="mt-[.3rem]" list={listInfo} />
      <PublicList click={itemClick} className="mt-[.3rem]" list={listInfo1} />
      <PublicList click={signOut} className="my-[.3rem]" list={listInfo2} />
      <PublicFoo
        style={{ position: "static", visibility: "hidden", overflow: "hidden" }}
      />
      <PublicFoo />
      <PopupComp visible={popupVisible} cancle={() => signOut()} />
    </div>
  );
};
const Menu = (props: any) => {
  return (
    <div className="flex items-center">
      <img className="w-[.54rem] mr-[.24rem]" src={props.imgUrl} />
      <span className="text-[.28rem] text-[#333] font-[700] ">
        {props.title}
      </span>
    </div>
  );
};
//彈窗組件
const PopupComp = memo(
  (props: any) => {
    return (
      <Popup
        visible={props.visible}
        onMaskClick={() => {
          props.cancle?.();
        }}
        bodyStyle={{
          borderRadius: ".34rem .34rem 0 0",
          overflow: "hidden",
          backgroundColor: "#f6f6f6",
        }}
      >
        <ul>
          <li onClick={()=>props.click?.()} className="grid h-[1.02rem] bg-[#fff] text-[.32rem] text-[#E84335] font-[700] place-items-center">
            退出登录
          </li>
          <li
            onClick={() => props.cancle?.()}
            className="grid h-[1.02rem] bg-[#fff] text-[.32rem] text-[#333] font-[700] place-items-center mt-[.15rem]"
          >
            取消
          </li>
        </ul>
      </Popup>
    );
  },
  (prv, next) => {
    return prv.visible == next.visible;
  }
);
export default MyList;
