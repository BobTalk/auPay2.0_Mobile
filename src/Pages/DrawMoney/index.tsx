import {
  GetCurrencyAssetsInfo,
  GetCurrencyDrawFee,
  GetUserWithdrawAddress,
  VerifyAssetsPassword,
  Withdraw,
} from "@/Api";
import { HeadConfig } from "@/Assets/config/head";
import PublicHead from "@/Components/PublicHead";
import PublicInput from "@/Components/PublicInput";
import PublicList from "@/Components/PublicList";
import PublicScroll from "@/Components/PublicScroll";
import PublicSummary from "@/Components/PublicSummary";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Button, Popup, Toast } from "antd-mobile";
import {
  createContext,
  memo,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CurrencyTypeEnum, OperationIdEnum } from "../Enum";
import PublicForm from "@/Components/PublicForm";
import ScanQr from "./scan_qr";
const DrawContent = createContext({});
// 弹窗属性类型
type PopupCompType = {
  visible: boolean;
  cancel: Function;
  submit: Function;
  isSelect?: boolean;
};
// 提币
const DrawMoney = () => {
  let { state } = useLocation();
  let headInfo = Object.assign(HeadConfig, {
    title: `提币${state.title}`,
    back: "goBack",
    className: "text-[#333] p-[.32rem_.3rem] h-[auto]",
  });
  const [popupVisible, setPopupVisible] = useState(false);
  const [addrVisible, setAddrVisible] = useState(false);
  const [drawAddr, setDrawAddr] = useState("");
  const [drawNum, setDrawNum] = useState<number | string>("");

  let drawNumRef = useRef<any>();
  const [isSelect, setIsSelect] = useState(true);
  const [commission, setCommission] = useState(0);
  const [addrList, setAddrList] = useState([]);
  // const [assetsInfo, setAssetsInfo] = useState<any>({});
  const assetsInfo: any = useRef(0);
  let [stop] = useStopPropagation();
  let Navigate = useNavigate();
  // submit
  const submitPopup = ({ values, assetsToken }: any) => {
    console.log("assetsToken: ", assetsToken);
    console.log("value: ", values);
    let { currencyId, currencyChain } = nameToCode();
    Withdraw(
      { currencyId, currencyChain, amount: drawNum, toAddress: drawAddr },
      {
        "Assets-Password-Token": assetsToken,
      }
    ).then((res) => {
      console.log(res, " >>>>>>");
      Toast.show({
        content: res.message,
      });
      if (res.status) {
        // Navigate('/assets/detail', state:{})
        window.history.back();
      }
    });
  };
  const cancelPopup = () => {
    setPopupVisible(!popupVisible);
  };
  function getMoneyRatio(obj: { currencyChain: number; currencyId: number }) {
    GetCurrencyDrawFee(obj).then((res) => {
      setCommission(res.value);
    });
  }
  function nameToCode() {
    let currencyType = JSON.parse(JSON.stringify(CurrencyTypeEnum));
    let title = state.title;
    let currencyTypeCode = "";
    for (const key in currencyType) {
      if (Object.prototype.hasOwnProperty.call(currencyType, key)) {
        if (title == key) {
          currencyTypeCode = currencyType[key];
        }
      }
    }
    let [currencyId, currencyChain] = currencyTypeCode.split("-");
    return {
      currencyId: +currencyId,
      currencyChain: currencyChain ? +currencyChain : 0,
    };
  }
  async function getCurrentAssets() {
    let params = nameToCode();
    let res = await GetCurrencyAssetsInfo(params);
    // setAssetsInfo(() => res);
    assetsInfo.current = res;
    getMoneyRatio(params);
  }
  async function getDrawAdrrList() {
    let { value } = await GetUserWithdrawAddress();
    let frs = value.map((item: { address: any; id: any }) => ({
      title: item.address,
      id: item.id,
      align: true,
    }));
    setAddrList(frs);
  }
  useLayoutEffect(() => {
    getDrawAdrrList();
    getCurrentAssets();
  }, []);
  function showSelectList(e: any) {
    stop(e, () => {
      setAddrVisible(true);
    });
  }
  function selectAddrCb(res: any) {
    setAddrVisible(false);
    setDrawAddr(res.title);
  }
  function drawAll(e: any) {
    stop(e, () => {
      let { availableBalance } = assetsInfo.current;
      drawNumRef.current.setVal(availableBalance);
      setDrawNum(availableBalance);
    });
  }
  function getRes(arg0: string): void {
    console.log("arg0: ", arg0);
  }
  function scamQr() {
    Navigate("/scanQr");
  }

  return (
    <PublicScroll>
      <PublicHead {...headInfo} />
      <div className="mx-[.3rem] mb-[.3rem] mt-[.1rem]">
        <DrawContent.Provider value={{ ...assetsInfo.current, commission }}>
          <PublicInput
            placeholder={`请${isSelect ? "选择" : "输入"}提币地址`}
            className="mt-[.25rem]"
            isSelect={isSelect}
            value={drawAddr}
            inputStyle={{
              height: ".4rem",
              fontSize: ".28rem",
            }}
            top={<TopScopeAddr isSelect={isSelect} scamQr={scamQr} />}
          >
            {isSelect && (
              <i
                onClick={(e) => showSelectList(e)}
                className="iconfont icon-zhankai text-[.26rem]"
              />
            )}
          </PublicInput>
          <PublicInput
            value={drawNum}
            delay={0}
            ref={drawNumRef}
            onChange={(val: any) => {
              let { availableBalance } = assetsInfo.current;
              // let reg = new RegExp("([1-9]d*((.d+)*))|(0.d+)");
              // reg.lastIndex = 0;
              // if (!reg.test(val)) return;
              if (+val > availableBalance) {
                setDrawNum(drawNum);
              } else {
                setDrawNum(val);
              }
            }}
            placeholder="0.00 USDT-ERC20"
            className="mt-[.34rem]"
            inputStyle={{
              height: ".4rem",
              fontSize: ".28rem",
            }}
            top={<TopScopeNum type={state.title} />}
            bottom={<BottomScopeNum />}
          >
            <Button
              onClick={(e) => drawAll(e)}
              className="text-[.26rem] text-[#1C63FF] before:bg-transparent"
              color="primary"
              fill="none"
            >
              全部
            </Button>
          </PublicInput>
          <ul>
            <li className="flex justify-between items-center mt-[.34rem]">
              <span className="text-[.28rem] text-[#333] font-[700]">
                提币手续费
              </span>
              <span className="text-[.28rem] text-[#666]">
                <span>{commission}&ensp;</span>
                <span>{state.title}</span>
              </span>
            </li>
            <li className="flex justify-between items-center mt-[.34rem]">
              <span className="text-[.28rem] text-[#333] font-[700]">
                到账数量
              </span>
              <span className="text-[.28rem] text-[#666]">
                <span>
                  {!drawNum || +drawNum - commission < 0
                    ? 0
                    : +drawNum - commission}
                  &ensp;
                </span>
                <span>{state.title}</span>
              </span>
            </li>
            <li className="mt-[.15rem]">
              <span className="text-[.24rem] text-[#666]">
                (到账数量=提币数量-提币手续费)
              </span>
            </li>
          </ul>
          <Button
            onClick={() => setPopupVisible(!popupVisible)}
            block
            color="primary"
            className="text-[.34rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem] before:bg-transparent"
          >
            确认提币
          </Button>
        </DrawContent.Provider>
        <PublicSummary
          className="mt-[.7rem]"
          iconStyle={{
            color: "#1C63FF",
          }}
          titleStyle={{
            fontSize: ".32rem",
            color: "#333",
            fontWeight: 600,
          }}
          summaryStyle={{
            fontSize: ".28rem",
            color: "#999",
            lineHeight: ".38rem",
            fontWeight: 500,
          }}
          summary={[
            "USDT-ERC20提币手续费为${3U}/笔，请仔细确认后再操作",
            "每笔提币最小限额10,000.00，最大限额100,000.00",
            "请务必确认电脑及浏览器安全，防止信息被篡改或泄露",
          ]}
        />
        <PopupComp
          isSelect={isSelect}
          submit={submitPopup}
          cancel={cancelPopup}
          visible={popupVisible}
        />
        <AddrPopup
          list={addrList}
          cancel={() => {
            setAddrVisible(false);
          }}
          onClick={selectAddrCb}
          visible={addrVisible}
        />
      </div>
    </PublicScroll>
  );
};
// 提币地址
const TopScopeAddr = (props: { isSelect?: boolean; scamQr: Function }) => {
  function scanQr() {
    props?.scamQr();
  }
  return (
    <div className="flex items-center justify-between text-[.28rem] font-[700] text-[#333] mb-[.17rem]">
      <p>{`${props.isSelect ? "选择" : "输入"}提币地址`}</p>
      <i onClick={scanQr} className="text-[.34rem] iconfont icon-saoyisao" />
    </div>
  );
};
// 提币数量
const TopScopeNum = (props: any) => {
  let { type } = props;
  let { availableBalance }: any = useContext(DrawContent);
  return (
    <div className="flex items-center justify-between text-[.28rem] font-[700] text-[#333] mb-[.17rem]">
      <p>提币数量</p>
      <p className="text-[.26rem] text-[#666]">
        <span>可用资产：</span>
        <span>
          {availableBalance || "--"} {type}
        </span>
      </p>
    </div>
  );
};
// 提币数量描述
const BottomScopeNum = () => {
  return (
    <p className="mt-[.15rem] text-[.24rem] text-[#999]">
      <span>最小提币数量 </span>
      <span>0.0005</span>
    </p>
  );
};
const AddrPopup = (props: any) => {
  let [stop] = useStopPropagation();
  function itemClick(crt: any) {
    props?.onClick?.(crt);
  }
  return (
    <Popup
      visible={props.visible}
      onMaskClick={(e) => {
        stop(e, () => {
          props?.cancel();
        });
      }}
      bodyStyle={{
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        maxHeight: "40vh",
      }}
    >
      <PublicList click={itemClick} list={props.list} />
    </Popup>
  );
};
// 确认弹窗
const PopupComp = memo(
  (props: PopupCompType) => {
    let [stop] = useStopPropagation();
    let formRef = useRef();
    let [formInit] = useState({ assetsPwd: "", googlePwd: "" });
    return (
      <Popup
        visible={props.visible}
        onMaskClick={(e) => {
          stop(e, () => {
            props?.cancel();
          });
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "40vh",
          padding: ".4rem .3rem .1rem .3rem",
        }}
      >
        <p className="text-[.32rem] text-[#333] font-[700] text-center">
          密码验证
        </p>
        <PublicForm
          ref={formRef}
          initialValues={formInit}
          finish={(obj: any) => {
            console.log("obj: ", obj);
            VerifyAssetsPassword({
              assetsPwd: obj.values.assetsPwd,
              operationId: OperationIdEnum["DrawMoney"],
            }).then((res) => {
              if (res.status) {
                props?.submit({ ...obj, assetsToken: res.value });
              }
            });
          }}
          footer={
            <Button
              block
              color="primary"
              type="submit"
              className="text-[.34rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem] before:bg-transparent"
            >
              确认
            </Button>
          }
        >
          <PublicInput
            formRef={formRef}
            placeholder="请输入资金密码"
            type="password"
            name="assetsPwd"
            rules={[{ required: true, message: "资金密码不能为空" }]}
            className="mt-[.25rem]"
            inputStyle={{
              height: ".4rem",
              fontSize: ".28rem",
            }}
            top={
              <p className="text-[.28rem] text-[#333] mb-[.16rem]">资金密码</p>
            }
          />
          {!props.isSelect && (
            <PublicInput
              formRef={formRef}
              name="googlePwd"
              type="password"
              rules={[{ required: true, message: "Google验证码不能为空" }]}
              placeholder="请输入Google验证码"
              className="mt-[.25rem]"
              inputStyle={{
                height: ".4rem",
                fontSize: ".28rem",
              }}
              top={
                <p className="text-[.28rem] text-[#333] mb-[.16rem]">
                  Google验证码
                </p>
              }
            />
          )}
        </PublicForm>
      </Popup>
    );
  },
  (prv, next) => {
    return prv.visible == next.visible;
  }
);
export default DrawMoney;
