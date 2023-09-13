import PublicHead from "@/Components/PublicHead";
import PublicList from "@/Components/PublicList";
import { Avatar, Popup } from "antd-mobile";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoType, MonetaryUnit } from "../Enum";
import { mergeClassName } from "@/utils/base";
import { cloneDeep } from "lodash";
const AccountInformation = () => {
  const ListData = [
    {
      id: "00",
      title: "头像",
      type: InfoType.headSculpture,
      showArrow: true,
      value: "imgUrl",
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
      type: InfoType.nickName,
      value: "西尾猫的世界",
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
      type: InfoType.userName,
      value: "西尾猫的世界",
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
      type: InfoType.eMail,
      showArrow: false,
      value: "12838923834@qq.com",
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
      type: InfoType.phone,
      showArrow: true,
      value: "13193898989",
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
      type: InfoType.unit,
      showArrow: true,
      value: "USD",
      itemStyle: {
        padding: ".08rem 0",
        "--border-inner": 0,
        borderBottom: "1px solid rgba(230,230,230,1)",
        fontSize: ".3rem",
        color: "#222",
      },
      extra: <span className="mr-[.15rem] text-[.3rem] text-[#999]">USD</span>,
    },
  ];
  const MoneyUnit = JSON.parse(JSON.stringify(MonetaryUnit ?? "{}"));
  let formatData = (crt: any) => {
    let filterObjIndex = listInfo.findIndex(
      (item) => item.type == InfoType.unit
    );
    listInfo[filterObjIndex].value = crt.value;
    listInfo[filterObjIndex].extra = (
      <span className="mr-[.15rem] text-[.3rem] text-[#999]">{crt.value}</span>
    );
    setListInfo(() => listInfo);
    setPopupVisible(() => false);
  };
  const EnumMap = new Map([
    [
      MoneyUnit["China"],
      function (crt: any) {
        formatData(crt);
      },
    ],
    [
      MoneyUnit["America"],
      function (crt: any) {
        formatData(crt);
      },
    ],
  ]);
  let navigator = useNavigate();
  const HeadData = {
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

  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [listInfo, setListInfo] = useState<Array<any>>(ListData);
  const [crtInfo, setCrtInfo] = useState({});
  const avatarClickEvent = (rs: boolean) => {
    setPopupVisible(rs);
  };
  const editorInfo = (crt?: any) => {
    if (InfoType.unit == crt.type) {
      setCrtInfo(() => crt);
      setPopupVisible(() => !popupVisible);
      return;
    }
    let crtCopy = cloneDeep(crt);
    Reflect.deleteProperty(crtCopy, "extra");
    crt.showArrow && navigator("/my/editorInfo", { state: crtCopy });
  };
  const itemClickCb = (crt: any) => {
    EnumMap.get(MoneyUnit[crt["key"]])?.(crt);
  };
  return (
    <>
      <PublicHead {...HeadData} />
      <PublicList
        list={listInfo}
        arrowStyle={{ fontSize: ".2rem" }}
        arrowComp={<i className="iconfont icon-icon-arrow-right2"></i>}
        style={{ padding: "0 .3rem" }}
        click={(crt: any) => editorInfo(crt)}
      />
      <PopupComp
        MonetaryUnit={MoneyUnit}
        crtInfo={crtInfo}
        InfoType={InfoType}
        visible={popupVisible}
        cancel={(rs: boolean) => avatarClickEvent(rs)}
        onClick={(crt: any) => itemClickCb(crt)}
      />
    </>
  );
};
//彈窗組件
const PopupComp = memo(
  (props: any) => {
    let { MonetaryUnit: MoneyUnit, crtInfo, InfoType } = props;

    const itemClick = (e: any, key: string) => {
      e.stopPropagation();
      props.onClick?.({ key, value: MoneyUnit[key] });
    };
    return (
      <Popup
        visible={props.visible}
        onMaskClick={() => {
          props.cancel?.(false);
        }}
        bodyStyle={{
          borderRadius: ".34rem .34rem 0 0",
          overflow: "hidden",
          backgroundColor: "#f6f6f6",
        }}
      >
        <ul>
          {crtInfo.type == InfoType.unit ? (
            <>
              {Object.keys(MoneyUnit).map(
                (key: string, index: number, arr: Array<any>) => {
                  return (
                    <li
                      onClick={(e) => itemClick(e, key)}
                      className={mergeClassName(
                        "grid h-[1.02rem] bg-[#fff] text-[.32rem] text-[#333] font-[700] place-items-center border-b-[#dbdbdb]",
                        `${index + 1 !== arr.length ? "border-b-[1px]" : ""}`
                      )}
                      key={key}
                    >
                      {MoneyUnit[key]}
                    </li>
                  );
                }
              )}
            </>
          ) : (
            <>
              <li className="grid h-[1.02rem] bg-[#fff] text-[.32rem] text-[#333] font-[700] place-items-center border-b-[1px] border-b-[#dbdbdb]">
                拍照
              </li>
              <li className="grid h-[1.02rem] bg-[#fff] text-[.32rem] text-[#333] font-[700] place-items-center">
                从手机相册选择
              </li>
            </>
          )}
          <li
            onClick={(e) => {
              e.stopPropagation();
              props.cancel?.(false);
            }}
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