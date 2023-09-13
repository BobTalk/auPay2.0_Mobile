import PublicHead from "@/Components/PublicHead";
import PublicInput from "@/Components/PublicInput";
import { Button, Popup } from "antd-mobile";
import { memo, useCallback, useEffect, useState } from "react";
import { InfoType, CountryCode } from "../Enum";
import { useLocation } from "react-router-dom";

const EditorInfo = () => {
  const typeMap = new Map([
    [
      InfoType.phone,
      function (crt: any) {
        if (crt.value) {
          setHeadData({
            ...headInfo,
            title: "修改联系方式",
          });
        } else {
          setHeadData({
            ...headInfo,
            title: "绑定联系方式",
          });
        }
      },
    ],
    [
      InfoType.eMail,
      function (crt: any) {
        console.log(crt);
      },
    ],
    [
      InfoType.headSculpture,
      function (crt: any) {
        console.log(crt);
      },
    ],
    [
      InfoType.nickName,
      function (crt: any) {
        console.log(crt);
      },
    ],
    [
      InfoType.unit,
      function (crt: any) {
        console.log(crt);
      },
    ],
    [
      InfoType.userName,
      function (crt: any) {
        console.log(crt);
      },
    ],
  ]);
  const { state } = useLocation();
  const headInfo = {
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
  const [headData, setHeadData] = useState(headInfo);
  const [popupVisible, setPopupVisible] = useState(false);
  const [defaultCountryCode, setDefaultCountryCode] = useState<any>("China");
  const [countryCode, setCountryCode] = useState<any>();
  useEffect(() => {
    if (typeMap.has(state.type)) {
      typeMap.get(state.type)?.(state);
    }
  }, []);
  useEffect(() => {
    let CountryCodeObj = JSON.parse(JSON.stringify(CountryCode));
    setCountryCode(CountryCodeObj[defaultCountryCode]);
  }, [defaultCountryCode]);
  const InputEvent = (val: any) => {
    setValue(val);
  };

  const [value, setValue] = useState(state.value);
  const popupCb = (crt: any) => {
    setPopupVisible(false);
    setDefaultCountryCode(crt["key"]);
    setCountryCode(crt["value"]);
  };
  // 选择国家
  const selectCountry = () => {
    setPopupVisible(!popupVisible);
  };
  return (
    <>
      <PublicHead {...headData} />
      <PublicInput
        value={value}
        input={(val: any) => InputEvent(val)}
        maxLength={state.maxLength}
        placeholder={InfoType.phone == state.type ? "请输入联系方式" : "请输入"}
        prefix={
          InfoType["phone"] == state.type ? (
            <CountrCode
              onClick={() => selectCountry()}
              countryCode={countryCode}
            />
          ) : null
        }
        inputBoxStyle={{
          backgroundColor: "#fff",
          margin: "0 .3rem",
          paddingRight: 0,
          paddingLeft: 0,
          borderBottom: "1px solid #E6E6E6",
          borderRadius: 0,
        }}
        clearStyle={{
          fontSize: ".34rem",
          color: "#E6E6E6",
        }}
        clearable={true}
        inputClassName="text-[.3rem] text-[#222]"
      >
        {state.maxLength && (
          <p className="text-[.24rem]">
            <span className="text-[#1c63ff]">{value.length}</span>
            <span className="text-[#666]">/12</span>
          </p>
        )}
      </PublicInput>
      <div className="px-[.3rem]">
        <Button
          block
          color="primary"
          className="text-[.3rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
        >
          确定
        </Button>
      </div>
      <PopupComp
        CountryCode={CountryCode}
        onClick={(crt: any) => {
          popupCb(crt);
        }}
        visible={popupVisible}
      />
    </>
  );
};
const CountrCode = (props: any) => {
  const changeCountry = (e: any) => {
    e.stopPropagation();
    props.onClick?.();
  };
  return (
    <p
      className="flex items-center"
      onClick={(e) => {
        changeCountry(e);
      }}
    >
      <span className="text-[.3rem] text-[#999]">+{props.countryCode}</span>
      <i className="iconfont icon-zhankai text-[#C5CAD0] text-[.2rem] px-[.05rem]" />
    </p>
  );
};
// 确认弹窗
const PopupComp = memo(
  (props: any) => {
    let countryCode = JSON.parse(JSON.stringify(props.CountryCode ?? "{}"));
    const itemClick = useCallback((key: string) => {
      props.onClick?.({ key, value: countryCode[key] });
    }, []);
    return (
      <Popup
        visible={props.visible}
        onMaskClick={() => {
          props?.cancel();
        }}
        bodyStyle={{
          maxHeight: "40vh",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          padding: ".2rem .3rem .1rem .3rem",
          overflowY: "auto",
        }}
      >
        <ul>
          {Object.keys(countryCode).map((key: string) => {
            return (
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  itemClick(key);
                }}
                key={key}
                className="last:border-[0] flex h-[.6rem] items-center justify-between text-[.2rem] font-[700] border-b-[1px] border-b-[#f6f6f6]"
              >
                <span>{key}</span>
                <span className="text-[#666]">{countryCode[key]}</span>
              </li>
            );
          })}
        </ul>
      </Popup>
    );
  },
  (prv, next) => {
    return prv.visible == next.visible;
  }
);
export default EditorInfo;