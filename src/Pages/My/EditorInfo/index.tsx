import PublicHead from "@/Components/PublicHead";
import PublicInput from "@/Components/PublicInput";
import { Button, Popup, Toast } from "antd-mobile";
import {
  createRef,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { InfoType, CountryCode, HeadTitle, InfoSecurityTip } from "../../Enum";
import { useLocation, useNavigate } from "react-router-dom";
import MoneyPwd from "./money_pwd";
import GoogleValidator from "./google-validator";
import LoginPwd from "./login_pwd";
import { HeadConfig } from "@/Assets/config/head";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { SetUserInfo } from "@/Api";
import { extend } from "lodash";
import PublicForm from "@/Components/PublicForm";

const EditorInfo = () => {
  let HeadTitle1 = JSON.parse(JSON.stringify(HeadTitle));
  let InfoSecurityTip1 = JSON.parse(JSON.stringify(InfoSecurityTip));
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
  const { state = {} } = useLocation();
  let headInfo = Object.assign(HeadConfig, {
    title: HeadTitle1[state["type"]] ?? "编辑昵称",
    back: "goBack",
    className:
      "p-[.32rem_.3rem] h-[auto] border-b-[1px] border-b-[rgba(197,202,208,1)]",
  });
  const [headData, setHeadData] = useState(headInfo);
  const [popupVisible, setPopupVisible] = useState(false);
  const [defaultCountryCode, setDefaultCountryCode] = useState<any>(state.code);
  const [, setCountryCode] = useState<any>();
  let CountryCodeObj = JSON.parse(JSON.stringify(CountryCode));
  let navigate = useNavigate();
  useEffect(() => {
    if (typeMap.has(state?.type)) {
      typeMap.get(state?.type)?.(state);
    }
  }, []);
  useLayoutEffect(() => {
    setCountryCode(() => CountryCodeObj[defaultCountryCode]);
  }, [defaultCountryCode]);
  const InputEvent = (val: any) => {
    setValue({ inputValue: val });
  };
  const moneyPwd = createRef();
  const [formInitVal, setValue] = useState({ inputValue: state?.value || "" });
  const popupCb = (crt: any) => {
    setPopupVisible(false);
    setDefaultCountryCode(crt["key"]);
    setCountryCode(crt["value"]);
  };
  // 选择国家
  const selectCountry = () => {
    setPopupVisible(!popupVisible);
  };
  // 确认提交
  function SubmitBtnCb({ values, outOfDate }: any, CountryCode?: number) {
    if (outOfDate === false) return;
    SetUserInfo({ mobile: CountryCode + " " + values["inputValue"] }).then(
      (res) => {
        Toast.show({
          content: res.message,
        });
        if (res.status) {
          setTimeout(() => {
            navigate("/my/accountInfor", { state: { HeadTitle: "账户信息" } });
          }, 3000);
        }
      }
    );
  }

  return (
    <>
      <PublicHead {...headData} />
      {!!InfoSecurityTip1[state["type"]] ? (
        <p className="grid items-center px-[.3rem] h-[.7rem] text-[.24rem] text-[#222] bg-[#E9ECF2]">
          {InfoSecurityTip1[state["type"]]}
        </p>
      ) : null}
      {
        // 资金密码设置/修改
        ["securityPwd", "updateSecurityPwd"].includes(state["type"]) ? (
          <MoneyPwd ref={moneyPwd} crt={state} />
        ) : ["siginPwd", "updateSiginPwd"].includes(state["type"]) ? (
          <>
            <LoginPwd />
          </>
        ) : state["type"] == "googleValidator" ? (
          // google验证器、修改
          <>
            <GoogleValidator />
            <SubmitBtn
              onClick={() => {
                window.history.back();
              }}
            />
          </>
        ) : (
          // 电话号码 昵称等模块修改
          <PublicForm
            finish={(val: string) =>
              SubmitBtnCb(val, CountryCodeObj[defaultCountryCode])
            }
            initialValues={formInitVal}
            footer={<SubmitBtn type="submit" />}
          >
            <PublicInput
              name="inputValue"
              value={formInitVal.inputValue}
              rules={[
                {
                  required: true,
                  message: `${
                    InfoType.phone === state?.type ? "请输入联系方式" : "请输入"
                  }`,
                },
              ]}
              input={(val: any) => InputEvent(val)}
              isRender={true}
              maxLength={state?.maxLength}
              placeholder={
                InfoType.phone === state?.type ? "请输入联系方式" : "请输入"
              }
              prefix={
                InfoType["phone"] === state?.type ? (
                  <CountrCode
                    onClick={() => selectCountry()}
                    areaCode={CountryCodeObj[defaultCountryCode]}
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
              {state?.maxLength && (
                <p className="text-[.24rem]">
                  <span className="text-[#1c63ff]">
                    {formInitVal.inputValue.length}
                  </span>
                  <span className="text-[#666]">/12</span>
                </p>
              )}
            </PublicInput>
          </PublicForm>
        )
      }
      <PopupComp
        CountryCode={CountryCode}
        onClick={(crt: any) => popupCb(crt)}
        cancel={() => setPopupVisible(false)}
        visible={popupVisible}
      />
    </>
  );
};
const SubmitBtn = (props: any) => {
  function submitInfo(e: any) {
    e.stopPropagation();
    props.onClick?.();
  }

  return (
    <div className="px-[.3rem]">
      <Button
        block
        type={props.type}
        onClick={(e) => submitInfo(e)}
        color="primary"
        className="text-[.3rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.3rem] before:bg-transparent"
      >
        确定
      </Button>
    </div>
  );
};
// 国家区号
const CountrCode = memo(
  (props: any) => {
    let [stop] = useStopPropagation();
    const changeCountry = (e: any) => {
      stop(e, () => {
        props.onClick?.();
      });
    };
    return (
      <p
        className="flex items-center"
        onClick={(e) => {
          changeCountry(e);
        }}
      >
        <span className="text-[.3rem] text-[#999]">+{props.areaCode}</span>
        <i className="iconfont icon-zhankai text-[#C5CAD0] text-[.2rem] px-[.05rem]" />
      </p>
    );
  },
  (prv, next) => {
    return prv.areaCode === next.areaCode;
  }
);
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
        onMaskClick={(e) => {
          e.stopPropagation();
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
    return prv.visible === next.visible;
  }
);
export default EditorInfo;
