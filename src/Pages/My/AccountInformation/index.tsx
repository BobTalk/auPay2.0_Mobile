import PublicHead from "@/Components/PublicHead";
import PublicList from "@/Components/PublicList";
import { Avatar, Popup } from "antd-mobile";
import { memo, useState } from "react";

const AccountInformation = () => {
  const headData = {
    title: "账户信息",
    back: "goBack",
    titleStyle: { fontSize: ".34rem", color: "#333" },
    iconStyle: { fontSize: ".34rem" },
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
  ];
  const [popupVisible, setPopupVisible] = useState(false);
  const avatarClickEvent = (rs: boolean) => {
    setPopupVisible(rs);
  };
  return (
    <>
      <PublicHead {...headData} />
      <PublicList list={listInfo} style={{ padding: "0 .3rem" }} />
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
