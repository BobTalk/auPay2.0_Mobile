import { GetCurrencyAssetsInfo, GetUserWithdrawAddress } from "@/Api";
import { HeadConfig } from "@/Assets/config/head";
import PublicHead from "@/Components/PublicHead";
import PublicInput from "@/Components/PublicInput";
import PublicList from "@/Components/PublicList";
import PublicScroll from "@/Components/PublicScroll";
import PublicSummary from "@/Components/PublicSummary";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Button, Popup } from "antd-mobile";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CurrencyTypeEnum } from "../Enum";
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
  const [isSelect, setIsSelect] = useState(true);
  const [addrList, setAddrList] = useState([]);

  let [stop] = useStopPropagation();
  const submitDraw = () => {
    setPopupVisible(!popupVisible);
  };
  const submitPopup = () => {
    submitDraw();
  };
  const cancelPopup = () => {
    submitDraw();
  };

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
  return (
    <PublicScroll>
      <PublicHead {...headInfo} />
      <div className="mx-[.3rem] mb-[.3rem] mt-[.1rem]">
        <PublicInput
          placeholder={`请${isSelect ? "选择" : "输入"}提币地址`}
          className="mt-[.25rem]"
          isSelect={isSelect}
          value={drawAddr}
          inputStyle={{
            height: ".4rem",
            fontSize: ".28rem",
          }}
          top={<TopScopeAddr isSelect={isSelect} />}
        >
          {isSelect && (
            <i
              onClick={(e) => showSelectList(e)}
              className="iconfont icon-zhankai text-[.26rem]"
            />
          )}
        </PublicInput>
        <PublicInput
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
              <span>3&ensp;</span>
              <span>USDT-ERC20</span>
            </span>
          </li>
          <li className="flex justify-between items-center mt-[.34rem]">
            <span className="text-[.28rem] text-[#333] font-[700]">
              到账数量
            </span>
            <span className="text-[.28rem] text-[#666]">
              <span>9&ensp;</span>
              <span>USDT-ERC20</span>
            </span>
          </li>
          <li className="mt-[.15rem]">
            <span className="text-[.24rem] text-[#666]">
              (到账数量=提币数量-提币手续费)
            </span>
          </li>
        </ul>
        <Button
          onClick={submitDraw}
          block
          color="primary"
          className="text-[.34rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem] before:bg-transparent"
        >
          确认提币
        </Button>
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
const TopScopeAddr = (props: { isSelect?: boolean }) => {
  return (
    <div className="flex items-center justify-between text-[.28rem] font-[700] text-[#333] mb-[.17rem]">
      <p>{`${props.isSelect ? "选择" : "输入"}提币地址`}</p>
      <i className="text-[.34rem] iconfont icon-saoyisao" />
    </div>
  );
};
// 提币数量
const TopScopeNum = (props: any) => {
  let { type } = props;
  const [assetsInfo, setAssetsInfo] = useState(0);
  async function getCurrentAssets() {
    let currencyType = JSON.parse(JSON.stringify(CurrencyTypeEnum));
    let title = type;
    let currencyTypeCode = "";
    for (const key in currencyType) {
      if (Object.prototype.hasOwnProperty.call(currencyType, key)) {
        if (title == key) {
          currencyTypeCode = currencyType[key];
        }
      }
    }
    let [currencyId, currencyChain] = currencyTypeCode.split("-");
    let res = await GetCurrencyAssetsInfo({
      currencyId: +currencyId,
      currencyChain: currencyChain ? +currencyChain : 0,
    });
    setAssetsInfo(() => res.availableBalance);
  }
  useEffect(() => {
    getCurrentAssets();
  }, []);
  return (
    <div className="flex items-center justify-between text-[.28rem] font-[700] text-[#333] mb-[.17rem]">
      <p>提币数量</p>
      <p className="text-[.26rem] text-[#666]">
        <span>可用资产：</span>
        <span>
          {assetsInfo || "--"} {type}
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

        <PublicInput
          placeholder="请输入资金密码"
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
        <Button
          onClick={() => props?.submit()}
          block
          color="primary"
          className="text-[.34rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem] before:bg-transparent"
        >
          确认
        </Button>
      </Popup>
    );
  },
  (prv, next) => {
    return prv.visible == next.visible;
  }
);
export default DrawMoney;
