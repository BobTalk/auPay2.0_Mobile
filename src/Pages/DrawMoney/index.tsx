import PublicHead from "@/Components/PublicHead";
import PublicInput from "@/Components/PublicInput";
import PublicSummary from "@/Components/PublicSummary";
import { Button, Popup } from "antd-mobile";
import { memo, useState } from "react";
// 弹窗属性类型
type PopupCompType = {
  visible: boolean;
  cancel: Function;
  submit: Function;
  isSelect?: boolean;
};
// 提币
const DrawMoney = () => {
  const headInfo = {
    title: "提币USDT-ERC20",
    back: "goBack",
    titleStyle: {
      fontSize: ".34rem",
      color: "#333",
      fontWeight: 700,
    },
    iconStyle: {
      fontSize: ".34rem",
    },
  };
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSelect, setIsSelect] = useState(true);
  const submitDraw = () => {
    setPopupVisible(!popupVisible);
  };
  const submitPopup = () => {
    submitDraw();
  };
  const cancelPopup = () => {
    submitDraw();
  };
  return (
    <div className="mx-[.3rem] mb-[.3rem] mt-[.1rem]">
      <PublicHead {...headInfo} />
      <PublicInput
        placeholder={`请${isSelect ? "选择" : "输入"}提币地址`}
        className="mt-[.25rem]"
        isSelect={isSelect}
        inputStyle={{
          height: ".4rem",
          fontSize: ".28rem",
        }}
        top={<TopScopeAddr isSelect={isSelect} />}
      >
        {isSelect && <i className="iconfont icon-zhankai text-[.26rem]" />}
      </PublicInput>
      <PublicInput
        placeholder="0.00 USDT-ERC20"
        className="mt-[.34rem]"
        inputStyle={{
          height: ".4rem",
          fontSize: ".28rem",
        }}
        top={<TopScopeNum />}
        bottom={<BottomScopeNum />}
      >
        <Button
          className="text-[.26rem] text-[#1C63FF]"
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
          <span className="text-[.28rem] text-[#333] font-[700]">到账数量</span>
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
        className="text-[.34rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
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
    </div>
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
const TopScopeNum = () => {
  return (
    <div className="flex items-center justify-between text-[.28rem] font-[700] text-[#333] mb-[.17rem]">
      <p>提币数量</p>
      <p className="text-[.26rem] text-[#666]">
        <span>可用资产：</span>
        <span>12 USDT-ERC20</span>
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
// 确认弹窗
const PopupComp = memo((props: PopupCompType) => {
  return (
    <Popup
      visible={props.visible}
      onMaskClick={() => {
        props?.cancel();
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
        top={<p className="text-[.28rem] text-[#333] mb-[.16rem]">资金密码</p>}
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
        className="text-[.34rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
      >
        确认
      </Button>
    </Popup>
  );
});
export default DrawMoney;
