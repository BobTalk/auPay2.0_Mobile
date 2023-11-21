import PublicHead from "@/Components/PublicHead";
import PublicList from "@/Components/PublicList";
import { Avatar, Popup, Toast } from "antd-mobile";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CountryCode,
  InfoType,
  MonetaryUnit,
  UnitMapNumEnum,
} from "../../Enum";
import { mergeClassName } from "@/utils/base";
import { cloneDeep, forIn } from "lodash";
import { HeadConfig } from "@/Assets/config/head";
import { GetUserInfo, SetUserInfo } from "@/Api";
const AccountInformation = () => {
  let [listInfo, setListInfo] = useState<Array<any>>([]);
  const MoneyUnit = JSON.parse(JSON.stringify(MonetaryUnit ?? "{}"));
  const MpUnit = JSON.parse(JSON.stringify(UnitMapNumEnum));
  let formatData = (crt: any) => {
    let filterObjIndex = listInfo.findIndex(
      (item) => item.type == InfoType.unit
    );
    listInfo[filterObjIndex].value = crt.value;
    listInfo[filterObjIndex].extra = (
      <span className="mr-[.15rem] text-[.3rem] text-[#999]">{crt.value}</span>
    );
    SetUserInfo({ currencyUnit: MpUnit[crt.value] }).then((res) => {
      Toast.show({
        content: res.message,
      });
      setListInfo(() => listInfo);
    });

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
  const HeadData = Object.assign(HeadConfig, {
    title: "账户信息",
    back: "goBack",
    className:
      "p-[.32rem_.3rem] h-[auto] border-b-[1px] border-b-[rgba(197,202,208,1)]",
  });
  let [popupVisible, setPopupVisible] = useState<boolean>(false);

  let [crtInfo, setCrtInfo] = useState({});
  let avatarClickEvent = (rs: boolean) => {
    setPopupVisible(rs);
  };
  // 编辑信息
  let editorInfo = (crt?: any) => {
    if (InfoType.unit == crt.type) {
      setCrtInfo(() => crt);
      setPopupVisible(() => !popupVisible);
      return;
    }
    if (InfoType["headSculpture"] == crt["type"]) return;
    let crtCopy = cloneDeep(crt);
    Reflect.deleteProperty(crtCopy, "extra");
    let [code, phone] = crtCopy?.value?.split(" ")??[undefined, undefined];
    crt.showArrow &&
      navigator("/my/editorInfo", {
        state: {
          code: codeMapCountry(code) || "China",
          ...crtCopy,
          value: phone,
        },
      });
  };
  let itemClickCb = (crt: any) => {
    EnumMap.get(MoneyUnit[crt["key"]])?.(crt);
  };
  function codeMapCountry(code: number): string {
    let codeList = JSON.parse(JSON.stringify(CountryCode));
    let country: string = "";
    for (const key in codeList) {
      if (Object.prototype.hasOwnProperty.call(codeList, key)) {
        const element = codeList[key];
        if (element === code) {
          country = key;
        }
      }
    }
    return country;
  }
  let getPageInfo = async () => {
    let userInfo = await GetUserInfo();
    const ListData = [
      {
        id: "05",
        title: "用户名",
        showArrow: false,
        type: InfoType.userName,
        value: userInfo["username"],
        itemStyle: {
          padding: ".08rem 0",
          "--border-inner": 0,
          borderBottom: "1px solid rgba(230,230,230,1)",
          fontSize: ".3rem",
          color: "#222",
        },
        extra: (
          <span className="mr-[.15rem] text-[.3rem] text-[#999]">
            {userInfo["username"] || "--"}
          </span>
        ),
      },
      {
        id: "06",
        title: "邮箱",
        type: InfoType.eMail,
        showArrow: false,
        value: userInfo["email"],
        itemStyle: {
          padding: ".08rem 0",
          "--border-inner": 0,
          borderBottom: "1px solid rgba(230,230,230,1)",
          fontSize: ".3rem",
          color: "#222",
        },
        extra: (
          <span className="mr-[.15rem] text-[.3rem] text-[#999]">
            {userInfo["email"] || "--"}
          </span>
        ),
      },
      {
        id: "07",
        title: "联系方式",
        type: InfoType.phone,
        showArrow: true,
        value: userInfo["mobile"],
        itemStyle: {
          padding: ".08rem 0",
          "--border-inner": 0,
          borderBottom: "1px solid rgba(230,230,230,1)",
          fontSize: ".3rem",
          color: "#222",
        },
        extra: (
          <span className="mr-[.15rem] text-[.3rem] text-[#999]">
            {userInfo["mobile"] || "--"}
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
        extra: (
          <span className="mr-[.15rem] text-[.3rem] text-[#999]">
            {MpUnit[userInfo.currencyUnit]}
          </span>
        ),
      },
    ];
    setListInfo(() => ListData);
  };
  useEffect(() => {
    getPageInfo();
  }, []);
  return (
    <>
      <PublicHead {...HeadData} />
      <PublicList
        list={listInfo}
        isRender={true}
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
        onMaskClick={(e) => {
          e.stopPropagation();
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
