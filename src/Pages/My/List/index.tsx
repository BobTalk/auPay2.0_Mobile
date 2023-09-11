import { Avatar, Card } from "antd-mobile";
import styleScope from "./index.module.scss";
import { mergeClassName } from "@/utils/base";
import whiteImg from "../Assets/images/white-menu.png";
import appmanger from "../Assets/images/app-manger.png";
import PublicList from "@/Components/PublicList";
import PublicFoo from "@/Components/PublicFoo";
const MyList = () => {
  const listInfo = [
    {
      id: "1",
      icon: "icon-jilu",
      title: "交易记录",
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
      id: "2",
      icon: "icon-zhanghuxinxi",
      title: "账户信息",
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
      icon: require('../Assets/images/pact.png'),
      title: "用户协议",
      style: {},
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
      itemClass: "",
      imgStyle: {
        width: ".4rem",
        heigth:'.4rem',
        marginLeft: ".3rem",
      },
    },
    {
      id: "21",
      icon: require('../Assets/images/privacy.png'),
      title: "隐私政策",
      style: {},
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
      itemClass: "",
      imgStyle: {
        width: ".4rem",
        heigth:'.4rem',
        marginLeft: ".3rem",
      },
    },
    {
      id: "31",
      icon: require('../Assets/images/about_us.png'),
      title: "关于我们",
      style: {},
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
      itemClass: "",
      imgStyle: {
        width: ".4rem",
        heigth:'.4rem',
        marginLeft: ".3rem",
      },
    },
    {
      id: "41",
      icon: require('../Assets/images/contact.png'),
      title: "联系我们",
      style: {},
      className: "",
      imgStyle: {
        width: ".4rem",
        heigth:'.4rem',
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
      icon: require('../Assets/images/Ozfund.png'),
      title: "Ozfund",
      style: {},
      className: "",
      itemStyle: {
        fontSize: ".3rem",
        color: "#333",
      },
      itemClass: "",
      imgStyle: {
        width: ".4rem",
        heigth:'.4rem',
        marginLeft: ".3rem",
      },
    },
  ];
  const listInfo2 = [
    {
      id: "61",
      icon: "icon-tuichudenglu",
      title: "退出登录",
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
  //每一项点击事件
  const itemClick = (crt: object) => {
    console.log(crt, "---");
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
      <PublicList click={itemClick} className="my-[.3rem]" list={listInfo2} />
      <PublicFoo style={{position: 'static',visibility:'hidden',overflow:'hidden' }} />
      <PublicFoo />
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
export default MyList;
