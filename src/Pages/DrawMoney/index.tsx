import PublicHead from "@/Components/PublicHead";
import PublicInput from "@/Components/PublicInput";
import PublicSummary from "@/Components/PublicSummary";
import { Button } from "antd-mobile";
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
  return (
    <div className="mx-[.3rem] mb-[.3rem] mt-[.1rem]">
      <PublicHead {...headInfo} />
      <PublicInput
        placeholder="请输入提币地址"
        className="mt-[.25rem]"
        inputStyle={{
          height: ".4rem",
          fontSize: ".28rem",
        }}
        top={<TopScopeAddr />}
      />
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
            <span>3</span>
            <span>USDT-ERC20</span>
          </span>
        </li>
        <li className="flex justify-between items-center mt-[.34rem]">
          <span className="text-[.28rem] text-[#333] font-[700]">
            提币手续费
          </span>
          <span className="text-[.28rem] text-[#666]">
            <span>3</span>
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
    </div>
  );
};
const TopScopeAddr = () => {
  return (
    <div className="flex items-center justify-between text-[.28rem] font-[700] text-[#333] mb-[.17rem]">
      <p>输入提币地址</p>
      <i className="text-[.34rem] iconfont icon-saoyisao_huaban" />
    </div>
  );
};
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
const BottomScopeNum = () => {
  return (
    <p className="mt-[.15rem] text-[.24rem] text-[#999]">
      <span>最小提币数量 </span>
      <span>0.0005</span>
    </p>
  );
};
export default DrawMoney;
