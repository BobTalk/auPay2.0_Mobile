import PublicHead from "@/Components/PublicHead";
import PublicList from "@/Components/PublicList";
import { Avatar, Popup } from "antd-mobile";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoType } from "../Enum";
const AccountInformation = () => {
  const navigator = useNavigate();
  const headData = {
    title: "账户信息",
    back: "goBack",
    titleStyle: { fontSize: ".34rem", color: "#333" },
    iconStyle: { fontSize: ".34rem", left: ".15rem" },
    style: {
      padding: ".32rem 0",
      borderBottom: "1px solid rgba(197,202,208,1)",
      height: "auto",
    },
  };

  const listInfo = [
    {
      id: "00",
      title: "头像",
      type:InfoType.headSculpture,
      showArrow: true,
      value:'imgUrl',
      itemStyle: {
        padding: ".08rem 0",
        "--border-inner": 0,
        borderBottom: "1px solid rgba(230,230,230,1)",
        fontSize: ".3rem",
        color: "#222",
      },
      extra: <AvatarComp click={(rs: boolean) => avatarClickEvent(rs)} />,
    },
    {
      id: "01",
      title: "昵称",
      type:InfoType.nickName,
      value:'西尾猫的世界',
      showArrow: true,
      maxLength: 12,
      itemStyle: {
        padding: ".08rem 0",
        "--border-inner": 0,
        borderBottom: "1px solid rgba(230,230,230,1)",
        fontSize: ".3rem",
        color: "#222",
      },
      extra: (
        <span className="mr-[.15rem] text-[.3rem] text-[#999]">
          西尾猫的世界
        </span>
      ),
    },
    {
      id: "05",
      title: "用户名",
      showArrow: false,
      type:InfoType.userName,
      value:'西尾猫的世界',
      itemStyle: {
        padding: ".08rem 0",
        "--border-inner": 0,
        borderBottom: "1px solid rgba(230,230,230,1)",
        fontSize: ".3rem",
        color: "#222",
      },
      extra: (
        <span className="mr-[.15rem] text-[.3rem] text-[#999]">
          西尾猫的世界
        </span>
      ),
    },
    {
      id: "06",
      title: "邮箱",
      type:InfoType.eMail,
      showArrow: false,
      value:'12838923834@qq.com',
      itemStyle: {
        padding: ".08rem 0",
        "--border-inner": 0,
        borderBottom: "1px solid rgba(230,230,230,1)",
        fontSize: ".3rem",
        color: "#222",
      },
      extra: (
        <span className="mr-[.15rem] text-[.3rem] text-[#999]">
          12838923834@qq.com
        </span>
      ),
    },
    {
      id: "07",
      title: "联系方式",
      type:InfoType.phone,
      showArrow: true,
      value:'13193898989',
      itemStyle: {
        padding: ".08rem 0",
        "--border-inner": 0,
        borderBottom: "1px solid rgba(230,230,230,1)",
        fontSize: ".3rem",
        color: "#222",
      },
      extra: (
        <span className="mr-[.15rem] text-[.3rem] text-[#999]">
          13193898989
        </span>
      ),
    },
    {
      id: "08",
      title: "货币单位",
      type:InfoType.unit,
      showArrow: true,
      value:'CNY',
      itemStyle: {
        padding: ".08rem 0",
        "--border-inner": 0,
        borderBottom: "1px solid rgba(230,230,230,1)",
        fontSize: ".3rem",
        color: "#222",
      },
      extra: <span className="mr-[.15rem] text-[.3rem] text-[#999]">CNY</span>,
    },
  ];
  const [popupVisible, setPopupVisible] = useState(false);
  const avatarClickEvent = (rs: boolean) => {
    setPopupVisible(rs);
  };
  const editorInfo = (crt?: any) => {
    Reflect.deleteProperty(crt, 'extra')
    crt.showArrow && navigator("/my/editorInfo", { state: crt });
  };
  return (
    <>
      <PublicHead {...headData} />
      <PublicList
        list={listInfo}
        arrowStyle={{ fontSize: ".2rem" }}
        arrowComp={<i className="iconfont icon-icon-arrow-right2"></i>}
        style={{ padding: "0 .3rem" }}
        click={(crt: any) => editorInfo(crt)}
      />
      <PopupComp
        visible={popupVisible}
        click={(rs: boolean) => avatarClickEvent(rs)}
      />
    </>
  );
};
//彈窗組件
const PopupComp = memo(
  (props: any) => {
    return (
      <Popup
        visible={props.visible}
        onMaskClick={() => {
          props.click?.(false);
        }}
        bodyStyle={{
          borderRadius: ".34rem .34rem 0 0",
          overflow: "hidden",
          backgroundColor: "#f6f6f6",
        }}
      >
        <ul>
          <li className="grid h-[1.02rem] bg-[#fff] text-[.32rem] text-[#333] font-[700] place-items-center border-b-[1px] border-b-[#dbdbdb]">
            拍照
          </li>
          <li className="grid h-[1.02rem] bg-[#fff] text-[.32rem] text-[#333] font-[700] place-items-center">
            从手机相册选择
          </li>
          <li
            onClick={() => props.click?.(false)}
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
// 頭像組件
const AvatarComp = (props: any) => {
  const avatarClick = (e: any) => {
    e.stopPropagation();
    props.click?.(true);
  };
  return (
    <div onClick={avatarClick}>
      <Avatar
        src=""
        style={{
          "--border-radius": "50%",
          "--size": "1.2rem",
          backgroundColor: "#fff",
          marginLeft: ".08rem",
          marginRight: ".15rem",
        }}
      />
    </div>
  );
};
export default AccountInformation;
